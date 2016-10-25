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
 var timeMinOffset = 0;
 var lastPosition = 0;


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

 function init() {
     var times = document.getElementById('times');
     var dom = buildYourTime();
     dom += buildComparisons();
     dom += '<a id="edit-button" class="edit-button" href="javascript:toggleSettings()"></a>';
     dom += '<a id="reset-button" class="reset-button" href="javascript:reset()"></a>';
     //dom += '<div id="picker" class="picker"></div>';
     times.innerHTML = dom;
     // yourTime = document.getElementsByClassName('times')[0];
     zoneNames = document.getElementsByClassName('zone-name');
     // 
     Mask.init(times);
     Settings.init(times);
     LoctionSearch.init(times);
     Settings.updateYourLocation(yourTimeZome.name);
     addEvents();

     updateYourTime();
     updateTimes();
 }

 function onLoad() {
     document.addEventListener("deviceready", onDeviceReady, false);
 }

 // device APIs are available
 function onDeviceReady() {
     // Register the event listener
     document.addEventListener("backbutton", onBackKeyDown, false);
 }

 // Handle the back button
 function onBackKeyDown(e) {
     if (LoctionSearch.isOpen) {
         closeSearch();
         e.preventDefault();
         return
     }
     if (Settings.isOpen) {
         closeSettings();
         e.preventDefault();
         return
     }
 }



 function getZoneId(timeZone) {
     return timeZone.zone.split('/').join('-') + '-' + timeZone.name.split("'").join('').split(" ").join('').split(",").join('')
 }

 function buildTimeRow(timeZone) {
     var dom = ''
     dom += '<div class="zone-name" id="' + getZoneId(timeZone) + '"></div>';
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




 function addEvents() {
     var times = document.getElementById('times');
     times.addEventListener("touchstart", touchStart, false);
     times.addEventListener("touchend", touchEnd, false);
     times.addEventListener("touchmove", touchMove, false);
 }

 function touchStart(evt) {
     lastPosition = getPosition(evt)
 }

 function touchEnd(evt) {}

 function touchMove(evt) {
     var newPosition = getPosition(evt);
     var xdiff = lastPosition.x - newPosition.x;
     var ydiff = lastPosition.y - newPosition.y;
     if (Math.abs(xdiff) > Math.abs(ydiff)) {
         timeMinOffset += xdiff;
         lastPosition = newPosition;
         updateTimes();
     }

 }

 function getPosition(evt) {
     return { x: evt.touches[0].pageX, y: evt.touches[0].pageY };
 }

 function reset() {
     timeMinOffset = 0;
     updateTimes();
 }

 function updateScroll() {
     updateTimes();
 }

 function updateTimes() {
     var time = moment();
     time.minutes(time.minutes() + timeMinOffset);
     var zones = comparetimeZones.concat([yourTimeZome]);
     for (var z = 0; z < zones.length; z++) {
         var timeZone = zones[z];
         var zomeNameDom = document.getElementById(getZoneId(timeZone));

         var timeStr = time.tz(timeZone.zone).format('ha');
         var percentOne = Math.abs(time.hours() - 13) / 0.11;
         var percentTwo = Math.abs(time.hours() - 12) / 0.11;
         var hours = time.hours();


         var style = 'linear-gradient(to right, rgba(51,204,255,' + (1 - (percentOne / 100)) + '), rgba(51,204,255,' + (1 - (percentTwo / 100)) + '))'
         zomeNameDom.style.background = style;

         var timeStr = time.tz(timeZone.zone).format('h:mm a');
         var dateStr = time.tz(timeZone.zone).format('ddd Do MMM');
         var dom = '<span class="name">' + timeZone.name + '</span>'
         var clickTime = '';
         var clickDate = '';
         var clickClass = '';
         if (z === zones.length-1) {
             clickTime = 'onclick="showTime()"'
             clickDate = 'onclick="showDate()"'
             clickClass = 'btn'
         }
         dom += '<span class="time-str ' + clickClass + '" ' + clickTime + '>' + timeStr + '</span>';
         dom += '<span class="date-str ' + clickClass + '" ' + clickDate + '>' + dateStr + '</span>';
         //
         zomeNameDom.innerHTML =dom;
     };
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

 function showTime() {
     var dt = new DateTimePicker.Time({})
     dt.on('selected', function(formatTime, now) {
         console.log('selected time: ', formatTime, now)
     })
 }

 function showDate() {
     var dt = new DateTimePicker.Date({})
     dt.on('selected', function(formatDate, now) {
         console.log('selected date: ', formatDate, now)
     });
 }

 init();