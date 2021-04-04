// import api data
const apiData = JSON.parse(localStorage.getItem('data'));

import {
    apiType,
    panier
} from "./modele.js"
const apiOption = apiType
var basket = panier

// create html card and show it
const showProduct = (index) => {
    // htmlcontent 
    let content = document.querySelector(".content")

    // create html card for product element
    let card = document.createElement("div")
    card.classList.add("card")
    card.setAttribute("id", index)

    // create image with class and src
    let image = document.createElement("img")
    image.classList.add("image")
    image.setAttribute("src", apiData[index].imageUrl)

    // create product name
    let firstname = document.createElement("h3")
    firstname.classList.add("name")
    firstname.innerHTML = apiData[index].name

    // create product price
    let price = document.createElement("h4")
    price.classList.add("price")
    price.innerHTML = apiData[index].price

    // create product  description
    let description = document.createElement("p")
    description.classList.add("description")
    description.innerHTML = apiData[index].description

    // add card in content
    content.appendChild(card)

    // add child in parent
    card.appendChild(image)
    card.appendChild(firstname)
    card.appendChild(price)
    card.appendChild(description)
}

// create and show product option
const showProductOption = (index) => {
    // get card in html 
    let card = document.querySelector(".card")
    // create select box
    let select = document.createElement("select")
    // link api name to his options
    let option
    switch (apiOption) {
        case "teddies":
            option = apiData[index].colors
            break;

        case "cameras":
            option = apiData[index].lenses
            break;

        case "furniture":
            option = apiData[index].varnish
            break;
    }
    // create and add option in select
    option.forEach(elm => {
        let options = document.createElement("option")
        options.innerHTML = elm
        select.appendChild(options)
    });
    // add select in card 
    card.appendChild(select)
}

const showBasket = () => {
    // basket index count
    let index = 0
    // total price sum
    let sum = 0

    basket.forEach(elm => {
        // htmlcontent 
        let content = document.querySelector(".content")

        // create html card for product element
        let card = document.createElement("div")
        card.classList.add("card")

        // create image with class and src
        let image = document.createElement("img")
        image.classList.add("image")
        image.setAttribute("src", basket[index].imageUrl)

        // create product name
        let firstname = document.createElement("h3")
        firstname.classList.add("name")
        firstname.innerHTML = basket[index].name

        // create product price
        let price = document.createElement("h4")
        price.classList.add("price")
        price.innerHTML = basket[index].price

        // create product option
        let option = document.createElement("p")
        option.classList.add("option")
        option.innerHTML = basket[index].option

        // create delete button
        let delBtn = document.createElement("button")
        delBtn.classList.add("delBtn")
        delBtn.setAttribute("id", index)
        delBtn.innerHTML = "supprimer"

        // add card in content
        content.appendChild(card)

        // add child in parent
        card.appendChild(image)
        card.appendChild(firstname)
        card.appendChild(price)
        card.appendChild(option)
        card.appendChild(delBtn)

        sum += basket[index].price

        // add +1 to index
        index++
    });
    // store sum
    localStorage.setItem("sum", sum)
    // show price in html
    document.querySelector("#price").innerHTML = sum

}

const order = () =>{
    document.querySelector("#nbcommande").innerHTML = localStorage.getItem("orderId")
    document.querySelector("#prix").innerHTML = localStorage.getItem("sum")
}

// switch what to show according to the current page
switch (document.querySelector(".content").id) {

    case "content-home": // INDEX PAGE
        // create html card for each element
        let index = 0
        apiData.forEach(elm => {
            showProduct(index)
            index++
        })
        break;

    case "content-produit": // PRODUCT PAGE
        // create card for selected product
        showProduct(localStorage.getItem("cardId"))
        showProductOption(localStorage.getItem("cardId"))
        break;

    case "content-panier": // BASKET PAGE
        showBasket()
        break;

    case "content-commande": // BASKET PAGE
        order()
        break;
}