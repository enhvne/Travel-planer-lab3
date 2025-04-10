"use client";

import { useEffect, useRef, useState } from "react";
import "./style.css";
import Wishlist from "../../pages/wishList";
import { useNavigate } from "react-router-dom";



export default function TopBar(){

    const searchInputRef = useRef(null);
    const aimagListRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const searchInput = searchInputRef.current;
        const aimagList = aimagListRef.current;

        // Prevent errors if elements are not found
        if (!searchInput || !aimagList) return;

        const aimags = [
            "Архангай", "Баян-Өлгий", "Баянхонгор", "Булган", "Говь-Алтай",
            "Говьсүмбэр", "Дархан-Уул", "Дорноговь", "Дорнод", "Дундговь",
            "Завхан", "Өвөрхангай", "Өмнөговь", "Орхон", "Сүхбаатар",
            "Сэлэнгэ", "Төв", "Увс", "Ховд", "Хөвсгөл", "Хэнтий"
        ];

        const updateAimagList = (filter) => {
            aimagList.innerHTML = "";
            const filteredAimags = aimags.filter(aimag =>
                aimag.toLowerCase().startsWith(filter.toLowerCase())
            );

            if (filteredAimags.length > 0) {
                filteredAimags.forEach(aimag => {
                    const li = document.createElement("li");
                    li.textContent = aimag;
                    li.addEventListener("click", () => {
                        searchInput.value = aimag;
                        aimagList.classList.remove("show");
                    });
                    aimagList.appendChild(li);
                });
                aimagList.classList.add("show");
            } else {
                aimagList.classList.remove("show");
            }
        };

        searchInput.addEventListener("focus", () => updateAimagList(""));
        searchInput.addEventListener("input", (e) => updateAimagList(e.target.value));

        document.addEventListener("click", (event) => {
            if (!searchInput.contains(event.target) && !aimagList.contains(event.target)) {
                aimagList.classList.remove("show");
            }
        });

        return () => {
            searchInput.removeEventListener("focus", () => updateAimagList(""));
            searchInput.removeEventListener("input", (e) => updateAimagList(e.target.value));
        };
    }, []);


    function handleWishlistClick() {
        navigate("/wishlist");  // Wishlist хуудас руу шилжинэ
    }

    return(
        <div>
            <header>
                <div className="leftHeader">
                    <div className="logo">Logo</div>

                    <div className="search-div" style={{ position: "relative" }}>
                        <button className="search-btn"></button>
                        <input 
                            type="text" 
                            placeholder ="search" 
                            className="input_section"
                            ref={searchInputRef}
                        />
                    </div>
                    <ul ref={aimagListRef} id="aimagList" className="hidden"></ul>
                </div>
                
                <div className="rigthHeader">
                    <button className="wishList" onClick={ handleWishlistClick }>
                        <i className="heart" ></i> <span>Wishlist</span>
                    </button>

                    <button className="userbtn"></button>
                </div>
            </header>
            
        </div>
    );
}