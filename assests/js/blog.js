"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("articleSearch");
    const categoryButtons = document.querySelectorAll(".category-button");
    const articleItems = document.querySelectorAll(".article-item");
    const noResults = document.getElementById("noResults");

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("mainNavigation");
    const currentYear = document.getElementById("currentYear");

    let selectedCategory = "all";
    let searchTerm = "";

    /**
     * Filter articles by the selected category and search text.
     */
    function filterArticles() {
        let visibleArticleCount = 0;

        articleItems.forEach((article) => {
            const articleCategory =
                article.dataset.category?.toLowerCase() ?? "";

            const articleTitle =
                article.dataset.title?.toLowerCase() ?? "";

            const matchesCategory =
                selectedCategory === "all" ||
                articleCategory === selectedCategory;

            const matchesSearch =
                searchTerm === "" ||
                articleTitle.includes(searchTerm);

            const shouldDisplay = matchesCategory && matchesSearch;

            article.classList.toggle("is-hidden", !shouldDisplay);

            if (shouldDisplay) {
                visibleArticleCount += 1;
            }
        });

        if (noResults) {
            noResults.hidden = visibleArticleCount > 0;
        }
    }

    /**
     * Search form submission.
     */
    searchForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        searchTerm = searchInput.value.trim().toLowerCase();
        filterArticles();

        document
            .getElementById("articlesGrid")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /**
     * Filter immediately while typing.
     */
    searchInput?.addEventListener("input", () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        filterArticles();
    });

    /**
     * Category button filtering.
     */
    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            categoryButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category ?? "all";
            filterArticles();
        });
    });

    /**
     * Mobile navigation.
     */
    menuButton?.addEventListener("click", () => {
        const isOpen = navigation?.classList.toggle("open") ?? false;

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton?.setAttribute("aria-expanded", "false");

            if (menuButton) {
                menuButton.textContent = "☰";
            }
        });
    });

    /**
     * Automatically update footer year.
     */
    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }
});