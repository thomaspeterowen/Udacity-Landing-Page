/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 * JS Version: ES2015/ES6
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */

// navList will contain nav bar items, can be first set later, when items have been created dynamically
let navList = "";
// ul container placeholder, to be populated later
const menu = document.getElementById("navbar__list");
// contains all web page div sections
const sections = document.querySelectorAll("div.landing__container");

/**
 * End Global Variables
 * Begin Main Functions
 */

/**
 * @description function to dynamically create and insert navigation bar options, based on sections in the web page.
 */
const nav_menu_items = () => {
  // container to be populated below
  let nav_menu_container = "";

  // loop through web page sections and extend html for each section found
  sections.forEach((section) => {
    // get data needed in html
    const sectionID = section.parentElement.id;
    const sectionAtrribute = section.parentElement.dataset.nav;
    // extend html text
    nav_menu_container += `<li class="nav-link" id="${sectionID}-link"> <a data-navi="${sectionID}" href="${sectionID}">${sectionAtrribute}</a></li>`;
  });

  // insert html using 'innerHTML'
  menu.innerHTML = nav_menu_container;
  // finally we can query for nav links, to be used later
  navList = document.querySelectorAll(".nav-link");
};

/**
 * @description function called when item in nav bar has been clicked, function will scroll to corresponding section in page
 * @param {event} evt - event data passed into function
 */
const respondToTheClick = (evt) => {
  // prevent default needed to stop default functionality, I want my code to run instead.
  evt.preventDefault();
  // get element using id stored in data element (section name with number)
  const element = document.getElementById(evt.target.dataset.navi);
  // use scrollIntoView with correct parameters to scroll smoothly to section
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

/**
 * @description funtion to remove class 'active' from all elements in 'list' and add class 'active' to correct 'element'
 * @param {object} element - passed into function, this is the currently active element
 * @param {object} list - passed into function, this is the list of items where class should be removed
 */
const activeLink = (element, list) => {
  // remove class from items in list
  list.forEach((item) => item.classList.remove("active"));
  // add class to correct, active element
  element.classList.add("active");
};

/**
 * @description Add class 'active' to nav bar section and main page section when near top of page
 */
function makeActive() {
  // loop through page sections and detect if they are in the viewport
  sections.forEach((section) => {
    // check they are, call child functions to set 'active' classes
    if (
      section.getBoundingClientRect().top <= 200 &&
      section.getBoundingClientRect().bottom >= 200
    ) {
      // set section as active
      activeLink(section, sections);
      // get correct nav bar target and call function to set nav bar section as active
      const target = document.querySelector(
        "#" + section.parentElement.getAttribute("id") + "-link"
      );
      activeLink(target, navList);
    }
  });
}

// build the navigation bar, populate items
nav_menu_items();

/**
 * End Main Functions
 * Begin Events
 */

// listen for click event on menu items, proceed to function 'respondToTheClick'
menu.addEventListener("click", respondToTheClick);
// listen for scroll event on page, proceed to function 'makeActive'
window.addEventListener("scroll", makeActive);
