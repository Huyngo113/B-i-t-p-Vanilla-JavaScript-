let header = document.querySelector('.header');
let hamburger = document.querySelector('.hamburger-menu');


window.addEventListener('scroll', function(){
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('active', windowPosition)
})


hamburger.addEventListener('click', function(){
    header.classList.toggle('menu-open');
})