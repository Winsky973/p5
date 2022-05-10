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
    //console.log(products);
    /**
     * Nom du produit
     */
    document.getElementsByTagName('title')[0].textContent = products.name;

    /**
     * affichage de l'image
     */
    let image = document.createElement('img');
    image.setAttribute("src", products.imageUrl);
    image.setAttribute("alt", products.altTxt);
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

    let addToCart = document.getElementById('addToCart');


    addToCart.addEventListener('click', function(e) {
        if (storageAvailable('localStorage')) {

            let choice = document.getElementById('colors');
            let colorChoice = choice.value;

            let quantity = document.getElementById('quantity').value;

            /**Push des items dans le local storage en format JSON 
             * 
             * Si l'objet n'est pas dans le  local storage on push originalCart
             * Si il existe on le prend et push items a la fin
             */
            let items = {
                "name": products.name,
                "price": products.price,
                "color": colorChoice,
                "quantity": quantity,
                "id": newUrl,
                "imageUrl": products.imageUrl,
                "altTxt": products.altTxt,
            };
            let originalCart = {
                    items: [{
                        "name": products.name,
                        "price": products.price,
                        "color": colorChoice,
                        "quantity": quantity,
                        "id": newUrl,
                        "imageUrl": products.imageUrl,
                        "altTxt": products.altTxt,
                    }]
                }
                //itemsStorage.push(originalCart);

            let cardItems = JSON.parse(localStorage.getItem("objetKanape"));
            console.log(cardItems);

            if (cardItems !== null) {
                cardItems.items.push(items);
                console.log(cardItems);
                localStorage.setItem('objetKanape', JSON.stringify(cardItems));
            } else {
                localStorage.setItem('objetKanape', JSON.stringify(originalCart));
            }
        } else {
            console.log('err');
        }
    });

});



function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}