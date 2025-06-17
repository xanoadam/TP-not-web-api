import api from './api.js';

let cameraHTML = '';
let totalPrice = 0;

let cameraInCart = JSON.parse(localStorage.getItem('cameraInCart'));
console.log(cameraInCart);


async function LoadCart() {
    if (cameraInCart.length === 0) {
        querySelector('empty').innerHTML = "Panier vide !";
    }
    else {
        for (let camera of cameraInCart) {
            const response = await fetch(`${api.api}/${camera}`);
            const data = await response.json();

            cameraHTML += `
                <div class="product">
                    <img src="${data.imageUrl}" alt="${data.name}">
                    <div class="product-text">
                        <div class="product-details">
                            <p class="product-name">${data.name}</p>
                            <p class="product-desc">${data.description}</p>
                            <p class="product-price">${data.price / 100} €</p>
                        </div>
                    </div>
                </div>`;

            totalPrice += data.price / 100;
        }
    }
    document.querySelector('.products').innerHTML = cameraHTML;
    document.querySelector('.total').innerHTML = `<p class="totalprice">${totalPrice} €</p>`;
}

async function PostOrder() {
    let prenom = document.querySelector('#firstName').value;
    let nom = document.querySelector('#lastName').value;
    let adresse = document.querySelector('#address').value;
    let ville = document.querySelector('#city').value;
    let mail = document.querySelector('#email').value;

    let ordertmp =
    {
        "contact": {
            "firstName": prenom,
            "lastName": nom,
            "address": adresse,
            "city": ville,
            "email": email
        },
        "products": cameraInCart
    };


    try {
        const response = await fetch(`${api.api}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ordertmp)
        });

        if (!response.ok) {
            throw new Error("Erreur dans la commande !");
            document.querySelector('.validate-form').addEventListener('click', () => {
                window.alert('Merci de remplir vos informations pour la commande');
            })
        }

        const data = await response.json();
        localStorage.setItem('orderID', data.orderId);
        window.location.href = 'confirmation.html';
    } catch (e) {
        console.error(e);
    }

}


document.querySelector('.validate-form').addEventListener('click', PostOrder)

window.addEventListener("DOMContentLoaded", LoadCart);
