const zmq = require('zeromq')
let req = zmq.socket('req')

const args = process.argv.slice(2)

if(args.length < 3){
	console.log("there are some arguments missing!!")
	setTimeout(function(){return process.exit(0)},500)
}
else{
	req.connect(args.shift()) ///Setting the "URLBackEnd"

	req.identity=args.shift() ///Setting the "Worker id"
	
	var reply = args.shift()

	req.on('message', (c,sep,msg)=> {
		setTimeout(()=> {
			req.send([c,'',reply]) ///Setting the reply to send 
		}, 1000)
	})
	req.send(['','',''])
}



