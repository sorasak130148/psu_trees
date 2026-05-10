/*
        var treesData = [
        {
        "survey_date": "3/19/2026",
        "survey_name": "นาย ปรเมศวร์ นุ่มศึก",
        "zone_id": "B",
        "zone_name": "B : สนามฟุตบอล",
        "tree_id": "B023",
        "longitude": 98.353449,
        "latitude": 7.896506,
        "GBH": 49.4,
        "height": 6,
        "name_th": "กระถิน",
        "name_en": "Lead tree",
        "scientific_name": "Leucaena leucocephala",
        "local_name": "กระถินไทย",
        "type": "ป่าเบญจพรรณ",
        "DBH_cm": 15.72,
        "WS_kg": 35.89,
        "WB_kg": 6.3,
        "WL_kg": 1.45,
        "AGB_kg": 43.63,
        "BGB": 11.78,
        "TotalBiomass_kg": 55.41,
        "CarbonStock_kgC": 27.16,
        "Sequestration_kgCO2e": 99.58,
        "Sequestration_tCO2e": 0.1
        },
        {
        "survey_date": "3/28/2026",
        "survey_name": "นางสาววรรณชนก อมิตรสูญ",
        "zone_id": "A",
        "zone_name": "A : ลานจอดรถ",
        "tree_id": "A001",
        "longitude": 98.3515408,
        "latitude": 7.8951044,
        "GBH": 109,
        "height": 9.8,
        "name_th": "กระทิง",
        "name_en": "Alexandrian laurel",
        "scientific_name": "Calophyllum inophyllum",
        "local_name": "สารภีทะเล",
        "type": "ป่าดิบแล้ง",
        "DBH_cm": 34.68,
        "WS_kg": 280.78,
        "WB_kg": 84.85,
        "WL_kg": 7.41,
        "AGB_kg": 373.04,
        "BGB": 100.72,
        "TotalBiomass_kg": 473.76,
        "CarbonStock_kgC": 227.73,
        "GHGSequestration_kgCO2e": 835.03,
        "GHGSequestration_tCO2e": 0.84
        }];
        */
        // 1. Define Base Maps
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        });

        var esriImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
        });

        var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'], attribution: 'Google Maps'
        });

        // 2. Initialize Map
        var map = L.map('trees-map', {
            center: [7.8958, 98.3525],
            zoom: 17,
            layers: [esriImagery] // Default base layer
        });

        // 3. Define Species Colors (name_en as key, hex color as value)
        //DIY: add colors for more species as needed, or use a color palette generator for larger datasets
        const speciesColors = {
            "Alexandrian Laurel": "#4c9a8a",
            "Indian Cork Tree": "#8caf4c",
            "Queen’s Flower": "#d97aa6",
            "Queen’s Crape Myrtle": "#c77dff",
            "Tropical Almond": "#a67c52",
            "Devil Tree": "#5c946e",
            "Ashoka Tree": "#e76f51",
            "Jacaranda": "#6a4c93",
            "Resin Tree": "#bc6c25",
            "Java Plum": "#3a0ca3",
            "Rain Tree": "#2a9d8f",
            "Oil Palm": "#588157",
            "Parasite Tree": "#6d6875",
            "Burmese Padauk": "#c44536",
            "Bush Clockvine": "#ffafcc",
            "Dolichandrone": "#f4a261",
            "Lagerstroemia": "#9d4edd",
            "Shorea": "#7f5539",
            "Siamese Rough Bush": "#90be6d",
            "Fan Palm": "#43aa8b",
            "Iron Wood": "#495057",
            "Black Rosewood": "#22223b",
            "Foxtail Palm": "#52b788",
            "Royal Poinciana": "#f94144",
            "Yellow Flame Tree": "#f9c74f",
            "Lead Tree": "#8caf4c",
            "Areca Palm": "#74c69d",
            "Kassod Tree": "#adb5bd",
            "Mahogany": "#7f4f24",
            "Queen Palm": "#95d5b2",
            "Gustavia": "#ff99c8",
            "Sea Pine": "#2d6a4f",
            "Champak": "#ffd166",
            "Black Olive": "#3d405b",
            "Cannonball Tree": "#9c6644",
            "Good Luck Plant": "#80ed99",
            "Monkey apple": "#e5989b",
            "Ceylon Ironwood": "#6c757d",
            "Burmese Sal": "#a98467",
            "Drumstick Tree": "#84a98c",
            "Coconut": "#c2b280",
            "Durian": "#d9ed92",
            "Mango": "#ffb703",

            "default": "#9E9E9E"
        };

        // 4. Organize Layers
        var baseMaps = {
            "Satellite (Esri)": esriImagery,
            "Google Streets": googleStreets,
            "OpenStreetMap": osm
        };

        var currentBasemap = esriImagery; // Track current basemap for switching

        var speciesLayers = {};// Key: species name_en, Value: L.layerGroup()

// loop through treesData to create markers and add to respective species layer groups
// Use tree as a row in total 175 rows of data

        treesData.forEach(function(tree) {
            var species = tree.name_en; // row: column: name_en in template tree.{column}
            
            var marker = L.circleMarker([tree.latitude, tree.longitude], {
                radius: 8,
                fillColor: speciesColors[species] || speciesColors["default"],
                color: "white",
                weight: 3,
                fillOpacity: 0.9
            }).bindPopup(`
                <div class="popup-card">
                    <div class="popup-header"><h3>${tree.name_th} (${tree.name_en})</h3></div>
                    <div><h4><i>${tree.scientific_name}</i></h4></div>
                    <hr>

                    <div class="stat-label">รหัสชนิดพันธุ์: <span class="stat-value">${tree.species_id}</span></div>
                    <div class="stat-label">รหัสต้นไม้: <span class="stat-value">${tree.tree_id}</span></div>
                    <div class="stat-label">โซน: <span class="stat-value">${tree.zone_name || '-'}</span></div>
                    <div class="stat-label">ประเภท: <span class="stat-value">${tree.type || '-'}</span></div>

                    <div class="stat-label">พิกัด: 
                        <span class="stat-value">${tree.latitude}, ${tree.longitude}</span>
                    </div>

                    <hr>

                    <div class="stat-label">ความสูง: <span class="stat-value">${tree.height || 0} m</span></div>
                    <div class="stat-label">เส้นรอบวง: <span class="stat-value">${tree.GBH || 0} cm</span></div>
                    <div class="stat-label">เส้นผ่านศูนย์กลางที่ระดับสูงเพียงอก: <span class="stat-value">${tree.DBH_cm || 0} cm</span></div>

                    <hr>

                    <div class="stat-label">มวลชีวภาพเหนือพื้นดินในส่วนลำต้น: <span class="stat-value">${tree.WS_kg || 0} kg</span></div>
                    <div class="stat-label">มวลชีวภาพเหนือพื้นดินในส่วนกิ่ง: <span class="stat-value">${tree.WB_kg || 0} kg</span></div>
                    <div class="stat-label">มวลชีวภาพเหนือพื้นดินในส่วนใบ: <span class="stat-value">${tree.WL_kg || 0} kg</span></div>
                    <div class="stat-label">มวลชีวภาพเหนือพื้นดินทั้งหมด: <span class="stat-value">${tree["AGB_kg"] || 0} kg</span></div>
                    <div class="stat-label">มวลชีวภาพใต้พื้นดิน: <span class="stat-value">${tree.BGB || 0} kg</span></div>

                    <div class="stat-label">มวลชีวภาพรวม: 
                        <span class="stat-value">${tree.TotalBiomass_kg || 0} kg</span>
                    </div>

                    <hr>

                    <div class="stat-label co2">ปริมาณคาร์บอน: 
                        <span class="stat-value co2">${tree.CarbonStock_kgC || 0} kgC</span>
                    </div>

                    <div class="stat-label co2">ปริมาณก๊าซเรือนกระจกที่กักเก็บได้: 
                        <span class="stat-value co2">${tree["GHGSequestration_kgCO2e"] || 0} kgCO₂e</span>
                    </div>

                    <div class="stat-label co2">ปริมาณก๊าซเรือนกระจกที่กักเก็บได้: 
                        <span class="stat-value co2">${tree["GHGSequestration_tCO2e"] || 0} tCO2e</span>
                    </div>
                    <!-- รูปภาพ -->
                    <div class="popup-images">
                        <img src="images/trees/${tree.tree_id}/${tree.tree_id}_0_overall.jpeg"
                            title="ภาพรวม"
                            onerror="this.src='images/trees/tree-placeholder.png'; this.style.opacity='0.5';">

                        <img src="images/trees/${tree.tree_id}/${tree.tree_id}_1_leaves.jpeg"
                            title="ใบ"
                            onerror="this.src='images/trees/tree-placeholder.png'; this.style.opacity='0.5';">

                        <img src="images/trees/${tree.tree_id}/${tree.tree_id}_2_flowers.jpeg"
                            title="ดอก"
                            onerror="this.src='images/trees/tree-placeholder.png'; this.style.opacity='0.5';">

                        <img src="images/trees/${tree.tree_id}/${tree.tree_id}_3_fruits.jpeg"
                            title="ผล"
                            onerror="this.src='images/trees/tree-placeholder.png'; this.style.opacity='0.5';">
                    </div>
                    
                
                </div>
        
            `);

            if (!speciesLayers[species]) {
                speciesLayers[species] = L.layerGroup().addTo(map);
            }
            marker.addTo(speciesLayers[species]);
        });

        // 5. Layer Control removed — basemap switching is handled in the search control below


        // ==========================================
// 6. Add Zone + Species Filter Functionality
// เลือกโซนอย่างเดียว / พันธุ์ไม้อย่างเดียว / ทั้งสองอย่างได้
// แสดงผลร่วมกัน
// ==========================================

// รวม marker ทั้งหมด
var allMarkers = [];

for (var species in speciesLayers) {
    speciesLayers[species].eachLayer(function(layer) {

        layer.speciesName = species;
        allMarkers.push(layer);

    });
}

// ==========================================
// Search Control
// ==========================================
var controlBox = L.control({ position: 'bottomleft' });

controlBox.onAdd = function () {

    var div = L.DomUtil.create('div', 'custom-filter');

    div.innerHTML = `
        <div style="
            background:white;
            padding:12px;
            border-radius:10px;
            box-shadow:0 2px 8px rgba(0,0,0,0.25);
            min-width:230px;
            height:auto;
        ">

            <b style="color:#2e7d32;"><h4>ค้นหาข้อมูล</h4></b>

            <label><h6>แผนที่พื้นหลัง</h6></label>
            <select id="basemapSelect" style="
                width:100%;
                padding:6px;
                border-radius:6px;
                margin-bottom:10px;
            ">
                <option value="satellite">Satellite (Esri)</option>
                <option value="google">Google Streets</option>
                <option value="osm">OpenStreetMap</option>
            </select>

            <label><h6>โซน</h6></label>
            <select id="zoneSelect" style="
                width:100%;
                padding:6px;
                border-radius:6px;
                margin-bottom:10px;
            ">
                <option value="">ทุกโซน</option>
            </select>

            <label><h6>ชนิดพันธุ์ไม้</h6></label>
            <select id="speciesSelect" style="
                width:100%;
                padding:6px;
                border-radius:6px;
                margin-bottom:10px;
            ">
                <option value="">ทุกชนิดพันธุ์</option>
            </select>

            <button id="resetFilter" style="
                width:100%;
                padding:8px;
                border:none;
                border-radius:6px;
                background:#2e7d32;
                color:white;
                cursor:pointer;
            ">
                <b>รีเซ็ตตัวกรอง</b>
            </button>

        </div>

        
    `;

    return div;
};

controlBox.addTo(map);

// ==========================================
// เติม dropdown
// ==========================================
setTimeout(function(){

    var zoneSelect = document.getElementById("zoneSelect");
    var speciesSelect = document.getElementById("speciesSelect");
    var basemapSelect = document.getElementById("basemapSelect");
    var resetBtn = document.getElementById("resetFilter");

    // -----------------------
    // เปลี่ยน basemap
    // -----------------------
    basemapSelect.addEventListener("change", function(){
        var selected = basemapSelect.value;
        var newLayer = selected === "satellite" ? esriImagery
                     : selected === "google"    ? googleStreets
                     :                            osm;
        map.removeLayer(currentBasemap);
        map.addLayer(newLayer);
        currentBasemap = newLayer;
    });

    // -----------------------
    // เติมโซน
    // -----------------------
    var zones = [...new Set(
        treesData.map(x => x.zone_name)
    )].filter(Boolean);

    zones.forEach(function(zone){

        var op = document.createElement("option");
        op.value = zone;
        op.textContent = zone;
        zoneSelect.appendChild(op);

    });

    // -----------------------
    // เติมชนิดพันธุ์ไม้
    // -----------------------
    var speciesList = [...new Set(
        treesData.map(x => `${x.name_th} (${x.name_en})`)
    )].filter(Boolean);

    speciesList.forEach(function(species){

        var op = document.createElement("option");
        op.value = species;
        op.textContent = species;
        speciesSelect.appendChild(op);

    });

    // ==========================================
    // Filter Function
    // ==========================================
    function applyFilter(){

        var selectedZone = zoneSelect.value;
        var selectedSpecies = speciesSelect.value;

        allMarkers.forEach(function(marker){

            var popup = marker.getPopup().getContent();

            var foundTree = treesData.find(function(t){
                return popup.includes(t.tree_id);
            });

            if(!foundTree) return;

            var fullSpecies =
                `${foundTree.name_th} (${foundTree.name_en})`;

            var show = true;

            // ถ้าเลือกโซน
            if(selectedZone !== ""){
                if(foundTree.zone_name !== selectedZone){
                    show = false;
                }
            }

            // ถ้าเลือกพันธุ์ไม้
            if(selectedSpecies !== ""){
                if(fullSpecies !== selectedSpecies){
                    show = false;
                }
            }

            if(show){

                marker.addTo(map);

                if(selectedZone === "" && selectedSpecies === ""){

                    marker.setStyle({
                        radius:8,
                        color:"white",
                        weight:3,
                        fillColor: speciesColors[foundTree.name_en] || speciesColors["default"],
                        fillOpacity:0.9
                    });

                }else{

                    marker.setStyle({
                        radius:8,
                        color:"red",
                        weight:3,
                        fillColor: speciesColors[foundTree.name_en] || speciesColors["default"],
                        fillOpacity:0.9
                })     }

            }else{

                map.removeLayer(marker);
            }

        });

    }

    // ==========================================
    // Reset
    // ==========================================
    resetBtn.addEventListener("click", function(){

        zoneSelect.value = "";
        speciesSelect.value = "";

        // รีเซ็ต basemap กลับเป็น Satellite (Esri)
        basemapSelect.value = "satellite";
        map.removeLayer(currentBasemap);
        map.addLayer(esriImagery);
        currentBasemap = esriImagery;

        applyFilter();

    });

    // ==========================================
    // Event
    // ==========================================
    zoneSelect.addEventListener("change", applyFilter);
    speciesSelect.addEventListener("change", applyFilter);
},300);