// Registro de plugins GSAP
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

var slide = 1;
var pauseSlider = false;
var progress = 0;

// Definición de animaciones para cada diapositiva
var tl1 = gsap.timeline({ paused: true });
tl1.from(".featured-slide1 .featured-text", { opacity: 0, y: 50, duration: 1.0, ease: "expo.out" })
   .from(".featured-slide1 .featured-img", { opacity: 0, scale: 0.5, duration: 1.0, ease: "power1.out" });

var tl2 = gsap.timeline({ paused: true });
tl2.from(".featured-slide2 .featured-text", { opacity: 0, y: 50, duration: 1.0, ease: "expo.out" })
   .from(".featured-slide2 .featured-img", { opacity: 0, scale: 0.5, duration: 1.0, ease: "power1.out" });

// Función para cambiar entre diapositivas
function changeSlide(id) {
    // Eliminar la clase 'active' de todas las diapositivas
    let slides = document.querySelectorAll(".featured-slide");
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // Añadir la clase 'active' a la diapositiva correspondiente
    let newSlide = document.querySelector(".featured-slide.featured-slide" + id);
    newSlide.classList.add("active");

    // Iniciar la animación de la nueva diapositiva
    if (id === 1) {
        tl1.restart();
    } else if (id === 2) {
        tl2.restart();
    }

    // Actualizar el número de diapositiva actual
    slide = id;

    // Reiniciar los controles a inactivos
    let controls = document.querySelectorAll(".controls ul li");
    controls.forEach((f) => {
        f.classList.remove("active");
    });

    // Establecer el nuevo control como activo
    controls[id - 1].classList.add("active");

    // Animar la transición (opcional)
    gsap.to(".featured-slide", {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut"
    });
    gsap.to(".featured-slide.featured-slide" + id, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.inOut"
    });
}

// Agregar eventos de clic a los controles
var controls = document.querySelectorAll(".controls ul li");
for (let i = 0; i < controls.length; i++) {
    controls[i].addEventListener("click", () => {
        changeSlide(i + 1);
    });
}
