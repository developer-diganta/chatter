const chatform=document.getElementById("chat-form");
const name=document.getElementById("nm");
const chatMgs=document.querySelector('.chat-back');
const roomName=document.getElementById('room-name');
const userList=document.getElementById('users');
// console.log(username,room);
const socket = io();

var username=nm.innerHTML;
var room=roomName.innerHTML;
// console.log(user);
socket.emit("joinRoom",{username,room});


socket.on('roomUsers',({room,users})=>{
  // outputRoomName(room);
  outputUsers(users);
});



socket.on("message",message=>{

  // console.log(message);
  console.log(username);
  console.log(room);

  outPutMsg(message);
  chatMgs.scrollTop=chatMgs.scrollHeight;

})



function outputUsers(users){
  list="";
  for(i=0;i<users.length;i++){
    list+="<li>"+users[i].username+"</li>";
  }
  userList.innerHTML=list;
}




















function outPutMsg(message){
  // console.log(message);
  const div=document.createElement("div");
  div.classList.add("message");
  if(message.username==username)
    div.innerHTML=`<div class="messages"><p class="meta">${message.username}(You) <span>${message.time}</span></p><p class="text">${message.text}</p></div>`
  else
  div.innerHTML=`<div class="messages"><p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p></div>`

  document.querySelector(".chat-messages").appendChild(div);//chat-messages

}




chatform.addEventListener("submit",function(e){
  e.preventDefault();

  const msg=e.target.elements.msg.value;
  socket.emit('chatMessage',msg);
  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
});




// socket.on('roomUsers',({room,users})=>{
//   outputRoomName(room);
//   outputUsers(users);
// });
//
// socket.on("message", function(message){
//   console.log(message);
//   outputMsg(message);
//
//   chatMgs.scrollTop = chatMgs.scrollHeight;
//
// });
//
// chatform.addEventListener("submit",function(e){
//   e.preventDefault();
//
//   const msg=e.target.elements.msg.value;
//   //emit to server
//   socket.emit("chatMsg",msg);
//
//   e.target.elements.msg.value='';
//   e.traget.elements.msg.focus;
// });
//
//
//
//
// function outputMsg(message){
//
//   const div=document.createElement('div');
//   div.classList.add("message");
//   div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
//   document.querySelector('.chat-messages').appendChild(div);
// }
//
// function outputRoomName(room){
//
//
// roomName.innerText=room;
// }
//
// function outputUsers(users){
//   console.log(users);
//   list="";
//    // userList.innerHTML=`${users.map(users=>'<li>${users.username}</li>').join()}`;
//    for(i=0;i<users.length;i++){
//      list+="<li>"+users[i].username+"</li>";
//    }
//    userList.innerHTML=list;
// }
