/**
 * Gestion de la parti de récuperation des entrées utilisateur dans la partie commande des produits
 */

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let form = document.getElementsByTagName("form")[0];



initValidationForm();
/**Ici nous allons valider les infos de l'utilisateur avant de tout envoyer */
form.addEventListener("submit", (event) => {
    let contact = getUserinformations();
    let valide = valideInformationsUser();
    let cart = getCart();

    if (!valide) {
        alert(`Oups il y'a une ou plusieurs données invalide`);
    } else if (cart[0] === undefined) {
        alert(`Vous ne pouvez pas passer de commandes car votre panier est vide \nAjoutez quelque chose à votre panier`);

    } else {
        prepareOrder();
    }
    event.preventDefault();
});


/**
 * Cette fonction récupère les informations rentrer par l'utilisateur
 * @returns object contact
 */
function getUserinformations() {
    let contact = {};
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const address = formData.get('address');
    const city = formData.get('city');
    const email = formData.get('email');
    contact = { firstName, lastName, address, city, email }
    return contact;
}


/**Cette fonction surveille les champs afin de voir les differents changement */
function initValidationForm() {

    firstName.addEventListener("change", function(event) {
        if (!validateWordString(firstName.value)) {
            errorMsg(firstNameErrorMsg, "Rentrez un prénom correct");
            event.preventDefault();
        } else {
            errorMsg(firstNameErrorMsg, "");
        }
    });

    lastName.addEventListener("change", function(event) {

        if (!validateWordString(lastName.value)) {
            errorMsg(lastNameErrorMsg, "Rentrez un prénom correct");
            event.preventDefault();

        } else {
            errorMsg(lastNameErrorMsg, "");
        }
    });

    address.addEventListener("change", function(event) {
        if (!validateAdress(address.value)) {
            errorMsg(addressErrorMsg, "Rentrez une adresse correct");
            event.preventDefault();
        } else {
            errorMsg(addressErrorMsg, "");
        }
    });

    city.addEventListener("change", function(event) {
        if (!validateWordString(city.value)) {
            errorMsg(cityErrorMsg, "Rentrez une ville correct");
            event.preventDefault();

        } else {
            errorMsg(cityErrorMsg, "");
        }
    });

    email.addEventListener("change", function(event) {
        if (!isMail(email.value)) {
            errorMsg(emailErrorMsg, "Rentrez un mail correct");
            event.preventDefault();

        } else {
            errorMsg(emailErrorMsg, "");
        }
    });

}

/**Cette fontion vérifie si les informations utilisateur sont valide et respecte un bon format */
function valideInformationsUser() {
    let contact = getUserinformations();
    let conforme = validateWordString(contact.firstName) && validateWordString(contact.lastName) && validateAdress(contact.address) && validateWordString(contact.city) && isMail(contact.email);

    if (conforme) {
        return true;
    } else {
        return false;
    }
}


/**
 * cette fonction va send la commande a l'API et construire l'url qui sera envoyé a la page de confirmation
 */
function prepareOrder() {
    let contact = getUserinformations();

    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contact: contact, products: productIds })
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
            alert("error fetch : " + err);
        })
}


/**
 * Cette fonction affiche un message en cas d'erreur
 * @param {string} id l'id du tag HTML
 * @param {string} message le message à afficher 
 */
function errorMsg(tag, message) {
    let tag1 = document.getElementById(tag);
    tag.className = "cart__order__form__question p";
    tag.textContent = message;
}


/**
 * Cette fonction vérifie si une chaine est vide ou pas
 * @param {string} value chaine a vérifier 
 * @returns 
 */
function isEmpty(value) {
    if (value.length === 0 || value === "" || typeof value === 'undefined') { return true; } else { return false; }
}


/**
 * Cette fonction vérifie si la chaine recu est au bon format mail  
 *
 * @param {string} value chaine de caractère
 * @return bool (true ou false) 
 */
function isMail(value) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let test = value.match(regex) ? true : false;
    if (!test) {
        return false;
    }
    return true;
}


/**
 * Cette fonction verifie si il n'y a pas de caractère autre que "a-zA-ZÀ-ú- " dans la chaine
 * @param {string} value la chaine à tester
 * @returns bool (true ou false) 
 */
function validateWordString(value) {
    const regex = /^[a-zA-ZÀ-ú- ]+$/;

    if (value.length === 0) {
        console.log("chaine vide");
    }

    let test = value.match(regex) ? true : false;

    if (!test) {
        return false;
    } else {
        return true;
    }
}


/**
 * Cette fonction verifie si il n ya pas e caractère autre que A-Z dans la chaine
 * @param {string} value nom ou prenom
 * @returns bool (true ou false) 
 */
function validateAdress(value) {
    const regex = /^[\sa-zA-Z0-9]+$/;
    if (value.length === 0) {
        console.log("chaine vide");
    }
    let test = value.match(regex) ? true : false;

    if (!test) {
        return false;
    } else {
        return true;
    }
}