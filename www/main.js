 var scrollStarted = false;
 var scrollInterval = false;
 var scrollEndTimeout = false;
 var yourTime;
 var zoneNames;
 var timeWidth = 100;
 var totalHours = 37;
 var minLength = timeWidth / 60; // px length of a min;
 var zoneWidth = timeWidth * totalHours;
 var isSettingsOpen = false;
 var addingLocation = true;


 var comparetimeZones = JSON.parse(localStorage.getItem("comparetimeZones"));
 if (!comparetimeZones) {
     comparetimeZones = [{
         name: 'Vancouver',
         zone: 'America/Vancouver'
     }];
 }


 var userTimezone = moment.tz.guess();

 var yourTimeZome = JSON.parse(localStorage.getItem("yourTimeZome"));
 if (!yourTimeZome) {
     yourTimeZome = {
         name: userTimezone.split('/')[1].replace(/_/g, ' '),
         zone: userTimezone
     }
 }

 var colours = ['51,204,255']



 function getZoneId(timeZone){
    return timeZone.zone.split('/').join('-') +'-' + timeZone.name.split("'").join('').split(" ").join('').split(",").join('')
 }

 function buildTimeRow(timeZone) {
     var dom = ''
     dom += '<div class="zone-name" id="' + getZoneId(timeZone) +'"></div>';
     dom += '<div class="zone" style="width:' + zoneWidth + '">';
     dom += '<div class="times">';
     var time = moment();
     time.hours(0);
     time.hours(time.hours() - 6);
     time.minutes(0);
     var randomColourId = Math.round(Math.random() * (colours.length - 1));
     timeZone.colour = (timeZone.colour) ? timeZone.colour : colours[randomColourId]
     for (var i = 0; i < totalHours; i++) {
         dom += buildTimeCell(time, timeZone);
         time.hours(time.hours() + 1);

     };
     dom += '</div></div>';
     return dom;
 }

 function buildTimeCell(time, timeZone) {
     var dom = ''
     var timeStr = time.tz(timeZone.zone).format('ha');
     var percentOne = Math.abs(time.hours() - 13) / 0.11;
     var percentTwo = Math.abs(time.hours() - 12) / 0.11;

     
     dom += '<div class="time" style="background:linear-gradient(to right, rgba(' + timeZone.colour + ',' + (1 - (percentOne / 100)) + '), rgba(' + timeZone.colour + ',' + (1 - (percentTwo / 100)) + '))">' + timeStr + '</div>';
     return dom;
 }

 function buildYourTime() {
     var dom = '<div class="your-time">';
     dom += buildTimeRow(yourTimeZome)
     dom += '</div>';
     return dom;
 }

 function updateYourTime() {
     var dom = buildTimeRow(yourTimeZome);
     var yourTime = document.getElementsByClassName('your-time')[0];
     yourTime.innerHTML = dom;
 }

 function buildComparisons() {
     var dom = '<div id="comparisons" class="comparisons">';
     dom += buildComparisonsRows();
     dom += '</div>';
     return dom;
 }

 function buildComparisonsRows() {
     var dom = '';
     for (var z = 0; z < comparetimeZones.length; z++) {
         var timeZone = comparetimeZones[z];
         dom += buildTimeRow(timeZone)
     };
     return dom;
 }

 function locationSelected(locationIndex) {
     var location;
     for (var i = cities.length - 1; i >= 0; i--) {
         if (cities[i].id === Number(locationIndex)) {
             location = cities[i];
             break;
         }
     };
     if (addingLocation) {
         addLocation(location);
     } else {
         changeYourLocation(location)
     }
 }

 function changeYourLocation(location) {

     yourTimeZome = {
         name: location.name,
         zone: location.zoneName
     }
     updateYourTime();
     updateTimes();
     closeSearch();
     Settings.updateYourLocation(yourTimeZome.name);
     yourTime = document.getElementsByClassName('times')[0];
     save();
 }

 function addLocation(location) {
     var zoneObj = {
         name: location.name,
         zone: location.zoneName
     };
     var zonesList = comparetimeZones.map(function(zoneObj) {
         return zoneObj.name
     })
     if (zonesList.indexOf(location.name) === -1 && yourTimeZome.name !== location.name) {
         comparetimeZones.push(zoneObj);
         updateComparisons();
         updateTimes();
         Settings.updateList();
     }
     closeSearch();
     save();
 }

 function removeLocation(zone) {
     var name = zone;
     if (name.indexOf('/') !== -1) {
         name = zone.split('/')[1].split('_').join(' ');
     }
     var newList = [];
     for (var i = 0; i < comparetimeZones.length; i++) {
         var zone = comparetimeZones[i];
         if (zone.name !== name) {
             newList.push(zone)
         }
     };
     comparetimeZones = newList;
     updateComparisons();
     updateTimes();
     Settings.updateList();
     save()
 }

 function updateComparisons() {
     var comparisonsDom = buildComparisonsRows();
     var comparisons = document.getElementById('comparisons');
     comparisons.innerHTML = comparisonsDom;
 }

 function init() {
     var times = document.getElementById('times');
     var dom = buildYourTime();
     dom += buildComparisons();
     dom += '<a id="edit-button" class="edit-button" href="javascript:toggleSettings()"></a>';
     //dom += '<div id="picker" class="picker"></div>';
     times.innerHTML = dom;
     yourTime = document.getElementsByClassName('times')[0];
     zoneNames = document.getElementsByClassName('zone-name');
     setTimeout(scrollToNow, 100);
     // 
     Mask.init(times);
     Settings.init(times);
     LoctionSearch.init(times);
     Settings.updateYourLocation(yourTimeZome.name);
 }

 function scrollToNow() {

     var time = moment();
     var totalMins = ((time.hours()) * 60) + time.minutes();
     var halfWidth = window.innerWidth / 2;
     var scrollPos = (6 * 60 * minLength + (totalMins * minLength)) - halfWidth
     window.scrollTo(Math.round(scrollPos), 0);

     scroll();
     window.addEventListener('scroll', scroll);
 }

 function scroll() {
     if (!scrollStarted) {
         scrollStart()
     }
     if (scrollEndTimeout) {
         clearTimeout(scrollEndTimeout)
     }
     scrollEndTimeout = setTimeout(scrollEnd, 500)
 }

 function scrollStart() {
    console.log('scrollStart');
     scrollStarted = true;
     scrollInterval = window.requestAnimationFrame(updateScroll);
 }

 function updateScroll() {
    console.log('updateScroll');
     yourTime.style.transform = 'translate(-' + window.scrollX + 'px)';
     yourTime.style.webkitTransform = 'translate(-' + window.scrollX + 'px)';
     for (var i = 1; i < zoneNames.length; i++) {
         var zoneName = zoneNames[i]
         zoneName.style.transform = 'translate(0,-' + window.scrollY + 'px)';
          zoneName.style.webkitTransform = 'translate(0,-' + window.scrollY + 'px)';
     };
     updateTimes();
 }

 function updateTimes() {
     var halfWidth = window.innerWidth / 2;
     var timeMinOffset = Math.round((window.scrollX + halfWidth) / minLength);
     var time = moment();
     time.hours(0);
     time.minutes(0);
     time.hours(time.hours() - 6);
     time.minutes(time.minutes() + timeMinOffset);
     var zones = comparetimeZones.concat([yourTimeZome]);
     for (var z = 0; z < zones.length; z++) {
         var timeZone = zones[z];
         var zomeNameDom = document.getElementById(getZoneId(timeZone));
         var timeStr = time.tz(timeZone.zone).format('h:mm a');
         zomeNameDom.innerHTML = '<span class="name">' + timeZone.name + '</span><span class="time-str">' + timeStr + '</span>';
     };
     window.cancelAnimationFrame(scrollInterval);
     scrollInterval = window.requestAnimationFrame(updateScroll);
 }


 function scrollEnd() {
     scrollStarted = false;
     window.cancelAnimationFrame(scrollInterval);
 }

 function toggleSettings() {
     if (isSettingsOpen) {
         closeSettings()
     } else {
         openSettings();
     }
 }

 function openSettings() {
     isSettingsOpen = true;
     Settings.open();
     Mask.open();
     var editButton = document.getElementById('edit-button');
     editButton.className = editButton.className + " close";
 }

 function openSearch() {
     addingLocation = true;
     Settings.off();
     LoctionSearch.open();
 }

 function editYourLocation() {
     addingLocation = false;
     Settings.off();
     LoctionSearch.open();
 }

 function closeSearch() {
     Settings.open();
     LoctionSearch.close();
 }

 function closeSettings() {
     isSettingsOpen = false;
     Settings.close();
     Mask.close();
     var editButton = document.getElementById('edit-button');
     editButton.className = "edit-button";
     LoctionSearch.close();
 }

 function save() {
     localStorage.setItem('yourTimeZome', JSON.stringify(yourTimeZome));
     localStorage.setItem('comparetimeZones', JSON.stringify(comparetimeZones));
 }

 function clearSavedData() {
     localStorage.setItem('yourTimeZome', null);
     localStorage.setItem('comparetimeZones', null);
 }

 init();