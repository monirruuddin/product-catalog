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
    let proAll = {
      id: id,
      name: nameInput,
      price: priceInput,
    }
    products.push(proAll);
    //add to UI
    addItemUI(id, nameInput, priceInput);
    //reset input field
    resetTo(nameInput, priceInput);
    setTheDateAtLocalStr(proAll);

    console.log(products);
    removeElement();
  }
});

//setTheDateAtLocalStr
 function setTheDateAtLocalStr(proAll){
  let products;
  if(localStorage.getItem('storeProducts')){
    products = JSON.parse(localStorage.getItem('storeProducts'));
    products.push(proAll);
  localStorage.setItem('storeProducts',JSON.stringify(products));
  }else{
    products= [];
    products.push(proAll);
    localStorage.setItem('storeProducts',JSON.stringify(products));
  }

 }

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
      removeFromLocalStor(id);
    }
  });
}

function getTheId(Ele) {
  const liEleG = Ele.parentElement;
  return Number(liEleG.classList[1].split("-")[1]);
}

// remove From ui
function removeFromUI(id) {
  const dltEle = document.querySelector(`.item-${id}`);
  dltEle.remove();
}
// remove after update
function removeAfterUpdate(products,id){
 return products.filter((pro) => pro.id !== id);
}
// remove From products
function removeFromProducts(id) {
  const dateremoveafterupdate = removeAfterUpdate(products,id);
  products = dateremoveafterupdate;
}

// remove From Local Storage
function removeFromLocalStor(id){
  // const products = removeAfterUpdate(id);
  const products = JSON.parse(localStorage.getItem('storeProducts'));
  const productAfterRemove = removeAfterUpdate(products,id);
  localStorage.setItem('storeProducts',JSON.stringify(productAfterRemove));
}

// search
flterEle.addEventListener("keyup", (e) => {
  const searchValue = e.target.value;
  const resultAll = products.filter((pro) => {
    return pro.name.includes(searchValue);
  });

  // show the date
  showTheDateSearch(resultAll);
});

function showTheDateSearch(resultAll) {
    listGroupColl.innerHTML = " ";
  resultAll.forEach((item) => {
    const addDateHtml = `<li class="list-group-item item-${item.id} collection-item">
                    <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
                    <button class="removeItem float-right"> Remove</button>
                    </li>`;

    listGroupColl.insertAdjacentHTML("afterbegin", addDateHtml);
  });
}

document.addEventListener('DOMContentLoaded', (e)=>{
  if(localStorage.getItem('storeProducts')){
    const products = JSON.parse(localStorage.getItem('storeProducts'));
    showTheDateSearch(products);
  }
});
