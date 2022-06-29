import discord
import youtube_dl
from discord.ext import commands

# Options
players = {}

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
            guild = ctx.message.guild
            voice_client = guild.voice_client
            
            player = await voice_client.create_ytdl_player(query)
            players[guild.id] = player
            player.start()
            
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
