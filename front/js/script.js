fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
        return res.json();
    }
})

.then(function(value) {
    let element = new HtmlTag();
    let products = value;
    let items = document.getElementById("items");
    for (product of products) {
        console.log(products);

        /**
         * Création de la balise a
         */
        let newA = element.create("a", { href: "./product.html?id=" + product._id }, "", "");
        items.appendChild(newA);

        /**
         * Creation des balise articles
         */
        let newArticle = element.create("article", {}, "", "");
        newA.appendChild(newArticle);

        /**
         * creation des images
         */
        let newImg = element.create("img", { src: product.imageUrl, alt: product.altTxt }, "", "");
        newArticle.appendChild(newImg);

        /**
         * Creation des h3
         */
        let newH3 = element.create("h3", {}, "productName", product.name);
        newArticle.appendChild(newH3);

        /**
         * Création des <p>
         */
        let newP = element.create("p", {}, "productDescription", product.description);
        newArticle.appendChild(newP);

    }
})

.catch(function(err) {
    console.log("error");
    console.log(err);
});