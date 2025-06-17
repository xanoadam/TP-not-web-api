window.addEventListener('DOMContentLoaded', () => {
    const orderId = localStorage.getItem('orderID');
    document.querySelector('.thx').innerHTML = `Merci pour votre commande voici votre numéro de commande <strong>${orderId}</strong>`

    document.querySelector("#index").addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    })
});

