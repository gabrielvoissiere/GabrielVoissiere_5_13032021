// api url
const apiType = "teddies"
const apiUrl = "http://localhost:3000/api/" + apiType
const postUrl = 'http://localhost:3000/api/' + apiType + '/order'

// api call
fetch(apiUrl).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        console.error('fail to connect to api');
    }
}).then(responseData => {
    let apiData = responseData;
    // put data in local storage
    localStorage.setItem('data', JSON.stringify(apiData))
})

// create basket
let panier = []

// get local storage
let store = JSON.parse(localStorage.getItem("basket"))

if (store == null) {
    // do nothing
} else if (store == !null && panier == "") {
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
}

const order = () => {
    // form input
    var firstname = document.getElementById("name")
    var lastname = document.getElementById("lastname")
    var city = document.getElementById("city")
    var email = document.getElementById("email")
    var address = document.getElementById("adress")

    // form error text
    var nomError = document.getElementById("nameError")
    var lastnameError = document.getElementById("lastnameError")
    var cityError = document.getElementById("cityError")
    var emailError = document.getElementById("emailError")
    var adresseError = document.getElementById("adresseError")

    // form regEx
    var testNumber = /[0-9]/
    var testMail = /[A-Z0-9._%+-]+@[A-Z0-9-]+[.]+[A-Z]{2,3}/i
    var testSpecialCaractere = /[_+-.,!@#$%^&*();/|<>"']/
    // allow - and '
    var testSpecialCaracterePlace = /[_+.,!@#$%^&*();/|<>"]/

    // check form input and send order
    var order = document.getElementById('submit')
    order.addEventListener('click', function () {

        // test if firstname contain number or special charactere (forbidden)
        if (testNumber.test(firstname.value) == true || testSpecialCaractere.test(firstname.value) == true || firstname.value == "") {
            nomError.innerHTML = "Vérifier/renseigner votre nom"
            firstname.classList.add("incorrect")
        } else {
            nomError.innerHTML = ""
            firstname.classList.remove("incorrect")
        }

        // test if lastname contain number or special charactere (forbidden)
        if (testNumber.test(lastname.value) == true || testSpecialCaractere.test(lastname.value) == true || lastname.value == "") {
            lastnameError.innerHTML = "Vérifier/renseigner votre prénom"
            lastname.classList.add("incorrect")
        } else {
            lastnameError.innerHTML = ""
            firstname.classList.remove("incorrect")
        }

        // test if address contain special charactere (forbidden)
        if (testSpecialCaracterePlace.test(address.value) == true || address.value == "") {
            adresseError.innerHTML = "Vérifier/renseigner votre adresse"
            address.classList.add("incorrect")
        } else {
            adresseError.innerHTML = ""
            address.classList.remove("incorrect")
        }

        // test if city contain number or special charactere (forbidden)
        if (testNumber.test(city.value) == true || testSpecialCaracterePlace.test(city.value) == true || city.value == "") {
            cityError.innerHTML = "Vérifier/renseigner votre ville"
            city.classList.add("incorrect")
        } else {
            cityError.innerHTML = ""
            city.classList.remove("incorrect")
        }

        // test if email have correct synthaxe
        if (testMail.test(email.value) == false) {
            emailError.innerHTML = "Vérifier/renseigner votre email"
            email.classList.add("incorrect")
        } else {
            emailError.innerHTML = ""
            email.classList.remove("incorrect")
        }

        // test if all error text is empty
        if (nomError.innerHTML == "" && lastnameError.innerHTML == "" && adresseError.innerHTML == "" && cityError.innerHTML == "" && emailError.innerHTML == "") {
            // test if all input type are string
            if (typeof (firstname.value) == "string" && typeof (lastname.value) == "string" && typeof (address.value) == "string" && typeof (city.value) == "string" && typeof (email.value) == "string") {

                //form data in object
                const data = {
                    contact: {
                        firstName: firstname.value,
                        lastName: lastname.value,
                        address: address.value,
                        city: city.value,
                        email: email.value
                    },
                    // basket id product in array
                    products: JSON.parse(localStorage.getItem('id'))
                }
                console.log(data);
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
            } else {
                console.error('DATA STATUS => an error has occurred')
            }
        }
    })
}

// export
export {
    panier,
    apiType,
    order
}