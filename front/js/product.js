/**
 * Captation de l'url
 */
let id = getParamUrl('id');


/**
 * get les produits (canapé) depuis l'API
 */
fetch("http://localhost:3000/api/products/" + id).then(function(res) {
    if (res.ok) {
        return res.json();
    }
})



.then(function(value) {
    let products = value;
    /** Nom du produit 'title de la page'*/
    document.getElementsByTagName('title')[0].textContent = products.name;

    /** affichage de l'image*/
    let image = document.createElement('img');
    image.setAttribute("src", products.imageUrl);
    image.setAttribute("alt", products.altTxt);
    let item_img = document.querySelector("article > div.item__img");
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
        let option = document.createElement('option');
        option.setAttribute("value", color);
        colors.appendChild(option).textContent = color;
    }

    let addToCart = document.getElementById('addToCart');


    addToCart.addEventListener('click', function(e) {


        let choice = document.getElementById('colors');
        let colorChoice = choice.value;
        let quantity = document.getElementById('quantity').value;

        /**
         * Push des items dans le local storage en format JSON 
         * Si l'objet n'est pas dans le  local storage on push originalCart
         * Si il existe on le prend et push items a la fin
         */

        //console.log('quant : ', quantity);
        //console.log('color : ', colorChoice);


        let cart = new Object();

        cart["8906dfda133f4c20a9d0e34f18adcf06"] = {
            "color": colorChoice,
            "quantity": quantity,
            "id": id,
        };

        cart["8906dfda133f4c20a9d0e34f18adcf0"] = {
            "color": colorChoice,
            "quantity": quantity,
            "id": id,
        };

        let cartArray = [];
        cartArray.push(cart);
        console.log(cartArray);

        let items = {
            "color": colorChoice,
            "quantity": quantity,
            "id": id,
        };

        let originalCart = {
            items: [{
                "color": colorChoice,
                "quantity": quantity,
                "id": id,
            }]
        };


        /*cardItems = getCart("cart");
        for (const cardItem of cardItems.items) {
            console.log(cardItem.id);
        }*/


        if (parseInt(quantity) === 0) { alert(`choisissez un nombre d'article`); }
        if (String(colorChoice).length === 0) { alert(`choisissez une couleur`); } else {
            cardItems = getCart("cart");

            console.log(cardItems);


            if (cardItems !== null) {
                cardItems.items.push(items);
                setCart('cart', cardItems);
            } else {
                setCart('cart', originalCart);
            }
        }
        /**get cart va récuperer les informatios du local storage */

    });

});