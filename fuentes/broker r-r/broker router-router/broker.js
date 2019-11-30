const zmq = require('zeromq')
let cli=[], req=[], workers=[]
let sc = zmq.socket('router') // frontend
let sw = zmq.socket('router') // backend
let count = 0

    ///getting the args 
const args = process.argv.slice(2)

if(args.length < 2){
	console.log("there are some arguments missing!!")
	setTimeout(function(){return process.exit(0)},500)
}
else{
	//setting the frontend port
	sc.bind('tcp://*:'+args.shift())

	//setting the backend port
	sw.bind('tcp://*:'+args.shift())
	sc.on('message',(c,sep,m)=> {
	if (workers.length==0) { 
		cli.push(c); req.push(m)
	} else {
		sw.send([workers.shift(),'',c,'',m])
	}
	})
	sw.on('message',(w,sep,c,sep2,r)=> {
	if (c=='') {workers.push(w); return}
	count++;
	if (cli.length>0) { 
		sw.send([w,'',
			cli.shift(),'',req.shift()])
	} else {
		workers.push(w)
	}
	sc.send([c,'',r+" "+count])
	})
}
