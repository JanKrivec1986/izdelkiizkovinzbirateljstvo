
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname;

    // Določitev jezika
    let lang = 'si';
    if (path.includes('/en/')) lang = 'en';
    if (path.includes('/de/')) lang = 'de';

    // Določitev poti do JSON datoteke
    const jsonPath = (path.includes('/en/') || path.includes('/de/'))
        ? '../products.json'
        : 'products.json';

    // Določitev kategorije glede na ime strani
    const page = path.split('/').pop().replace('.html', '');

    const categoryMap = {
        // Slovensko
        odlitki: 'odlitki',
        nakit: 'nakit',
        kovanci: 'kovanci',
        zbirateljski: 'zbirateljski',

        // Angleško
        castings: 'odlitki',
        jewelry: 'nakit',
        coins: 'kovanci',
        collectibles: 'zbirateljski',

        // Nemško
        guss: 'odlitki',
        schmuck: 'nakit',
        muenzen: 'kovanci',
        sammlerstuecke: 'zbirateljski'
    };

    const category = categoryMap[page];

    fetch(jsonPath)
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            if (!container) return;

            const filteredProducts = category
                ? products.filter(p => p.category === category)
                : products;

            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product';

                const name = typeof product.name === 'object'
                    ? product.name[lang]
                    : product.name;

                const description = typeof product.description === 'object'
                    ? product.description[lang]
                    : product.description;

                const imagePath = (path.includes('/en/') || path.includes('/de/'))
                    ? `../${product.image}`
                    : product.image;

                card.innerHTML = `
                    <img src="${imagePath}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p class="price">${product.price.toFixed(2)} €</p>
                    <a href="mailto:info@tvojadomena.si?subject=${encodeURIComponent(name)}">
                        <button>${lang === 'si' ? 'Povpraševanje' : lang === 'en' ? 'Inquiry' : 'Anfrage'}</button>
                    </a>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Napaka pri nalaganju izdelkov:', error));
});
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
