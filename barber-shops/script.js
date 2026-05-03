const revealElements = document.querySelectorAll(".reveal");
const cursorBlob = document.querySelector(".cursor-blob");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener("pointermove", (event) => {
  if (!cursorBlob || window.innerWidth <= 1024) return;

  cursorBlob.style.left = `${event.clientX}px`;
  cursorBlob.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, .service-block, .zine-card, .glitch-card").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!cursorBlob) return;

    cursorBlob.style.width = "52px";
    cursorBlob.style.height = "22px";
  });

  item.addEventListener("mouseleave", () => {
    if (!cursorBlob) return;

    cursorBlob.style.width = "28px";
    cursorBlob.style.height = "28px";
  });
});
