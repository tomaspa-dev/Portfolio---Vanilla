// Registro de plugins GSAP
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

let slide = 1;
let pauseSlider = false;
let progress = 0;

// Change Slide Animation

// Cambiar Slide con retraso y animación
function changeSlide(id) {
    let slides = document.querySelectorAll(".featured-slide");
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    let newSlide = document.querySelector(".featured-slide.featured-slide" + id);
    newSlide.classList.add("active");

    slide = id;

    // Resetear controles a inactivos
    let controls = document.querySelectorAll(".controls ul li");
    controls.forEach((f) => {
        f.classList.remove("active");
    });

    // Establecer nuevo activo
    controls[id - 1].classList.add("active");

    // Agregar retraso al cambio entre slides
    pauseSlider = true;
    setTimeout(() => {
        pauseSlider = false;
    }, 1500); // Cambia este valor para ajustar el retraso (en milisegundos)

    // Aplicar una transición suave al contenido de la slide
    newSlide.querySelector(".featured-text").style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        newSlide.querySelector(".featured-text").style.opacity = "1";
    }, 1500); // Puedes ajustar el tiempo de espera según sea necesario

    // Aplicar una animación de transición a las imágenes GIF
    let gifBox = newSlide.querySelector(".featured-gif-box");
    gifBox.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        gifBox.style.opacity = "1";
    }, 1500); // Puedes ajustar el tiempo de espera según sea necesario
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

//startProgressBar();







// // Block Reveal
// const menu = document.querySelector(".featured-slide");
// const squareContainer = document.getElementById("square-container");
// const squareSize = 100;
// const screenWidth = window.innerWidth;
// const screenHeight = window.innerHeight;
// const numCols = Math.ceil(screenWidth / squareSize);
// const numRows = Math.ceil(screenHeight / squareSize);
// const numSquares = numCols * numRows;
// squareContainer.style.width = `${numCols * squareSize}px`;
// squareContainer.style.height = `${numRows * squareSize}px`;

// let squares = [];
// function createSquares() {
//     for (let i = 0; i < numSquares; i++) {
//         const square = document.createElement("div");
//         square.classList.add("square");
//         squareContainer.appendChild(square);
//         squares.push(square);
//     }
// }

// function animateSquares() {
//     gsap.fromTo(squares, {
//         opacity: 0
//     },{
//         opacity: 1, delay: 0.5, duration: 0.005, stager: {
//             each: 0.004, from: "random",
//         },
//     });
//     gsap.to(squares, {
//         opacity: 0, delay: 1.5, duration: 0.0005,stager: {
//             each: 0.004, from: "random",
//         },
//     });
// }

// createSquares();
// animateSquares();

// document.querySelector(".controls").addEventListener("click", ()=> {
//     squareContainer.innerHTML = "";
//     squares = [];
//     createSquares();
//     animateSquares();

//     gsap.to(menu, 0.025, {
//         opacity: overlayVisible ? 0 : 1,
//         visible: overlayVisible ? "hidden" : "visible",
//         delay: 1.15, 
//     });

//     gsap.to(menu, {
//         zIndex: overlayVisible ? -1 : 0, 
//         delay: overlayVisible ? 0 : 2,
//     });
//     overlayVisible = !overlayVisible;
// });





// // Definición de animaciones para cada diapositiva
// var tl1 = gsap.timeline({ paused: true });
// tl1.from(".featured-slide1 .featured-text", { opacity: 0, y: 50, duration: 1.0, ease: "expo.out" })
//    .from(".featured-slide1 .featured-img", { opacity: 0, scale: 0.5, duration: 1.0, ease: "power1.out" });

// var tl2 = gsap.timeline({ paused: true });
// tl2.from(".featured-slide2 .featured-text", { opacity: 0, y: 50, duration: 1.0, ease: "expo.out" })
//    .from(".featured-slide2 .featured-img", { opacity: 0, scale: 0.5, duration: 1.0, ease: "power1.out" });

// // Función para cambiar entre diapositivas
// function changeSlide(id) {
//     // Eliminar la clase 'active' de todas las diapositivas
//     let slides = document.querySelectorAll(".featured-slide");
//     slides.forEach(slide => {
//         slide.classList.remove("active");
//     });

//     // Añadir la clase 'active' a la diapositiva correspondiente
//     let newSlide = document.querySelector(".featured-slide.featured-slide" + id);
//     newSlide.classList.add("active");

//     // Iniciar la animación de la nueva diapositiva
//     if (id === 1) {
//         tl1.restart();
//     } else if (id === 2) {
//         tl2.restart();
//     }

//     // Actualizar el número de diapositiva actual
//     slide = id;

//     // Reiniciar los controles a inactivos
//     let controls = document.querySelectorAll(".controls ul li");
//     controls.forEach((f) => {
//         f.classList.remove("active");
//     });

//     // Establecer el nuevo control como activo
//     controls[id - 1].classList.add("active");

//     // Animar la transición (opcional)
//     gsap.to(".featured-slide", {
//         opacity: 0,
//         duration: 1.0,
//         ease: "power2.inOut"
//     });
//     gsap.to(".featured-slide.featured-slide" + id, {
//         opacity: 1,
//         duration: 1.0,
//         ease: "power2.inOut"
//     });
// }

// // Agregar eventos de clic a los controles
// var controls = document.querySelectorAll(".controls ul li");
// for (let i = 0; i < controls.length; i++) {
//     controls[i].addEventListener("click", () => {
//         changeSlide(i + 1);
//     });
// }
