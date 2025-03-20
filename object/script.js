document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".previous");
    const nextBtn = document.querySelector(".next");
    const visionContainer = document.querySelector(".vision");

    let scrollAmount = 160; // Adjust scroll distance

    prevBtn.addEventListener("click", function () {
        visionContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
        visionContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});
