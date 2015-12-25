 var scrollStarted = false;
 var scrollInterval = false;
 var scrollEndTimeout = false;
 var yourTime;
 var zoneNames;
 var minLength = 2400 / (24 * 60); // px length of a min;
 var comparetimeZones = [{
     name: 'Vancouver',
     zone: 'America/Vancouver',
     times: []
 }, {
     name: 'LA',
     zone: 'America/Los_Angeles',
     times: []
 }, {
     name: 'New York',
     zone: 'America/New_York',
     times: []
 }, {
     name: 'Tokyo',
     zone: 'Asia/Tokyo',
     times: []
 }, {
     name: 'London',
     zone: 'Europe/London',
     times: []
 }, {
     name: 'Rome',
     zone: 'Europe/Rome',
     times: []
 }];


 var yourTimeZome = {
     name: 'Sydney',
     zone: 'Australia/Sydney',
     times: []
 }

 var colours = ['60,200,200', '200,60,200', '200,200,60']



 function buildTimeRow(timeZone) {
     var dom = ''
     dom += '<div class="zone-name" id="' + timeZone.zone.split('/').join('-') + '"></div>';
     dom += '<div class="zone">';

     dom += '<div class="times">';
     var time = moment();
     time.hours(0);
     time.minutes(0);
     var randomColourId = Math.round(Math.random() * (colours.length - 1));
     var colour = colours[randomColourId]
     for (var i = 1; i < 26; i++) {
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
     times.innerHTML = dom;
     yourTime = document.getElementsByClassName('times')[0];
     zoneNames = document.getElementsByClassName('zone-name');
     window.addEventListener('scroll', scroll);
     updateTimes();
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
     scrollInterval = window.requestAnimationFrame(updateScroll)
 }

 function updateScroll() {
     yourTime.style.transform = 'translate(-' + window.scrollX + 'px)';
     for (var i = 1; i < zoneNames.length; i++) {
         var zoneName = zoneNames[i]
         zoneName.style.transform = 'translate(0,-' + window.scrollY + 'px)';
     };
     scrollInterval = window.requestAnimationFrame(updateScroll)
     updateTimes();
 }

 function updateTimes() {
     var timeMinOffset = Math.round((window.scrollX-1200) / minLength);
     var time = moment();
     time.hours(0);
     time.minutes(time.minutes()+timeMinOffset);
     var zones = comparetimeZones.concat([yourTimeZome]);
     for (var z = 0; z < zones.length; z++) {
         var timeZone = zones[z];
         var zomeNameDom = document.getElementById(timeZone.zone.split('/').join('-'));
         var timeStr = time.tz(timeZone.zone).format('h:mm a');
         zomeNameDom.innerHTML = '<span class="name">'+timeZone.name+'</span><span class="time-str">'+timeStr+'</span>';
     };
 }

 function scrollEnd() {
     scrollStarted = false;
     if (scrollInterval) {
         window.cancelAnimationFrame(scrollInterval)
     }
 }

 init();