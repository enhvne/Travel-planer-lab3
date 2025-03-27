"use client";
import { useEffect } from "react";
import "./style.css";

export default function Wishlist() {

    useEffect(() => {
        if (typeof window !== "undefined" && window.google) {
            initMap();
        }

        const sortBtn = document.getElementById("sortBtn");
        const sortOptions = document.getElementById("sortOptions");

        if (sortBtn && sortOptions) {
            sortBtn.addEventListener("click", function () {
                sortOptions.classList.toggle("show");
            });

            document.addEventListener("click", function (event) {
                if (!sortBtn.contains(event.target) && !sortOptions.contains(event.target)) {
                    sortOptions.classList.remove("show");
                }
            });

            sortOptions.addEventListener("click", function (event) {
                if (event.target.tagName === "LI") {
                    sortBtn.textContent = "Sort by: " + event.target.textContent;
                    sortOptions.classList.remove("show");
                    console.log("Selected:", event.target.dataset.value);
                }
            });

            return () => {
                sortBtn.removeEventListener("click", () => {});
                document.removeEventListener("click", () => {});
                sortOptions.removeEventListener("click", () => {});
            };
        }
    }, []);

    function initMap() {
        const locations = [
            { name: "Chandmani", lat: 48.0, lng: 96.0, color: "blue" },
            { name: "Erdenekhairkhan", lat: 47.5, lng: 95.8, color: "red" },
            { name: "Buga", lat: 47.3, lng: 95.5, color: "red" },
            { name: "Zavhanmandal", lat: 47.1, lng: 95.2, color: "red" },
            { name: "Sanmargats", lat: 46.9, lng: 95.0, color: "red" },
            { name: "Tsestsen-Uul", lat: 46.7, lng: 94.8, color: "red" }
        ];

        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 7,
            center: { lat: 47.5, lng: 95.5 },
        });

        locations.forEach(location => {
            new window.google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map,
                title: location.name,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: location.color,
                    fillOpacity: 1,
                    strokeWeight: 1,
                },
            });
        });
    }

    return (
        <div>
            <h1>My wishlist</h1>
            <div className="sort-container">
                <button id="sortBtn">Sort by:</button>
                <ul id="sortOptions" className="hidden">
                    <li data-value="name">Name</li>
                    <li data-value="date">Date</li>
                    <li data-value="popularity">Popularity</li>
                </ul>
            </div>

            <section className="map-container">
                <div id="map" style={{ width: "100%", height: "400px" }}></div>
            </section>

            <section className="wishlist">
                <div className="location">
                    <div className="location-header">
                        <i className="pin current-location"></i> Chandmani (location you are)
                    </div>
                </div>

                <div className="wishlist-item">
                    <i className="pin"></i>
                    <div className="info">
                        <h3>Erdenekhairkhan</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                    <img src="/images/image1.jpg" alt="Erdenekhairkhan"/>
                </div>

                <div className="wishlist-item">
                    <i className="pin"></i>
                    <div className="info">
                        <h3>Buga</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                </div>

                <div className="wishlist-item">
                    <i className="pin"></i>
                    <div className="info">
                        <h3>Zavhanmandal</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                </div>

                <div className="wishlist-item">
                    <i className="pin"></i>
                    <div className="info">
                        <h3>Sanmargats</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                </div>

                <div className="wishlist-item">
                    <i className="pin"></i>
                    <div className="info">
                        <h3>Tsestsen-Uul</h3>
                    </div>
                </div>
            </section>
        </div>
    );
}
