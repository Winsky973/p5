let id = getParamUrl('id');

if (!id) {
    document.querySelector('div.confirmation p').innerHTML = "Vous n'avez pas passser de commande";
} else {
    document.getElementById('orderId').textContent = id;
    setCart([]);
}