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
    let article = document.createElement('article');
    article.classList.add("cart__item");
    article.setAttribute("data-id", products.id);
    article.setAttribute("data-color", products.color);
    cart__items.appendChild(article);


    /**Creation de la balise <div> */
    let newDiv = document.createElement('div');
    newDiv.classList.add("cart__item__img");
    article.appendChild(newDiv);

    /**Creation de l'image */
    let newImage = document.createElement('img');
    newImage.setAttribute("src", products.imageUrl);
    newImage.setAttribute("alt", products.altTxt);
    newDiv.appendChild(newImage);

    /**Creation de la balise div d'items */
    let divItemContent = document.createElement('div');
    divItemContent.classList.add("cart__item__content");
    article.appendChild(divItemContent);

    /**Creation de la balise div de description */
    let divItemDescription = document.createElement('div');
    divItemDescription.classList.add("cart__item__content__description");
    divItemContent.appendChild(divItemDescription);

    /**Creation de la balise h2 */
    let newH2 = document.createElement('h2');
    newH2.textContent = products.name;
    divItemDescription.appendChild(newH2);

    /**Balise p color */
    let newPColor = document.createElement('p');
    newPColor.textContent = products.color;
    divItemDescription.appendChild(newPColor);

    /**Balise p prix */
    let newPrice = document.createElement('p');
    newPrice.textContent = products.price + ' €';
    divItemDescription.appendChild(newPrice);


    let divItemSettings = document.createElement('div');
    divItemSettings.classList.add("cart__item__content__settings");
    divItemContent.appendChild(divItemSettings);

    let divItemSettingsQuantity = document.createElement('div');
    divItemSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    divItemSettings.appendChild(divItemSettingsQuantity);

    let newPQuantity = document.createElement('p');
    newPQuantity.textContent = 'Qté : ';
    divItemSettingsQuantity.appendChild(newPQuantity);

    let newInput = document.createElement('input');
    newInput.classList.add("itemQuantity");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("name", "itemQuantity");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "100");
    newInput.setAttribute("value", products.quantity);
    divItemSettingsQuantity.appendChild(newInput);

    let divItemSettingsDelete = document.createElement('div');
    divItemSettingsDelete.classList.add("cart__item__content__settings__delete");
    divItemSettings.appendChild(divItemSettingsDelete);


    let Pdelete = document.createElement('p');
    Pdelete.classList.add("deleteItem");
    Pdelete.textContent = "Supprimer";
    divItemSettings.appendChild(Pdelete);
    divItemSettingsDelete.appendChild(Pdelete);


} else {
    console.log('err');
}


function createElement(tag, attr, addclass) {

}







/*
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>*/