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



 var comparetimeZones = [{
     name: 'Vancouver',
     zone: 'America/Vancouver'
 }, {
     name: 'LA',
     zone: 'America/Los_Angeles'
 }, {
     name: 'New York',
     zone: 'America/New_York'
 }, {
     name: 'Tokyo',
     zone: 'Asia/Tokyo'
 }, {
     name: 'London',
     zone: 'Europe/London'
 }, {
     name: 'Rome',
     zone: 'Europe/Rome'
 }];

 var userTimezone = moment.tz.guess();
 var yourTimeZome = {
     name: userTimezone.split('/')[1].replace(/_/g, ' '),
     zone: userTimezone
 }

 var colours = ['60,200,200', '200,60,200', '200,200,60']



 function buildTimeRow(timeZone) {
     var dom = ''
     dom += '<div class="zone-name" id="' + timeZone.zone.split('/').join('-') + '"></div>';
     dom += '<div class="zone" style="width:' + zoneWidth + '">';

     dom += '<div class="times">';
     var time = moment();
     time.hours(0);
     time.hours(time.hours() - 6);
     time.minutes(0);
     var randomColourId = Math.round(Math.random() * (colours.length - 1));
     var colour = colours[randomColourId]
     for (var i = 0; i < totalHours; i++) {
         dom += buildTimeCell(time, timeZone, colour);
         time.hours(time.hours() + 1);

     };
     dom += '</div></div>';
     return dom;
 }

 function buildTimeCell(time, timeZone, colour) {
     var dom = ''
     var timeStr = time.tz(timeZone.zone).format('ha');
     var percent = Math.abs(time.hours() - 12) / 0.11;

     dom += '<div class="time" style="background:rgba(' + colour + ',' + (1 - (percent / 100)) + ')">' + timeStr + '</div>';
     return dom;
 }

 function buildYourTime() {
     var dom = '<div class="your-time">';
     dom += buildTimeRow(yourTimeZome)
     dom += '</div>';
     return dom;
 }

 function buildComparisons() {
     var dom = '<div class="comparisons">';
     for (var z = 0; z < comparetimeZones.length; z++) {
         var timeZone = comparetimeZones[z];
         dom += buildTimeRow(timeZone)
     };
     dom += '</div>';
     return dom;
 }



 function init() {
     var times = document.getElementById('times');
     var dom = buildYourTime();
     dom += buildComparisons();
     
     dom += '<a id="edit-button" class="edit-button" href="javascript:toggleSettings()"></a>';
     dom += '<a id="mask" class="mask" href="javascript:closeSettings()"></a>';
     dom += '<div id="settings" class="settings"><div id="your-location" class="your-location"><h5>Your Location</h5><h2>Sydney</h2></div><ul id="zone-list" class="zone-list"><li><a>Sydney Australia</a></li></ul><a id="add-button" class="add-button" href="javascript:openSearch()"><span>Add Location</span></a></div>'
    
     //dom += '<div id="picker" class="picker"></div>';
     times.innerHTML = dom;
     yourTime = document.getElementsByClassName('times')[0];
     zoneNames = document.getElementsByClassName('zone-name');

     setTimeout(scrollToNow, 100);
     LoctionSearch.init();
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
     scrollStarted = true;
     scrollInterval = window.requestAnimationFrame(updateScroll);
 }

 function updateScroll() {
     yourTime.style.transform = 'translate(-' + window.scrollX + 'px)';
     for (var i = 1; i < zoneNames.length; i++) {
         var zoneName = zoneNames[i]
         zoneName.style.transform = 'translate(0,-' + window.scrollY + 'px)';
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
         var zomeNameDom = document.getElementById(timeZone.zone.split('/').join('-'));
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
     var body = document.getElementsByTagName("body")[0];
     body.className = "no-scroll"
     var settings = document.getElementById('settings');
     settings.className = settings.className + " settings-open";
     var mask = document.getElementById('mask');
     mask.className = mask.className + " mask-open";
     var editButton = document.getElementById('edit-button');
     editButton.className = editButton.className + " close";
 }

 function openSearch() {
     var settings = document.getElementById('settings');
     settings.className = settings.className + " settings-close";
     LoctionSearch.open();
 }

 function closeSearch(){
     var settings = document.getElementById('settings');
     settings.className = "settings settings-open";
      LoctionSearch.close();
 }

 function closeSettings() {
     isSettingsOpen = false;
     var settings = document.getElementById('settings');
     settings.className = "settings";
     var mask = document.getElementById('mask');
     mask.className = "mask";
     var body = document.getElementsByTagName("body")[0];
     body.className = ""
     var editButton = document.getElementById('edit-button');
     editButton.className = "edit-button";
       LoctionSearch.close();
 }

 init();