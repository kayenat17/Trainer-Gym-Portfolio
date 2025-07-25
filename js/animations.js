// Hero text animation on load
window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroTitle.style.transition = 'all 0.9s cubic-bezier(0.77,0,0.175,1)';
      heroTitle.style.opacity = 1;
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  // Rotating text animation
  let words = document.querySelectorAll('.rotating-text .word');
  if (words.length > 0) {
    words.forEach(word => {
      let letters = word.textContent.split("");
      word.textContent = "";
      letters.forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
      });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";
    words[currentWordIndex].classList.add('active');

    let rotateText = () => {
      let currentWord = words[currentWordIndex];
      let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
      // rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = "letter out";
        }, i * 100);
      });
      // reveal and rotate in letters of next word
      nextWord.style.opacity = "1";
      nextWord.classList.add('active');
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
          letter.className = "letter in";
        }, 500 + i * 100);
      });
      // hide current word after animation
      setTimeout(() => {
        currentWord.style.opacity = "0";
        currentWord.classList.remove('active');
      }, 500 + currentWord.children.length * 100);
      currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    rotateText();
    setInterval(rotateText, 5000);
  }

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.15
  };
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new window.IntersectionObserver(animateOnScroll, observerOptions);
  document.querySelectorAll('.animate-heading, .animate-image, .animate-card').forEach(el => {
    observer.observe(el);
  });
});

// Scroll reveal for sections and cards
function revealOnScroll() {
  const revealElements = document.querySelectorAll('section, .trainer-card, .plan-card, .gallery-grid img');
  const triggerBottom = window.innerHeight * 0.9;
  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('reveal-visible');
      el.style.transition = 'opacity 0.7s cubic-bezier(0.77,0,0.175,1), transform 0.7s cubic-bezier(0.77,0,0.175,1)';
    } else {
      el.classList.remove('reveal-visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Neon flicker effect for logo (now minimal for gym vibe)
function flickerLogo() {
  const logo = document.querySelector('.logo');
  if (!logo) return;
  // Minimal effect: just a subtle color change
  const flicker = () => {
    if (Math.random() > 0.95) {
      logo.style.color = '#d32f2f';
    } else {
      logo.style.color = '';
    }
  };
  setInterval(flicker, 1200);
}
window.addEventListener('DOMContentLoaded', flickerLogo);

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.shaban-nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const navLink = document.querySelector('.shaban-nav a[href="#' + id + '"]');
    if (navLink) {
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}); 