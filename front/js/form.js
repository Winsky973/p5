/**
 * 
 * Gestion de la parti de récuperation des entrées utilisateur dans la partie commande des produits
 * 
 */

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');






function showError(value) {
    if (value.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        value.textContent = 'You need to enter an e-mail address.';
    } else if (value.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        value.textContent = 'Entered value needs to be an e-mail address.';
    }

    // Set the styling appropriately
    value.className = 'cart__order__form__question p';
}

/**
 * cette fonction va send la commande a l'API et construire l'url qui sera envoyé a la page de confirmation
 */
async function prepareOrder() {
    let contact = await getUserinformations();

    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
            alert('error fetch : ' + err);
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

    firstName.addEventListener('change', function(event) {
        // Each time the user types something, we check if the
        // form fields are valid.
        console.log('validateName(firstName.value) : ', validateName(firstName.value))

        if (validateName(firstName.value)) {
            console.log('ok pour le nom');
        } else {
            // If there is still an error, show the correct error
            errorMsg(firstNameErrorMsg, 'Rentrez un prénom correct');
            //showError(firstName); 
        }
    });

    lastName.addEventListener('change', function(event) {
        // Each time the user types something, we check if the
        // form fields are valid.

        if (validateName(lastName.value)) {
            console.log('ok pour le nom');
        } else {
            // If there is still an error, show the correct error
            errorMsg(lastNameErrorMsg, 'Rentrez un prénom correct');
            //showError(firstName);

        }
    });



    address.addEventListener('change', function(event) {
        // Each time the user types something, we check if the
        // form fields are valid.

        if (validateAdress(address.value)) {
            console.log('ok pour l adress');

        } else {
            // If there is still an error, show the correct error
            errorMsg(addressErrorMsg, 'Rentrez une adresse correct');
            //showError();
        }
    });




    city.addEventListener('change', function(event) {
        // Each time the user types something, we check if the
        // form fields are valid.

        if (validateName(city.value)) {
            console.log('ok pour la ville');

        } else {
            // If there is still an error, show the correct error
            errorMsg(cityErrorMsg, 'Rentrez une ville correct');
            //showError();
        }
    });


    email.addEventListener('input', function(event) {
        // Each time the user types something, we check if the
        // form fields are valid.

        if (isMail(email.value)) {
            console.log('ok pour le mail');

        } else {
            errorMsg(emailErrorMsg, 'Rentrez un mail correct');
            event.addEventLisener();
            // If there is still an error, show the correct error
            //showError();
        }
    });

    contact = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'address': address.value,
        'city': city.value,
        'email': email.value,
    };

    console.log(contact);
    return contact;
}






/**
 * Cette fonction affiche un message en cas d'erreur
 * @param {string} id l'id du tag HTML
 * @param {string} message le message a afficher 
 */
function errorMsg(tag, message) {
    tag.className = 'cart__order__form__question p';
    tag.textContent = message;
}


/**
 * Cette fonction vérifie si la chaine recu est au bon format mail  
 *
 * @param {string} inputValue chaine de caractère
 * @returns bool (true ou false) 
 */
function isMail(value) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let test = value.match(regex) ? true : false;

    if (!test) {
        return false;
        alert("You have entered an invalid email address!")

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
        console.log('chaine vide');
    }

    let test = value.match(regex) ? true : false;

    if (!test) {
        return false;
    } else {
        return true;
    }
}


function valideInformationsUser() {
    if (validateName(contact.firstName) && validateName(contact.lastName) && validateAdress(contact.address) && validateName(contact.city) && isMail(contact.email)) {
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
        console.log('chaine vide');
    }

    let test = value.match(regex) ? true : false;

    if (!test) {
        return false;
    } else {
        return true;
    }
}