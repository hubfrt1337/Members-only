

const btn = document.querySelector(".plus")
const msgForm = document.querySelector(".add-message-container")
const addMsg = document.querySelector(".add-msg")
const nameEl = document.querySelector(".user-name")



btn.addEventListener("click", (e) => {
    msgForm.style.display = 'block';
})
nameEl.addEventListener("click", () => {
    msgForm.style.display = 'block';
})
window.addEventListener("click", (e) => {
    
    if(e.target !== msgForm && e.target !== btn && nameEl !== e.target){
        msgForm.style.display = 'none';
    }
})

addMsg.addEventListener("click", (e) => {
    e.stopPropagation()
})




const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: "fraction",

  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
