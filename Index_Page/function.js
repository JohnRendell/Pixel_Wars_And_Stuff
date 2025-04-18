let pop_id = 0

function call_pop_modal(text, id){
    var body = document.body;

    if(body){
        var pop_body = document.createElement("div");
        pop_body.setAttribute("class", "absolute top-[-5rem] opacity-0 w-screen h-auto flex justify-center items-center");
        pop_body.setAttribute("id", "pop_modal_" + id);

        var pop_panel = document.createElement("div");
        pop_panel.setAttribute("class", "w-auto h-auto p-4 rounded-2xl bg-white");
        pop_body.appendChild(pop_panel)

        var pop_content = document.createElement("h1");
        pop_content.setAttribute("class", "font-Pixelify-Sans text-center text-sm text-black");
        pop_content.appendChild(document.createTextNode(text));
        pop_panel.appendChild(pop_content);

        body.appendChild(pop_body)

        var pop = document.getElementById("pop_modal_" + id);

        if(pop){
            pop.style.animation = "pop_status 1s forwards, pop_status 1s forwards reverse 1.5s";

            setTimeout(() => {
                pop.addEventListener("animationend", ()=>{
                    pop.remove();
                })
            }, 2000);
        }
    }
}

async function createAccount(){
    var username_input = document.getElementById("userInput");
    var password_input = document.getElementById("passInput");
    var confirm_passInput = document.getElementById("confirm_passInput");

    if(!username_input.value || !password_input.value || !confirm_passInput.value){
        pop_id++;
        call_pop_modal("Fields cannot be empty", pop_id)
    }

    else if(username_input.value.length <= 4){
        pop_id++;
        call_pop_modal("username characters should alteast five above", pop_id)
    }

    else if(password_input.value.length <= 6){
        pop_id++;
        call_pop_modal("password characters should alteast six above", pop_id)
    }

    else if(password_input.value !== confirm_passInput.value){
        pop_id++;
        call_pop_modal("password and confirm password not match", pop_id)
    }

    else{
        try{
            const create_acc = await fetch("/validate/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username_input.value, password: password_input.value })
            });

            const create_acc_data = await create_acc.json();

            if(create_acc_data.message === "success"){
                window.location.href = "/success";
            }
            else{
                pop_id++;
                call_pop_modal(create_acc_data.message, pop_id);
            }
        }
        catch(err){
            alert(err)
        }
    }
}

function modalStatus(id, status){
    var modal = document.getElementById(id);
    var body = document.body;

    if(modal){
        modal.style.display = status;
        body.style.overflowY = status === "flex" ? "hidden" : "auto";
    }
}

function scrollView(id){
    var elmntToView = document.getElementById(id);
    
    if(elmntToView){
        elmntToView.scrollIntoView({ behavior: "smooth" });
    }
}

async function getGameLogs(){
    try{
        var container = document.getElementById("game_logs_container");

        const getLogs = await fetch("/gameData/gameLogs", {
            method: "GET",
        });

        const getLogs_result = await getLogs.json();

        if(getLogs_result.message === "success" && container){
            getLogs_result.data.forEach(data => {
                var wrapper = document.createElement("div");
                wrapper.setAttribute("class", "w-full h-auto flex flex-col")
                container.appendChild(wrapper);

                var logs = document.createElement("h1");
                logs.setAttribute("class", "font-Pixelify-Sans text-left text-black");
                logs.appendChild(document.createTextNode(data.logs))
                wrapper.appendChild(logs)

                var date = document.createElement("h1");
                date.setAttribute("class", "font-Pixelify-Sans text-left text-black");
                date.appendChild(document.createTextNode("Date: " + data.date))
                wrapper.appendChild(date) 
            });
        }
    }
    catch(err){
        alert(err)
    }
}
getGameLogs();