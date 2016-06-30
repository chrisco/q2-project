let locations;

$.get('/getLocations').then(locations => {
    console.log(locations);
})

function initMap() {
    var myLatLng = {
        lat: -25.363,
        lng: 131.044
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });

    marker.setMap(map);
} //
// for (let brewery of breweryList) {
//     if (brewery.latitude && brewery.name) {
//         let myLatLng = {
//             lat: brewery.latitude,
//             lng: brewery.longitude
//         };
//         let contentString = `
//             <div class="container infoWindow">
//                 <h5 class="miniTitle">${brewery.name}</h5>
//                 <p>${brewery.phone}</p>
//                 <p>${brewery.street}</p>
//                 <p><a href="${brewery.website}">Website</a></p>
//                 <img src="${brewery.medium}" class="mapImage">
//             </div>
//             `
//         let infowindow = new google.maps.InfoWindow({
//             content: contentString
//         });
//         let marker = new google.maps.Marker({
//             map: map,
//             draggable: false,
//             animation: google.maps.Animation.DROP,
//             title: brewery.name === '' ? brewery.street : brewery.name,
//             position: myLatLng,
//             icon: "http://icons.iconarchive.com/icons/flat-icons.com/flat/24/Beer-icon.png"
//         });
//         var markerArray = []
//         markerArray.push(marker);
//         marker.setMap(map);
//
//         marker.addListener('click', toggleBounce);
//
//
//         let get = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + brewery.latitude + "," + brewery.longitude + "&key=AIzaSyAHZi4zP3zyhCUMgU81JvNlaQKBRWNMgPg";
//         $.get(get).done(
//             function(data) {
//                 $(".addLocations").append($(`<option>${marker.title}</option>`).val(data.results[0].formatted_address));
//             }
//         )
//
//         function toggleBounce() {
//             infowindow.open(map, marker);
//             if (marker.getAnimation() !== null) {
//                 marker.setAnimation(null);
//             } else {
//                 marker.setAnimation(google.maps.Animation.BOUNCE);
//             }
//         }
//
//     } else {
//         continue;
//     }
// }
