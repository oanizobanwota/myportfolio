/* Progress clock from https://speckyboy.com/progress-bars-css-javascript/ by Jon Kantner */

window.addEventListener("DOMContentLoaded", () => {
  const clock = new ProgressClock("#clock");
});

class ProgressClock {
  constructor(qs) {
    this.el = document.querySelector(qs);
    this.time = 0;
    this.updateTimeout = null;
    this.ringTimeouts = [];
    this.update();
  }
  getDayOfWeek(day) {
    switch (day) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Sunday";
    }
  }
  getMonthInfo(mo, yr) {
    switch (mo) {
      case 1:
        return { name: "February", days: yr % 4 === 0 ? 29 : 28 };
      case 2:
        return { name: "March", days: 31 };
      case 3:
        return { name: "April", days: 30 };
      case 4:
        return { name: "May", days: 31 };
      case 5:
        return { name: "June", days: 30 };
      case 6:
        return { name: "July", days: 31 };
      case 7:
        return { name: "August", days: 31 };
      case 8:
        return { name: "September", days: 30 };
      case 9:
        return { name: "October", days: 31 };
      case 10:
        return { name: "November", days: 30 };
      case 11:
        return { name: "December", days: 31 };
      default:
        return { name: "January", days: 31 };
    }
  }
  update() {
    this.time = new Date();

    if (this.el) {
      // date and time
      const dayOfWeek = this.time.getDay();
      const year = this.time.getFullYear();
      const month = this.time.getMonth();
      const day = this.time.getDate();
      const hr = this.time.getHours();
      const min = this.time.getMinutes();
      const sec = this.time.getSeconds();
      const dayOfWeekName = this.getDayOfWeek(dayOfWeek);
      const monthInfo = this.getMonthInfo(month, year);
      const m_progress = sec / 60;
      const h_progress = (min + m_progress) / 60;
      const d_progress = (hr + h_progress) / 24;
      const mo_progress = (day - 1 + d_progress) / monthInfo.days;
      const units = [
        {
          label: "w",
          value: dayOfWeekName,
        },
        {
          label: "mo",
          value: monthInfo.name,
          progress: mo_progress,
        },
        {
          label: "d",
          value: day,
          progress: d_progress,
        },
        {
          label: "h",
          value: hr > 12 ? hr - 12 : hr,
          progress: h_progress,
        },
        {
          label: "m",
          value: min < 10 ? "0" + min : min,
          progress: m_progress,
        },
        {
          label: "s",
          value: sec < 10 ? "0" + sec : sec,
        },
        {
          label: "ap",
          value: hr > 11 ? "PM" : "AM",
        },
      ];

      // flush out the timeouts
      this.ringTimeouts.forEach((t) => {
        clearTimeout(t);
      });
      this.ringTimeouts = [];

      // update the display
      units.forEach((u) => {
        // rings
        const ring = this.el.querySelector(`[data-ring="${u.label}"]`);

        if (ring) {
          const strokeDashArray = ring.getAttribute("stroke-dasharray");
          const fill360 = "progress-clock__ring-fill--360";

          if (strokeDashArray) {
            // calculate the stroke
            const circumference = +strokeDashArray.split(" ")[0];
            const strokeDashOffsetPct = 1 - u.progress;

            ring.setAttribute(
              "stroke-dashoffset",
              strokeDashOffsetPct * circumference
            );

            // add the fade-out transition, then remove it
            if (strokeDashOffsetPct === 1) {
              ring.classList.add(fill360);

              this.ringTimeouts.push(
                setTimeout(() => {
                  ring.classList.remove(fill360);
                }, 600)
              );
            }
          }
        }

        // digits
        const unit = this.el.querySelector(`[data-unit="${u.label}"]`);

        if (unit) unit.innerText = u.value;
      });
    }

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(this.update.bind(this), 1e3);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const welcomeLink = document.querySelector(".welcome");
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll(".section");
  const arrowContainer = document.querySelector("#arrow a");

  // Click handler for nav__link elements
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Welcome link click handler
  welcomeLink.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    const targetSection = document.getElementById("welcome-page");
    targetSection.scrollIntoView({ behavior: "smooth" });
  });

  // Arrow click handler - scroll without changing URL
  arrowContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    aboutSection.scrollIntoView({ behavior: "smooth" });
    // Optionally, update nav link state
    navLinks.forEach((l) => l.classList.remove("active"));
    const aboutLink = document.querySelector('.nav__link[href="#about"]');
    if (aboutLink) aboutLink.classList.add("active");
  });

  // Intersection Observer
  const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "-100px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navLinks.forEach((link) => link.classList.remove("active"));

        if (sectionId !== "welcome-page") {
          const activeLink = document.querySelector(
            `.nav__link[href="#${sectionId}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      }
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Handle initial load and refresh
  const hash = window.location.hash;
  if (hash && hash !== "#welcome-page") {
    navLinks.forEach((link) => link.classList.remove("active"));
    const activeLink = document.querySelector(`.nav__link[href="${hash}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
      const targetSection = document.querySelector(hash);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // On refresh or initial load without hash, scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
