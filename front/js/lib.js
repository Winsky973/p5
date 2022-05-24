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

    /**
     * Cette fonction va supprimer produit du local Storage
     * Il recois @param {tag} tag qui est un élément html
     * Il trouve l'element l'id du produit dans l'élement parent, supprime le produit du local storage
     * et refresh la page 
     * @param {string} tag element p supprimer
     */
    remove(tag) {
        let id = '';
        tag.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation;
                id = findParentNodeId(element);
                deleteFromLocalStorage(carts, id);
                this.update();
            })
        });
    }

    /**
     * Cette fonction va rafraichir la page
     */
    update() {
        window.location.reload();
    }
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
    let nodeParent = {};
    nodeParent = child.parentElement.closest(':not(div)').getAttribute('data-id');
    return nodeParent;
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
 * @returns Object
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

    //updateQuantity(cardItems, found, quantity, items);
    if (found !== -1) {
        cardItems[found].quantity = parseInt(cardItems[found].quantity) + parseInt(quantity);
        //console.log('cardItems[found].quantity : ', cardItems[found].quantity);
    } else {
        cardItems.push(items);
    }

}

/**
 * Cette fonction va modifier la quantité de produits dans le local storage
 * @param {int} found l'index de l'element dans le tableau prit dans le localstorage
 * @param {string} quantity la quantité de produit
 * @param {Array} items object d'items a push dans le LStorage 
 */
function updateQuantity(cardItems, found, quantity) {
    console.log('updateQuantity cardItems : ', cardItems);
    console.log('cardItems[found].quantity : ', cardItems[found].quantity);
    cardItems[found].quantity = parseInt(quantity);
    setCart('cart', cardItems);
}

/**
 * Cette fonction va chercher l'id du produit dans le local storage
 * plutard on pourra surcharger la fonction updateLocalStorage() qui fera tout ca
 * @param {Array} cardItems 
 * @param {string} id 
 * @returns 
 */
function findIdLocalStorage(cardItems, id) {
    let found = cardItems.findIndex(element => element.id === id);
    return found;
}

/**
 * Trouve, supprime un élément du tableau et push le nouveau tableau dans le localstorage
 * @param {Array} cardItems 
 * @param {String} id 
 */
function deleteFromLocalStorage(cardItems, id) {
    let found = findIdLocalStorage(cardItems, id);
    if (found !== -1) {
        cardItems.splice(found, 1);
        setCart('cart', cardItems);
    }
}





/**
 * 
 * 
 * Gestion de la parti de récuperation des entrées utilisateur dans la partie commande des produits
 * 
 * 
 * 
 */



/**
 * cette fonction va send la commande a l'API et construire l'url qui sera envoyé a la page de confirmation
 */
async function sendCommand() {
    let contact = await getUserinformations();
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: contact, products: productsId })
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            location.href = `confirmation.html?id=${value.orderId}`;
        })
        .catch(function(err) {
            alert('error fetch : ' + err);
        })
}







function isEmpty(value) {
    if (value.length === 0 || value === "" || typeof value === 'undefined') { return true; } else { return false }
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




function getUserinformations() {
    let contact = {};

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email');


    if (isEmpty(firstName)) {
        errorMsg('firstNameErrorMsg', `le prénom n'a pas été renseigné`);
    }
    if (!isEmpty(firstName) && !validateName(firstName)) {
        errorMsg('firstNameErrorMsg', `le prénom est incorrect`);

    } else { errorMsg('firstNameErrorMsg', ``); }

    if (isEmpty(lastName)) {
        errorMsg('lastNameErrorMsg', `le nom n'a pas été renseigné`);
    } else { errorMsg('lastNameErrorMsg', ``); }

    if (isEmpty(address)) {
        errorMsg('addressErrorMsg', `l'addresse n'a pas été renseigné`);
    } else { errorMsg('addressErrorMsg', ``); }

    if (isEmpty(city)) {
        errorMsg('cityErrorMsg', `la ville n'a pas été renseigné`);
    } else { errorMsg('cityErrorMsg', ``); }

    if (isEmpty(email.value)) {
        errorMsg('emailErrorMsg', `l'émail n'a pas été renseigné`);
    }
    if (!isEmpty(email.value) && !isMail(email)) {
        errorMsg('emailErrorMsg', ``);
        alert('pas mail')
        errorMsg('emailErrorMsg', `Entrez une mail valide`);
    } else {
        contact = {
            'firstName': firstName,
            'lastName': lastName,
            'address': address,
            'city': city,
            'email': email
        };

    }

    console.log(contact);
    return contact;
}

/**
 * Cette fonction vérifie si la chaine recu est au bon format mail  
 *
 * @param {string} inputValue chaine de caractère
 * @returns bool (true ou false) 
 */
function isMail(inputValue) {
    ///^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


/**
 * Cette fonction verifie si il n ya pas e caractère autre que A-Z dans la chaine
 * @param {string} value nom ou prenom
 * @returns bool (true ou false) 
 */
function validateName(value) {

    const regex = /^[A-Za-z]*\s{1}[A-Za-z]*$/;

    if (value.length === 0) {
        console.log('chaine vide');
    }
    if (!value.match(regex)) {
        return false;
    } else {
        return true;
    }
}