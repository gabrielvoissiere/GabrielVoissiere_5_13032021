// api url
const apiType = "teddies"
const apiUrl = "http://localhost:3000/api/"+apiType

// api call
fetch(apiUrl).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        console.error('fail to connect to api');
    }
}).then(responseData => {
    let apiData = responseData;
    console.log(apiData);
    // put data in local storage
    localStorage.setItem('data', JSON.stringify(apiData))
})

// create basket
let panier = []
console.log(panier)

// get local storage
let store = JSON.parse(localStorage.getItem("basket"))
console.log(store);

if (store == null) {
    // do nothing
} else if (store ==! null && panier == "") {
    // add store basket in panier
    store.forEach(elm => {
        panier.push(elm)
    });
    console.log(panier);
} else {
    // add store basket in panier
    store.forEach(elm => {
        panier.push(elm)
    });
    console.log(panier);
}

// export panier and option
export {panier, apiType}