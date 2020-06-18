let openMenu = document.querySelector('.menu-toggler');
let navlist = document.querySelector('.nav-list');

openMenu.addEventListener('click', function(){
    navlist.classList.toggle('active')
})