var Mask = {
    element: null,
    init: function(parentNode) {
        // create element
        var div = document.createElement('a');
        div.setAttribute('id', 'mask');
        div.setAttribute('class', 'mask');
        div.setAttribute('href', 'javascript:closeSettings()');
        // add 
        parentNode.appendChild(div);
        this.element = document.getElementById('mask');
    },

    open: function() {
        var body = document.getElementsByTagName("body")[0];
        body.className = "no-scroll";
        this.element.className = this.element.className + " mask-open";
    },

    close: function() {
        this.element.className = "mask";
        var body = document.getElementsByTagName("body")[0];
        body.className = ""
    }
}