// Parallax avatar
      (function () {
        const avatar = document.getElementById("avatar");
        if (!avatar) return;
        avatar.addEventListener("mousemove", (e) => {
          const rect = avatar.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
          const py = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
          avatar.style.transform = `rotateX(${-py}deg) rotateY(${px}deg)`;
          avatar.style.transition = "transform 0.08s linear";
        });
        avatar.addEventListener("mouseleave", () => {
          avatar.style.transform = "rotateX(0deg) rotateY(0deg)";
          avatar.style.transition = "transform 0.5s cubic-bezier(.2,.9,.2,1)";
        });
      })();

      const revealEls = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i * 0.05) + "s";
            entry.target.classList.add("visible");
            entry.target.querySelectorAll(".skill-bar[data-width]").forEach(bar => {
              bar.style.width = bar.dataset.width + "%";
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => observer.observe(el));

      document.querySelectorAll(".skill-bar[data-width]").forEach(bar => {
        if (bar.closest(".reveal.visible")) {
          bar.style.width = bar.dataset.width + "%";
        }
      });

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

        const mailtoLink = `mailto:marnissiahmed1911@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        window.location.href = mailtoLink;

        const btn = e.target.querySelector(".send-btn");
        btn.innerHTML = '<i class="fa-solid fa-check"></i> &nbsp;Opening Mail App…';
        btn.style.background = "linear-gradient(90deg, #00c851, #007e33)";

        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> &nbsp;Send Message';
          btn.style.background = "";
          e.target.reset();
        }, 3000);
      }