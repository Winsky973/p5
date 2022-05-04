/**
 * Captation de l'url
 */
let id = '';
id = id.concat(' ', location);

let url = new URL(id);
let newUrl = url.searchParams.get("id");

/**
 * get du canapé depuis l'API
 */

fetch("http://localhost:3000/api/products/" + newUrl).then(function(res) {
    if (res.ok) {
        return res.json();
    }
})

.then(function(value) {
    let products = value;

    /**
     * affichage de l'image
     */
    let image = document.createElement('img');
    image.setAttribute("src", products.imageUrl);
    let item_img = document.querySelector("article > div.item__img");
    item_img.appendChild(image);

    /**
     * Affichage du prix
     */
    let prix = document.getElementById('price');
    prix.textContent = products.price + ' ';

    /**nom du produit */
    document.getElementById('title').textContent = products.name;

    /**Affichage de la description */
    document.getElementById('description').textContent = products.description;

    /**
     * Insertion des couleurs en option
     */
    for (product of products.colors) {
        let colors = document.getElementById('colors');
        let option = document.createElement('option');
        option.setAttribute("value", product);
        colors.appendChild(option).textContent = product;
    }

});