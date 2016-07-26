var API_KEY = "WPAFOL3YQZGC";

var citesList = [];
var cityIndex = 0;


console.log('cites.length', cites.length)
// var citesLength = cites.length;
// for (var i = cites.length - 1; i >= 0; i--) {
//     var city = cites[c];
//     var cityName = city[0];
//     var countryName = city[3];
//     var timeZoneName = city[6];
//     var timezonesLength = timezones.length;


// }

function loadCity(city) {
    var lat = city[4];
    var lng = city[5]

    var url = `http://api.timezonedb.com/?key=${API_KEY}&lat=${lat}&lng=${lng}&format=json`
    fetch(url, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(result) {
        var cityObj = {
            name: city[0],
            country: city[3],
            lat: lat,
            lng: lng,
            zoneName: result.zoneName,
            abbreviation: result.abbreviation,
        }
        citesList.push(cityObj)
        loadNextCity();
    }).catch(function(err) {
        // Error :(
        console.log(err)
        loadNextCity();
    });
}

function loadNextCity() {
    cityIndex++;
    if (cityIndex < cites.length) {
        setTimeout(function() {
            loadCity(cites[cityIndex])
        }, (1000 * 10))
    } else {
        console.log('COMPELETE', citesList.length, cites.length);
         console.log(citesList);
         console.log(JSON.stringify(citesList));
    }
}

loadCity(cites[cityIndex])