"use strict";

let nameInputEle = document.querySelector(".product-name");
let priceInputEle = document.querySelector(".product-price");
let formEle = document.querySelector("form");
let listGroupColl = document.querySelector(".list-group");
let flterEle = document.querySelector("#filter");

let products = [];

formEle.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const { nameInput, priceInput } = recinput();

  // validation call
  const isErrorr = validation(nameInput, priceInput);
  if (!isErrorr) {
    const id = products.length;
    products.push({
      id: id,
      name: nameInput,
      price: priceInput,
    });
    addItemUI(id, nameInput, priceInput);
    resetTo(nameInput, priceInput);
    console.log(products);
    removeElement();
  }
});

// recieve function
function recinput() {
  const nameInput = nameInputEle.value;
  const priceInput = priceInputEle.value;
  return {
    nameInput,
    priceInput,
  };
}

// validation  function
function validation(name, price) {
  let isError = false;
  if (!name || name.length < 5) {
    isError = true;
    // console.log("nothing");
  }
  if (!price || Number(price) <= 0) {
    isError = true;
    // console.log("nothing");
  }
  return isError;
}
function resetTo(nameInput, priceInput) {
  nameInputEle.value = "";
  priceInputEle.value = "";
}

// insert Dated
function addItemUI(id, name, price) {
   
  const addDateHtml = `<li class="list-group-item item-${id} collection-item">
                    <strong>${name}</strong>- <span class="price">$${price}</span>
                    <button class="removeItem float-right"> Remove</button>
                    </li>`;

  listGroupColl.insertAdjacentHTML("afterbegin", addDateHtml);
}

// remove item
function removeElement() {
  listGroupColl.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeItem")) {
      const id = getTheId(e.target);
      removeFromUI(id);
      removeFromProducts(id);
    }
  });
}

function getTheId(Ele) {
  const liEleG = Ele.parentElement;
  return Number(liEleG.classList[1].split("-")[1]);
}

function removeFromUI(id) {
  const dltEle = document.querySelector(`.item-${id}`);
  dltEle.remove();
}
function removeFromProducts(id) {
  products = products.filter((pro) => pro.id !== id);
}

// search
flterEle.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const resultAll = products.filter((pro) => {
    return pro.name.includes(searchValue);
  });

  // show the date
  showTheDateSeacrch(resultAll);
});

function showTheDateSeacrch(resultAll) {
    listGroupColl.innerHTML = " ";
  resultAll.forEach((item) => {
    const addDateHtml = `<li class="list-group-item item-${item.id} collection-item">
                    <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
                    <button class="removeItem float-right"> Remove</button>
                    </li>`;

    listGroupColl.insertAdjacentHTML("afterbegin", addDateHtml);
  });
}
