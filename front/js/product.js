/**
 * Captation de l'url
 */
let id = getParamUrl("id");
let element = new HtmlTag();


/**
 * get les produits (canapé) depuis l'API
 */
fetch("http://localhost:3000/api/products/" + id).then(function(res) {
    if (res.ok) {
        return res.json();
    }
})


.then(function(value) {
    let item_img = document.querySelector("article > div.item__img");
    let addToCart = document.getElementById("addToCart");
    let products = value;

    /** Nom du produit 'title de la page'*/
    document.getElementsByTagName("title")[0].textContent = products.name;

    /** affichage de l'image*/
    let image = element.create("img", { src: products.imageUrl, alt: products.altTxt });
    item_img.appendChild(image);

    /** Affichage du prix*/
    let prix = document.getElementById("price");
    prix.textContent = products.price + " ";

    /**nom du produit */
    document.getElementById("title").textContent = products.name;

    /**Affichage de la description */
    document.getElementById("description").textContent = products.description;
    /** Insertion des couleurs en option */
    for (color of products.colors) {
        let colors = document.getElementById("colors");
        let option = element.create("option", { value: color }, "", color);
        colors.appendChild(option);
    }


    /***Ici on ajoute les items dans le local storage au click de l'utilisateur après avoir choisis une couleur et une quantité */
    addToCart.addEventListener("click", function(e) {

        let choice = document.getElementById("colors");
        let colorChoice = choice.value;
        let quantity = document.getElementById("quantity").value;


        if (parseInt(quantity) < 1) {
            alert(`choisissez un nombre d'article`);
        } else {
            if (String(colorChoice).length === 0) {
                alert(`choisissez une couleur`);
            } else {
                addProductToCart(id, colorChoice, parseInt(quantity));
            }
        }

    });

});