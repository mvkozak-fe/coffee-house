const mobileMenuIcon = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navMenuList = document.querySelector('.nav-menu ul')
const mobileLinks = document.querySelectorAll('.nav-menu ul li a');
const menuIconBlock = document.querySelector('#menuIconBlock');
const headerBlock = document.querySelector('header');


if (navMenu.classList.contains('nav-menu-active')) {
    document.body.style.overflow = "hidden";
} else {
    document.body.style.overflow = "";
}
mobileMenuIcon.addEventListener('click', function() {    
    navMenu.classList.toggle('nav-menu-active');
    mobileMenuIcon.classList.toggle('mobile-menu-active');    
    if (navMenu.classList.contains('nav-menu-active')) {
        document.body.style.overflow = "hidden";
        menuIconBlock.classList.add('menu-active')
        navMenuList.append(menuIconBlock);
    
    } else {
        document.body.style.overflow = "";
        menuIconBlock.remove();
        headerBlock.append(menuIconBlock);
        menuIconBlock.classList.remove('menu-active');               
    }
});

navMenu.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-menu ul li a')) {        
        navMenu.classList.remove('nav-menu-active');
        mobileMenuIcon.classList.remove('mobile-menu-active')
    }    
    navMenu.classList.remove('nav-menu-active');
    mobileMenuIcon.classList.remove('mobile-menu-active');
    if (navMenu.classList.contains('nav-menu-active')) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
})

window.addEventListener('resize', function() {
    let width= document.body.clientWidth;    
    if (width < 768) {
        document.body.style.overflow = "";
        navMenu.classList.remove('nav-menu-active');
        mobileMenuIcon.classList.remove('mobile-menu-active');
        menuIconBlock.remove();
        headerBlock.append(menuIconBlock);
        menuIconBlock.classList.remove('menu-active'); 
    }
}, true);



// SLIDER
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext =document.querySelector('.slider-next');
const sliderItems = document.querySelectorAll('.slider-item');
const sliderItemActive = document.querySelector('.slider-item-active');
const controls = document.querySelectorAll('.control-item');

let index = 0;
console.log(sliderItems);
let time = 6000;
let timeId;
function nextSlide() {
    if (index == sliderItems.length - 1) {
        sliderItems[sliderItems.length - 1].classList.remove('slider-item-active');
        sliderItems[sliderItems.length - 1].classList.add('slider-item-disabled');    
        sliderItems[0].classList.remove('slider-item-disabled');
        sliderItems[0].classList.add('slider-item-active');
        controls[sliderItems.length - 1].classList.remove('control-active');
        controls[0].classList.add('control-active');
        index = 0;
    } else {
        sliderItems[index].classList.remove('slider-item-active');
        sliderItems[index].classList.add('slider-item-disabled');    
        sliderItems[index + 1].classList.remove('slider-item-disabled');
        sliderItems[index + 1].classList.add('slider-item-active');
        controls[index].classList.remove('control-active');
        controls[index + 1].classList.add('control-active');
        index +=1;  
    }
    
}
function prevSlide() {
    if (index == 0) {
        sliderItems[0].classList.remove('slider-item-active');
        sliderItems[0].classList.add('slider-item-disabled');    
        sliderItems[sliderItems.length - 1].classList.remove('slider-item-disabled');
        sliderItems[sliderItems.length - 1].classList.add('slider-item-active');
        controls[0].classList.remove('control-active');
        controls[sliderItems.length - 1].classList.add('control-active');
        index = sliderItems.length - 1;
    } else {
        sliderItems[index].classList.remove('slider-item-active');
        sliderItems[index].classList.add('slider-item-disabled');    
        sliderItems[index - 1].classList.remove('slider-item-disabled');
        sliderItems[index - 1].classList.add('slider-item-active');
        controls[index].classList.remove('control-active');
        controls[index - 1].classList.add('control-active');
        index -=1;  
    }
}
function nextSlideInterval() {
    timeId = setInterval(function() {
        nextSlide();             
    }, time)

} 
nextSlideInterval();

sliderPrev.addEventListener('click', function() {    
    prevSlide();
    clearInterval(timeId);
    nextSlideInterval();
})


sliderNext.addEventListener('click', function() {
    nextSlide();   
    clearInterval(timeId);
    nextSlideInterval();

})
