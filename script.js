const toggleScrollState = () => {
  if (window.scrollY > 60) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};

toggleScrollState();
window.addEventListener("scroll", toggleScrollState, { passive: true });

if (window.location.hash === "") {
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ block: "start" });
  }
}

const photo = document.querySelector(".profile-photo");
if (photo && photo.dataset.images) {
  const images = photo.dataset.images.split(",").map((src) => src.trim()).filter(Boolean);
  let index = 0;

  const crossfadeDuration = 1200;
  const holdDuration = 5200;
  const totalInterval = crossfadeDuration + holdDuration + 200;

  setInterval(() => {
    if (images.length < 2) return;
    index = (index + 1) % images.length;
    photo.style.opacity = "0";
    setTimeout(() => {
      photo.src = images[index];
      photo.style.opacity = "1";
    }, crossfadeDuration);
  }, totalInterval);
}

const animatedTerms = document.querySelectorAll(".animate-letters");
animatedTerms.forEach((term) => {
  const text = term.dataset.text || term.textContent;
  term.textContent = "";
  [...text].forEach((char, idx) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.setProperty("--i", idx);
    term.appendChild(span);
  });
});

const highlightTerms = document.querySelectorAll(".random-highlight");
const highlightPalette = ["#d97706", "#f97316", "#ef4444", "#f43f5e"];

highlightTerms.forEach((term) => {
  const text = term.dataset.text || term.textContent;
  term.textContent = "";
  const spans = [...text].map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    term.appendChild(span);
    return span;
  });

  const applyRandomColors = () => {
    spans.forEach((span) => {
      if (Math.random() > 0.5) {
        span.style.color = highlightPalette[Math.floor(Math.random() * highlightPalette.length)];
      } else {
        span.style.color = "";
      }
    });
  };

  const resetColors = () => {
    spans.forEach((span) => {
      span.style.color = "";
    });
  };

  term.addEventListener("mouseenter", () => {
    term.classList.add("active");
    applyRandomColors();
  });

  term.addEventListener("mouseleave", () => {
    term.classList.remove("active");
    resetColors();
  });

});

const ENABLE_AMBIENT_TEXT = false;
const ambientLayer = document.querySelector(".ambient-layer");
if (ENABLE_AMBIENT_TEXT && ambientLayer) {
  const phrases = ["Keep Smiling.. :)"];
  const spawnAmbientText = () => {
    const text = document.createElement("span");
    text.className = "ambient-text";
    text.textContent = phrases[0];
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 70 + 10;
    text.style.left = `${x}%`;
    text.style.top = `${y}%`;
    ambientLayer.appendChild(text);
    setTimeout(() => {
      text.remove();
    }, 7000);
  };

  setInterval(spawnAmbientText, 2600);
}
