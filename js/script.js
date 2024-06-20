let slide = 1;
let pauseSlider = false;
let progress = 0;

// 0 - Generar menú en móviles
const btnNavEl = document.querySelector(".nav-menu-btn");
const headerEl = document.querySelector(".header");
const bodyEl = document.querySelector("body");
const allLinks = document.querySelectorAll("a:link");

btnNavEl.addEventListener("click", function() {
    headerEl.classList.toggle("nav-open");
    bodyEl.classList.toggle("nav-open");
});

allLinks.forEach(function(link) {
    link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");
        console.log(`Enlace clicado: ${href}`);

        // Excluir enlaces que abren la galería de imágenes
        if (href && href.startsWith("#") && href !== "#popup" && href !== "#popup-icecream-shop") {
            e.preventDefault();

            // Habilitar scroll temporalmente para permitir la navegación
            bodyEl.classList.remove("nav-open");
            headerEl.classList.remove("nav-open");

            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } else {
                const sectionEl = document.querySelector(href);
                if (sectionEl) {
                    sectionEl.scrollIntoView({ behavior: "smooth" });
                } else {
                    console.error(`No se pudo encontrar el elemento para el selector: ${href}`);
                }
            }
        }
    });
});

// Código para manejar la apertura de la galería de imágenes
const openPopupBtns = document.querySelectorAll(".open-popup-btn");
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("close-btn");

openPopupBtns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        const targetPopup = document.querySelector(btn.getAttribute("href"));
        if (targetPopup) {
            targetPopup.style.display = "block";
            bodyEl.style.overflow = "hidden"; // Inmovilizar el scroll
        }
    });
});

closePopupBtn.addEventListener("click", function() {
    const openPopups = document.querySelectorAll(".lightbox[style*='display: block']");
    openPopups.forEach(function(popup) {
        popup.style.display = "none";
    });
    bodyEl.style.overflow = "auto"; // Activar el scroll
});


// 1 - Generar los cuadrados
const container = document.querySelector('.square-container');
const numCols = Math.floor(container.offsetWidth / 60); // Ancho del contenedor dividido entre el tamaño de los cuadrados
const numRows = Math.floor(container.offsetHeight / 60); // Alto del contenedor dividido entre el tamaño de los cuadrados

const offsetX = 150; 
const offsetY = 125;

for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.left = `${col * 60 + offsetX}px`; // Posicionamiento horizontal centrado del cuadrado
        square.style.top = `${row * 60 + offsetY}px`; // Posicionamiento vertical centrado del cuadrado
        container.appendChild(square); // Agregar cuadrado al contenedor
    }
}

// Función para iluminar dos cuadrados en posiciones aleatorias y luego iluminar los cuadrados debajo uno por uno
function illuminateAndMoveDown() {
    const squares = document.querySelectorAll('.square');
    const numSquares = squares.length;

    // Desactivar todas las luces
    squares.forEach(square => square.classList.remove('highlighted'));

    // Seleccionar dos posiciones aleatorias diferentes
    let randomIndex1 = Math.floor(Math.random() * numSquares);
    let randomIndex2 = Math.floor(Math.random() * numSquares);
    while (Math.abs(randomIndex1 - randomIndex2) < 2) {
        randomIndex2 = Math.floor(Math.random() * numSquares);
    }

    const square1 = squares[randomIndex1];
    const square2 = squares[randomIndex2];

    // Iluminar los dos cuadrados en sus posiciones aleatorias
    square1.classList.add('highlighted');
    square2.classList.add('highlighted');

    // Determinar si los cuadrados deben moverse hacia arriba o hacia abajo
    const moveDown1 = Math.random() < 0.5;
    const moveDown2 = Math.random() < 0.5;

    // Establecer temporizadores para desactivar la iluminación después de 0.5 segundos
    setTimeout(() => {
        square1.classList.remove('highlighted');
        // Iluminar los cuadrados debajo o arriba si existen
        illuminateNextSquare(square1, moveDown1);
    }, 500);

    setTimeout(() => {
        square2.classList.remove('highlighted');
        // Iluminar los cuadrados debajo o arriba si existen
        illuminateNextSquare(square2, moveDown2);
    }, 500);
}

// Función para iluminar el cuadrado debajo o arriba si existe
function illuminateNextSquare(square, moveDown) {
    const squareSize = 60; // Tamaño del cuadrado en píxeles
    const direction = moveDown ? 'down' : 'up';

    // Obtener la posición actual del cuadrado
    const currentPosition = square.getBoundingClientRect();
    const currentLeft = currentPosition.left;
    const currentTop = currentPosition.top;

    // Calcular la posición del cuadrado debajo o arriba
    const newTop = moveDown ? currentTop + squareSize : currentTop - squareSize;

    // Encontrar el cuadrado debajo o arriba si existe
    const newSquare = document.elementFromPoint(currentLeft + squareSize / 2, newTop + squareSize / 2);
    if (newSquare && newSquare.classList.contains('square')) {
        // Iluminar el cuadrado debajo o arriba
        newSquare.classList.add('highlighted');
        // Establecer temporizador para desactivar la iluminación después de 0.5 segundos
        setTimeout(() => {
            newSquare.classList.remove('highlighted');
            // Iluminar el siguiente cuadrado debajo o arriba si existe
            illuminateNextSquare(newSquare, moveDown);
        }, 500);
    }
}
// Iniciar el proceso de iluminación de los cuadrados
illuminateAndMoveDown(); // Iniciar el proceso una vez

// Establecer intervalo para que el proceso se repita cada X segundos
setInterval(illuminateAndMoveDown, 2500);

// 2 - Change Slide Animation
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
    }, 1500); // Ajustar el tiempo de espera según sea necesario

    // Aplicar una animación de transición a las imágenes GIF
    let gifBox = newSlide.querySelector(".featured-gif-box");
    gifBox.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        gifBox.style.opacity = "1";
    }, 1500); // Ajustar el tiempo de espera según sea necesario
}

// Agregar eventos de clic a los controles derechos
var controls = document.querySelectorAll(".controls ul li");
for (let i = 0; i < controls.length; i++){
    controls[i].addEventListener("click", () => {
        changeSlide(i+1);
    });
}


// 3 - Manejo de Galerías
let currentIndex = 0;
let totalImages;
let currentImagePaths = [];

// Función para abrir el lightbox en la imagen seleccionada
function openLightbox(index) {
    currentIndex = index;
    const lightboxImg = document.getElementById('lightbox-img');
    const thumbnailContainer = document.getElementById('thumbnail-container');

    lightboxImg.src = currentImagePaths[currentIndex];
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.style.opacity = 1;
    }, 10);

    thumbnailContainer.innerHTML = '';

    currentImagePaths.forEach((path, idx) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = path;
        thumbnail.alt = `Thumbnail ${idx + 1}`;
        thumbnail.classList.add('thumbnail');
        if (idx === currentIndex) {
            thumbnail.classList.add('active-thumbnail');
        }
        thumbnail.addEventListener('click', () => updateMainImage(idx));
        thumbnailContainer.appendChild(thumbnail);
    });

    document.getElementById('lightbox').style.display = 'flex';
    document.body.classList.add('no-scroll'); // Añade la clase no-scroll al abrir el lightbox
    document.addEventListener('wheel', preventScroll, { passive: false }); // Bloquea el scroll en escritorio
    document.addEventListener('touchmove', preventScroll, { passive: false }); // Bloquea el scroll en móviles
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove('no-scroll'); // Quita la clase no-scroll al cerrar el lightbox
    document.removeEventListener('wheel', preventScroll); // Permite el scroll en escritorio
    document.removeEventListener('touchmove', preventScroll); // Permite el scroll en móviles
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImagePaths.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImagePaths.length - 1;
    }
    updateMainImage(currentIndex);
}

function updateMainImage(index) {
    const lightboxImg = document.getElementById('lightbox-img');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Eliminar la clase activa de todas las miniaturas
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active-thumbnail'));

    currentIndex = index;
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentImagePaths[currentIndex];
        lightboxImg.style.opacity = 1;
    }, 500); // Ajustar el tiempo de espera según sea necesario

    // Añadir la clase activa a la miniatura actual
    thumbnails[currentIndex].classList.add('active-thumbnail');
}

function activateGallery(gallery, clickedImageIndex) {
    const galleryImages = gallery.querySelectorAll('img');
    currentImagePaths = Array.from(galleryImages).map(img => img.src);
    openLightbox(clickedImageIndex);
}

function activateGalleryWithButtons(imagePaths) {
    currentImagePaths = imagePaths;
    openLightbox(currentIndex);
}

function preventScroll(event) {
    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.featured-img-box');
    totalImages = galleries[0].querySelectorAll('img').length;

    galleries.forEach((gallery, index) => {
        const galleryImages = gallery.querySelectorAll('img');
        galleryImages.forEach((img, imgIndex) => {
            img.addEventListener('click', () => {
                activateGallery(gallery, imgIndex);
            });
        });
    });

    document.getElementById('close-btn').addEventListener('click', closeLightbox);
    document.getElementById('prev-btn').addEventListener('click', () => changeImage(-1));
    document.getElementById('next-btn').addEventListener('click', () => changeImage(1));

    document.addEventListener('keydown', function(e) {
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});

// 4 - Bloque de Efectos
const actionButtons = document.querySelectorAll('.toggle');
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.disabled = true; // Desactiva el botón

        const squareBox = document.getElementById("square-box");
        let squares = [];
        let gridSizeX = Math.ceil(window.innerWidth / 100); // Número de cuadrados por fila (ancho)
        let gridSizeY = Math.ceil(window.innerHeight / 100); // Número de cuadrados por columna (alto)
        let intervalId;
        let occupiedPositions = new Set();

        function getRandomPosition() {
            let position;
            do {
                const x = Math.floor(Math.random() * gridSizeX) * 100;
                const y = Math.floor(Math.random() * gridSizeY) * 100;
                position = `${x},${y}`;
            } while (occupiedPositions.has(position));
            occupiedPositions.add(position);
            return { x: parseInt(position.split(",")[0]), y: parseInt(position.split(",")[1]) };
        }

        function createSquare() {
            const { x, y } = getRandomPosition();
            const square = document.createElement("div");
            square.classList.add("square-e");
            square.style.left = x + "px";
            square.style.top = y + "px";
            squareBox.appendChild(square);
            squares.push(square);
        }

        function generateSquares() {
            const totalSquares = gridSizeX * gridSizeY;
            let squaresGenerated = 0;
            intervalId = setInterval(() => {
                createSquare();
                squaresGenerated++;
                if (squaresGenerated >= totalSquares) {
                    clearInterval(intervalId);
                    // Abre la galería justo antes de comenzar a eliminar los cuadrados
                    const imagePaths = getImagePaths(button);
                    setTimeout(() => {
                        removeSquares();
                        activateGalleryWithButtons(imagePaths);
                    }, 1000); // Espera 1 segundo antes de comenzar a eliminar los cuadrados
                }
            }, 0.01); // Intervalo más rápido
        }

        function removeSquares() {
            occupiedPositions.clear();
            const totalSquares = squares.length;
            let squaresRemoved = 0;
            intervalId = setInterval(() => {
                squares[squares.length - 1].remove();
                squares.pop();
                squaresRemoved++;
                if (squaresRemoved >= totalSquares) {
                    clearInterval(intervalId);
                    button.disabled = false; // Habilita nuevamente el botón
                }
            }, 0.01); // Intervalo más rápido
        }

        generateSquares();
    });
});

function getImagePaths(button) {
    let imagePaths = [];
    if (button.classList.contains('btn-1')) {
        imagePaths = ["/img/video1.webp", "/img/video2.webp", "/img/video3.webp", "/img/video6.webp", "/img/video5.webp"];
    } else if (button.classList.contains('btn-2')) {
        imagePaths = ["/img/CaseStudy1.webp", "/img/Colors.webp", "/img/TypeScale.webp"];
    }
    
    return imagePaths;
}

// 5 - Efectos, Animaciones en texto
document.querySelector(".btn-effect").addEventListener("mouseover", () => {
    if (document.querySelector(".btn-effect").classList.contains('confetti-triggered')) {
        return;
    }

    document.querySelector(".btn-effect").classList.add('confetti-triggered');

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9b51e0', '#595582', '#af74e6', '#c397ec', '#d7b9f3']
    });

    setTimeout(() => {
        document.querySelector(".btn-effect").classList.remove('confetti-triggered');
    }, 2000); // Ajuste la frecuencia con la que se puede activar el confeti.
});

document.querySelector(".btn-downl").addEventListener("mouseover", () => {
    if (document.querySelector(".btn-downl").classList.contains('confetti-triggered')) {
        return;
    }

    document.querySelector(".btn-downl").classList.add('confetti-triggered');

    let defaults = {
        spread: 360,
        ticks: 30,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#9b51e0', '#595582', '#af74e6', '#c397ec', '#d7b9f3']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 20,
            scalar: 1.5,
            shapes: ['star']
        });
        
    
        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);

    setTimeout(() => {
        document.querySelector(".btn-downl").classList.remove('confetti-triggered');
    }, 2000); // Ajuste la frecuencia con la que se puede activar el confeti.
});





// document.addEventListener('DOMContentLoaded', function () {
//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('visible');
//                 observer.unobserve(entry.target); // Deja de observar el elemento una vez que es visible
//             } else {
//                 entry.target.classList.remove('visible');
//             }
//         });
//     }, { threshold: 0.1 });

//     // Selecciona todos los elementos que quieres observar
//     const bentoBoxes = document.querySelectorAll('.hidden');
//     bentoBoxes.forEach(box => {
//         observer.observe(box);
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hidden')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('hidden-stack')) {
                    entry.target.classList.add('visible-stack');
                }
                observer.unobserve(entry.target); // Deja de observar el elemento una vez que es visible
            } else {
                if (entry.target.classList.contains('hidden')) {
                    entry.target.classList.remove('visible');
                }
                if (entry.target.classList.contains('hidden-stack')) {
                    entry.target.classList.remove('visible-stack');
                }
            }
        });
    }, { threshold: 0.1 });

    // Selecciona todos los elementos que quieres observar
    const elementsToObserve = document.querySelectorAll('.hidden, .hidden-stack');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});