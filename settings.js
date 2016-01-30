var Settings = {
    element: null,
    init: function(parentNode) {
        // create element
        var div = document.createElement('div');
        div.setAttribute('id', 'settings');
        div.setAttribute('class', 'settings');
        // create inner dom
        var dom = '<div class="your-location"><h5>Your Location</h5><h2>Sydney</h2></div><ul id="zone-list" class="zone-list"></ul><a id="add-button" class="add-button" href="javascript:openSearch()"><span>Add Location</span></a>';
        div.innerHTML = dom;
        // add 
        parentNode.appendChild(div);
        this.element = document.getElementById('settings');
        this.updateList();
    },

    updateList: function() {
        var dom = '';
        for (var i = 0; i < comparetimeZones.length; i++) {
            var zone = comparetimeZones[i];
            dom += '<li><a href="javascript:removeLocation(\'' + zone.name + '\')">' + zone.name + '</a></li>'
        };
        var zonelist = document.getElementById('zone-list');
        zonelist.innerHTML = dom;
    },

    open: function() {
        this.element.className = "settings settings-open";
    },

    off: function() {
        this.element.className = "settings settings-close";
    },

    close: function() {
        this.element.className = "settings";
    }
}