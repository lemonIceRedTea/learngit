(function ($, root) {
    var $scope = $(document.body);
    function controlManager(len) {
        this.index = 0;
        this.len = len;
    }
    controlManager.prototype = {
        prev: function () {
            this.getIndex(-1);
        },
        next: function () {
            this.getIndex(1);
        },
        getIndex: function (val) {
            var curIndex;
            curIndex = (this.index + val + this.len) % this.len;
            console.log(this.len)
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;
})(window.Zepto, window.player || (window.player = {}))