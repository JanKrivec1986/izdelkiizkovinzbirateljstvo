document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

// 🌍 DETEKCIJA JEZIKA
let lang = "si";
if (path.includes("/en/")) lang = "en";
if (path.includes("/de/")) lang = "de";

// 📄 trenutna stran
const file = path.split("/").pop().replace(".html", "");

// 🧠 mapiranje strani (ISTO POVSOD)
const pageMap = {
    odlitki: "odlitki",
    nakit: "nakit",
    kovanci: "kovanci",
    zbirateljski: "zbirateljski",
    kontakt: "kontakt"
};

const category = pageMap[file];

// 📦 JSON pot (FIX ZA GITHUB)
const jsonPath = path.includes("/en/") || path.includes("/de/")
    ? "../products.json"
    : "products.json";

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
