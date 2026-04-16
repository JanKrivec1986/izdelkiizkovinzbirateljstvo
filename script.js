document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    // 🌍 DETEKCIJA JEZIKA
    let lang = "si";
    if (path.includes("/en/")) lang = "en";
    if (path.includes("/de/")) lang = "de";

    // 📄 IME STRANI (odlitki.html → odlitki)
    const page = path.split("/").pop().replace(".html", "");

    // 📁 POT DO JSON (VAŽNO ZA GITHUB PAGES)
    const isSubfolder = path.includes("/en/") || path.includes("/de/");
    const jsonPath = isSubfolder ? "../products.json" : "products.json";

    // 🧠 MAPA KATEGORIJ (SI / EN / DE)
    const categoryMap = {
        // 🇸🇮
        odlitki: "odlitki",
        nakit: "nakit",
        kovanci: "kovanci",
        zbirateljski: "zbirateljski",

        // 🇬🇧
        castings: "odlitki",
        jewelry: "nakit",
        coins: "kovanci",
        collectibles: "zbirateljski",

        // 🇩🇪
        guss: "odlitki",
        schmuck: "nakit",
        muenzen: "kovanci",
        sammlerstuecke: "zbirateljski"
    };

    const category = categoryMap[page];

    const container = document.getElementById("products-container");
    if (!container) return;

    fetch(jsonPath)
        .then(res => {
            if (!res.ok) {
                throw new Error("Ne najdem products.json");
            }
            return res.json();
        })
        .then(products => {

            // 🧹 filtriranje
            const filteredProducts = category
                ? products.filter(p => p.category === category)
                : products;

            // ❗ če ni izdelkov
            if (filteredProducts.length === 0) {
                container.innerHTML = `<p>Trenutno ni izdelkov v tej kategoriji.</p>`;
                return;
            }

            // 🧱 render kartic
            filteredProducts.forEach(product => {

                const card = document.createElement("div");
                card.className = "product";

                // 🧾 prevodi iz JSON (če obstajajo)
                const name = typeof product.name === "object"
                    ? product.name[lang]
                    : product.name;

                const description = typeof product.description === "object"
                    ? product.description[lang]
                    : product.description;

                // 🖼️ pot do slike
                const imagePath = isSubfolder
                    ? `../${product.image}`
                    : product.image;

                card.innerHTML = `
                    <img src="${imagePath}" alt="${name}">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p class="price">${product.price.toFixed(2)} €</p>
                    <a href="mailto:info@tvojadomena.si?subject=${encodeURIComponent(name)}">
                        <button>
                            ${lang === "si" ? "Povpraševanje" : lang === "en" ? "Inquiry" : "Anfrage"}
                        </button>
                    </a>
                `;

                container.appendChild(card);
            });

        })
        .catch(err => {
            console.error("Napaka:", err);
            container.innerHTML = "<p>Napaka pri nalaganju izdelkov.</p>";
        });

});
