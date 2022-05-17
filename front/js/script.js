fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
        return res.json();
    }
})

.then(function(value) {

    let products = value;
    let items = document.getElementById('items');
    for (product of products) {
        console.log(products);

        /**
         * Création de la balise a
         */
        let newA = document.createElement('a');
        newA.setAttribute("href", "./product.html?id=" + product._id);
        items.appendChild(newA);

        /**
         * Creation des balise articles
         */
        let newArticle = document.createElement('article');
        newA.appendChild(newArticle);

        /**
         * creation des images
         */
        let newImg = document.createElement('img');
        newImg.setAttribute("src", product.imageUrl);
        newImg.setAttribute("alt", product.altTxt);
        newArticle.appendChild(newImg);

        /**
         * Creation des h3
         */
        let newH3 = document.createElement('h3');
        newH3.classList.add("productName");
        newH3.textContent = product.name;
        newArticle.appendChild(newH3);


        /**
         * Création des <p>
         */
        let newP = document.createElement('p');
        newP.classList.add("productDescription");
        newP.textContent = product.description;
        newArticle.appendChild(newP);

    }
})

.catch(function(err) {
    console.log("error");
    console.log(err);
});

/*console.log(takeAllProducts);
document.getElementById("items").addEventListener("click", takeAllProducts);*/