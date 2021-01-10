const express = require('express');
const bodyParser=require("body-parser");
const http=require("http");
const formatMessage=require("./utils/messages");
const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require("./utils/users");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const socketio=require("socket.io");
const server = http.createServer(app);

const io=socketio(server);
app.use(express.static("public"));
const botName="Bot";


let roomsCollection=[];



io.on("connection",socket=>{
  socket.on("joinRoom",({username,room})=>{
    console.log(username);
    const user=userJoin(socket.id,username,room);
    console.log(user);
    socket.join(user.room);

    socket.emit("message",formatMessage(botName,"Welcome to chatter"));

    socket.broadcast.to(user.room).emit("message",formatMessage(botName, `A ${user.username} has joined the chat!`));//broadcas to all except client

    io.to(user.room).emit("roomUsers",{
      room:user.room,
      users: getRoomUsers(user.room)
    });
  });




socket.on("chatMessage",(msg)=>{
  const user=getCurrentUser(socket.id);

  io.to(user.room).emit("message",formatMessage(user.username,msg));
});

socket.on("disconnect",()=>{
  const user=userLeave(socket.id);
  if(user){
    io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
    io.to(user.room).emit("roomUsers",{
      room:user.room,
      users: getRoomUsers(user.room)
    });
  }
});

})





app.get("/",function(req,res){
  res.render("index",{pass:1});
})





// app.get("/chat",function(req,res){
//
//
// })


app.post("/enter",function(req,res){
  const name=req.body.name;
  const rName=req.body.room_name;
  const rPK=req.body.room_no;
  for(i=0;i<roomsCollection.length;i++){
    if(roomsCollection[i].rname==rName){
      if(roomsCollection[i].passkey==rPK){
        res.render("chat",{rn:rName,name:name});

      }
    }
  }
  res.render("index",{pass:0});
})


app.post("/rooms",function(req,res){
  const name=req.body.name;
  const rName=req.body.room_name;
  const rPK=req.body.room_no;

  var temp={
      name:name,
      rname:rName,
      passkey:rPK
    }
  roomsCollection.push(temp);
  // console.log(temp);
  res.render("chat",{rn:rName,name:name});
  // res.redirect("/chat");

})





















server.listen(process.env.PORT || 3000,function(){
  console.log("Running on 3000")
});
