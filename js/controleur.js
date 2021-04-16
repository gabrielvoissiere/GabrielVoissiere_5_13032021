// import api data
const apiData = JSON.parse(localStorage.getItem('data'));

import {
    panier,
    order
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
                constructor(realprice, price, name, imageUrl, option, id, qts) {
                    this.realprice = realprice;
                    this.price = price;
                    this.name = name;
                    this.imageUrl = imageUrl;
                    this.option = option;
                    this.id = id;
                    this.qts = qts
                }
            }
            // instance the product
            let product = new Product(apiData[index].price, apiData[index].price, apiData[index].name, apiData[index].imageUrl, document.querySelector("select").value, apiData[index]._id, 1)

            // double elm verification
            let testName = product.name
            let testOption = product.option
            let found = false
            let elmIndex
            let elmPrice

            // check elm with existing elm
            basket.forEach(elm => {
                if (testName == elm.name && testOption == elm.option) {
                    found = true
                    // get elm index
                    elmIndex = basket.indexOf(elm)
                    // get the real price
                    elmPrice = elm.realprice
                }
            });

            // if elm is present or not yet
            if (found == true) {
                // add +1 to selected elm qts
                basket[elmIndex].qts++
                // price * qts to get new price
                basket[elmIndex].price = elmPrice*basket[elmIndex].qts
                // update basket
                localStorage.setItem("basket", JSON.stringify(basket))

                console.log("product quantities update");

                btn.innerHTML = "Ajouter !"
                setTimeout(() => {
                    btn.innerHTML = "Ajouter au panier"
                }, 2000);
            } else {
                // store the product as object in local storage
                basket.push(product)
                localStorage.setItem("basket", JSON.stringify(basket))
                // show basket length
                localStorage.setItem("basketLength", basket.length)
                document.querySelector(".panier").innerHTML = localStorage.getItem("basketLength")

                console.log("product add to basket");

                btn.innerHTML = "Ajouter !"
                setTimeout(() => {
                    btn.innerHTML = "Ajouter au panier"
                }, 2000);
            }
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
                localStorage.setItem("basketLength", basket.length)
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
            localStorage.setItem("basketLength", basket.length)
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
            localStorage.setItem("basketLength", 0)
            window.location.href = "../index.html"
        })
        break;
}