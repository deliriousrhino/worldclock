var LoctionSearch = {

    element: null,
    init: function() {
        
        var locationNames = moment.tz.names();
        var list = [];
        for (var i = locationNames.length - 1; i >= 0; i--) {
            var name = locationNames[i];
            list.push('<li><a>' + name + '</a></li>')
        };
        var dom = '<div id="location-search" class="location-search"><div class="header-bar"><a class="back-button" href="javascript:closeSearch()"></a><input type="search" placeholder="Search"></input></div><ul id="zone-list" class="zone-list">'+list.join('')+'</ul></div>';
        document.body.appendChild(dom);

        this.element = document.getElementById('location-search');

    },
    
    open: function() {
        this.element.className = this.element.className + " location-search-open";
    },
    close: function() {
        this.element.className = "location-search";
    },
    search: function() {

    }
}