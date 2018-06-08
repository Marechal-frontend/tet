import discord
import asyncio

client = discord.Client()

@client.event
async def on_ready():
	print('BOT ONLINE')
	print(client.user.name)
	print(client.user.id)


@client.event
async def on_message(message):
	if message.content.lower().startswith('t!'):
		await client.send_message(message.chanel, "Tet bot")

client.run('NDU0Njk2NzA4ODk5NzMzNTE4.Dfx04g.Z37eo79wsKUoX5RzxhQmZckP5mY')