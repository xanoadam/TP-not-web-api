import api from './api.js';

function AddCameraToCart(id) {
    const cameraInCart = localStorage.getItem('cameraInCart');

    let cameraIDs;

    if (cameraInCart) {
        cameraIDs = JSON.parse(cameraInCart);
    } else {
        cameraIDs = [];
    }

    if (!cameraIDs.includes(id)) {
        cameraIDs.push(id);
    }

    localStorage.setItem('cameraInCart', JSON.stringify(cameraIDs));
}

async function GetCamerasByID(id) {
    let res = await fetch(`${api.api}/${id}`);
    let data = await res.json();
    return data;
}

export { AddCameraToCart, GetCamerasByID };