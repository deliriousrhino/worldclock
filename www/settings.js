var Settings = {
    element: null,
    isOpen: false,
    init: function (parentNode) {
        var self = this;
        // create element
        var div = document.createElement('div');
        div.setAttribute('id', 'settings');
        div.setAttribute('class', 'settings');
        // create inner dom
        var dom = '<a href="javascript:editYourLocation()" class="your-location"></a><a id="add-button" class="add-button" href="javascript:openSearch()"><span>Add Location</span></a><ul id="zone-list" class="zone-list"></ul>';
        div.innerHTML = dom;
        // add 
        parentNode.appendChild(div);
        this.element = document.getElementById('settings');
        this.updateList();
        var zonelist = document.getElementById('zone-list');
        var sortable = Sortable.create(zonelist, {
            handle: '.handle',
            onEnd: function (evt) {
                if (comparetimeZones.length > 1) {
                    var temp = comparetimeZones[evt.oldIndex];
                    comparetimeZones[evt.oldIndex] = comparetimeZones[evt.newIndex];
                    comparetimeZones[evt.newIndex] = temp;
                    self.updateList();
                    updateComparisons();
                    updateTimes();
                    save();
                }

            },
        });
    },

    updateYourLocation: function (name) {
        var dom = '<h5>Your Location</h5><h2>' + name + '</h2>';
        var yourLocation = document.getElementsByClassName('your-location')[0];
        yourLocation.innerHTML = dom;
    },

    updateList: function () {
        console.log('updateList')
        var zonelist = document.getElementById('zone-list');
        zonelist.innerHTML = '';
        var dom = '';
        for (var i = 0; i < comparetimeZones.length; i++) {
            var zone = comparetimeZones[i];
            dom += '<li class="locationItem"><div class="handle"></div>' + zone.name + '<a href="javascript:removeLocation(\'' + zone.name + '\')" class="delete"></a></li>'
        };

        zonelist.innerHTML = dom;
    },




    open: function () {
        this.isOpen = true;
        this.element.className = "settings settings-open";
    },

    off: function () {
        this.element.className = "settings settings-close";
    },

    close: function () {
        this.isOpen = false;
        this.element.className = "settings";
    }
}