const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');
const querystring = require("querystring");
const request = require('request')

// Create a reconnecting WebSocket.
// In this example, we wait a maximum of 2 seconds before retrying.
const ws = new ReconnectingWebSocket('wss://ws.dogenano.io', [], {
	WebSocket: WS,
	connectionTimeout: 1000,	
	maxRetries: 100000,
	maxReconnectionDelay: 2000,
	minReconnectionDelay: 10 // if not set, initial connection will take a few seconds by default
});

// As soon as we connect, subscribe to block confirmations
ws.onopen = () => {
	const confirmation_subscription = {
		"action": "subscribe", 
		"topic": "confirmation"
	}
	ws.send(JSON.stringify(confirmation_subscription));

	// Other subscriptions can go here
};
const temps1 = Date.now();
const options = {
	url: 'http://51.91.103.54:7040',
	json: true,
	body: {
		action: "send",
		wallet: "A8B5F2447A1BAFA85AF0465B6BA00C08730724E28FBF5111A7270353EAEE8C34",
	    source: "xdg_3trcizdrj8uck5f46onn3tomac7wgx5rfey7a1y5dp9q3dqyn6ccup688atx",
		destination: "xdg_3trcizdrj8uck5f46onn3tomac7wgx5rfey7a1y5dp9q3dqyn6ccup688atx",
		amount: "1000000000000000"
	}
  }
  
  request.post(options, (err, res, body) => {
	if (err) {
	  return console.log(err)
	}
	console.log(body)
  })

// The node sent us a message
ws.onmessage = msg => {
	console.log(msg.data);
	data_json = JSON.parse(msg.data);

	if (data_json.topic === "confirmation") {
		// console.log ('Confirmed', data_json.message.hash)
		const temps2 = data_json["time"]
		speed = (temps2 - temps1) / 1000;
		console.log (speed, ' secondes !!!')
	}
};
