/* =========================================================
   ====== GALERÍA PRINCIPAL ======
========================================================= */

const PHOTOS = [
  "img/p1.jpeg",
  "img/p2.jpeg",
  "img/p3.jpeg",
  "img/p4.jpeg",
  "img/p5.jpeg",
  "img/p6.jpeg",
  "img/p7.jpeg",
  "img/p8.jpeg",
  "img/p9.jpeg",
  "img/p10.jpeg",
  "img/p11.jpeg",
  "img/p12.jpeg",
  "img/p13.jpeg",
  "img/p14.jpeg",
  "img/p15.jpeg",
  "img/p16.jpeg"
];

/* =========================================================
   ====== PEQUEÑOS DETALLES ======
========================================================= */

const DETAIL_PHOTOS = [
  "img/d1.jpeg",
  "img/d2.jpeg",
  "img/d3.jpeg",
  "img/d4.jpeg",
  "img/d5.jpeg",
  "img/d6.jpeg",
  "img/d7.jpeg",
  "img/d8.jpeg",
  "img/d9.jpeg",
  "img/d10.jpeg",
  "img/d11.jpeg",
  "img/d12.jpeg"
];

let currentPhotoIndex = 0;
function nextPic() {
  const photo = PHOTOS[currentPhotoIndex % PHOTOS.length];
  currentPhotoIndex++;
  return photo;
}

let currentDetailIndex = 0;
function nextDetailPic() {
  const photo = DETAIL_PHOTOS[currentDetailIndex % DETAIL_PHOTOS.length];
  currentDetailIndex++;
  return photo;
}

/* =========================================================
   ====== TEXTOS ======
========================================================= */

const captionsA = [
  "Recuerdo esa foto y lo guapos que saliamos(tu sobretodo).",
  "Contigo todo es más bonito, hasta lo más simple.",
  "Mi lugar favorito en el mundo: justo a tu lado(cuando no me muerdes).",
  "Haces mis dias los mejores de mi vida.",
  "Tu mirada me hace querer verte por siempre.",
  "Y nos reímos sin parar, ¿te acuerdas?",
  "Para siempre tú, Llura bonita.",
  "Mi persona, mi calma, mi todo.",
];

/* =========================================================
   ====== VÍDEOS (DESDE IMG/) ======
========================================================= */

const VIDEOS = [
  {
    title: "Aquel día que bailamos",
    caption: "Te pones muy tensa eh.",
    src: "img/v1.mp4",
    poster: "img/v1.jpg"
  },
  {
    title: "Cuando reíste así",
    caption: "ñoñoññoñoño.",
    src: "img/v2.mp4",
    poster: "img/v2.jpg"
  },
  {
    title: "Nuestra escapada",
    caption: "El tiktok que nos hiciste.",
    src: "img/v3.mp4",
    poster: "img/v3.jpg"
  },
  {
    title: "Te grabé sin que lo supieras",
    caption: "Así de bonita eres sin darte cuenta.",
    src: "img/v4.mp4",
    poster: "img/v4.jpg"
  },
  {
    title: "El cumpleaños",
    caption: "focacha y minifocacha.",
    src: "img/v5.mp4",
    poster: "img/v5.jpg"
  },
  {
    title: "Solo tú",
    caption: "Me como broncas por ti eh.",
    src: "img/v6.mp4",
    poster: "img/v6.jpg"
  },
];

/* =========================================================
   ====== UTILIDAD HTML ======
========================================================= */

function el(html){
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

/* =========================================================
   ====== MOSAICOS ======
========================================================= */

function renderMosaic(containerId, prefix, count, captions){
  const c = document.getElementById(containerId);

  for(let i=0;i<count;i++){
    const src = nextPic();
    const cap = captions[i % captions.length];

    c.appendChild(el(`
      <figure class="tile">
        <button type="button" data-src="${src}" data-cap="${cap}">
          <img src="${src}" alt="${cap}" loading="lazy" />
        </button>
        <figcaption>${cap}</figcaption>
      </figure>
    `));
  }
}

/* =========================================================
   ====== VÍDEOS ======
========================================================= */

function renderVideos(){
  const c = document.getElementById("videos-grid");

  VIDEOS.forEach(v=>{
    c.appendChild(el(`
      <figure class="tile video-tile">

        <video controls playsinline preload="metadata">
          <source src="${v.src}#t=0.1" type="video/mp4" />
        </video>

        <figcaption>${v.caption}</figcaption>

      </figure>
    `));
  });
}

/* =========================================================
   ====== PEQUEÑOS DETALLES ======
========================================================= */

function renderPolaroids(n=12){
  const c = document.getElementById("polaroids");

  for(let i=0;i<n;i++){
    const rot = (((i*37)%11)-5)*0.6;

    c.appendChild(el(`
      <div class="polaroid" style="transform:rotate(${rot}deg)">
        <img src="${nextDetailPic()}" alt="detalle ${i+1}" loading="lazy" />
        <p>recuerdo nº${i+1}</p>
      </div>
    `));
  }
}

/* =========================================================
   ====== PÉTALOS ======
========================================================= */

function renderPetals(){
  document.querySelectorAll(".petals").forEach(box=>{
    for(let i=0;i<16;i++){
      box.appendChild(el(`
        <span class="petal"
          style="
            left:${Math.random()*100}%;
            animation-duration:${8+Math.random()*10}s;
            animation-delay:${Math.random()*12}s;
            width:${10+Math.random()*14}px;
            height:${10+Math.random()*14}px
          ">
        </span>
      `));
    }
  });
}

/* =========================================================
   ====== MINIJUEGO ======
========================================================= */

function setupGame(){
  const canvas = document.getElementById("game-canvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("game-score");
  const timeEl = document.getElementById("game-time");
  const startBtn = document.getElementById("game-start");
  const msgEl = document.getElementById("game-message");

  let score = 0;
  let timeLeft = 30;
  let active = false;
  let hearts = [];
  let animationId;

  function resize(){
    const b = canvas.getBoundingClientRect();
    canvas.width = b.width;
    canvas.height = b.height;
  }
  window.addEventListener("resize", resize);

  class Heart {
    constructor(){ this.reset(); }
    reset(){
      this.x = Math.random() * (canvas.width - 40) + 20;
      this.y = canvas.height + 50;
      this.size = 25 + Math.random() * 20;
      this.speed = 1.5 + Math.random() * 2.5;
    }
    update(){
      this.y -= this.speed;
      if(this.y < -50) this.reset();
    }
    draw(){
      ctx.font = `${this.size}px serif`;
      ctx.textAlign = "center";
      ctx.fillText("❤️", this.x, this.y);
    }
  }

  function loop(){
    if(!active) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    animationId = requestAnimationFrame(loop);
  }

  startBtn.onclick = () => {
    score = 0; timeLeft = 30; active = true;
    scoreEl.textContent = "0";
    timeEl.textContent = "30s";
    msgEl.textContent = "";
    startBtn.disabled = true;
    resize();
    hearts = Array.from({length:8}, () => new Heart());
    loop();
    const timer = setInterval(()=>{
      timeLeft--;
      timeEl.textContent = `${timeLeft}s`;
      if(timeLeft <= 0){
        clearInterval(timer);
        active = false;
        cancelAnimationFrame(animationId);
        startBtn.disabled = false;
        startBtn.textContent = "¡Otra vez!";
        msgEl.textContent = `¡Increíble! Atrapaste ${score} corazones para mí. ❤️`;
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }
    },1000);
  };

  const hit = (ex, ey) => {
    if(!active) return;
    const rect = canvas.getBoundingClientRect();
    const x = ex - rect.left;
    const y = ey - rect.top;
    hearts.forEach(h => {
      const d = Math.hypot(h.x - x, h.y - y);
      if(d < h.size){
        score++;
        scoreEl.textContent = score;
        h.reset();
      }
    });
  };

  canvas.addEventListener("mousedown", e => hit(e.clientX, e.clientY));
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    hit(e.touches[0].clientX, e.touches[0].clientY);
  });
}

/* =========================================================
   ====== LIGHTBOX ======
========================================================= */

function setupLightbox(){
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  const cap = document.getElementById("lb-caption");

  document.body.addEventListener("click", e=>{
    const btn = e.target.closest("button[data-src]");
    if(btn){
      img.src = btn.dataset.src;
      cap.textContent = btn.dataset.cap;
      lb.classList.remove("hidden");
    }
  });

  document.getElementById("lb-close").onclick = () =>
    lb.classList.add("hidden");

  lb.onclick = e=>{
    if(e.target === lb) lb.classList.add("hidden");
  };

  document.addEventListener("keydown", e => {
    if(e.key === "Escape") lb.classList.add("hidden");
  });
}

/* =========================================================
   ====== INTRO ======
========================================================= */

function setupIntro(){
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");

  document.getElementById("enter-btn").onclick = ()=>{
    intro.style.opacity = "0";

    setTimeout(()=>{
      intro.remove();
      site.classList.remove("hidden");
      window.scrollTo({top:0});
    },600);
  };
}

/* =========================================================
   ====== INIT ======
========================================================= */

document.addEventListener("DOMContentLoaded", ()=>{

  document.getElementById("year").textContent = new Date().getFullYear();

  setupIntro();

  renderMosaic("mosaic-a", "a", 16, captionsA);

  renderVideos();
  renderPolaroids(12);
  renderPetals();
  setupGame();
  setupLightbox();
});