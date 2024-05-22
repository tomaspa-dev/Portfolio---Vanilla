class Sphere {
    constructor(element, container) {
      this.element = element;
      this.container = container;
      this.speed = 5 + Math.random() * 20;
      this.vx = (Math.random() * this.speed) - (Math.random() * this.speed);
      this.vy = (Math.random() * this.speed) - (Math.random() * this.speed);
      this.radius = 50;
      this.w = this.container.clientWidth;
      this.h = this.container.clientHeight;
      this.x = (this.w - this.radius) * Math.random();
      this.y = (this.h - this.radius) * Math.random();
  
      window.addEventListener("resize", this.resize.bind(this));
      this.render();
    }
  
    render() {
      this.element.style.width = this.radius + "px";
      this.element.style.height = this.radius + "px";
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      this.container.appendChild(this.element);
    }
  
    resize() {
      this.w = this.container.clientWidth;
      this.h = this.container.clientHeight;
    }
  
    move() {
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
  
      if (this.x < 0 || this.x > this.w - this.radius) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > this.h - this.radius) {
        this.vy = -this.vy;
      }
  
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      this.element.style.transform = "translateZ(" + this.y + "px)";
    }
  
    applyForce(forceX, forceY) {
      this.vx += forceX;
      this.vy += forceY;
    }
  
    collide(other) {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.radius;
  
      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const targetX = this.x + Math.cos(angle) * minDist;
        const targetY = this.y + Math.sin(angle) * minDist;
        const ax = (targetX - other.x) * 0.05;
        const ay = (targetY - other.y) * 0.05;
  
        this.vx -= ax;
        this.vy -= ay;
        other.vx += ax;
        other.vy += ay;
      }
    }
  
    fadeOut() {
      let opacity = 1;
      const fadeInterval = setInterval(() => {
        opacity -= 0.01;
        this.element.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          this.element.remove();
        }
      }, 20);
    }
  }
  
  const data = [
    { logo: "JavaScript", className: "js-sphere" },
    { logo: "HTML", className: "html-sphere" },
    { logo: "CSS", className: "css-sphere" }
  ];
  
  const max = 12;
  let particles = [];
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  const container = document.getElementById('sphere-container');
  
  for (let i = 0; i < max; i++) {
    const { logo, className } = data[randomInt(0, data.length - 1)];
    const element = document.createElement("div");
    element.className = "sphere " + className;
    particles.push(new Sphere(element, container));
  }
  
  function checkCollisions() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        particles[i].collide(particles[j]);
      }
    }
  }
  
  function update() {
    checkCollisions();
    particles.forEach(p => p.move());
    requestAnimationFrame(update);
  }
  
  setTimeout(() => {
    let count = 0;
    const fadeInterval = setInterval(() => {
      if (count < particles.length) {
        particles[count].fadeOut();
        if (count + 1 < particles.length) particles[count + 1].fadeOut();
        count += 2;
      } else {
        clearInterval(fadeInterval);
      }
    }, 500);
  }, 12000);
  
  update();
  