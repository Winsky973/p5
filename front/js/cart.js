/**Déclaration d'une class pour povoir construire les items */


/**Déclations des variables */
//  let contact = {};


/**traitement des informations utilisateur */
let cart__order__form = document.querySelectorAll('form.cart__order__form > div > input');
console.log(cart__order__form);



let total = 0,
    totalQuantity = 0;

/**
 * get cart prend les informations du local storage
 */
let carts = getCart('cart');
let productsId = [];


/**
 * Boucle for of pour recuperer les id et envoyer au backend 
 */

if (carts !== null) {
    for (const cart of carts.items) {
        fetch("http://localhost:3000/api/products/" + cart.id).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                let product = value;
                //console.log(products);
                /**Stockagedes id dans un tableau */
                productsId.push(cart.id);

                let cart__items = document.getElementById('cart__items');

                let element = new HtmlTag();

                /**Creation de la balise <article> */
                let article = element.create('article', '', 'cart__item', '');
                article.setAttribute("data-id", cart.id);
                article.setAttribute("data-color", cart.color);
                cart__items.appendChild(article);

                /**Creation de la balise <div> */
                let newDiv = element.create('div', '', 'cart__item__img', '');
                article.appendChild(newDiv);


                /**Creation de l'image */
                let newImage = element.create('img', { src: product.imageUrl, alt: product.altTxt }, 'cart__item__content', '');
                newDiv.appendChild(newImage);

                /**Creation de la balise div d'items */
                let divItemContent = element.create('div', {}, 'cart__item__content', '');
                article.appendChild(divItemContent);

                /**Creation de la balise div de description */
                let divItemDescription = element.create('div', {}, 'cart__item__content__description', '');
                divItemContent.appendChild(divItemDescription);

                /**Creation de la balise h2 */
                let newH2 = element.create('h2', {}, '', product.name);
                divItemDescription.appendChild(newH2);

                /**Balise p color */
                let newPColor = element.create('p', {}, '', product.color);
                divItemDescription.appendChild(newPColor);

                /**Balise p prix */
                let newPrice = element.create('p', {}, '', product.price + ' €');
                divItemDescription.appendChild(newPrice);


                let divItemSettings = element.create('div', {}, 'cart__item__content__settings', '');
                divItemContent.appendChild(divItemSettings);

                let divItemSettingsQuantity = element.create('div', {}, 'cart__item__content__settings__quantity', '');
                divItemSettings.appendChild(divItemSettingsQuantity);

                let newPQuantity = element.create('p', {}, '', 'Qté :');
                divItemSettingsQuantity.appendChild(newPQuantity);

                let newObject = { type: "number", name: "itemQuantity", min: "1", max: "100", value: cart.quantity };
                let newInput = element.create('input', newObject, "itemQuantity", '');
                divItemSettingsQuantity.appendChild(newInput);

                let divItemSettingsDelete = element.create('div', {}, "cart__item__content__settings__delete", '');
                divItemSettings.appendChild(divItemSettingsDelete);


                let Pdelete = element.create('p', {}, "deleteItem", 'Supprimer');
                divItemSettingsDelete.appendChild(Pdelete);


                /**
                 * Supprimer un item
                 */
                let articleTest = document.querySelector('article.cart__item');
                let dataId = articleTest.dataset.id;
                let dataColor = articleTest.dataset.color;
                let deleteItem = document.querySelector("div.cart__item__content__settings__delete > p");
                let nodeParent = deleteItem.parentNode.closest('article');

                //console.log(nodeParent);


                deleteItem.addEventListener('click', function(e) {
                    nodeParent.remove();
                });


                /**
                 * Calcule du prix total 
                 * Calcule du nombre d'articles dans le panier
                 */


                if (product.quantity > 1) {
                    total = (total + (product.price * product.quantity));
                } else {
                    total += product.price;
                }

                totalQuantity = totalQuantity + parseInt(product.quantity);
            })
    }

    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = total;


} else {
    alert(`vous n'avez choisis aucun produit`);
}


let articleNode = document.querySelectorAll("section#cart__items > article");

console.log(articleNode);




/** Envoie de la commande et récupération des informations de l'API*/


async function sendCommand() {
    await getUserinformations()
        .then(function(data) {

            alert(JSON.stringify({ contact: data, products: productsId }));

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
                        console.log('res : ', res);
                        return res.json();
                    }
                })
                .then(function(value) {
                    console.log('valeur : ', value.contact);
                    for (product_api of value.products) {
                        console.log('product_api : ', product_api);
                    }
                    console.log('productsID : ', value.orderId);

                    alert('valeur : ' + value);

                    location.href = `confirmation.html?id=${value.orderId}&firstName=${value.contact.firstName}&lastName=${value.contact.lastName}&address=${value.contact.adress}&city=${value.contact.city}&email=${value.contact.email}`;
                })
                .catch(function(err) {
                    alert('error fetch : ' + err);
                })

        })
        .catch(function(err) {
            alert('error send' + err);
        })
}