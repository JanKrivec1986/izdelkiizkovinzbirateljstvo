document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;
    let lang = 'si';

    if (path.includes('/en/')) lang = 'en';
    if (path.includes('/de/')) lang = 'de';

    const page = path.split("/").pop().replace(".html", "");

    fetch('../products.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            if (!container) return;

            const filteredProducts = page === "index"
                ? products
                : products.filter(p => p.category === page || p.category === translateCategory(page));

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product';

                card.innerHTML = `
                    <img src="../${product.image}" alt="${product.name[lang]}">
                    <h3>${product.name[lang]}</h3>
                    <p>${product.description[lang]}</p>
                    <p class="price">${product.price.toFixed(2)} €</p>
                `;

                container.appendChild(card);
            });
        });

    function translateCategory(page) {
        const map = {
            castings: 'odlitki',
            jewelry: 'nakit',
            coins: 'kovanci',
            collectibles: 'zbirateljski',
            guss: 'odlitki',
            schmuck: 'nakit',
            muenzen: 'kovanci',
            sammlerstuecke: 'zbirateljski'
        };
        return map[page];
    }
});
