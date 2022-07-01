import ast

import discord
from discord.ext import commands
from youtube_dl import YoutubeDL


class music(commands.Cog):
    def __init__(self, client):
        self.client = client
        
        #all the music related stuff
        self.is_playing = False
        self.is_paused = False

        # 2d array containing [song, channel]
        self.music_queue = []
        self.YDL_OPTIONS = {'format': 'bestaudio', 'noplaylist':'True'}
        self.FFMPEG_OPTIONS = {'before_options': '-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5', 'options': '-vn'}

        self.vc = None
    
    #searching the item on youtube
    def search_yt(self, item):
        with YoutubeDL(self.YDL_OPTIONS) as ydl:
            try: 
                info = ydl.extract_info(f"ytsearch:{item}", download=False)['entries'][0]
            except Exception: 
                return False

        return {'source': info['formats'][0]['url'], 'title': info['title']}
    
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
            song = self.search_yt(query)
            m_url = song['source']
            player = discord.FFmpegPCMAudio(m_url, **self.FFMPEG_OPTIONS)

            ctx.voice_client.play(player)

            # Current Song Embed
            embed = discord.Embed(title=f'[ Music ] Now Playing {song["title"]}', color=0x00ff00)
            
            await ctx.send(embed=embed)

        except Exception as e:
            print(e)
            await ctx.send(f'Error: {e}')

    @commands.command()
    async def pause(self, ctx):
        """Pauses the current song."""

        if ctx.voice_client and ctx.voice_client.is_playing():
            ctx.voice_client.pause()
            
            # Current Song Embed
            embed = discord.Embed(title=f'[ Music ] Paused Music Playback', color=0x00ff00)
            
            await ctx.send(embed=embed)

    @commands.command()
    async def resume(self, ctx):
        """Resumes the current song."""

        if ctx.voice_client and ctx.voice_client.is_paused():
            ctx.voice_client.resume()
            
            # Current Song Embed
            embed = discord.Embed(title='[ Music ] Resumed Music Playback', color=0x00ff00)
            
            await ctx.send(embed=embed)

    @commands.command()
    async def stop(self, ctx):
        """Stops and disconnects the bot from voice."""

        # Current Song Embed
        embed = discord.Embed(title='[ Music ] Disconnected from Voice Channel', color=0x00ff00)
        ctx.send(embed=embed)
        
        await ctx.voice_client.disconnect()

    @play.before_invoke
    async def ensure_voice(self, ctx):
        if ctx.voice_client is None:
            if ctx.author.voice:
                await ctx.author.voice.channel.connect()
                
            else:
                # Current Song Embed
                embed = discord.Embed(title=f'[ Music ] Please connect to a voice channel!', color=0x00ff00)
                
                await ctx.send(embed=embed)
                raise commands.CommandError("Author not connected to a voice channel.")
            
        elif ctx.voice_client.is_playing():
            ctx.voice_client.stop()

def setup(client):
    client.add_cog(music(client))
