const zmq = require('zeromq')
let workers=[]
let sc = zmq.socket('router') // frontend
let sw = zmq.socket('router') // backend
sc.bind('tcp://*:9998')
sw.bind('tcp://*:9999')

sc.on('message',(c,sep,m)=> {
    sw.send([workers.shift(),'',c,'',m])
    console.log('forwarded to workers')
})

sw.on('message',(w,sep,c,sep2,r)=> {
    workers.push(w)
    console.log('worker received')
    sc.send([c,'',r])
    console.log('forwarded reply to broker1')
})

console.log('B2 On')