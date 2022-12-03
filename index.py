import calendar;
import requests, json, re, math, time;
import asyncio
import websockets
import datetime


async def test():
    async with websockets.connect('ws://51.91.103.54:7048') as websocket:
        presentDate = datetime.datetime.now()
        ts = datetime.datetime.timestamp(presentDate)*1000


        # Speed send
        url = ''
        send = '{ "action": "send", "wallet": "", "source": "", "destination": "", "amount": "1000000000000000" }'
        send = json.loads(send)
        sending = requests.post(url, json = send)
        sending = sending.text
        sending = json.loads(sending)
        block = sending["block"]
        print (block)
        await websocket.send('{ "action": "subscribe", "topic": "confirmation", "options": { "accounts": [ "" ] } }')
        response = await websocket.recv()
        print(response)
        response = json.loads(response)
        response = response["time"]
        speed = int(response) - int(ts)
        speed = speed / 1000
        print(str(speed) + " secondes !!")

asyncio.get_event_loop().run_until_complete(test())
