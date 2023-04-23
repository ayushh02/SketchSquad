//chat
(function(){
    const app = document.querySelector(".page");
    const socket = io();
    const adduser = app.getElementsByClassName("join");
    const sendmsg = app.querySelector(".chat-screen #sendmessage");

    let uname;
    adduser.addEventListener("click",function(){
            let username = document.getElementById("username").value;
        if(username.length == 0){
            return;
        }

        socket.emit("newuser", username);
        uname = username;
        console.log(username);

        app.querySelector(".game").classList.remove("active");
        app.querySelector(".login").classList.add("active");
        //document.getElementsByClassName("game").classList.remove("active");
        //document.getElementsByClassName("login").classList.add("active");
    });

    sendmsg.addEventListener("click",function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        message = message;
        console.log(message);
        if(message.length == 0){
            return;
        }
        renderMessage("my",{
            username:uname,
            text:message

        });
            socket.emit("chat",{
                username:uname,
                text:message,
            });     
        app.querySelector(".chat-screen #message-input").value=""
    })


    socket.on("udpate",function(update){
        console.log(message);
        renderMessage("update",update);
    })
    socket.on("chat",function(message){
        console.log(message);
        renderMessage("other",message);
    })
    


    function renderMessage(type,message){
        let messageContainer = app.querySelector(".chat-screen .messages");
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message")
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        }else if(type == "other"){
            let el = document.createElement("div");
            el.setAttribute("class", "message other-messages")
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        }else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class", "update")
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        //scroll chat to end
        messageContainer.scrollTop = messageContainer.scrollHeight-messageContainer.clientHeight;
    }
})();