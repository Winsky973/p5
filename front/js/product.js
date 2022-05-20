/**
 * Captation de l'url
 */
let id = getParamUrl('id');
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
    let addToCart = document.getElementById('addToCart');
    let products = value;

    /** Nom du produit 'title de la page'*/
    document.getElementsByTagName('title')[0].textContent = products.name;

    /** affichage de l'image*/
    let image = element.create('img', { src: products.imageUrl, alt: products.altTxt }, '', '');
    item_img.appendChild(image);

    /** Affichage du prix*/
    let prix = document.getElementById('price');
    prix.textContent = products.price + ' ';

    /**nom du produit */
    document.getElementById('title').textContent = products.name;

    /**Affichage de la description */
    document.getElementById('description').textContent = products.description;
    /** Insertion des couleurs en option */
    for (color of products.colors) {
        let colors = document.getElementById('colors');
        let option = element.create('option', { value: color }, '', color);
        colors.appendChild(option);
    }



    addToCart.addEventListener('click', function(e) {

        let choice = document.getElementById('colors');
        let colorChoice = choice.value;
        let quantity = document.getElementById('quantity').value;

        /**
         * Push des items dans le local storage en format JSON 
         * Si l'objet n'est pas dans le  local storage on push originalCart
         * Si il existe on le prend et push items a la fin
         */

        let items = {
            "color": colorChoice,
            "quantity": quantity,
            "id": id,
        };

        let originalCart = [{
            "color": colorChoice,
            "quantity": quantity,
            "id": id,
        }];



        if (parseInt(quantity) === 0) { alert(`choisissez un nombre d'article`); }
        if (String(colorChoice).length === 0) { alert(`choisissez une couleur`); } else {
            cardItems = getCart("cart");

            console.log(cardItems);

            if (cardItems !== null) {

                updateLocalStorage(cardItems, items, id, colorChoice, quantity);

                setCart('cart', cardItems);
            } else {
                setCart('cart', originalCart);
            }
        }
        /**get cart va récuperer les informatios du local storage */

    });

});