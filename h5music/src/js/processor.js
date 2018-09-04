(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var lastPer;
    var frameId;
    var startTime;
    function renderEndTime(time) {
        lastPer = 0;
        curDuration = time;
        $scope.find('.endTime').html(formatTime(time));
    }
    function updata(per) {
        var curT = per * curDuration;
        curT = formatTime(curT);
        $scope.find('.curTime').html(curT);
        var curP = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translateX(' +  curP + ')'
        });
    }
    function start(per) {
        lastPer = per === undefined ? lastPer : per;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            var curT = new Date().getTime();
            var curP = lastPer + (curT - startTime) / (curDuration * 1000);
            if(curP < 1) {
                frameId = requestAnimationFrame(frame);
                updata(curP);
            }else {
                cancelAnimationFrame(frameId);
                $scope.find('.btn-next').trigger('click');
            } 
        }
        frame();
    }
    function stop () {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    function formatTime(time) {
        time = Math.round(time);
        var min = Math.floor(time / 60);
        var sec = time - min * 60;
        if(min < 10) {
            min = '0' + min;
        }
        if(sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }
    root.processor = {
        start:start,
        stop: stop,
        renderEndTime: renderEndTime,
        updata: updata
    }
})(window.Zepto, window.player ||(window.player = {}))