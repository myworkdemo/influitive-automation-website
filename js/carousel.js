AOS.init({
  duration: 1000,
  once: true,
});

document.addEventListener("DOMContentLoaded", function () {
  // Generalized carousel logic
  function initCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const cards = Array.from(track.children);
    const cardWidth = cards[0].offsetWidth;
    let currentIndex = 0;

    // Duplicate cards for smooth looping
    for (let i = 0; i < cards.length; i++) {
      const cardClone = cards[i].cloneNode(true);
      track.appendChild(cardClone);
    }

    const slide = () => {
      currentIndex++;

      // Use `transform` to slide cards smoothly
      track.style.transition = "transform 1s ease-in-out";
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      if (currentIndex === cards.length) {
        setTimeout(() => {
          track.style.transition = "none";
          track.style.transform = `translateX(0)`;
          currentIndex = 0;
        }, 1000);
      }
    };

    let slideInterval = setInterval(slide, 4000); // Start auto-slide

    // Pause the slide on mouse enter
    track.addEventListener("mouseenter", function () {
      clearInterval(slideInterval);
    });

    // Resume the slide on mouse leave
    track.addEventListener("mouseleave", function () {
      slideInterval = setInterval(slide, 4000);
    });

    // Manual Previous Button Logic
    document.getElementById(prevBtnId).addEventListener("click", function () {
      if (currentIndex === 0) {
        track.style.transition = "none"; // Disable transition for immediate reset
        track.style.transform = `translateX(-${
          (cards.length - 1) * cardWidth
        }px)`;
        currentIndex = cards.length - 1;
      } else {
        currentIndex--;
        track.style.transition = "transform 1s ease-in-out";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });

    // Manual Next Button Logic
    document.getElementById(nextBtnId).addEventListener("click", function () {
      if (currentIndex === cards.length - 1) {
        track.style.transition = "none";
        track.style.transform = `translateX(0)`;
        currentIndex = 0;
      } else {
        currentIndex++;
        track.style.transition = "transform 1s ease-in-out";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    });
  }

  // Initialize carousels for each section
  initCarousel("services-track", "services-prev", "services-next");
  initCarousel("clients-track", "clients-prev", "clients-next");
});
