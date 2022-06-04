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
    create(tag = "", attr = "", addClass = "", textContent = "") {
        let element = document.createElement(tag);
        if (attr !== "undefined") {
            for (const key in attr) {
                element.setAttribute(key, attr[key]);
            }
        }

        if (addClass !== "") {
            element.classList.add(addClass);
        }

        if (textContent === "") {
            element.textContent = "";
        } else {
            element.textContent = textContent;
        }
        return element;
    }
}


/************************
 * Fonctions génériques *
 ************************/



/**
 * Cette fonction va supprimer un produit du local Storage
 * Il recois @param {tag} tag qui est un élément html
 * Il trouve l'id du produit dans l'élement parent (article), supprime le produit du local storage et refresh la page 
 * 
 * @param {string} tag element p supprimer
 */
function remove(tag) {
    let id = "";
    tag.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation;
            id = findParentNodeId(element);

            removeProductFromCart(id);
            reloadPage();
        })
    });
}

/**
 * Cette fonction va rafraichir la page
 */
function reloadPage() {
    window.location.reload();
}



/**
 * cette fonction prend l'URL, cherche et renvoie le parametre demandé dans l'URL 
 * @param {string} param le parametre à rechercher
 * @return string du parametre trouver dans l'url
 */
function getParamUrl(param = "") {
    let url = new URL(window.location.href);
    let id = url.searchParams.get(param);
    return id;
}

/**
 * Cette fonction va chercher le noeud parent de l'enfant
 * si il le trouve, retourne le contenu de data-id + data-color de la balise article qui sera un SKU (identifiant unique)
 * @param {string} child tag html
 * @return string sku
 */
function findParentNodeId(child) {
    if (child === null) { return false }
    let nodeParent = "",
        id = "",
        color = "",
        sku = "";

    nodeParent = child.parentElement.closest(":not(div)");
    id = nodeParent.getAttribute("data-id");
    color = nodeParent.getAttribute("data-color");
    sku = id + color;

    return sku;
}



/*****************
 * LOCAL STORAGE *
 ****************/

/**
 * cette fonction test si le local storage est pris en charge par le navigateur
 * @param {string} type localstorage
 * @return 
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = "__storage_test__";
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
 * @return Object cart, sinon un message erreur
 */
function getCart() {
    if (storageAvailable("localStorage")) {

        if (localStorage.getItem("cart") === null) {
            setCart([])
            return JSON.parse(localStorage.getItem("cart"));

        } else {
            return JSON.parse(localStorage.getItem("cart"));
        }
    } else {
        console.log("err local storage");
    }
}

/**
 * cette fonction va push les informations dans le local storage
 * @param {Array/object} productArray tableau / objet de produits
 */
function setCart(productArray) {
    localStorage.setItem("cart", JSON.stringify(productArray));
}


/**
 * Cette fonction va changer la quantité de produits dans le local storage
 * @param {string} id l'id du produit
 * @param {string} colorChoice la couleur du produit
 * @param {int} quantity la quantité de produits
 */
function addProductToCart(id, colorChoice, quantity) {
    let cart = getCart();
    let sku = id + colorChoice;

    let items = {
        "color": colorChoice,
        "quantity": quantity,
        "id": id,
        "sku": sku,
    };

    let found = findIndexProductFromCart(id + colorChoice);
    console.log('found : ', found);

    if (found !== -1) {
        cart[found].quantity = parseInt(cart[found].quantity) + quantity;
    } else {
        cart.push(items);
    }
    setCart(cart);
}


/**
 * Cette fonction va modifier la quantité de produits dans le local storage
 * @param {string} sku id de l'élément du produit concatener avec la couleur du produit donnant un id unique (SKU) du bouton Supprimer
 * @param {string} quantity la quantité de produit
 */
function updateProductCartQuantity(sku, quantity) {
    let cart = getCart();
    let found = findIndexProductFromCart(sku);

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
 * @param {String} sku
 */
function removeProductFromCart(sku) {
    let cart = getCart();
    let found = findIndexProductFromCart(sku);
    if (found !== -1) {
        cart.splice(found, 1);
        setCart(cart);
    }
}