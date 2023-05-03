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

// MAKE LISTUL FROM JSON ZARA

fetch("/json/nav-list.json")
  .then((result) => {
    const data = result.json();
    return data;
  })
  .then((s1) => {
    const names = s1.categories;

    const ulEl = document.createElement("ul");

    for (let i = 0; i < names.length; i++) {
      const liEl = document.createElement("li");

      const aEl = document.createElement("a");

      liEl.appendChild(aEl);

      aEl.textContent = names[i].name;
      aEl.setAttribute("data-nav", names[i].name);

      if (location.pathname === "/index.html") {
        aEl.setAttribute("href", `html/${names[i].name}.html`);
      } else {
        aEl.setAttribute("href", `${names[i].name}.html`);
      }

      ulEl.appendChild(liEl);
    }

    ul.appendChild(ulEl);
  });

// Action Of Cart
let cartButton = document.querySelector(".main-cart .pop-up");
let mainCart = document.querySelector(".main-cart");

cartButton.addEventListener("click", () => {
  mainCart.classList.toggle("action");
});
