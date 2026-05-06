// Array of trees with code, names, and coordinates
/*
const treesData = [
	{
		tree_code: '1001',
		tree_name_th: 'โสก',
		tree_name_en: 'Asoke Tree',
		latitude: 7.89507679723523,
		longitude: 98.35166151
	},
	// Add more trees here
	{
		tree_code: '1002',
		tree_name_th: 'ต้นไม้ที่สอง',
		tree_name_en: 'Second Tree',
		latitude: 7.89517679723523,
		longitude: 98.35176180
	},
	{
		tree_code: '1003',
		tree_name_th: 'ต้นไม้ที่สอง',
		tree_name_en: 'Second Tree',
		latitude: 7.89527679723523,
		longitude: 98.35187000
	}
];
*/

// Create layer groups for each tree
const treeLayerGroups = {};
// Icon filename examples (engName uses non-alphanumerics -> underscore):
// Asoke Tree           -> images/maps/Asoke_Tree.png
// Second Tree          -> images/maps/Second_Tree.png
// My Special-Tree #1   -> images/maps/My_Special_Tree_1.png
const layerIcons = {};
treesData.forEach(tree => {
	// group key now includes both English and Thai names
	const layerKey = `${tree.tree_name_en} (${tree.tree_name_th})&nbsp;`; // add non-breaking space for better spacing in control
	let layerGroup = treeLayerGroups[layerKey];
	if (!layerGroup) {
		layerGroup = L.layerGroup();
		treeLayerGroups[layerKey] = layerGroup;
	}
	const iconSize = 24; // size of the icon in pixels
	// create or reuse group icon
	if (!layerIcons[layerKey]) {
		// use english name only for the file name
		const engName = tree.tree_name_en.replace(/[^a-zA-Z0-9]/g, '_');
		layerIcons[layerKey] = L.icon({
			iconUrl: `images/maps/${engName}.png`,
			iconSize: [iconSize, iconSize], // size of the icon: 42x42 pixels
			iconAnchor: [iconSize/2, iconSize], // center the anchor, 42/2 = 21 width, and bottom of the icon (42 height)
			popupAnchor: [0, -iconSize] // position the popup directly above the icon (0 horizontal, -42 vertical)
		});
	}
	const groupIcon = layerIcons[layerKey];

	const popup = `
		<div class="container-fluid">
		<h3 class="h6">ต้นไม้ ${tree.tree_code}: ${tree.tree_name_th} (${tree.tree_name_en})</h3>
		<p class="mb-1">รายละเอียดของต้นไม้:</p>
		<div class="row gx-1">
			<div class="col-3"><img src="images/trees/${tree.tree_code}/0_overall.jpg" alt="Overall" title="ภาพรวม" onerror="this.style.display='none';"></div>
			<div class="col-3"><img src="images/trees/${tree.tree_code}/1_leaves.jpg" alt="Leaves" title="ใบ" onerror="this.style.display='none';"></div>
			<div class="col-3"><img src="images/trees/${tree.tree_code}/2_flowers.jpg" alt="Flowers" title="ดอกไม้" onerror="this.style.display='none';"></div>
			<div class="col-3"><img src="images/trees/${tree.tree_code}/3_fruits.jpg" alt="Fruits" title="ผลไม้" onerror="this.style.display='none';"></div>
		</div>
		</div>`;

		// add marker with custom icon
		L.marker([tree.latitude, tree.longitude], { icon: groupIcon })
			.bindPopup(popup)
			.addTo(layerGroup);
	});

	// overlays may simply reuse the groups object
	const overlays = treeLayerGroups;

	const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});
const Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const map = L.map('map-container', {
	center: [7.894265039999167, 98.35271279775803],
	zoom: 16,
	layers: [osm, ...Object.values(treeLayerGroups)]
});

const baseLayers = { // add gap after name for better spacing in control
	'OSM Standard&nbsp;': osm,
	'OSM HOT&nbsp;': osmHOT,
	'AlidadeSmooth&nbsp;': Stadia_AlidadeSmooth,
	'WorldImagery&nbsp;': Esri_WorldImagery
};

const layerControl = L.control.layers(baseLayers, overlays, {
	position: 'topright',
	collapsed: false
}).addTo(map);

setTimeout(() => { // delay to ensure control is rendered before manipulation - **adjust as needed based on your actual loading times**
	const controlElement = document.querySelector('.leaflet-control-layers');
	if (controlElement && controlElement.parentElement) {
		controlElement.parentElement.removeChild(controlElement);
		
		// Create form-based layout
		const formDiv = document.createElement('div');
		formDiv.className = 'layers-form';
		
		// Base layers section
		const baseSection = document.createElement('div');
		baseSection.className = 'layers-section';
		baseSection.innerHTML = '<h6>แผนที่ฐาน</h6>';
		
		const baseChecks = controlElement.querySelector('.leaflet-control-layers-base');
		if (baseChecks) {
			baseSection.appendChild(baseChecks);
		}
		
		// Overlays section
		const overlaySection = document.createElement('div');
		overlaySection.className = 'layers-section';
		overlaySection.innerHTML = '<h6>รายชื่อต้นไม้</h6>';
		
		const overlayChecks = controlElement.querySelector('.leaflet-control-layers-overlays');
		if (overlayChecks) {
			overlaySection.appendChild(overlayChecks);
		}
		
		formDiv.appendChild(baseSection);
		formDiv.appendChild(overlaySection);
		document.getElementById('layers-panel').appendChild(formDiv);
		
		// Apply Bootstrap classes to checkboxes
		document.querySelectorAll('.layers-form .leaflet-control-layers-selectable').forEach(label => {
			label.className = 'form-check';
			const input = label.querySelector('input');
			const span = label.querySelector('span');
			if (input && span) {
				input.className = 'form-check-input';
				span.className = 'form-check-label';
			}
		});
	}
}, 100);
