gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

var slide = 1;
var pauseSlider = false;
var progress = 0;

/* Slide animations */
var tl1 = gsap.timeline({paused: false});
var ease = CustomEase.create("custom", "M0,0 C0.246,0.041 0.22,0.315 0.359,0.606 0.427,0.748 0.571,0.989 1,1 ")

tl1.from(".featured-slide .featured-img-gif", {y:"110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .7);

tl1.from(".featured-slide .featured-img-box", {y:"110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .9);

tl1.fromTo(".featured-slide .featured-title .featured-secondary .featured-description", {y: '40%', opacity: 0, duration:1 , ease: 'power3.out'}, {y: '0%', opacity: 1},.9);


function changeSlide(id) {
    let slides = document.querySelectorAll(".featured-slide"); // Corregir el selector CSS
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    let newSlide = document.querySelector(".featured-slide.featured-slide" + id); // Corregir el selector CSS
    newSlide.classList.add("active");

    slide = id;

    // Resetear controles a inactivos
    let controls = document.querySelectorAll(".controls ul li");
    controls.forEach((f) => {
        f.classList.remove("active");
    });

    // Establecer nuevo activo
    controls[id - 1].classList.add("active");

    // Animate the transition
    gsap.to(".featured-slide", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
    });
    gsap.to(".featured-slide" + id, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut"
    });
}

// Agregar eventos de clic a los controles derechos
var controls = document.querySelectorAll(".controls ul li");
for (let i = 0; i < controls.length; i++){
    controls[i].addEventListener("click", () => {
        changeSlide(i+1);
    });
}

function startProgressBar() {
    setInterval(() => {
        if(pauseSlider) return;
        progress += .1;

        if(progress >= 8) {
            changeSlide((slide % 4) + 1);
            progress = 0;        
        }
        

        gsap.to(".slideProgress", 
        {scaleX: progress / 8, duration: .3});
    },100);
}

// startProgressBar();