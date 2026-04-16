document.addEventListener('DOMContentLoaded', function () {
    const page = window.location.pathname.split("/").pop().replace(".html", "");

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            if (!container) return;

            const filteredProducts = page === "index"
                ? products
                : products.filter(p => p.category === page);

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product';

                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">${product.price.toFixed(2)} €</p>
                    <a href="mailto:info@tvojadomena.si?subject=Povpraševanje za ${encodeURIComponent(product.name)}">
                        <button>Povpraševanje</button>
                    </a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Napaka:', error));
});
