document.addEventListener("DOMContentLoaded", () => {
    // Зүрхний товч дарахад өнгө өөрчлөх
    document.querySelectorAll(".heart-icon").forEach(heart => {
        heart.addEventListener("click", () => {
            heart.classList.toggle("active");
            const icon = heart.querySelector("i");
            if (heart.classList.contains("active")) {
                icon.classList.remove("far");
                icon.classList.add("fas");
            } else {
                icon.classList.remove("fas");
                icon.classList.add("far");
            }
        });
    });

    // Галлерей зураг дээр ирэхэд томруулах эффект
    document.querySelectorAll(".gallery-img").forEach(img => {
        img.addEventListener("mouseover", () => {
            img.style.transform = "scale(1.1)";
            img.style.transition = "0.3s ease-in-out";
        });
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)";
        });
    });

    // Хайлт хийх (Байршилд тулгуурласан)
    const searchInput = document.querySelector(".search-input");
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll(".gallery-item").forEach(item => {
            const locationText = item.querySelector(".location").textContent.toLowerCase();
            if (locationText.includes(searchText)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Хуудас солих (Pagination)
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next-btn");
    let currentPage = 1;

    nextBtn.addEventListener("click", () => {
        dots.forEach(dot => dot.classList.remove("active"));
        currentPage = (currentPage % dots.length) + 1;
        dots[currentPage - 1].classList.add("active");
    });
});
