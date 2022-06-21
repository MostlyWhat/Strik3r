import os

import discord
from discord.ext import commands, tasks

# Setup the Bot and Modules
intents = discord.Intents().all()
client = commands.Bot(command_prefix='!', intents=intents)

# Get Token
try:
    with open('token.txt', 'r') as f:
        token = f.read()
        
except FileNotFoundError:
    print('Token not found. Please create a token.txt file with your token in it.')
    exit()

# On Ready Event
@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.online, activity=discord.Game(name='!help'))
    print(f'Logged in as {client.user.name}')
    
# Member Join Event
@client.event
async def on_member_join(member):
    print(f'{member} has joined the server.')
    await member.create_dm()
    await member.dm_channel.send(f'Hi {member.name}, I personally welcome you to MostlyWhat Systems! Please read the embed below for somethings to help you get started!')
    
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
async def kick(ctx, member: discord.Member, *, reason=None):
    await member.kick(reason=reason)
    await ctx.send(f'Kicked {member.name} for {reason}')
    
# Ban Command
@client.command()
async def ban(ctx, member: discord.Member, *, reason=None):
    await member.ban(reason=reason)
    await ctx.send(f'Banned {member.name} for {reason}')

# Unban Command
@client.command()
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
