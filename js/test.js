product = (index) => {
    // htmlcontent 
    let content = document.querySelector("#content")

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