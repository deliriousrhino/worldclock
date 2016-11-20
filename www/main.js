 var scrollStarted = false;
 var scrollInterval = false;
 var scrollEndTimeout = false;
 var resetTimer;
 var timeCoundDownAmount = 1;
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

 var frames = {
     "ani0": { "x": 0, "y": 0, "w": 201, "h": 313 },
     "ani1": { "x": 201, "y": 0, "w": 201, "h": 312 },
     "ani2": { "x": 402, "y": 0, "w": 201, "h": 312 },
     "ani3": { "x": 603, "y": 0, "w": 201, "h": 311 },
     "ani4": { "x": 804, "y": 0, "w": 201, "h": 310 },
     "ani5": { "x": 1005, "y": 0, "w": 201, "h": 309 },
     "ani6": { "x": 1206, "y": 0, "w": 201, "h": 307 },
     "ani7": { "x": 1407, "y": 0, "w": 201, "h": 305 },
     "ani8": { "x": 1608, "y": 0, "w": 201, "h": 302 },
     "ani9": { "x": 1809, "y": 0, "w": 201, "h": 300 },
     "ani10": { "x": 0, "y": 313, "w": 201, "h": 297 },
     "ani11": { "x": 201, "y": 313, "w": 201, "h": 294 },
     "ani12": { "x": 402, "y": 313, "w": 201, "h": 290 },
     "ani13": { "x": 603, "y": 313, "w": 201, "h": 287 },
     "ani14": { "x": 804, "y": 313, "w": 201, "h": 283 },
     "ani15": { "x": 1005, "y": 313, "w": 201, "h": 279 },
     "ani16": { "x": 1206, "y": 313, "w": 201, "h": 275 },
     "ani17": { "x": 1407, "y": 313, "w": 201, "h": 271 },
     "ani18": { "x": 1608, "y": 313, "w": 201, "h": 266 },
     "ani19": { "x": 1809, "y": 313, "w": 201, "h": 262 },
     "ani20": { "x": 0, "y": 610, "w": 201, "h": 257 },
     "ani21": { "x": 201, "y": 610, "w": 201, "h": 252 },
     "ani22": { "x": 402, "y": 610, "w": 201, "h": 248 },
     "ani23": { "x": 603, "y": 610, "w": 201, "h": 243 },
     "ani24": { "x": 804, "y": 610, "w": 201, "h": 238 },
     "ani25": { "x": 1005, "y": 610, "w": 201, "h": 240 },
     "ani26": { "x": 1206, "y": 610, "w": 201, "h": 245 },
     "ani27": { "x": 1407, "y": 610, "w": 201, "h": 249 },
     "ani28": { "x": 1608, "y": 610, "w": 201, "h": 254 },
     "ani29": { "x": 1809, "y": 610, "w": 201, "h": 258 },
     "ani30": { "x": 0, "y": 868, "w": 201, "h": 263 },
     "ani31": { "x": 201, "y": 868, "w": 201, "h": 267 },
     "ani32": { "x": 402, "y": 868, "w": 201, "h": 271 },
     "ani33": { "x": 603, "y": 868, "w": 201, "h": 275 },
     "ani34": { "x": 804, "y": 868, "w": 201, "h": 279 },
     "ani35": { "x": 1005, "y": 868, "w": 201, "h": 282 },
     "ani36": { "x": 1206, "y": 868, "w": 201, "h": 286 },
     "ani37": { "x": 1407, "y": 868, "w": 201, "h": 289 },
     "ani38": { "x": 1608, "y": 868, "w": 201, "h": 292 },
     "ani39": { "x": 1809, "y": 868, "w": 201, "h": 295 },
     "ani40": { "x": 0, "y": 1163, "w": 201, "h": 298 },
     "ani41": { "x": 201, "y": 1163, "w": 201, "h": 300 },
     "ani42": { "x": 402, "y": 1163, "w": 201, "h": 302 },
     "ani43": { "x": 603, "y": 1163, "w": 201, "h": 304 },
     "ani44": { "x": 804, "y": 1163, "w": 201, "h": 305 },
     "ani45": { "x": 1005, "y": 1163, "w": 201, "h": 307 },
     "ani46": { "x": 1206, "y": 1163, "w": 201, "h": 307 },
     "ani47": { "x": 1407, "y": 1163, "w": 201, "h": 308 },
     "ani48": { "x": 1608, "y": 1163, "w": 201, "h": 308 },
     "ani49": { "x": 1809, "y": 1163, "w": 201, "h": 308 },
     "ani50": { "x": 0, "y": 1471, "w": 201, "h": 308 },
     "ani51": { "x": 201, "y": 1471, "w": 201, "h": 308 },
     "ani52": { "x": 402, "y": 1471, "w": 201, "h": 307 },
     "ani53": { "x": 603, "y": 1471, "w": 201, "h": 306 },
     "ani54": { "x": 804, "y": 1471, "w": 201, "h": 305 },
     "ani55": { "x": 1005, "y": 1471, "w": 201, "h": 303 },
     "ani56": { "x": 1206, "y": 1471, "w": 201, "h": 302 },
     "ani57": { "x": 1407, "y": 1471, "w": 201, "h": 300 },
     "ani58": { "x": 1608, "y": 1471, "w": 201, "h": 297 },
     "ani59": { "x": 1809, "y": 1471, "w": 201, "h": 295 },
     "ani60": { "x": 0, "y": 1779, "w": 201, "h": 292 },
     "ani61": { "x": 201, "y": 1779, "w": 201, "h": 289 },
     "ani62": { "x": 402, "y": 1779, "w": 201, "h": 286 },
     "ani63": { "x": 603, "y": 1779, "w": 201, "h": 283 },
     "ani64": { "x": 804, "y": 1779, "w": 201, "h": 279 },
     "ani65": { "x": 1005, "y": 1779, "w": 201, "h": 275 },
     "ani66": { "x": 1206, "y": 1779, "w": 201, "h": 272 },
     "ani67": { "x": 1407, "y": 1779, "w": 201, "h": 268 },
     "ani68": { "x": 1608, "y": 1779, "w": 201, "h": 264 },
     "ani69": { "x": 1809, "y": 1779, "w": 201, "h": 260 },
     "ani70": { "x": 0, "y": 2071, "w": 201, "h": 255 },
     "ani71": { "x": 201, "y": 2071, "w": 201, "h": 251 },
     "ani72": { "x": 402, "y": 2071, "w": 201, "h": 246 },
     "ani73": { "x": 603, "y": 2071, "w": 201, "h": 242 },
     "ani74": { "x": 804, "y": 2071, "w": 201, "h": 240 },
     "ani75": { "x": 1005, "y": 2071, "w": 201, "h": 244 },
     "ani76": { "x": 1206, "y": 2071, "w": 201, "h": 248 },
     "ani77": { "x": 1407, "y": 2071, "w": 201, "h": 253 },
     "ani78": { "x": 1608, "y": 2071, "w": 201, "h": 257 },
     "ani79": { "x": 1809, "y": 2071, "w": 201, "h": 261 },
     "ani80": { "x": 0, "y": 2332, "w": 201, "h": 265 },
     "ani81": { "x": 201, "y": 2332, "w": 201, "h": 270 },
     "ani82": { "x": 402, "y": 2332, "w": 201, "h": 274 },
     "ani83": { "x": 603, "y": 2332, "w": 201, "h": 277 },
     "ani84": { "x": 804, "y": 2332, "w": 201, "h": 281 },
     "ani85": { "x": 1005, "y": 2332, "w": 201, "h": 285 },
     "ani86": { "x": 1206, "y": 2332, "w": 201, "h": 288 },
     "ani87": { "x": 1407, "y": 2332, "w": 201, "h": 291 },
     "ani88": { "x": 1608, "y": 2332, "w": 201, "h": 294 },
     "ani89": { "x": 1809, "y": 2332, "w": 201, "h": 297 },
     "ani90": { "x": 0, "y": 2629, "w": 201, "h": 300 },
     "ani91": { "x": 201, "y": 2629, "w": 201, "h": 302 },
     "ani92": { "x": 402, "y": 2629, "w": 201, "h": 304 },
     "ani93": { "x": 603, "y": 2629, "w": 201, "h": 306 },
     "ani94": { "x": 804, "y": 2629, "w": 201, "h": 308 },
     "ani95": { "x": 1005, "y": 2629, "w": 201, "h": 309 },
     "ani96": { "x": 1206, "y": 2629, "w": 201, "h": 311 },
     "ani97": { "x": 1407, "y": 2629, "w": 201, "h": 312 },
     "ani98": { "x": 1608, "y": 2629, "w": 201, "h": 312 },
     "ani99": { "x": 1809, "y": 2629, "w": 201, "h": 313 }
 }




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
     // Listen for the app to be restarted
     document.addEventListener("resume", onResume, false);
 }

 // the app has been restarted
 function onResume(){
    if (timeMinOffset===0){
        updateTimes();
    }
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
      clearInterval(resetTimer)
     lastPosition = getPosition(evt)
 }

 function touchEnd(evt) {
     lastPosition = null;
 }

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
     // timeMinOffset = 0;
     // updateTimes();
     console.log(timeCoundDownAmount)
     timeCoundDownAmount = timeMinOffset / 30;
     clearInterval(resetTimer)
     resetTimer = setInterval(countDown, 10);
     countDown();
 }

 function countDown() {
     timeMinOffset -= timeCoundDownAmount;
     if (timeMinOffset >= 0 && timeCoundDownAmount < 0 ||  timeMinOffset <= 0 && timeCoundDownAmount > 0) {
         timeMinOffset = 0;
         clearInterval(resetTimer)
     }
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

         var aniFrame = Math.round(((hours * 60) + time.minutes()) / 14.4)

         var style = 'linear-gradient(to right, rgba(51,204,255,' + (1 - (percentOne / 100)) + '), rgba(51,204,255,' + (1 - (percentTwo / 100)) + '))'
         zomeNameDom.style.background = style;

         var timeStr = time.tz(timeZone.zone).format('h:mm a');
         var dateStr = time.tz(timeZone.zone).format('ddd Do MMM');
         var dom = '<span class="name">' + timeZone.name + '</span>'
         var clickTime = '';
         var clickDate = '';
         var clickClass = '';
         if (z === zones.length - 1) {
             clickTime = 'onclick="showTime()"'
             clickDate = 'onclick="showDate()"'
             clickClass = 'btn'
         }



         console.log(aniFrame)
         var frame = frames['ani' + aniFrame]

         dom += '<div class="time-ani" style="background-position: ' + -(frame.x / 2) + 'px ' + -(frame.y / 2) + 'px;"></div>';
         dom += '<span class="time-str ' + clickClass + '" ' + clickTime + '>' + timeStr + '</span>';
         dom += '<span class="date-str ' + clickClass + '" ' + clickDate + '>' + dateStr + '</span>';
         //
         zomeNameDom.innerHTML = dom;
     };
     var times = document.getElementById('times');
     var timesColHeight = (100 * zones.length);
     var height = (timesColHeight > window.innerHeight) ? timesColHeight : window.innerHeight;
     times.style.height = height + 'px';
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
     var time = moment();
     time.minutes(time.minutes() + timeMinOffset);
     var dt = new DateTimePicker.Time({
         default: time.format('HH:mm') // default `new Date()`. If `default` type is string, then it will be parsed to `Date` instance by `format` . Or it can be a `Date` instance
     })
     dt.on('selected', function(formatTime, now) {
         time = moment();
         time.seconds(0)
         var newTime = moment(now);
         newTime.year(time.year())
         newTime.month(time.month())
         newTime.date(time.date())
         var duration = moment.duration(newTime.diff(time));
         timeMinOffset = Math.ceil(duration.asMinutes());
         updateTimes();
     })
 }

 function showDate() {
     var orgtime = moment();
     console.log(orgtime.format('YYYY-MM-DD'))
     orgtime.minutes(orgtime.minutes() + timeMinOffset);
     var dt = new DateTimePicker.Date({
         default: orgtime.format('YYYY-MM-DD') // default `new Date()`. If `default` type is string, then it will be parsed to `Date` instance by `format` . Or it can be a `Date` instance
     })
     dt.on('selected', function(formatDate, now) {
         var time = moment();
         time.seconds(0)
         var newTime = moment(now);
         newTime.hour(orgtime.hour())
         newTime.minutes(orgtime.minutes())
         newTime.seconds(0)
         var duration = moment.duration(newTime.diff(time));
         timeMinOffset = Math.ceil(duration.asMinutes());
         updateTimes();
     });
 }

 init();