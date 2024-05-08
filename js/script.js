// Registro de plugins GSAP
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

let slide = 1;
let pauseSlider = false;
let progress = 0;


// Generar los cuadrados
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

// Establecer intervalo para que el proceso se repita cada 4 segundos
setInterval(illuminateAndMoveDown, 2500);





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

// startProgressBar();

// Manejo de Galerías
// Manejo de Galerías
let currentIndex = 0;
let totalImages;
let currentImagePaths = [];

function openLightbox(imagePaths) {
    const lightboxImg = document.getElementById('lightbox-img');
    const thumbnailContainer = document.getElementById('thumbnail-container');

    lightboxImg.src = imagePaths[currentIndex];

    thumbnailContainer.innerHTML = '';

    imagePaths.forEach((path, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = path;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.classList.add('thumbnail');
        if (index === currentIndex) {
            thumbnail.classList.add('active-thumbnail');
        }
        thumbnail.addEventListener('click', () => updateMainImage(index, imagePaths));
        thumbnailContainer.appendChild(thumbnail);
    });

    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImagePaths.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImagePaths.length - 1;
    }
    openLightbox(currentImagePaths);
}

function updateMainImage(index, imagePaths) {
    currentIndex = index;
    openLightbox(imagePaths);
}

// Función para activar la galería con las imágenes en el HTML
function activateGallery(gallery) {
    const galleries = document.querySelectorAll('.featured-img-box');
    galleries.forEach(g => g.classList.remove('active-gallery'));
    gallery.classList.add('active-gallery');

    const galleryImages = gallery.querySelectorAll('img');
    currentImagePaths = Array.from(galleryImages).map(img => img.src);
    openLightbox(currentImagePaths);
}

// Función para activar la galería con los botones en JavaScript
function activateGalleryWithButtons(imagePaths) {
    currentImagePaths = imagePaths;
    openLightbox(imagePaths);
}

document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.featured-img-box');
    totalImages = galleries[0].querySelectorAll('img').length;

    galleries.forEach(gallery => {
        gallery.addEventListener('click', () => activateGallery(gallery));
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
        }

        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});

// Bloque de Efectos
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
        imagePaths = ["/img/VideoGame-001.webp", "/img/VideoGame-002.webp", "/img/VideoGame-003.webp"];
    } else if (button.classList.contains('btn-2')) {
        imagePaths = ["/img/port-1.webp", "/img/port-2.webp", "/img/port-3.webp"];
    }
    return imagePaths;
}
