import {panier} from './modele.js'
let basket = panier

let array = []

let index = 0
basket.forEach(elm => {
    let product= basket[index].name+basket[index].option;
    array.push(product)
    index++
});

let newIndex = 0
console.log(array);
