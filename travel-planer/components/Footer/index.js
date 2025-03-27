import "./style.css";

export default function Footer(){


    return(
        <div>
            <footer>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-pinterest"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-tiktok"></i></a>
                </div>
                
                <div className="subscription">
                    <div className="email-bar">
                        <input type="email" placeholder="Email"/>
                        <button className="subscribe-btn">📧 Subscribe</button>
                    </div>
                </div>
                
                <div className="footer-links">
                    <div className="footer-column">
                        <a href="#"><h3>Help Center</h3>Privacy and Cookie Statement</a>
                        <a href="#">Settings</a>
                    </div>
                    <div className="footer-column">
                        <a href="#"><h3>Careers</h3>Terms and Conditions</a>
                    </div>
                    <div className="footer-column">
                        <a href="#"><h3>Travel Agents</h3>Become an Affiliate</a>
                    </div>
                    <div className="footer-column">
                        <h3>Work Blog</h3>
                    </div>
                </div>
            </footer>
        </div>
    );
}