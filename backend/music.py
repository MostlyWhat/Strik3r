import asyncio

import discord
import youtube_dl
from discord.ext import commands

# Options
YDL_OPTIONS = {
    'format': 'bestaudio'
}

class music(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.Cog.listener()
    async def on_ready(self):
        print('Music is ready.')
        
    @commands.command()
    async def join(self, ctx, *, channel: discord.VoiceChannel):
        """Joins a voice channel."""

        if ctx.voice_client is not None:
            return await ctx.voice_client.move_to(channel)

        await channel.connect()

    @commands.command()
    async def play(self, ctx, *, query):
        """Plays audio from youtube."""

        try:
            loop = asyncio.get_event_loop()
            data = await loop.run_in_executor(None, lambda: youtube_dl.YoutubeDL(YDL_OPTIONS).extract_info(query, download=False))
            
            song = data['formats'][0]
            player = discord.PCMVolumeTransformer(discord.FFmpegPCMAudio(song['url']))
            
            ctx.voice_client.play(player)
            
            await ctx.send('Now playing: {}'.format(song['title']))
        
        except Exception as e:
            print(e)
            await ctx.send(f'Error: {e}')

    @commands.command()
    async def pause(self, ctx):
        """Pauses the current song."""

        if ctx.voice_client and ctx.voice_client.is_playing():
            ctx.voice_client.pause()
            await ctx.send('Current Song has been Paused')

    @commands.command()
    async def stop(self, ctx):
        """Stops and disconnects the bot from voice."""

        await ctx.voice_client.disconnect()

    @play.before_invoke
    async def ensure_voice(self, ctx):
        if ctx.voice_client is None:
            if ctx.author.voice:
                await ctx.author.voice.channel.connect()
                
            else:
                await ctx.send("You are not connected to a voice channel.")
                raise commands.CommandError("Author not connected to a voice channel.")
            
        elif ctx.voice_client.is_playing():
            ctx.voice_client.stop()

def setup(client):
    client.add_cog(music(client))
