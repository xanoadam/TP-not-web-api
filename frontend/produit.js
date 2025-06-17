import api from './api.js';
import { AddCameraToCart, GetCamerasByID } from './utilities.js';

const cameraID = localStorage.getItem('cameraID');

async function GetCamerasLensesByID(id) {
    let res = await fetch(`${api.api}/${id}`);
    let data = await res.json();
    return data.lenses;
}

document.addEventListener('DOMContentLoaded', async () => {
    let data = await GetCamerasByID(cameraID);
    let productHTML = '';
    document.querySelector('title').innerHTML = data.name;

    productHTML = `<img src="${data.imageUrl}" alt="${data.name}">
                    <div class="product-text">
                        <div class="product-details">
                            <p class="product-name">${data.name}</p>
                            <p class="product-desc">${data.description}</p>
                            <p class="product-price">${data.price / 100} €</p>
                            <select class="lenses"></select>
                        </div>                        
                    </div>`
    document.querySelector('.product').innerHTML = productHTML;

    let dataLenses = await GetCamerasLensesByID(cameraID);

    let lensesHTML = '';

    for (let i = 0; i < dataLenses.length; i++) {
        lensesHTML += `<option value="${dataLenses[i]}">${dataLenses[i]}</option>`;
    }

    document.querySelector('.lenses').innerHTML = lensesHTML;
})

document.querySelector('.cart').addEventListener('click', () => {
    AddCameraToCart(cameraID);
    window.alert('Produit ajouté au panier')
    window.location.href = 'index.html'
})