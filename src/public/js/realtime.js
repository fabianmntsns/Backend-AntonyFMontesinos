

 const socketClient = io()


document.getElementById('createBtn').addEventListener('click', () => {
    const body = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        category: document.getElementById('category').value,
    }
    fetch('/api/products', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error(result.error)
    })
    .then(() => fetch('/api/products'))
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error(result.error)
        socketClients.emit('productList', result.payload)
        alert('Producto Agregado')
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('price').value = ''
        document.getElementById('code').value = ''
        document.getElementById('stock').value = ''
        document.getElementById('category').value = ''
    })
    .catch(err => alert(`Ocurrió un error ${err}`))
})

deleteProduct = (id) => {
    fetch(`/api/products/${id}`,{
        method: 'delete',
    })
    .then(result => result.json())
    .then(result => {
        if(result.status === 'error') throw new Error (result.error)
        socketClient.emit('productList', result.payload)
        alert('Producto eliminado con exito')
    })
    .catch(err => alert(`Ocurrió un error ${err}`))
    
}


socketClient.on("updatedProducts", data => {
    const productsContainer = document.querySelector('.bodyRealTimeProducts'); 
    productsContainer.innerHTML = ''; 

    data.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('CardItem');  
        div.innerHTML = `
            <div>
                <h2 class="ItemHeader">
                   ${product.title}
                </h2>
            </div>
            <div>
                <img class="ItemImg" src="${product.thumbnail}" alt="">
            </div>
            <div>
                <p class="Info">
                ${product.description}</p>
            </div>
            <div> 
                <p class="Info">
                Precio: ${product.price}</p>
            </div>
            <button type="button" class="btn custom-button-delete" onclick="deleteProduct(${product.id})">Eliminar Producto</button>
        `;
        productsContainer.appendChild(div);
    });
});
