/**
 * Created by charan
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

io.on('connection',function(socket){
    console.log('one user connected '+socket.id);
    socket.on('message',function(data){
        var sockets = io.sockets.sockets;
        /*sockets.forEach(function(sock){
            if(sock.id != socket.id)
            {
                sock.emit('message',data);
            }
        })*/
        console.log("message"+JSON.stringify(data));
        //console.log('msg'+Text(data));
        socket.broadcast.emit('message', data);
    })
    socket.on('disconnect',function(){
        console.log('one user disconnected '+socket.id);
    })

    //https://github.com/charan15923/DeliveryEngine.git
    // socket.onAny(function(){
    //     console.log('received message')
    // })
})

http.listen(1100,function(){
    console.log('server listening on port 1100');
})