// JavaScript para abrir y cerrar el popup
document.addEventListener('DOMContentLoaded', function() {
    let openPopupBtn = document.querySelector('.open-popup-btn');
    let popup = document.getElementById('popup');
    let closePopupBtn = document.querySelector('.close-btn');
  
    openPopupBtn.addEventListener('click', function() {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Evita el scroll en el body cuando está abierto el popup
    });
  
    closePopupBtn.addEventListener('click', function() {
      closePopup();
    });
  
    // Cerrar el popup al hacer clic fuera del contenido
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        closePopup();
      }
    });
  
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closePopup();
      }
    });
  
    function closePopup() {
      popup.style.display = 'none';
      document.body.style.overflow = ''; // Habilita el scroll en el body cuando se cierra el popup
    }
  });

  let list = document.querySelector('.slider .list');
  let items = document.querySelectorAll('.slider .list .item');
  let dots = document.querySelectorAll('.slider .dots li');
  let prev = document. getElementById('prev');
  let next = document. getElementById('next');
  
  let active = 0;
  let lengthItems = items.length - 1;

  next.onclick = function() {
    if (active + 1 > lengthItems) {
        active = 0;
    } else {
        active = active + 1;
    }
    reloadSlider();
  }

  prev.onclick = function() {
    if (active - 1 < 0) {
        active = lengthItems;
    } else {
        active = active - 1;
    }
    reloadSlider();
  }


  let refreshSlider = setInterval(()=> {next.click()}, 5000);

  function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector(' .slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider)
    refreshSlider = setInterval(()=> {next.click()}, 5000);
  }

  dots.forEach((li, key) => {
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})
  