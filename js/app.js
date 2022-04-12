// Animation
AOS.init({
  once: true,
  anchorPlacement: "center-center",
  offset: 120,
  duration: 1000,
  easing: "ease",
});

// jquery mixitup
let mixer = mixitup(".portfolio .projects");

// Global variables
const header = document.querySelector(".main-header");
const homeSection = document.querySelector(".home");
const filterBtns = document.querySelectorAll(".filter");
const sections = document.querySelectorAll("body > [id]");
const navLinks = document.querySelectorAll(".nav-link");
const statSection = document.querySelector(".statistics");
const statsNumbers = document.querySelectorAll(".statistics .number");
let headerChanged = false;
let statsDone = false;

// Helper functions
function checkSectionInView(e) {
  checkHeaderStatus();

  sections.forEach((section) => {
    let { top } = section.getBoundingClientRect();
    if (top <= 113) {
      let relatedNavLink = [...navLinks].find(
        (link) => link.getAttribute("href") === `#${section.id}`
      );
      setLinkActive(relatedNavLink);
    }
  });

  let { top: statSecTop, height: statSecHeight } =
    statSection.getBoundingClientRect();
  if (
    window.innerHeight - (statSecTop + statSecHeight) >= -0.5 * statSecHeight &&
    !statsDone
  ) {
    statsHandler();
  }
}

function checkHeaderStatus() {
  let { bottom: homeBottom } = homeSection.getBoundingClientRect();
  if (homeBottom <= 93 && headerChanged) return;

  if (homeBottom <= 93) {
    header.classList.add("on-scroll");
    headerChanged = true;
  } else {
    header.classList.remove("on-scroll");
    headerChanged = false;
  }
}

function statsHandler() {
  statsNumbers.forEach((number) => {
    let value = number.dataset.stat;
    let stat = value - 27;
    let countingFunc = setInterval(() => {
      if (stat === value - 1) clearInterval(countingFunc);
      stat += 1;
      number.innerHTML = `${stat}`;
    }, 60);
  });

  statsDone = true;
}

function setBtnActive() {
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");
}

function setLinkActive(link) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  link.classList.add("active");
  link.setAttribute("aria-current", "page");
}

// Main
document.addEventListener("scroll", checkSectionInView);

filterBtns.forEach((btn) => btn.addEventListener("click", setBtnActive));

navLinks.forEach((link) =>
  link.addEventListener("click", () => setLinkActive(link))
);
