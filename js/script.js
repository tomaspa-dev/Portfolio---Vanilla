document.addEventListener('DOMContentLoaded', function() {
    let openPopupBtn = document.querySelector('.open-popup-btn');
    let popup = document.getElementById('popup');
    let closePopupBtn = document.querySelector('.close-btn');
  
    openPopupBtn.addEventListener('click', function() {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  
    closePopupBtn.addEventListener('click', function() {
      closePopup();
    });
  
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
      document.body.style.overflow = '';
    }
  
    let list = document.querySelector('.slider-popup .list');
    let items = document.querySelectorAll('.slider-popup .list .item');
    let dots = document.querySelectorAll('.dots .dot');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
  
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
  
    let refreshSlider = setInterval(()=> {next.click()}, 1800);
  
    function reloadSlider() {
      let checkLeft = items[active].offsetLeft;
      list.style.transform = `translateX(-${checkLeft}px)`;
  
      dots.forEach(dot => dot.classList.remove('active'));
      dots[active].classList.add('active');
      clearInterval(refreshSlider);
      refreshSlider = setInterval(()=> {next.click()}, 1800);
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function(){
        active = index;
        reloadSlider();
      })
    });
  });
  