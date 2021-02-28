const navToggler = document.querySelector(".mobile-nav__toggle"),
  mobileNavItems = document.querySelector(".mobile-nav__content");

const toggleNav = () => {
  mobileNavItems.classList.toggle("active");

  if (mobileNavItems.classList.contains("active")) {
    navToggler.innerHTML = `<img src="./assets/shared/mobile/icon-close.svg" />`;
  } else {
    navToggler.innerHTML = `<img src="./assets/shared/mobile/icon-hamburger.svg" />`;
  }
};

navToggler.addEventListener("click", toggleNav);
