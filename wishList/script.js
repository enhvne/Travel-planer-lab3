function initMap() {
    const locations = [
        { name: "Chandmani", lat: 48.0, lng: 96.0, color: "blue" },
        { name: "Erdenekhairkhan", lat: 47.5, lng: 95.8, color: "red" },
        { name: "Buga", lat: 47.3, lng: 95.5, color: "red" },
        { name: "Zavhanmandal", lat: 47.1, lng: 95.2, color: "red" },
        { name: "Sanmargats", lat: 46.9, lng: 95.0, color: "red" },
        { name: "Tsestsen-Uul", lat: 46.7, lng: 94.8, color: "red" }
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 47.5, lng: 95.5 },
    });

    locations.forEach(location => {
        new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            title: location.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: location.color,
                fillOpacity: 1,
                strokeWeight: 1,
            },
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const sortBtn = document.getElementById("sortBtn");
    const sortOptions = document.getElementById("sortOptions");

    // Toggle dropdown on button click
    sortBtn.addEventListener("click", function () {
        sortOptions.classList.toggle("show");
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!sortBtn.contains(event.target) && !sortOptions.contains(event.target)) {
            sortOptions.classList.remove("show");
        }
    });

    // Handle selection
    sortOptions.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            sortBtn.textContent = "Sort by: " + event.target.textContent;
            sortOptions.classList.remove("show");

            // Handle sorting logic here (e.g., sort items based on selected value)
            console.log("Selected:", event.target.dataset.value);
        }
    });
});

