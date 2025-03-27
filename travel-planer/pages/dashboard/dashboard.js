import TopBar from "../../components/TopBar";

export default function Dashboard() {
    return (
      <div>
    <div class="screen">
        <div class="search-bar">
            <input type="text" placeholder="Where to">
            <input type="text" placeholder="Select dates">
            <button>🔍</button>
        </div>
        <div class="section">
        <h2>Recently Viewed</h2>
        <div class="grid">
            <div class="card">
                <img src="./images/image3.jpg" alt="Otgon Tenger">
                <p>5.0 ⭐ Otgon Tenger Uul, Zavkhan</p>
            </div>
            <div class="card">
                <img src="./images/image5.png" alt="Khuvsgul Lake">
                <p>4.8 ⭐ Khuvsgul Lake, Khuvsgul</p>
            </div>
            <div class="card">
                <img src="./images/image6.png" alt="Gobi Desert">
                <p>4.9 ⭐ Gobi Desert, Umnugovi</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Famous Provinces</h2>
        <div class="grid">
            <div class="card">
                <img src="./images/image1.jpg" alt="Govi">
                <p class="text-overlay">Govi</p>
            </div>
            <div class="card">
                <img src="./images/image4.jpg" alt="Zavkhan">
                <p class="text-overlay">Zavkhan</p>
            </div>
            <div class="card">
                <img src="./images/image2.jpg" alt="Khuvsgul">
                <p class="text-overlay">Khuvsgul</p>
            </div>
            <div class="card">
                <img src="./images/similar1.jpg" alt="Arkhangai">
                <p class="text-overlay">Arkhangai</p>
            </div>
            <div class="card">
                <img src="./images/similar2.jpg" alt="Uvs">
                <p class="text-overlay">Uvs</p>
            </div>
            <div class="card">
                <img src="./images/image5.png" alt="Dornod">
                <p class="text-overlay">Dornod</p>
            </div>
            <div class="card">
                <img src="./images/similar2.jpg" alt="Uvs">
                <p class="text-overlay">Uvs</p>
            </div>
            <div class="card">
                <img src="./images/image5.png" alt="Dornod">
                <p class="text-overlay">Dornod</p>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Top Visions</h2>
        <div class="grid">
            <div class="card">
                <img src="./images/image1.jpg" alt="Gobi">
                <p class="text-overlay">Gobi</p>
            </div>
            <div class="card">
                <img src="./images/similar1.jpg" alt="Otgon Tenger">
                <p class="text-overlay">Otgon Tenger</p>
            </div>
            <div class="card">
                <img src="./images/image3.jpg" alt="Tsambagarav">
                <p class="text-overlay">Tsambagarav</p>
            </div>
            <div class="card">
                <img src="./images/similar3.jpg" alt="Altai Tavan Bogd">
                <p class="text-overlay">Altai Tavan Bogd</p>
            </div>
            <div class="card">
                <img src="./images/background.jpg" alt="Uvs Lake">
                <p class="text-overlay">Uvs Lake</p>
            </div>
            <div class="card">
                <img src="./images/image6.png" alt="Hovd River">
                <p class="text-overlay">Hovd River</p>
            </div>
            <div class="card">
                <img src="./images/background.jpg" alt="Uvs Lake">
                <p class="text-overlay">Uvs Lake</p>
            </div>
            <div class="card">
                <img src="./images/image6.png" alt="Hovd River">
                <p class="text-overlay">Hovd River</p>
            </div>
        </div>
    </div>
    </div>
        <TopBar />
      </div>
    );
  }
