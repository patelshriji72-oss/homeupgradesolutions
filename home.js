// Basic testimonial rotation script.
// Edit the 'testimonials' array to add/remove testimonials or change images/text.

const testimonials = [
  {
    id: 0,
    author: "James Anderson",
    role: "Marketing Manager at Google",
    text: "I was extremely impressed with the smart home repair and service provided by HomePro. Their technicians were prompt, knowledgeable, and resolved my issues efficiently. I highly recommend their exceptional service for all smart home needs.",
    centerImage: "https://images.unsplash.com/photo-1603415526960-f7e0328c0a4e?q=80&w=800&auto=format&fit=crop",
    leftSmall1: "https://images.unsplash.com/photo-1531123414780-fdb33a58d3f6?q=80&w=600&auto=format&fit=crop",
    leftSmall2: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 1,
    author: "Olivia Parker",
    role: "Product Designer at Stripe",
    text: "Fast, courteous and expert technicians — fixed my entire setup in under an hour. Very satisfied and will use their service again.",
    centerImage: "https://images.unsplash.com/photo-1545996124-9b8f0b9a5c5f?q=80&w=800&auto=format&fit=crop",
    leftSmall1: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    leftSmall2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    author: "Samuel Lee",
    role: "CTO at Acme Co.",
    text: "Their knowledge and professionalism are outstanding. Highly recommend for both small and large smart-home projects.",
    centerImage: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
    leftSmall1: "https://images.unsplash.com/photo-1544005313-1c0b2b8a0b6b?q=80&w=600&auto=format&fit=crop",
    leftSmall2: "https://images.unsplash.com/photo-1545996124-12a1f9d7b8de?q=80&w=600&auto=format&fit=crop"
  }
];

let index = 0;
const textEl = document.getElementById("testimonial-text");
const authorEl = document.getElementById("testimonial-author");
const roleEl = document.getElementById("testimonial-role");
const centerImgEl = document.getElementById("center-portrait");
const avatarStack = document.querySelector(".avatar-stack");
const nextBtn = document.getElementById("nextBtn");

function render(i) {
  const t = testimonials[i];
  if (!t) return;
  textEl.textContent = t.text;
  authorEl.textContent = t.author;
  roleEl.textContent = t.role;

  // update center portrait
  centerImgEl.src = t.centerImage;
  centerImgEl.alt = `${t.author} portrait`;

  // update left small avatars (rebuild stack)
  avatarStack.innerHTML = "";
  const imgA = document.createElement("img");
  imgA.className = "avatar small";
  imgA.src = t.leftSmall1;
  imgA.alt = "";

  const imgB = document.createElement("img");
  imgB.className = "avatar small";
  imgB.src = t.leftSmall2;
  imgB.alt = "";

  avatarStack.appendChild(imgA);
  avatarStack.appendChild(imgB);
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % testimonials.length;
  render(index);
});

// keyboard accessibility: right arrow -> next
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    index = (index + 1) % testimonials.length;
    render(index);
  }
});

// initial render
render(index);


// (Optional) You can later add dynamic loading for blogs here.
// For now, just logs a message to show it’s working.
console.log("Blog section ready");

// FAQ Accordion Logic
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    // Close all others
    faqItems.forEach(i => i.classList.remove("active"));
    // Toggle current
    item.classList.add("active");
  });
});




