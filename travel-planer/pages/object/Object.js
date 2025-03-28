"use client";

import { useEffect, useRef } from "react";
import "./style.css";

export default function ObjectComponent() {

    useEffect(() => {
        const prevBtn = document.querySelector(".previous");
        const nextBtn = document.querySelector(".next");
        const visionContainer = document.querySelector(".vision");

        let scrollAmount = 260;

        const scrollLeft = () => visionContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        const scrollRight = () => visionContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });

        prevBtn?.addEventListener("click", scrollLeft);
        nextBtn?.addEventListener("click", scrollRight);

        return () => {
            prevBtn?.removeEventListener("click", scrollLeft);
            nextBtn?.removeEventListener("click", scrollRight);
        };
    }, []);


    const changeImage = (imageSrc) => {
        const mainImage = document.getElementById("mainImage");
        mainImage.style.opacity = "0";
        setTimeout(() => {
            mainImage.src = imageSrc;
            mainImage.style.opacity = "1";
        }, 300);
    };

    return (
        <div>
            <div className="inBody">
                <div className="images">
                    <div className="sideImages">
                        <img src="/images/image1.jpg" alt="image1" onClick={() => changeImage("/images/image1.jpg")} />
                        <img src="/images/image2.jpg" alt="image2" onClick={() => changeImage("/images/image2.jpg")} />
                        <img src="/images/image3.jpg" alt="image3" onClick={() => changeImage("/images/image3.jpg")} />
                        <img src="/images/image4.jpg" alt="image4" onClick={() => changeImage("/images/image4.jpg")} />
                    </div>
                    <div className="mainImage">
                        <img id="mainImage" src="/images/mainImage.png" alt="mainImage" className="main-img" />
                    </div>
                </div>

                <div className="comments">
                    <h3>Comments</h3>
                    <div className="cards">
                        <button className="previous0"></button>
                        <div className="comment">
                            <h5>
                                <p>^^^^^</p>
                                <p>userName</p>
                            </h5>
                            <p>Lorem ipsum dolor sit amet...</p>
                        </div>
                        <div className="comment">
                            <h5>
                                <p>^^^^^</p>
                                <p>userName</p>
                            </h5>
                            <p>Lorem ipsum dolor sit amet...</p>
                        </div>
                        <div className="comment">
                            <h5>
                                <p>^^^^^</p>
                                <p>userName</p>
                            </h5>
                            <p>Lorem ipsum dolor sit amet...</p>
                        </div>
                        <div className="comment">
                            <h5>
                                <p>^^^^^</p>
                                <p>userName</p>
                            </h5>
                            <p>Lorem ipsum dolor sit amet...</p>
                        </div>
                        
                        <button className="next0"></button>
                    </div>
                </div>

                <div className="overview">
                    <h3>Overview</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur doloribus sapiente numquam reiciendis illum voluptas alias facere placeat tempore facilis. Repellat commodi dolorum facere eos, quaerat maxime maiores aperiam, beatae molestiae atque numquam esse! Quia maiores vero voluptatibus ea dolores. ipsum dolor sit amet consectetur adipisicing elit. Id enim ad debitis exercitationem quaerat magnam modi aspernatur error consectetur porro nobis cupiditate saepe, eligendi ullam delectus eaque neque sint minus suscipit incidunt laboriosam autem asperiores at? Omnis amet voluptas, iusto suscipit nobis natus harum facilis.</p>
                </div>

                <div className="similarVisions">
                    <h3>Similar visions</h3>
                    <div className="vision-container">
                        <button className="previous"></button>
                        <div className="vision">
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                            <div className="similar">
                                <div className="description">This is a description</div>
                            </div>
                        </div>
                        <button className="next"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
