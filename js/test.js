// api url
const apiType = "teddies"
const apiUrl = "http://localhost:3000/api/" + apiType
const postUrl = 'http://localhost:3000/api/' + apiType + '/order'

// post data in API
fetch(postUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log(data);
    // store order id in local storage
    localStorage.setItem("orderId", data.orderId)
    // go to order page
    window.location = "commande.html"
})
