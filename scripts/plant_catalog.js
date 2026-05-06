function renderPlants() {

    const container = document.getElementById('plant-container');

    container.innerHTML = "";
     plantCatalog.sort((a, b) => {
        const numA = parseInt(a.species_id.replace(/\D/g, ''));
        const numB = parseInt(b.species_id.replace(/\D/g, ''));
        return numA - numB;
    });

    plantCatalog.forEach(plant => {

        const card = document.createElement('div');
        card.className = 'plant-card';

        const img = `images/species_preview/${plant.species_id}.jpeg`;
        const fallback = "images/species_preview/tree-placeholder.png";

        card.innerHTML = `

            <div class="info">

                <a href="${plant.url || '#'}" class="plant-link">
                        <strong>${plant.name_th}</strong>
                    </a>

                    <div style="color:#888;">
                        <h2>${plant.name_en}</h2>
                    </div>
                    <div class="species-info">
                        <strong>ชื่อวิทยาศาสตร์:</strong> <span class="scientific-name"><i>${plant.scientific_name}</i></span>
                    </div>

                    <div class="species-info">
                        <strong>ชื่อท้องถิ่น:</strong> ${plant.local_name}
                    </div>

                    <div class="species-info">
                        <strong>รหัสชนิดพันธุ์:</strong> ${plant.species_id}
                    </div>

                <div class="badge">
                    ${plant.type}
                </div>

            </div>

            

        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderPlants);

