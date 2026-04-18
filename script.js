const themeBtn = document.getElementById("themeBtn");
const navbar = document.querySelector(".navbar");
const skillCards = document.querySelectorAll(".skill-card[data-skill]");
const projectCards = document.querySelectorAll(".project-card[data-skills]");
const projectsSection = document.getElementById("projects");
const projectsFilterInfo = document.getElementById("projectsFilterInfo");
const showAllProjectsBtn = document.getElementById("showAllProjects");
const eduCards = document.querySelectorAll(".education-card");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll("#navLinks a");

/* =========================
   Theme Toggle
========================= */
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/* =========================
   Navbar Scroll Effect
========================= */
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

/* =========================
   Project Filter Functions
========================= */
function updateFilterInfo(message) {
  if (projectsFilterInfo) {
    projectsFilterInfo.textContent = message;
  }
}

function clearSkillActiveState() {
  skillCards.forEach((item) => item.classList.remove("active-skill"));
}

function showProject(project) {
  project.classList.remove("hidden");
  project.classList.add("active-project");
}

function hideProject(project) {
  project.classList.add("hidden");
  project.classList.remove("active-project");
}

function showAllProjects() {
  projectCards.forEach((project) => {
    project.classList.remove("hidden");
    project.classList.remove("active-project");
  });

  clearSkillActiveState();

  if (showAllProjectsBtn) {
    showAllProjectsBtn.classList.add("active");
  }

  updateFilterInfo("Showing all projects");
}

function filterProjectsBySkill(selectedSkill, clickedCard) {
  let matchFound = false;

  projectCards.forEach((project) => {
    const skillsText = project.dataset.skills?.toLowerCase().trim() || "";
    const skills = skillsText.split(/\s+/).filter(Boolean);

    if (skills.includes(selectedSkill)) {
      showProject(project);
      matchFound = true;
    } else {
      hideProject(project);
    }
  });

  clearSkillActiveState();
  clickedCard.classList.add("active-skill");

  if (showAllProjectsBtn) {
    showAllProjectsBtn.classList.remove("active");
  }

  updateFilterInfo(
    matchFound
      ? `Showing projects using ${selectedSkill.toUpperCase()}`
      : `No projects found for ${selectedSkill.toUpperCase()}`
  );

  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* Skill click -> filter projects */
skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedSkill = card.dataset.skill?.trim().toLowerCase();
    if (!selectedSkill) return;

    filterProjectsBySkill(selectedSkill, card);
  });
});

/* Show all projects button */
if (showAllProjectsBtn) {
  showAllProjectsBtn.addEventListener("click", showAllProjects);
}

/* Run on load */
showAllProjects();

/* =========================
   Education Scroll Animation
========================= */
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

/* =========================
   Mobile Menu Toggle
========================= */
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show-menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.className = navLinks.classList.contains("show-menu")
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    }
  });

  /* Close menu after clicking link */
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show-menu");

      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = "fa-solid fa-bars";
      }
    });
  });
}
const tabButtons = document.querySelectorAll(".tab-btn");
const skillGroups = document.querySelectorAll(".skills-group");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetCategory = button.dataset.category;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    skillGroups.forEach((group) => {
      group.classList.remove("active");

      if (group.id === targetCategory) {
        group.classList.add("active");
      }
    });
  });
});
