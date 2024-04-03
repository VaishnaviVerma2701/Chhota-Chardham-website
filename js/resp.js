burger = document.querySelector('.burger')
navbar = document.querySelector('.navbar')
rightNav = document.querySelector('.rightNav')
navList = document.querySelector('.nav-list')

burger.addEventListener('click', ()=>{
navList.classList.toggle('v-class-resp')
rightNav.classList.toggle('v-class-resp')
navbar.classList.toggle('h-nav-resp')
})