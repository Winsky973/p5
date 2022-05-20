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

    remove(tag) {
        let nodeParent = '';
        tag.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation;
                nodeParent = findParentNodeId(element);
                deleteFromLocalStorage(carts, nodeParent);
                this.update();
            })
        });
    }

    update() {
        window.location.reload();
    }
}



/**
 * cette fonction va send la commande a l'API et construire l'url qui sera envoyé a la page de confirmation
 */
async function sendCommand() {
    await getUserinformations()
        .then(function(data) {

            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ contact: data, products: productsId })
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
        })
        .catch(function(err) {
            alert('error send' + err);
        })
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
 * Cette fonction retourne va trouver le noeud parent de l'enfant et retourne data-id de la balise article
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

    //updateQuantity(cardItems, found, quantity, items);
    if (found !== -1) {
        cardItems[found].quantity = parseInt(cardItems[found].quantity) + parseInt(quantity);
        console.log('cardItems[found].quantity : ', cardItems[found].quantity);
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
 * Trouve et supprime un élément du tableau et push le nouveau tableau dans le localstorage
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


/*async function getUserinformation(params) {
    let contact = {};

    await params.forEach(element => {
        element.addEventListener('change', (e) => {
            e.stopPropagation;
            contact = e.target.value;

            console.log(contact);
            return this.contact;
        })

    });
}*/



function isEmpty(params) {
    if (params === "") {
        return false;
    }
}

function errorMsg(id, content) {
    let error = document.getElementById(id);
    error.textContent = "Vous avez oublié le : " + content;
}


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