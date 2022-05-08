/**Déclaration d'une class pour povoir construire les items */

class itemsClass {
    constructor( /*tag, attr, addclass, textContent*/ ) {
            /*this.tag = tag;
            this.attr = attr;
            this.addClass = addclass;
            this.textContent = textContent;*/
        }
        /**
         * Cette fontion sert a la construction d'un élément HTML 
         * @param {*} tag sera le tag de l'élément HTML (div, h1, nav...)
         * @param {*} attr les attributs à ajouter
         * @param {*} addClass La/les classes a ajouter 
         * @param {*} textContent Texte à ajouter à l'element
         * @returns une chaine HTML construite
         */
    createElement(tag, attr, addClass, textContent) {
        let element = document.createElement(tag);
        if (attr !== undefined) {
            for (const key in attr) {
                element.setAttribute(key, attr[key]);
            }
        }

        if (addClass !== '') {
            element.classList.add(addClass);

        }

        if (textContent === '') {
            element.textContent = '';
        } else {
            element.textContent = textContent;
        }

        return element;
    }
}

/**Déclations des variables */

/**Savoir si le local storage est présent */
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




if (storageAvailable('localStorage')) {
    let total = 0,
        longeur = 0;

    let products = JSON.parse(localStorage.getItem('objetKanape'));
    console.log(products.items);

    for (product of products.items) {


        let cart__items = document.getElementById('cart__items');

        let element = new itemsClass();

        /**Creation de la balise <article> */
        let article = element.createElement('article', '', 'cart__item', '');
        article.setAttribute("data-id", product.id);
        article.setAttribute("data-color", product.color);
        cart__items.appendChild(article);

        /**Creation de la balise <div> */
        let newDiv = element.createElement('div', '', 'cart__item__img', '');
        article.appendChild(newDiv);


        /**Creation de l'image */
        let newImage = element.createElement('img', { src: product.imageUrl, alt: product.altTxt }, 'cart__item__content', '');
        newDiv.appendChild(newImage);

        /**Creation de la balise div d'items */
        let divItemContent = element.createElement('div', {}, 'cart__item__content', '');
        article.appendChild(divItemContent);

        /**Creation de la balise div de description */
        let divItemDescription = element.createElement('div', {}, 'cart__item__content__description', '');
        divItemContent.appendChild(divItemDescription);

        /**Creation de la balise h2 */
        let newH2 = element.createElement('h2', {}, '', product.name);
        divItemDescription.appendChild(newH2);

        /**Balise p color */
        let newPColor = element.createElement('p', {}, '', product.color);
        divItemDescription.appendChild(newPColor);

        /**Balise p prix */
        let newPrice = element.createElement('p', {}, '', product.price + ' €');
        divItemDescription.appendChild(newPrice);


        let divItemSettings = element.createElement('div', {}, 'cart__item__content__settings', '');
        divItemContent.appendChild(divItemSettings);

        let divItemSettingsQuantity = element.createElement('div', {}, 'cart__item__content__settings__quantity', '');
        divItemSettings.appendChild(divItemSettingsQuantity);

        let newPQuantity = element.createElement('p', {}, '', 'Qté :');
        divItemSettingsQuantity.appendChild(newPQuantity);

        let newObject = { type: "number", name: "itemQuantity", min: "1", max: "100", value: product.quantity };
        let newInput = element.createElement('input', newObject, "itemQuantity", '');
        divItemSettingsQuantity.appendChild(newInput);

        let divItemSettingsDelete = element.createElement('div', {}, "cart__item__content__settings__delete", '');
        divItemSettings.appendChild(divItemSettingsDelete);


        let Pdelete = element.createElement('p', {}, "deleteItem", 'Supprimer');
        divItemSettingsDelete.appendChild(Pdelete);

        /**
         * Calcule du prix total 
         * Calcule du nombre d'articles dans le panier
         */
        total += product.price;
        console.log(total);

    }

    document.getElementById('totalQuantity').textContent = products.items.length;
    document.getElementById('totalPrice').textContent = total;
}




let deleteItem = document.querySelector("div.cart__item__content__settings__delete > p");
deleteItem.addEventListener('click', function(e) {
    deleteItem.removeChild(lol);
});