/**
 * lib.js contient toutes les fonctions et les class
 */

/**
 * Declaration des classes
 */
class HtmlTag {
    constructor() {}

    /**
     * Cette fontion sert a la construction d'un élément HTML complet
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
}



/**
 * Cette fonction va supprimer produit du local Storage
 * Il recois @param {tag} tag qui est un élément html
 * Il trouve l'element l'id du produit dans l'élement parent, supprime le produit du local storage
 * et refresh la page 
 * @param {string} tag element p supprimer
 */
function remove(tag) {
    let id = '';
    tag.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation;
            id = findParentNodeId(element);

            removeProductFromCart(id);
            deleteCartFromLocalStorage();
            reloadpage();
        })
    });
}

/**
 * Cette fonction va rafraichir la page
 */
function reloadpage() {
    window.location.reload();
}




/**
 * cette fonction prend l'URL, cherche et renvoie le parametre demandé dans l'URL 
 * @param {string} param le parametre a rechercher
 * @returns string du parametre trouver dans l'url
 */
function getParamUrl(param) {
    let url = new URL(window.location.href);
    let id = url.searchParams.get(param);
    return id;
}

/**
 * Cette fonction va chercher le noeud parent de l'enfant
 * si il le trouve, retourne le contenu de data-id de la balise article
 * @param {string} child tag html
 * @returns 
 */
function findParentNodeId(child) {
    let nodeParent = '',
        id = '',
        color = '',
        sku = '';

    nodeParent = child.parentElement.closest(':not(div)');
    id = nodeParent.getAttribute('data-id');
    color = nodeParent.getAttribute('data-color');
    sku = id + color;

    return sku;
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
 * Cette fonction prend le contenu du local storage et le renvoie
 * @param {string} key la clef 
 * @returns Object sinon un message
 */
function getCart() {
    if (storageAvailable('localStorage')) {
        let cardItems = JSON.parse(localStorage.getItem("cart"));
        return cardItems;
    } else {
        console.log('err local storage');
    }
}

/**
 * cette fonction va push les informations dans le local storage
 * @param {Array/object} value tableau / objet d'items
 */
function setCart(value) {
    localStorage.setItem("cart", JSON.stringify(value));
}

/**
 * Cette fonction va changer la quantité de produits dans le local storage
 * @param {string} id 
 * @param {string} colorChoice 
 * @param {int} quantity 
 */
function addProductToCart(id, colorChoice, quantity) {
    let cart = getCart();
    let newCart = cart;
    let found = newCart.findIndex(element => element.id === id && element.color === colorChoice);
    if (found !== -1) {
        newCart[found].quantity = parseInt(newCart[found].quantity) + quantity;
        return newCart;
    } else {
        return false;
    }

}

/**
 * Cette fonction va modifier la quantité de produits dans le local storage
 * @param {id} id id de l'élément parent concatener avec la couleur (SKU) du bouton Supprimer
 * @param {string} quantity la quantité de produit
 */
function updateProductCartQuantity(id, quantity) {
    let cart = getCart();
    let found = findIndexProductFromCart(id);
    console.log('found : ', found);

    /*console.log('id : ', id);
    console.log('quantity : ', quantity);*/
    cart[found].quantity = parseInt(quantity);
    setCart(cart);
}

/**
 * Cette fonction va chercher l'id du produit dans le local storage
 * plutard on pourra surcharger la fonction updateLocalStorage() qui fera tout ca
 * @param {string} sku 
 * @returns found un booléen true si le sku est trouvé et false dans le cas contaire
 */
function findIndexProductFromCart(sku) {
    let cart = getCart();

    let found = cart.findIndex(element => element.sku === sku);
    return found;
}

/**
 * Trouve, supprime un élément du tableau et push le nouveau tableau dans le localstorage
 * @param {String} id 
 */
function removeProductFromCart(id) {
    let cart = getCart();
    let found = findIndexProductFromCart(id);
    if (found !== -1) {
        cart.splice(found, 1);
        setCart(cart);
    }
}

/**
 * Cette fonction supprime completement l'objet cart (panier) si il est vide
 */
function deleteCartFromLocalStorage(param) {
    let cart = getCart();
    if (param) {
        localStorage.clear();
        localStorage.removeItem("cart");
    } else if (cart[0] === undefined) {
        localStorage.removeItem("cart");
    }
}