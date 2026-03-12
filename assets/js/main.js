const burger = document.querySelector(".menuIcon");
const closeMenu = document.querySelector(".closeIcon");
const navlist = document.querySelector(".mobileNavList");

burger.addEventListener("click", () => {
  burger.style.display = "none";
  closeMenu.style.display = "block";
  navlist.style.display = "flex";
});

closeMenu.addEventListener("click", () => {
  burger.style.display = "block";
  closeMenu.style.display = "none";
  navlist.style.display = "none";
});
