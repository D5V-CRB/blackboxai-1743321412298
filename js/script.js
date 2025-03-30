// Global variables
let map;
let markers = {};
let pathLayer = null;
let campusGraph = {};

// Initialize map and load data
document.addEventListener('DOMContentLoaded', async function() {
    // Load campus data
    const response = await fetch('data/campus_map.json');
    campusGraph = await response.json();
    
    // Initialize map
    initMap();
    
    // Add markers for all locations
    addLocationMarkers();
    
    // For directions page, setup event listeners
    if (document.getElementById('start-location')) {
        setupDirectionsPage();
    }
    
    // For search functionality
    if (document.getElementById('search')) {
        setupSearch();
    }
});

function initMap() {
    // Center map on first location (or default coordinates)
    const center = campusGraph.nodes[0]?.coordinates || [40.7128, -74.0060];
    map = L.map('map').setView(center, 17);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function addLocationMarkers() {
    campusGraph.nodes.forEach(node => {
        const marker = L.marker(node.coordinates)
            .addTo(map)
            .bindPopup(`<b>${node.name}</b>`);
        
        markers[node.id] = marker;
        
        // For directions page, populate dropdowns
        if (document.getElementById('start-location')) {
            const option = document.createElement('option');
            option.value = node.id;
            option.textContent = node.name;
            document.getElementById('start-location').appendChild(option.cloneNode(true));
            document.getElementById('end-location').appendChild(option);
        }
    });
}

function setupDirectionsPage() {
    document.getElementById('calculate-route').addEventListener('click', calculateRoute);
}

function calculateRoute() {
    const startId = document.getElementById('start-location').value;
    const endId = document.getElementById('end-location').value;
    
    if (!startId || !endId) {
        alert('Please select both start and end locations');
        return;
    }
    
    // Clear previous path if exists
    if (pathLayer) {
        map.removeLayer(pathLayer);
    }
    
    // Calculate path using A*
    const astar = new AStar(campusGraph);
    const path = astar.findPath(startId, endId);
    
    if (!path) {
        alert('No path found between these locations');
        return;
    }
    
    // Display path on map
    const pathCoordinates = path.map(nodeId => {
        const node = campusGraph.nodes.find(n => n.id === nodeId);
        return node.coordinates;
    });
    
    pathLayer = L.polyline(pathCoordinates, {color: 'blue'}).addTo(map);
    map.fitBounds(pathLayer.getBounds());
    
    // Display step-by-step directions
    displayDirections(path);
}

function displayDirections(path) {
    const stepsContainer = document.getElementById('steps');
    stepsContainer.innerHTML = '<h4 class="font-bold mb-2">Route Directions</h4>';
    
    for (let i = 0; i < path.length - 1; i++) {
        const fromNode = campusGraph.nodes.find(n => n.id === path[i]);
        const toNode = campusGraph.nodes.find(n => n.id === path[i+1]);
        const edge = campusGraph.edges.find(e => 
            e.from === path[i] && e.to === path[i+1] || 
            e.from === path[i+1] && e.to === path[i]
        );
        
        const step = document.createElement('div');
        step.className = 'mb-2';
        step.innerHTML = `
            <p><b>Step ${i+1}:</b> From ${fromNode.name} to ${toNode.name}</p>
            <p class="text-sm text-gray-600">Distance: ~${edge.distance} meters</p>
        `;
        stepsContainer.appendChild(step);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Hide all markers first
        Object.values(markers).forEach(marker => {
            map.removeLayer(marker);
        });
        
        // Show only matching markers
        campusGraph.nodes.forEach(node => {
            if (node.name.toLowerCase().includes(searchTerm)) {
                markers[node.id].addTo(map);
                if (searchTerm.length > 0) {
                    markers[node.id].openPopup();
                }
            }
        });
    });
}