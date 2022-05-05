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
    let products = JSON.parse(localStorage.getItem('objetKanape'));

    let cart__items = document.getElementById('cart__items');

    /**Creation de la balise <article> */
    let article = createElement('article', '', 'cart__item', '');
    article.setAttribute("data-id", products.id);
    article.setAttribute("data-color", products.color);
    cart__items.appendChild(article);


    /**Creation de la balise <div> */
    let newDiv = createElement('div', '', 'cart__item__img', '');
    article.appendChild(newDiv);

    /**Creation de l'image */
    let newImage = createElement('img', { src: products.imageUrl, alt: products.altTxt }, 'cart__item__content', '');

    newDiv.appendChild(newImage);

    /**Creation de la balise div d'items */
    let divItemContent = createElement('div', {}, 'cart__item__content', '');
    article.appendChild(divItemContent);

    /**Creation de la balise div de description */
    let divItemDescription = createElement('div', {}, 'cart__item__content__description', '');
    divItemContent.appendChild(divItemDescription);

    /**Creation de la balise h2 */
    let newH2 = createElement('h2', {}, '', products.name);
    divItemDescription.appendChild(newH2);

    /**Balise p color */
    let newPColor = createElement('p', {}, '', products.color);
    divItemDescription.appendChild(newPColor);

    /**Balise p prix */
    let newPrice = createElement('p', {}, '', products.price + ' €');
    divItemDescription.appendChild(newPrice);


    let divItemSettings = createElement('div', {}, 'cart__item__content__settings', '');
    divItemContent.appendChild(divItemSettings);

    let divItemSettingsQuantity = createElement('div', {}, 'cart__item__content__settings__quantity', '');
    divItemSettings.appendChild(divItemSettingsQuantity);

    let newPQuantity = createElement('p', {}, '', 'Qté :');
    divItemSettingsQuantity.appendChild(newPQuantity);

    let newObject = { type: "number", name: "itemQuantity", min: "1", max: "100", value: products.quantity };
    let newInput = createElement('input', newObject, "itemQuantity", '');
    divItemSettingsQuantity.appendChild(newInput);

    let divItemSettingsDelete = createElement('div', {}, "cart__item__content__settings__delete", '');
    divItemSettings.appendChild(divItemSettingsDelete);


    let Pdelete = createElement('p', {}, "deleteItem", 'Supprimer');
    divItemSettingsDelete.appendChild(Pdelete);


}


function createElement(tag, attr, addClass, textContent) {
    let element = document.createElement(tag);
    if (attr === undefined) {
        console.log('lol');
    } else {
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