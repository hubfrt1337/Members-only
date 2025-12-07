const btn = document.querySelector(".plus")
const msgForm = document.querySelector(".add-message-container")
const addMsg = document.querySelector(".add-msg")




btn.addEventListener("click", (e) => {
    msgForm.style.display = 'block';
})

window.addEventListener("click", (e) => {
    if(e.target !== msgForm && e.target !== btn){
        msgForm.style.display = 'none';
    }
})
console.log(msgForm)
addMsg.addEventListener("click", (e) => {
    e.stopPropagation()
})