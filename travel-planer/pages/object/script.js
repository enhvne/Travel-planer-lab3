document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");
    const visionContainer = document.querySelector(".vision");

    let scrollAmount = 260; // Adjust scroll distance

    prevBtn.addEventListener("click", function () {
        visionContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
        visionContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});


document.addEventListener("DOMContentLoaded1", function () {
    const searchInput = document.getElementById("input_section");
    const aimagList = document.getElementById("aimagList");

    const aimags = [
        "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Говь-Алтай",
        "Говьсүмбэр", "Дархан-Уул", "Дорноговь", "Дорнод", "Дундговь",
        "Завхан", "Өвөрхангай", "Өмнөговь", "Орхон", "Сүхбаатар",
        "Сэлэнгэ", "Төв", "Увс", "Ховд", "Хөвсгөл", "Хэнтий"
    ];

    // Show all aimags when input is focused
    searchInput.addEventListener("focus", function () {
        updateAimagList("");
        aimagList.classList.add("show");
    });

    // Filter aimags when typing
    searchInput.addEventListener("input", function () {
        updateAimagList(this.value);
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !aimagList.contains(event.target)) {
            aimagList.classList.remove("show");
        }
    });

    // Select an aimag
    aimagList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            searchInput.value = event.target.textContent;
            aimagList.classList.remove("show");
        }
    });

    function updateAimagList(filter) {
        aimagList.innerHTML = ""; // Clear list
        const filteredAimags = aimags.filter(aimag =>
            aimag.toLowerCase().startsWith(filter.toLowerCase())
        );

        if (filteredAimags.length > 0) {
            filteredAimags.forEach(aimag => {
                const li = document.createElement("li");
                li.textContent = aimag;
                aimagList.appendChild(li);
            });
            aimagList.classList.add("show");
        } else {
            aimagList.classList.remove("show");
        }
    }
});


function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.style.opacity = '0'; // Зураг солигдох үед бага зэрэг fade effect хийх
    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '1';
    }, 10); // 0.3 секунд хүлээгээд шинэ зургийг харуулна
}
