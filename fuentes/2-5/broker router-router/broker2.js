const zmq = require('zeromq')
let workers=[]
let sc = zmq.socket('dealer') // frontend
let sw = zmq.socket('router') // backend
sc.connect('tcp://localhost:8001')
sw.bind('tcp://*:8002')

sc.on('message',(c,sep,m)=> {
    console.log('received a message from b1')
    sw.send([workers.shift(),'',c,'',m])
    console.log('forwarded to workers')
})

sw.on('message',(w,sep,c,sep2,r)=> {
    workers.push(w)
    console.log('worker received')
    sc.send([w,'',c,'',r])
    console.log('forwarded reply to broker1')
})

console.log('B2 On')