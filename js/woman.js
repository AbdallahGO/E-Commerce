window.onload = function () {
  let links = document.querySelectorAll(".listul ul li a");
  links[0].style.borderBottom = "1px solid black";
};

// FUNCTION OF CLICK ON OF CATIGORIES
const catlis = document.querySelectorAll(".categories ul li");

catlis.forEach((e) => {
  catlis[0].classList.add("action");

  e.addEventListener("click", () => {
    catlis.forEach((ew) => [ew.classList.remove("action")]);

    e.classList.add("action");
  });
});

fetch("../json/WOMAN/woman.json")
  .then((data) => {
    const dat = data.json();

    return dat;
  })
  .then((res) => {
    const objectKeys = Object.keys(res.productGroups);

    const objectValues = Object.values(res.productGroups);

    // Make MainElement what append product in it
    const mainElement = document.createElement("div");
    mainElement.classList.add("woman-main");

    // make ProductElement
    for (let i = 0; i < objectKeys.length; i++) {
      for (let j = 0; j < objectValues[i].length; j++) {
        // Make a main div of Product
        const productElement = document.createElement("div");

        productElement.className = `all ${objectKeys[i]}`;

        productElement.setAttribute(
          "id",
          `${objectValues[i][j].commercialComponents[0].id}`
        );

        // Path of Product image
        const productData = objectValues[i][j].commercialComponents[0];

        // hug image
        const hugImage = document.createElement("div");
        hugImage.classList.add("image");

        for (let z = 0; z < productData.xmedia.length; z++) {
          // Make image Element
          const ProductImage = document.createElement("img");
          ProductImage.classList.add(`img-${z + 1}`);
          ProductImage.setAttribute(
            "src",
            `https://static.zara.net/photos//${productData.xmedia[z].path}/w/500/${productData.xmedia[z].name}.jpg?ts=${productData.xmedia[z].timestamp}`
          );
          hugImage.appendChild(ProductImage);
        }

        productElement.appendChild(hugImage);

        // name&price of product

        // Path of Product INfo
        const pathInfo =
          objectValues[i][j].commercialComponents[0].detail.colors[0];
        // console.log(pathInfo);

        // Make Element of info
        const infoElement = document.createElement("div");
        infoElement.classList.add("info");

        // name of product
        const nameElementOfProduct = document.createElement("h3");
        nameElementOfProduct.classList.add("title");
        nameElementOfProduct.textContent = productData.name;
        infoElement.appendChild(nameElementOfProduct);

        // price of product
        const priceElementOfProduct = document.createElement("p");
        priceElementOfProduct.classList.add("price");
        priceElementOfProduct.textContent = `${pathInfo.price / 100} USD`;
        infoElement.appendChild(priceElementOfProduct);

        // discriptoin of product
        const scriptElementOfProduct = document.createElement("div");
        scriptElementOfProduct.classList.add("descriptoin");
        scriptElementOfProduct.textContent = productData.description;
        infoElement.appendChild(scriptElementOfProduct);

        // Check if Product inStock or NOT
        let addcar = document.createElement("button");

        addcar.dataset.pro = productData;
        // add function on my buttom

        if (productData.detail.colors[0].availability !== "in_stock") {
          addcar.classList.add("not");
          addcar.textContent = "SOON";
        } else {
          addcar.classList.add("add");
          addcar.setAttribute("onclick", `addToCart(${productData.id})`);
          addcar.innerHTML = `<i class="fa-solid fa-cart-plus"></i>`;
        }

        priceElementOfProduct.appendChild(addcar);

        // append info in product Element
        productElement.appendChild(infoElement);

        mainElement.appendChild(productElement);
      }

      document.body.appendChild(mainElement);
    }

    // categories function
    catlis.forEach((e) => {
      let productElementTwo = document.querySelectorAll(
        `.woman-main .${e.dataset.out}`
      );
      e.addEventListener("click", () => {
        mainElement.textContent = "";

        console.log(e.dataset.out);
        for (let i = 0; i < productElementTwo.length; i++) {
          mainElement.appendChild(productElementTwo[i]);
        }
      });
    });
  });

let cart = JSON.parse(localStorage.getItem("CART")) || [];

const cartList = document.querySelector(".cart-list .list");

const numberOfItems = document.querySelector(".total-item");
const priceOfItems = document.querySelector(".total-price");

const popUp = document.querySelector(".pop-up .num");

updateCart();

function addToCart(id) {
  cartList.innerHTML = "";

  fetch("../json/WOMAN/woman.json")
    .then((data) => {
      const dat = data.json();

      return dat;
    })
    .then((pro) => {
      const objectKeys = Object.keys(pro.productGroups);

      const objectValues = Object.values(pro.productGroups);

      const prodeeArray = [];

      // make ProductElement
      for (let i = 0; i < objectKeys.length; i++) {
        for (let j = 0; j < objectValues[i].length; j++) {
          const prodee = objectValues[i][j].commercialComponents[0];

          prodeeArray.push(prodee);
        }
      }

      // check If Product Already Exist In cart
      if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits("plus", id);
      } else {
        const productObject = prodeeArray.find((pro) => pro.id === id);

        cart.push({
          ...productObject,
          numberOfItem: 1,
        });
      }

      // Make a Cart-product Elments
      updateCart();
    });
}

function updateCart() {
  renderItems();
  renderNumber();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderNumber() {
  let numberItems = 0;
  let priceItems = 0;

  cart.forEach((items) => {
    numberItems += items.numberOfItem;
    priceItems += (items.price / 100) * items.numberOfItem;
  });

  numberOfItems.textContent = `Item: ${numberItems}`;
  priceOfItems.textContent = `Total: ${priceItems.toFixed(2)}$`;

  popUp.textContent = numberItems;
}

function renderItems() {
  cartList.innerHTML = "";
  cart.forEach((ele) => {
    cartList.innerHTML += `
        <div class="cart-product">
          <div class="image">
            <img
              src="https://static.zara.net/photos//${
                ele.xmedia[1].path
              }/w/100/${ele.xmedia[1].name}.jpg?ts=${ele.xmedia[1].timestamp}"
              alt=""
            />
          </div>
          <div class="cart-product-info">
            <h5 class="name">${ele.name}</h5>
            <div class="cart-product-price">${ele.price / 100} USD</div>
            <div class="number-bullets">
              <button class="decrease" onclick="changeNumberOfUnits('minus',${
                ele.id
              })">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="n">${ele.numberOfItem}</span>
              <button class="increase" onclick="changeNumberOfUnits('plus',${
                ele.id
              })">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div class="go">
             <a href="#${ele.id}">Show</a>
             <a onclick="removeItem(${ele.id})">Remove</a>  
            </div>
          </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeNumberOfUnits(action, idd) {
  cart = cart.map((proT) => {
    if (proT.id === idd) {
      if (action === "minus" && proT.numberOfItem > 1) {
        proT.numberOfItem--;
      } else if (action === "plus" && proT.numberOfItem < 10) {
        proT.numberOfItem++;
      }
    }

    console.log(proT);

    return proT;
  });

  updateCart();
}

window.onload = function () {
  if (document.body.scrollWidth <= 576) {
    console.log("small");
  } else if (
    document.body.scrollWidth > 576 &&
    document.body.scrollWidth <= 767.98
  ) {
    console.log("mid");
  } else if (
    document.body.scrollWidth > 767.98 &&
    document.body.scrollWidth <= 991.98
  ) {
    console.log("larg");
  } else if (
    document.body.scrollWidth > 991.98 &&
    document.body.scrollWidth <= 1199.98
  ) {
    console.log("Xlarg");
  } else {
    console.log("more");
  }
};

// Action Of Cart
let cartButton = document.querySelector(".main-cart .pop-up");
let mainCart = document.querySelector(".main-cart");

cartButton.addEventListener("click", () => {
  mainCart.classList.toggle("action");
});
