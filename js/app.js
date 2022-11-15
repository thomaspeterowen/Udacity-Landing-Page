/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */

let section = "";
let lists = "";

const menu = document.getElementById("navbar__list");
const sections = [...document.querySelectorAll(".sec")];

/**
 * End Global Variables
 * Start Helper Functions
 */

/**
 * End Helper Functions
 * Begin Main Functions
 */

const nav_menu_items = () => {
  let nav_menu_container = "";

  sections.forEach((section) => {
    const sectionID = section.id;
    const sectionAtrribute = section.dataset.nav;
    nav_menu_container += `<li class="nav-link" id="${sectionID}-link"> <a data-navi="${sectionID}" href="${sectionID}">${sectionAtrribute}</a></li>`;
  });

  menu.innerHTML = nav_menu_container;
};

const respondToTheClick = (evt) => {
  evt.preventDefault();
  console.log("A link was clicked: " + evt.target.dataset.navi);
  const element = document.getElementById(evt.target.dataset.navi);
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

const activeLink = (li) => {
  lists.forEach((item) => item.classList.remove("active"));
  li.classList.add("active");
};

// build the nav

nav_menu_items();

// DOMContentLoaded not needed when app.js linked at bottom of html body
//document.addEventListener('DOMContentLoaded', function () {
//});

// Add class 'active' to nav section when near top of page

section = document.querySelectorAll("section");
lists = document.querySelectorAll(".nav-link");

window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top + 48 >= offset && top + 48 < offset + height) {
      const target = document.querySelector("#" + id + "-link");
      activeLink(target);
    }
  });
};

/**
 * End Main Functions
 * Begin Events
 */

// Scroll to section on link click
menu.addEventListener("click", respondToTheClick);
