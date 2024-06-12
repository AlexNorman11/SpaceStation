async function getIssLocation() {
    const url = "http://api.open-notify.org/iss-now.json";
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
        const latitude = parseFloat(data.iss_position.latitude);
        const longitude = parseFloat(data.iss_position.longitude);
        return { latitude, longitude };
    } else {
        return null;
    }
}

async function updateMarker(marker) {
    const issLocation = await getIssLocation();
    if (issLocation) {
        const { latitude, longitude } = issLocation;
        marker.setLatLng([latitude, longitude]);
    }
}

async function displayData() {
    const issLocation = await getIssLocation();
    if (issLocation) {
        const { latitude, longitude } = issLocation;
        document.getElementById("issLocation").innerHTML = `ISS Current Location: Latitude: ${latitude}, Longitude: ${longitude}`;
    } else {
        document.getElementById("issLocation").innerHTML = "Failed to retrieve ISS location";
    }
}

displayData();
setInterval(displayData, 20000);

var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/basic-v2-dark/{z}/{x}/{y}.png?key=B6Fr5deZM4mNTIzaRh6T', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    minZoom: 1,
}).addTo(map)

const bounds = [[-900, -1800], [900, 1800]];




const marker = L.circleMarker([0, 0], {
    radius: 5,
    color: 'red',
    fillColor: 'red',
    fillOpacity: 0.5,
    className:'marker-pulse'
}).addTo(map);

function animate() {
    updateMarker(marker);
    setTimeout(animate, 1000); // Update every second
}

animate();



 
