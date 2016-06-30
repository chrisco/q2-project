function initMap() {
    var myLatLng = {
        lat: 39.757857,
        lng: -105.006892
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });

    $.get('/happyhour/getLocations').done(locations => {
            var geocoder = new google.maps.Geocoder();


            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });

            marker.setMap(map);

            var markerArray = [];
            for (let location of locations) {
                let contentString = `
                    <div class="container infoWindow">
                        <h5 class="miniTitle">${location.name}</h5>
                        <p>${location.address}</p>
                        <p><a href="${location.url}">Website</a></p>
                        <img src="${location.image_url}" class="mapImage">
                    </div>
                    `
                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                });


                geocoder.geocode({
                    'address': location.address
                }, function(results) {
                    var newLatLng = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    }

                    let marker = new google.maps.Marker({
                        map: map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: location.name,
                        position: newLatLng,
                        icon: "http://icons.iconarchive.com/icons/flat-icons.com/flat/24/Beer-icon.png"
                    });

                    markerArray.push(marker);
                    marker.setMap(map);
                    marker.addListener('click', toggleBounce);

                    function toggleBounce() {
                        infowindow.open(map, marker);
                        if (marker.getAnimation() !== null) {
                            marker.setAnimation(null);
                        } else {
                            marker.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    }
                });

            }
        }) //end of get request
} //bottom of initMap()
