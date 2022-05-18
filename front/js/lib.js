/**
 * lib.js contient toutes les fonctions et les class
 */

/**
 * Declaration des classes
 */
class HtmlTag {
    constructor() {}

    /**
     * Cette fontion sert a la construction d'un élément HTML 
     * @param {string} tag sera le tag de l'élément HTML (div, h1, nav...)
     * @param {object} attr les attributs à ajouter
     * @param {string} addClass La/les classes a ajouter 
     * @param {sring} textContent Texte à ajouter à l'element
     * @returns une chaine HTML construite
     */
    create(tag, attr, addClass, textContent) {
        let element = document.createElement(tag);
        if (attr !== 'undefined') {
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

    remove(element) {}
}

/**
 * LOCAL STORAGE
 * 
 */

/**
 * cette fonction test si le local storage est pris en charge par le navigateur
 * @param {string} type localstorage
 * @returns 
 */
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
            // acknowledge QuotaExceededError only if there's something already 
            storage.length !== 0;
    }
}



/**
 * Cette fonction prend le contenu du local storage
 * @param {string} key la clef 
 * @returns 
 */
function getCart(key) {
    if (key === null) { return false }

    if (storageAvailable('localStorage')) {
        let cardItems = JSON.parse(localStorage.getItem(key));
        return cardItems;
    } else {
        console.log('err local storage');
    }
}


/**
 * cette fonction va push les informations dans le local storage
 * @param {string} key clef local storage
 * @param {Array/object} value tableau / objet d'items
 */
function setCart(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}




/**
 * Cette fonction va changer la quantité de produits dans le local storage
 * @param {Array} cardItems 
 * @param {Object} items 
 * @param {string} id 
 * @param {string} colorChoice 
 * @param {string} quantity 
 */
function updateLocalStorage(cardItems, items, id, colorChoice, quantity) {
    let found = cardItems.findIndex(element => element.id === id && element.color === colorChoice);

    if (found !== -1) {
        cardItems[found].quantity = parseInt(cardItems[found].quantity) + parseInt(quantity);
    } else {
        cardItems.push(items);
    }
}



/**
 * cette fonction prend l'url, cherche et renvoie le parametre demandé 
 * @param {string} param le parametre a rechercher
 * @returns string du parametre trouver dans l'url
 */
function getParamUrl(param) {
    let url = new URL(window.location.href);
    let id = url.searchParams.get(param);
    return id;
}



/**
 * 
 * 
 * Gestion de la parti de récuperation des entrées utilisateur dans la partie commande des produits
 * 
 * 
 * 
 */




async function getUserinformations() {
    let contact = {};

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;

    /*if (firstName.length < 4) {
        errorMsg('firstNameErrorMsg', 'Entrez un prénom correct');
        return false;
    }

    if (lastName.length < 4) {
        errorMsg('lastNameErrorMsg', 'Entrez un nom correct');
        return false;
    }

    if (city.length < 4) {
        errorMsg('cityErrorMsg', 'Entrez une adresse correct');
        return false;
    }

    if (email.length < 4) {
        errorMsg('lastNameErrorMsg', 'Entrez une ville correct');
        return false;
    }

    if (address.length < 4) {
        errorMsg('lastNameErrorMsg', 'Entrez une ville correct');
        return false;
    }*/
    contact = {
        'firstName': firstName,
        'lastName': lastName,
        'address': address,
        'city': city,
        'email': email
    };

    return contact;
}


/**
 * Cette fonction affiche un message en cas d'erreur
 * @param {string} id l'id du tag HTML
 * @param {string} message le message a afficher 
 */
function errorMsg(id, message) {
    let tag = document.getElementById(id);
    tag.textContent = message;
    tag.className = 'cart__order__form__question p';
}

function validateName(firstName) {

    const regex = /^[A-Za-z]*\s{1}[A-Za-z]*$/;

    if (firstName.length === 0) {
        console.log('nom incorrect');
    }
    if (!firstName.match(regex)) {
        errorMsg('firstNameErrorMsg', 'erreur dans le prénom');
        return false;
    } else {
        return true;
    }
}