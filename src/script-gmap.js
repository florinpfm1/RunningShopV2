// --------------------------------- for Contact Us page------------------------------------
// Google Maps function to display map
let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.659480, lng: 23.581850},
        zoom: 15
    });
    marker = new google.maps.Marker({
        position: {lat: 47.659480, lng: 23.581850},
        map: map,
    });
};