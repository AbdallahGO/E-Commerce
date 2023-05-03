//   ACTION OF MENU
let menu = document.querySelector(".menu");

const ul = document.querySelector(".listul");

document.querySelector(".fa-bars").style.opacity = "1";

menu.addEventListener("click", () => {
  const list = document.querySelector(".burger");

  list.classList.toggle("show");
  ul.classList.toggle("show");

  if (list.classList.contains("show") === true) {
    document.querySelector(".fa-bars").style.opacity = "0";
    document.querySelector(".fa-xmark").style.opacity = "1";
    ul.style.width = "250px";
    ul.style.transition = "1s";
  } else {
    document.querySelector(".fa-xmark").style.opacity = "0";
    document.querySelector(".fa-bars").style.opacity = "1";
    ul.style.width = "0px";
    ul.style.transition = "1s";
  }
});
