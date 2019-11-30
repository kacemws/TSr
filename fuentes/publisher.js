const zmq = require('zeromq')
let pub = zmq.socket('pub')
    ///getting the args 
const args = process.argv.slice(2)
    ///Setting port
const port = args.shift()
    ///setting the number of messages to send 
const num = args.shift()

pub.bind('tcp://*:'+port)
let i = 0
let j = 1
index = 0


function emite() {
        if(index < num){
            if(i == args.length){
                i = 0
                j++
            }
            let m=args[0]
            pub.send(m+j) 
            i++
            
            args.shift(); args.push(m) // rotatorio
            console.log(m+j)
            index++
        }
            
        else{
            process.exit(0)
        }
}

var interval = setInterval(emite,1000)
