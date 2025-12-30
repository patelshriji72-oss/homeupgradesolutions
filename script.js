const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let cards = document.querySelectorAll(".card");

let index = 0;
let cardWidth = cards[0].offsetWidth + 20; // width + gap

// Clone first and last elements for infinite looping
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, carousel.firstChild);
cards = document.querySelectorAll(".card");

// Set start position to first actual card
carousel.style.transform = `translateX(-${cardWidth}px)`;
index = 1;

function moveToSlide() {
  carousel.style.transition = "transform 0.8s ease-in-out";
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

// When transition ends (loop handling)
carousel.addEventListener("transitionend", () => {
  if (cards[index].isSameNode(firstClone)) {
    carousel.style.transition = "none";
    index = 1;
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
  }
  if (cards[index].isSameNode(lastClone)) {
    carousel.style.transition = "none";
    index = cards.length - 2;
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

prevBtn.onclick = () => {
  if (index <= 0) return;
  index--;
  moveToSlide();
};

nextBtn.onclick = () => {
  if (index >= cards.length - 1) return;
  index++;
  moveToSlide();
};

// Auto slide every 5 seconds
setInterval(() => {
  index++;
  moveToSlide();
}, 5000);
