(function($, root) {
    var $scope = $(document.body);
    function audioManager () {
        this.audio = new Audio();
        this.status = 'pause';
    }
    audioManager.prototype = {
        play: function () {
            this.audio.play();
            this.audio.status = 'play';
            $scope.find('.btn-play').addClass('play');
        },
        pause: function () {
            this.audio.pause();
            this.audio.status = 'pause';
            $scope.find('.btn-play').removeClass('play');
        },
        setSrc: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpTo: function (time) {
            this.audio.currentTime  = time;
            this.play();
        }
    }
    root.audioManager = audioManager; 
})(window.Zepto, window.player || (window.player = {}))