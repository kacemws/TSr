const zmq = require('zeromq')
let cli=[], req=[]
var count=0
let sc = zmq.socket('router') // frontend
let sw = zmq.socket('dealer') // backend

sc.bind('tcp://*:8000')
sw.bind('tcp://*:8001')

sc.on('message',(c,sep,m)=> {
    console.log('message received')
    if (count==0) {
        console.log('no workers')
        cli.push(c); req.push(m)
    } else {
        sw.send([c,'',m])
        count--
        console.log('forwarded')
    }   
})

sw.on('message',(w,sep1,c,sep,r)=> {
    console.log('message from b2 received')
    count++
    if(c ==''){
        console.log('a worker is available'); return
    }
    if (cli.length>0){
        console.log('more clients available')
        sw.send([cli.shift(),'',req.shift()])
    }
    sc.send([c,'',r])
    console.log('reply sent')
})

console.log('B1 On')