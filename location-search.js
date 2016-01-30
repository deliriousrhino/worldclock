var LoctionSearch = {

    element: null,
    init: function(parentNode) {

        var div = document.createElement('div');
        div.setAttribute('id', 'location-search');
        div.setAttribute('class', 'location-search');
        var dom = '<div class="header-bar"><a class="back-button" href="javascript:closeSearch()"></a><input type="search" placeholder="Search" onkeyup="javascript:LoctionSearch.search()"></input></div><ul id="search-list" class="search-list"></ul>';
        div.innerHTML = dom;
        parentNode.appendChild(div);
        this.searchInput = document.querySelectorAll('#location-search input')[0];
        this.searchList = document.querySelectorAll('#location-search #search-list')[0];
        this.element = document.getElementById('location-search');
        this.buildList('');
    },

    open: function() {
        this.element.className = this.element.className + " location-search-open";
    },
    close: function() {
        this.element.className = "location-search";
    },
    search: function() {
        this.buildList(this.searchInput.value)
    },
    buildList: function(searchStr) {
        searchStr = searchStr.toLowerCase();
        var locationNames = moment.tz.names();
        var filteredList;
        if (!searchStr || searchStr === '') {
            filteredList = locationNames;
        } else {
            filteredList = locationNames.filter(function(location) {
                if (location.split('_').join(' ').toLowerCase().indexOf(searchStr) !== -1) {
                    return location;
                }
            })
        }
        var links = [];
        filteredList.sort().reverse();
        for (var i = filteredList.length - 1; i >= 0; i--) {
            var name = filteredList[i];
            links.push('<li><a href="javascript:addLocation(\''+name+'\')">'+name.split('_').join(' ')+'</a></li>');
            
            
        };
        this.searchList.innerHTML = links.join('');
    }
}