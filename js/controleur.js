// import api data
const apiData = JSON.parse(localStorage.getItem('data'));

import {
    panier
} from "./modele.js"
var basket = panier

switch (document.querySelector(".content").id) {

    case "content-home": // INDEX PAGE
        const cards = document.querySelectorAll(".card")
        cards.forEach(elm => {
            elm.addEventListener("click", function () {
                // get card id
                const cardId = elm.id
                // put card id in local storage
                localStorage.setItem("cardId", cardId)
                // go to product page
                window.location.href = "pages/produit.html"
            })
        });
        break;

    case "content-produit": // PRODUCT PAGE
    // get add to basket button
        const btn = document.querySelector("button")
        btn.addEventListener("click", function () {
            // get current card id
            let index = localStorage.getItem("cardId")
            // create class for product
            class Product {
                constructor(price, name, imageUrl, option, id) {
                    this.price = price;
                    this.name = name;
                    this.imageUrl = imageUrl;
                    this.option = option;
                    this.id = id
                }
            }
            // instance the product
            let product = new Product(apiData[index].price, apiData[index].name, apiData[index].imageUrl, document.querySelector("select").value, apiData[index].id)
            // store the product as object in local storage
            basket.push(product)
            console.log(basket);
            localStorage.setItem("basket", JSON.stringify(basket))
            console.log(localStorage.getItem("basket"));
        })
        break;
}