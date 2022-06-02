/**
 * 
 * Gestion de la parti de récuperation des entrées utilisateur dans la partie commande des produits
 * 
 */

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
addEventListener("DOMContentLoaded", initValidationForm());


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
 * Cette fonction vérifie si une chaine est vide ou pas
 * @param {string} value chaine a vérifier 
 * @returns 
 */
function isEmpty(value) {
    if (value.length === 0 || value === "" || typeof value === 'undefined') { return true; } else { return false }
}


/**
 * Cette fonction récupère les informations rentrer par l'utilisateur
 * @returns object contact
 */
function getUserinformations() {
    let contact = {};

    contact = {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "address": address.value,
        "city": city.value,
        "email": email.value,
    };

    console.log(contact);
    return contact;
}


function initValidationForm() {
    let contactInformationArray = [];
    addEventListener("DOMContentLoaded", (e) => {
        firstName.addEventListener("change", function(event) {

            if (!validateName(firstName.value)) {
                errorMsg(firstNameErrorMsg, "Rentrez un prénom correct");
                firstName.focus();
                event.preventDefault();
            } else {
                contactInformationArray.push(firstName.value);
                errorMsg(firstNameErrorMsg, "");
            }
        });

        lastName.addEventListener("change", function(event) {

            if (!validateName(lastName.value)) {
                errorMsg(lastNameErrorMsg, "Rentrez un prénom correct");
                lastName.focus();
                event.preventDefault();

            } else {
                errorMsg(lastNameErrorMsg, "");
            }
        });

        address.addEventListener("change", function(event) {
            if (!validateAdress(address.value)) {
                errorMsg(addressErrorMsg, "Rentrez une adresse correct");
                address.focus();
                event.preventDefault();
            } else {
                errorMsg(addressErrorMsg, "");
            }
        });

        city.addEventListener("change", function(event) {
            if (!validateName(city.value)) {
                errorMsg(cityErrorMsg, "Rentrez une ville correct");
                city.focus();
                event.preventDefault();

            } else {
                errorMsg(cityErrorMsg, "");
            }
        });

        email.addEventListener("change", function(event) {
            if (!isMail(email.value)) {
                errorMsg(emailErrorMsg, "Rentrez un mail correct");
                email.focus();
                event.addEventLisener();

            } else {
                errorMsg(emailErrorMsg, "");
            }
        });
    })

}



/**
 * Cette fonction affiche un message en cas d'erreur
 * @param {string} id l'id du tag HTML
 * @param {string} message le message à afficher 
 */
function errorMsg(tag, message) {
    tag.className = "cart__order__form__question p";
    tag.textContent = message;
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
 * Cette fonction verifie si il n ya pas e caractère autre que A-Z dans la chaine
 * @param {string} value nom ou prenom
 * @returns bool (true ou false) 
 */
function validateName(value) {

    const regex = /^[a-zA-Z]+$/;

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


function valideInformationsUser() {
    if (validateName(contact.firstName) &&
        validateName(contact.lastName) &&
        validateAdress(contact.address) &&
        validateName(contact.city) &&
        isMail(contact.email)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Cette fonction verifie si il n ya pas e caractère autre que A-Z dans la chaine
 * @param {string} value nom ou prenom
 * @returns bool (true ou false) 
 */
function validateAdress(value) {

    const regex = /^[0-9][\sa-zA-Z]+$/;

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