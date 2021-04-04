// import api data
const apiData = JSON.parse(localStorage.getItem('data'));

import {
    panier, order
} from "./modele.js"
var basket = panier
const form = order

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
            let product = new Product(apiData[index].price, apiData[index].name, apiData[index].imageUrl, document.querySelector("select").value, apiData[index]._id)
            // store the product as object in local storage
            basket.push(product)
            localStorage.setItem("basket", JSON.stringify(basket))
        })
        break;

    case "content-panier": // BASKET PAGE
        // get delBtn
        const delBtn = document.querySelectorAll(".delBtn")
        delBtn.forEach(elm => {
            elm.addEventListener("click", function () {
                // get button idd
                const productId = elm.id
                console.log(productId);
                // remove product from basket
                basket.splice(productId, 1)
                console.log(basket);
                // update local storage
                localStorage.setItem("basket", JSON.stringify(basket))
                // page reload
                location.reload()
            })
        });
        // get delBasket
        const delBasket = document.querySelector("#delBasket")
        delBasket.addEventListener("click", function () {
            // remove product from basket
            basket = []
            console.log(basket);
            // update local storage
            localStorage.setItem("basket", JSON.stringify(basket))
            // page reload
            location.reload()
        })
        // get send button 
        const sendBtn = document.querySelector("#submit")
        sendBtn.addEventListener("click", function () {
            let id = []
            let index = 0
            basket.forEach(elm => {
                id.push(basket[index].id)
                index++
            });
            localStorage.setItem("id", JSON.stringify(id))
            form()
        })
        break;

    case "content-commande":
        const homeBtn = document.querySelector("#homeBtn")
        homeBtn.addEventListener("click", function () {
            console.log("cc");
            // remove product from basket
            basket = []
            console.log(basket);
            // update local storage
            localStorage.setItem("basket", JSON.stringify(basket))
            localStorage.removeItem("id")
            localStorage.removeItem("sum")
            localStorage.removeItem("cardId")
            window.location.href = "../index.html"
        })
        break;
}