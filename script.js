const themeBtn = document.getElementById("themeBtn");
const navbar = document.querySelector(".navbar");
const skillCards = document.querySelectorAll(".skill-card[data-skill]");
const projectCards = document.querySelectorAll(".project-card[data-skills]");
const projectsSection = document.getElementById("projects");
const projectsFilterInfo = document.getElementById("projectsFilterInfo");
const showAllProjectsBtn = document.getElementById("showAllProjects");
const eduCards = document.querySelectorAll(".education-card");

/* Theme toggle */
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* Navbar scroll effect */
function handleNavbarScroll() {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

/* Reset project filter */
function resetProjects() {
  projectCards.forEach((project) => {
    project.classList.remove("hidden", "active-project");
  });

  skillCards.forEach((item) => item.classList.remove("active-skill"));

  if (projectsFilterInfo) {
    projectsFilterInfo.textContent = "";
  }
}

/* Skill click -> filter projects */
skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedSkill = card.dataset.skill?.trim().toLowerCase();

    if (!selectedSkill) return;

    skillCards.forEach((item) => item.classList.remove("active-skill"));
    card.classList.add("active-skill");

    let matchFound = false;

    projectCards.forEach((project) => {
      const skillsText = project.dataset.skills?.toLowerCase() || "";
      const skills = skillsText.split(/\s+/).filter(Boolean);

      project.classList.remove("active-project");

      if (skills.includes(selectedSkill)) {
        project.classList.remove("hidden");
        project.classList.add("active-project");
        matchFound = true;
      } else {
        project.classList.add("hidden");
      }
    });

    if (projectsFilterInfo) {
      projectsFilterInfo.textContent = matchFound
        ? `Showing projects using ${selectedSkill.toUpperCase()}`
        : `No projects found for ${selectedSkill.toUpperCase()}`;
    }

    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* Show all projects button */
if (showAllProjectsBtn) {
  showAllProjectsBtn.addEventListener("click", resetProjects);
}

/* Education scroll animation */
if ("IntersectionObserver" in window && eduCards.length > 0) {
  const educationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  eduCards.forEach((card) => {
    educationObserver.observe(card);
  });
} else {
  eduCards.forEach((card) => {
    card.classList.add("show");
  });
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");

    const icon = menuToggle.querySelector("i");
    icon.className = navLinks.classList.contains("show-menu")
      ? "fa-solid fa-xmark"
      : "fa-solid fa-bars";
  });
}

