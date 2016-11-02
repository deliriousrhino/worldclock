var LoctionSearch = {
    lastSearchStr: null,
    element: null,
    filteredList: null,
    isOpen: false,
    init: function (parentNode) {

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

    open: function () {
        this.isOpen = true;
        this.element.className = this.element.className + " location-search-open";
        this.buildList('')
    },
    close: function () {
        this.isOpen = false;
        this.searchInput.value = '';
        this.element.className = "location-search";

    },
    search: function () {
        this.buildList(this.searchInput.value)
    },
    clearList: function () {
        this.searchList.innerHTML = '';
    },
    buildList: function (searchStr) {
        searchStr = searchStr.toLowerCase();
        //var locationNames = moment.tz.names();
        // cities-list.js
        if (!searchStr || searchStr === '') {
            this.filteredList = [];
        } else {
            var listToFliter = cities;
            if (this.lastSearchStr && searchStr.indexOf(this.lastSearchStr) === 0) {
                listToFliter = this.filteredList;
            }
            this.filteredList = cities.filter(function (location) {
                if (location.name.toLowerCase().indexOf(searchStr) === 0) {
                    return location;
                }
            });
        }
        var links = [];
        var length = (this.filteredList.length > 100) ? 100 : this.filteredList.length;
        for (var i = 0; i < length; i++) {
            var location = this.filteredList[i];
            links.push('<li><a href="javascript:locationSelected(' + location.id + ')">' + location.name + '</a></li>');
        };
        this.searchList.innerHTML = links.join('');
        this.lastSearchStr = searchStr;

    }
}