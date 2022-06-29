import asyncio

import discord
import youtube_dl
from discord.ext import commands

# Options
voice_clients = {}
youtube_dl_options = {'format': 'bestaudio/best'}
ytdl = youtube_dl.YoutubeDL(youtube_dl_options)
ffmpeg_options = {'options': '-vn'}

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
            voice_client = await ctx.voice_client.move_to(ctx.author.voice.channel)
            voice_clients[ctx.guild.id] = voice_client
            
            loop = asyncio.get_event_loop()
            data = await loop.run_in_executor(None, lambda: ytdl.extract_info(query, download=False))
            
            song = data['formats'][0]['url']
            player = discord.FFmpegPCMAudio(song, **ffmpeg_options)
            
            voice_client.play(player, after=lambda e: print('Player error: %s' % e) if e else None)
            
        except Exception as e:
            print(e)
            await ctx.send(f'Error: {e}')

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
