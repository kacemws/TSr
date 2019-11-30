const zmq = require('zeromq')
let cli=[], req=[]
var count=0
let sc = zmq.socket('router') // frontend
let sw = zmq.socket('dealer') // backend

sc.bind('tcp://*:9997')
sw.connect('tcp://localhost:9998')

sc.on('message',(c,sep,m)=> {
    console.log('message received')
    if (count==0) {
        console.log('no workers')
        cli.push(c); req.push(m)
    } else {
        sw.send([c,'',m])
        console.log('forwarded')
    }   
})

sw.on('message',(c,sep,r)=> {
    console.log('message from b2 received')
    count++
    if(c ==''){
        console.log('workers available'); return 0
    }
    if (cli.length>0){
        console.log('more clients available')
        sw.send([cli.shift(),'',req.shift()])
    }
    sc.send([c,'',r])
    console.log('reply sent')
})
console.log('B1 On')