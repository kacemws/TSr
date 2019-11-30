const zmq = require('zeromq')
let req = zmq.socket('req')
req.identity='Worker1'+process.pid

req.connect('tcp://localhost:9999')
req.on('message', (c,sep,msg)=> {
	console.log('message received')
	setTimeout(()=> {
		req.send([c,'','resp'])
		console.log('resp sent')
	}, 1000)
})
req.send(['','',''])
console.log('registred')
