const body = document.querySelector("body");
const nav = document.querySelector("nav");
const  modeToggle = document.querySelector(".dark-light");
const searchToggle = document.querySelector(".searchToggle");
const siderbarOpen = document.querySelector(".sideberOpen");
const siderbarClose = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark-mode"){
        body.classList.add("dark")
    }

// dark-light
modeToggle.addEventListener("click",()=>{
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark")

    if(!body.classList.contains("dark")){
        localStorage.setItem("mode" , "light-mode");
    }else{
        localStorage.setItem("mode" , "dark-mode");
    }
});

//searchBox
searchToggle.addEventListener("click",()=>{
    searchToggle.classList.toggle("active")
});

siderbarOpen.addEventListener("click",()=>{
    nav.classList.add('active')
});
siderbarClose.addEventListener("click", e =>{
    let clickElm = e.target;

    if(!clickElm.classList.contains("sideberOpen") && !clickElm.classList.contains("menu") ){
        nav.classList.remove('active')
    }
});


// color switcher
document.querySelector('.switcher-btn').onclick = () =>{
    document.querySelector('.color-switcher').classList.toggle('activeColor');
}

let themeButtons = document.querySelectorAll('.theme-buttons');

themeButtons.forEach(color =>{
    color.addEventListener('click',()=>{
        let dataColor = color.getAttribute('data-color');
        document.querySelector(':root').style.setProperty('--nav-color', dataColor);
    });
});

// Start silder
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".wrapper .card").offsetWidth;
const carouseChildrens =[...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)


//Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouseChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
});

//Insert copies of the first few cards to End of carousel for infinite scrolling
carouseChildrens.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML)
});





//Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    StartX = e.pageX;
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if(!isDragging) return;  // if isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - StartX) 
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};


const autoPlay = () => {
    if(window.innerWidth < 800) return //Return if window is smaller then 800
    //Autoplay the varousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}
autoPlay();


const infiniteScroll = () =>{
    // If the carousel is at the beginning, Scroll to the end 
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft =carousel.scrollWidth - ( 2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, Scroll to the beginning 
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId)
    if(!wrapper.matches(":hover")) autoPlay()
};


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop );
carousel.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () =>  clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
// Start silder