const zmq = require('zeromq')
let req = zmq.socket('req');
    ///getting the args 
const args = process.argv.slice(2)

if(args.length < 3){
	console.log("there are some arguments missing!!")
	setTimeout(function(){return process.exit(0)},500)
}

else{
		///Setting the urlFront end
req.connect(args.shift())
req.identity = args.shift()

req.on('message', (msg)=> {
	console.log('resp: '+msg)
	process.exit(0);
})
	///[C,"",m]
req.send([args.shift()])

}