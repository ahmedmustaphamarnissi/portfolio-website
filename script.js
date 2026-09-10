// ============================================================
//  HAMBURGER MENU
// ============================================================
(function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on nav link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
})();

// ============================================================
//  AVATAR PARALLAX
// ============================================================
(function () {
  const avatar = document.getElementById("avatar");
  if (!avatar) return;
  avatar.addEventListener("mousemove", (e) => {
    const rect = avatar.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    avatar.style.transform = `rotateX(${-py}deg) rotateY(${px}deg)`;
    avatar.style.transition = "transform 0.08s linear";
  });
  avatar.addEventListener("mouseleave", () => {
    avatar.style.transform = "rotateX(0deg) rotateY(0deg)";
    avatar.style.transition = "transform 0.5s cubic-bezier(.2,.9,.2,1)";
  });
})();

// ============================================================
//  SCROLL REVEAL
// ============================================================
(function () {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay for grid items
          entry.target.style.transitionDelay = i * 0.06 + "s";
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
})();

// ============================================================
//  ACTIVE NAV LINK ON SCROLL
// ============================================================
(function () {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll("nav ul a");
  const onScroll = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === "#" + current) {
        link.style.color = "var(--accent1)";
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// ============================================================
//  CONTACT FORM HANDLER
// ============================================================
function handleSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const mailtoSubject = encodeURIComponent(subject);
  const mailtoBody    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href =
    `mailto:marnissiahmed1911@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

  const btn = e.target.querySelector(".send-btn");
  btn.innerHTML = '<i class="fa-solid fa-check"></i>&nbsp;Opening Mail App…';
  btn.style.background = "linear-gradient(90deg, #00c851, #007e33)";

  setTimeout(() => {
    btn.innerHTML =
      '<i class="fa-solid fa-paper-plane"></i>&nbsp;Send Message';
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}