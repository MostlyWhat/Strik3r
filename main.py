import os

import discord
from discord.ext import commands, tasks

# Setup the Bot and Modules
intents = discord.Intents().all()
client = commands.Bot(command_prefix='!', intents=intents)

# Setup the Variables
# Setup Presence
presence = 'with SkyNET'

# Setup the Bot
if 'STRIK3R_TOKEN' in os.environ:
    token = os.environ.get('STRIK3R_TOKEN')
    print('Token has been set using environmental variable')
    
else:
    print('Token not found in environment variables. Please put your token in the STRIK3R_TOKEN environment variable.')
    exit()

# Stuff
@client.command()
async def load(ctx, extension):
    client.load_extension(f'backend.{extension}')
    
# Unload
@client.command()
async def unload(ctx, extension):
    client.unload_extension(f'backend.{extension}')
    
# Reload
@client.command()
async def reload(ctx, extension):
    client.unload_extension(f'backend.{extension}')
    client.load_extension(f'backend.{extension}')

# Load All Extensions
for filename in os.listdir('./backend'):
    if filename.endswith('.py'):
        client.load_extension(f'backend.{filename[:-3]}')
        

# On Ready Event
@client.event
async def on_ready():
    print(f'Logged in as {client.user.name}')
    await client.change_presence(status=discord.Status.online, activity=discord.Game(name=presence))
    
# Member Join Event
@client.event
async def on_member_join(member):
    print(f'{member} has joined the server.')
    
    # Embed
    embed = discord.Embed(title='Welcome to MostlyWhat Systems!', description='Please read the embed below for somethings to help you get started!', color=0x00ff00)
    embed.add_field(name='What is MostlyWhat Systems?', value='MostlyWhat Systems is a Discord bot that is designed to help you with your Minecraft server!', inline=False)
    embed.add_field(name='How do I use it?', value='You can use the commands !help and !commands to see what commands are available!', inline=False)
    embed.add_field(name='What is a command?', value='A command is a command that you can use in Discord!', inline=False)
    
    await member.create_dm()
    await member.dm_channel.send(f'Hi {member.name}, I personally welcome you to MostlyWhat Systems! Please read the embed below for somethings to help you get started!', embed=embed)
    
# Member Leave Event
@client.event
async def on_member_remove(member):
    print(f'{member} has left the server.')

# Ping Command
@client.command()
async def ping(ctx):
    await ctx.send(f'Pong! {round(client.latency * 1000)}ms')
    
# On Command Error
@client.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        await ctx.send('Command not found. Please use !help for a list of commands.')
    
# Purge Command with input of number of messages to delete
@client.command()
@commands.has_permissions(manage_messages=True)
async def purge(ctx, amount: int):
    await ctx.channel.purge(limit=amount)
    await ctx.send(f'Deleted {amount} messages.')

# Purge Error Message
@purge.error
async def purge_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send('Please enter a number of messages to delete.')

# Kick Command
@client.command()
@commands.has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member, *, reason=None):
    await member.kick(reason=reason)
    await ctx.send(f'Kicked {member.name} for {reason}')
    
# Ban Command
@client.command()
@commands.has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason=None):
    await member.ban(reason=reason)
    await ctx.send(f'Banned {member.name} for {reason}')

# Unban Command
@client.command()
@commands.has_permissions(ban_members=True)
async def unban(ctx, *, member):
    banned_users = await ctx.guild.bans()
    member_name, member_discriminator = member.split('#')

    for ban_entry in banned_users:
        user = ban_entry.user

        if (user.name, user.discriminator) == (member_name, member_discriminator):
            await ctx.guild.unban(user)
            await ctx.send(f'Unbanned {user.name}')
            return

client.run(token)
