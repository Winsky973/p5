/**Déclaration d'une class pour povoir construire les items */

class itemsClass {
    constructor() {}

    /**
     * Cette fontion sert a la construction d'un élément HTML 
     * @param {string} tag sera le tag de l'élément HTML (div, h1, nav...)
     * @param {object} attr les attributs à ajouter
     * @param {string} addClass La/les classes a ajouter 
     * @param {sring} textContent Texte à ajouter à l'element
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

    removeElement(element) {

    }
}

class User {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}


/**Déclations des variables */
let contact = {};
let champ = {};
let infoUsers = [];
let firstName = '';
let lastName = '';
let address = '';
let city = '';
let email = '';

/**traitement des informations utilisateur */
let cart__order__form = document.querySelectorAll('form.cart__order__form > div > input');
console.log(cart__order__form);


cart__order__form.forEach(element => {
    element.addEventListener('change', function(event) {
        let buffer = event;
        console.log('buffer : ' + buffer.target.id)
        switch (buffer.target.id) {
            case 'firstName':
                firstName = buffer.target.value;
                infoUsers.push(firstName);
                //console.log('firstname : ' + firstName);
                break;

            case 'lastName':
                lastName = buffer.target.value;
                infoUsers.push(lastName);
                //console.log('lastname : ' + lastName);
                break;

            case 'address':
                address = buffer.target.value;
                infoUsers.push(address);
                //console.log('address : ' + address);
                break;

            case 'city':
                city = buffer.target.value;
                infoUsers.push(city);
                //console.log('city : ' + city);
                break;

            case 'email':
                email = buffer.target.value;
                infoUsers.push(email);
                //console.log('email : ' + email);
                break;
        }
        console.log(infoUsers);
    })
});
infoUsers.forEach(element => {
    console.log('Element :' + element);
});


console.log('externe info users : ' + infoUsers);



document.addEventListener("DOMContentLoaded", function() {
    champ.firstName = document.getElementById('firstName');
    champ.lastName = document.getElementById('lastName');
    champ.address = document.getElementById('address');
    champ.city = document.getElementById('city');
    champ.email = document.getElementById('email');
});

console.log(champ);


/**
 * Gestion de la parti de récuperation des entrées utilisateur
 */

/**
 * cette fonction recoit un champ rentrer par l'utilisateur et vérifie si il n'est pas vide
 * @param {string} value 
 * @returns la valeur si elle n'est pas vide et false si il l'est
 */
function isNotEmpty(value) {
    console.log('value : ' + value);
    if (value === null || typeof value == 'undefined') { return false }

    return (value.length > 0);
}

/**
 * 
 * @param {string} verifie si un email est valide 
 * @returns l'addresse email en minuscule
 */
function isEmail(email) {
    console.log('email : ' + email);

    let regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    return regex.test(String(email).toLowerCase());
}

/**
 * Cette fonction valide le champ rentré par l'utilisateur et colore l'input en cas d'erreur
 * @param {string} champ le champ de l'utilisateur 
 * @param {*} validationFunction une fonction de verification
 * @returns 
 */
function champValidation(champ, validationFunction) {
    if (champ == null) { return false; }

    let isChampValid = validationFunction(champ.value);
    console.log('champValidation : ' + isChampValid);
    if (!isChampValid) {
        champ.classList.addClass = 'cart__order__form__question p';
    } else {
        champ.clasName = '';
    }
    return isChampValid;
}


function isValid() {
    let valid = true;

    valid &= champValidation(champ.firstName, isNotEmpty);
    valid &= champValidation(champ.lastName, isNotEmpty);
    valid &= champValidation(champ.address, isNotEmpty);
    valid &= champValidation(champ.city, isNotEmpty);
    valid &= champValidation(champ.email, isNotEmpty);

    return valid;
}


async function sendContact() {
    if (isValid()) {
        let usr = new User(firstName.value, lastName.value, address.value, city.value, email.value);

        console.log('name : ' + firstName.value);

        console.log(`${usr.firstName} thanks`)
    } else {
        console.log("error")
    }
}





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
        totalQuantity = 0,
        longeur = 0;

    let products = JSON.parse(localStorage.getItem('objetKanape'));
    console.log(products.items);

    /**
     * Boucle for of pour recuperer les items (les canapés) 
     */
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
         * Supprimer un item
         */
        let articleTest = document.querySelector('article.cart__item');
        let dataId = articleTest.dataset.id;
        let dataColor = articleTest.dataset.color;
        let deleteItem = document.querySelector("div.cart__item__content__settings__delete > p");
        let nodeParent = deleteItem.parentNode.closest('article');

        //console.log(nodeParent);


        deleteItem.addEventListener('click', function(e) {
            nodeParent.remove();
        });


        /**
         * Calcule du prix total 
         * Calcule du nombre d'articles dans le panier
         */

        if (product.quantity > 1) {
            total = (total + (product.price * product.quantity));
        } else {
            total += product.price;
        }


        totalQuantity = totalQuantity + parseInt(product.quantity);
    }

    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = total;
}

function totalProduct(price, productQuantity) {
    let total = 0,
        newTotal = 0;
    total = price;
    newTotal = total + price;

    if (productQuantity > 1) {
        newTotal = total * productQuantity;
    }
    console.log('new total : ' + newTotal);

    return newTotal;
}