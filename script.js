document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    // 🌍 JEZIK
    let lang = "si";
    if (path.includes("/en/")) lang = "en";
    if (path.includes("/de/")) lang = "de";

    const file = path.split("/").pop().replace(".html", "");

    // 🧠 MAPA STRANI
    const pageMap = {
        // SI
        odlitki: "odlitki",
        nakit: "nakit",
        kovanci: "kovanci",
        zbirateljski: "zbirateljski",

        // EN
        castings: "odlitki",
        jewelry: "nakit",
        coins: "kovanci",
        collectibles: "zbirateljski",

        // DE
        guss: "odlitki",
        schmuck: "nakit",
        muenzen: "kovanci",
        sammlerstuecke: "zbirateljski"
    };

    const category = pageMap[file];

    const isSub = path.includes("/en/") || path.includes("/de/");
    const jsonPath = isSub ? "../products.json" : "products.json";

    const container = document.getElementById("products-container");
    if (!container) return;

    fetch(jsonPath)
        .then(res => res.json())
        .then(products => {

            const filtered = category
                ? products.filter(p => p.category === category)
                : products;

            container.innerHTML = "";

            filtered.forEach(p => {

                const name = typeof p.name === "object" ? p.name[lang] : p.name;
                const desc = typeof p.description === "object" ? p.description[lang] : p.description;

                const img = isSub ? `../${p.image}` : p.image;

                container.innerHTML += `
                    <div class="product">
                        <img src="${img}">
                        <h3>${name}</h3>
                        <p>${desc}</p>
                        <strong>${p.price} €</strong>
                    </div>
                `;
            });

        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Napaka pri nalaganju izdelkov.</p>";
        });

});
