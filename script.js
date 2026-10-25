
"use strict";

// =========================
// 1. MENU DE NAVIGATION
// =========================

const boutonMenu = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

boutonMenu.addEventListener("click", function () {
    const menuOuvert = navigation.classList.toggle("ouverte");

    boutonMenu.setAttribute("aria-expanded", menuOuvert);
    boutonMenu.setAttribute(
        "aria-label",
        menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
    );
});

navigation.querySelectorAll("a").forEach(function (lien) {
    lien.addEventListener("click", function () {
        navigation.classList.remove("ouverte");
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.setAttribute("aria-label", "Ouvrir le menu");
    });
});

// =========================
// 2. FILTRAGE DES PRODUITS
// =========================

const boutonsFiltres = document.querySelectorAll(".filtre");
const produits = document.querySelectorAll(".produit");
const champRecherche = document.getElementById("recherche");
const formulaireRecherche = document.getElementById("recherche-form");
const messageResultat = document.getElementById("resultat-recherche");
const messageVide = document.getElementById("aucun-produit");

let categorieActive = "tous";

function afficherProduits() {
    const terme = champRecherche.value.trim().toLowerCase();
    let nombreVisible = 0;

    produits.forEach(function (produit) {
        const categorie = produit.dataset.categorie;
        const nom = produit.dataset.nom.toLowerCase();
        const texte = produit.textContent.toLowerCase();

        const correspondCategorie =
            categorieActive === "tous" ||
            categorie === categorieActive;

        const correspondRecherche =
            terme === "" ||
            nom.includes(terme) ||
            texte.includes(terme);

        const visible = correspondCategorie && correspondRecherche;

        produit.hidden = !visible;

        if (visible) {
            nombreVisible++;
        }
    });

    messageVide.hidden = nombreVisible !== 0;

    messageResultat.textContent =
        nombreVisible + (nombreVisible > 1
            ? " vêtements affichés."
            : " vêtement affiché.");
}

boutonsFiltres.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        categorieActive = bouton.dataset.categorie;

        boutonsFiltres.forEach(function (element) {
            element.classList.remove("actif");
        });

        bouton.classList.add("actif");
        afficherProduits();
    });
});

// =========================
// 3. RECHERCHE
// =========================

champRecherche.addEventListener("input", afficherProduits);

formulaireRecherche.addEventListener("submit", function (event) {
    event.preventDefault();
    afficherProduits();
});

// =========================
// 4. DETAILS D'UN PRODUIT
// =========================

const fenetreDetails = document.getElementById("fenetre-details");
const titreDetails = document.getElementById("details-titre");
const descriptionDetails =
    document.getElementById("details-description");
const boutonFermer = document.getElementById("fermer-details");

document.querySelectorAll(".details").forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        titreDetails.textContent = bouton.dataset.nom;
        descriptionDetails.textContent = bouton.dataset.description;

        fenetreDetails.showModal();
    });
});

boutonFermer.addEventListener("click", function () {
    fenetreDetails.close();
});

// =========================
// 5. FORMULAIRE DE CONTACT
// =========================

const formulaireContact = document.getElementById("form-contact");
const confirmation = document.getElementById("confirmation");

formulaireContact.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!formulaireContact.checkValidity()) {
        formulaireContact.reportValidity();
        return;
    }

    const nom = document.getElementById("nom").value.trim();

    confirmation.textContent =
        "Merci " + nom +
        " ! Votre formulaire a été validé dans cette démonstration.";

    formulaireContact.reset();
});

// =========================
// 6. ANNEE AUTOMATIQUE
// =========================

document.getElementById("annee").textContent =
    new Date().getFullYear();

// Affichage initial des produits
afficherProduits();
