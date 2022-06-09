/**Déclaration d'une class pour povoir construire les items */

let total = 0;
let totalQuantity = 0;


//get cart prend les informations du local storage

let carts = getCart();
let productIds = [];
let element = new HtmlTag();

//Boucle for of pour recuperer les id et envoyer au backend 

if (carts[0] !== undefined) {
    for (const cart of carts) {
        fetch("http://localhost:3000/api/products/" + cart.id).then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function(value) {
                let product = value;

                /**Stockage des id dans un tableau */
                productIds.push(cart.id);

                let cart__items = document.getElementById("cart__items");


                /**Creation de la balise <article> */
                let article = element.create("article", { "data-id": cart.id, "data-color": cart.color }, "cart__item", );
                cart__items.appendChild(article);

                /**Creation de la balise <div> */
                let newDiv = element.create("div", "", "cart__item__img");
                article.appendChild(newDiv);


                /**Creation de l'image */
                let newImage = element.create("img", { src: product.imageUrl, alt: product.altTxt }, "cart__item__content");
                newDiv.appendChild(newImage);

                /**Creation de la balise div d'items */
                let divItemContent = element.create("div", {},
                    "cart__item__content");
                article.appendChild(divItemContent);

                /**Creation de la balise div de description */
                let divItemDescription = element.create("div", {},
                    "cart__item__content__description");
                divItemContent.appendChild(divItemDescription);

                /**Creation de la balise h2 */
                let newH2 = element.create("h2", {}, "", product.name);
                divItemDescription.appendChild(newH2);

                /**Balise p color */
                let newPColor = element.create("p", {}, "", cart.color);
                divItemDescription.appendChild(newPColor);

                /**Balise p prix */
                let newPrice = element.create("p", {}, "", product.price + " €");
                divItemDescription.appendChild(newPrice);


                let divItemSettings = element.create("div", {}, "cart__item__content__settings");
                divItemContent.appendChild(divItemSettings);

                let divItemSettingsQuantity = element.create("div", {}, "cart__item__content__settings__quantity");
                divItemSettings.appendChild(divItemSettingsQuantity);

                let newPQuantity = element.create("p", {}, "", "Qté :");
                divItemSettingsQuantity.appendChild(newPQuantity);

                let newObject = {
                    type: "number",
                    name: "itemQuantity",
                    min: "1",
                    max: "100",
                    value: cart.quantity
                };
                let newInput = element.create("input",
                    newObject,
                    "itemQuantity");
                divItemSettingsQuantity.appendChild(newInput);

                let divItemSettingsDelete = element.create("div", {}, "cart__item__content__settings__delete");
                divItemSettings.appendChild(divItemSettingsDelete);


                let Pdelete = element.create("p", {}, "deleteItem", "Supprimer");
                divItemSettingsDelete.appendChild(Pdelete);


                /**
                 * Supprimer un item
                 */
                //let articleTest = document.querySelectorAll('article.cart__item');
                let deleteItem = document.querySelectorAll("div.cart__item__content__settings__delete > p");

                let changeQuantity = document.querySelectorAll("div.cart__item__content__settings__quantity > input");;

                changeQuantity.forEach(element => {
                    element.addEventListener("change", (e) => {
                        e.stopPropagation;
                        let newQuantity = e.target.value;
                        let sku = findParentNodeId(element);

                        if (sku !== false) {
                            updateProductCartQuantity(sku, newQuantity);
                        }
                        reloadPage();
                    })
                });

                //supression d'un élément
                remove(deleteItem);

                /**
                 * Calcule du prix total 
                 * Calcule du nombre d'articles dans le panier
                 */
                if (cart.quantity > 1) {
                    total = (total + (product.price * cart.quantity));
                } else {
                    total += product.price;
                }

                totalQuantity = totalQuantity + parseInt(cart.quantity);
                document.getElementById("totalQuantity").textContent = totalQuantity;
                document.getElementById("totalPrice").textContent = total;
            })
    }

} else { /**Ici on gère le cas où le panier serai vide */
    let cartAndFormContainer = document.getElementById("cartAndFormContainer");
    let panierVide = element.create("p", { "style": "text-align: center" }, "", "votre panier est vide"); //<p style="text-align: center">votre panier est Vide</p>

    /**Ici on enleve du DOM toute la partie cart */
    let cartSectionNode = document.querySelector("section.cart");
    cartAndFormContainer.removeChild(cartSectionNode);

    cartAndFormContainer.insertBefore(panierVide, cartAndFormContainer.children[1]);
}

/** Envoie e la commande et récupération des informations de l'API*/