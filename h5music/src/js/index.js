var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var controlManager;
var audioManager = new root.audioManager();
var songlist;
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            console.log(data);
            songlist = data;
            root.render(data[0]);
            root.processor.renderEndTime(data[0].duration);
            root.songList.renderList(songlist);
            controlManager = new root.controlManager(songlist.length);
            audioManager.setSrc(data[0].audio);
            bindClick();
            bindTouch();
        },
        error: function (e) {
            console.log(e);
        }
    })
}
function bindClick() {
    $scope.on('play:change', function (event, index) {
        var isLike = songlist[index].isLike;
        if(isLike) {
            $scope.find('.btn-like').addClass('liking');
        }else {
            $scope.find('.btn-like').removeClass('liking');
        }
        root.render(songlist[index]);
        root.processor.renderEndTime(songlist[index].duration);
        audioManager.setSrc(songlist[index].audio);
        audioManager.play();
        root.processor.start();
    })
    $scope.on('click', '.btn-play',function() {
        if(audioManager.audio.status == 'play') {
            audioManager.pause();
            root.processor.stop();
        }else {
            audioManager.play();
            root.processor.start();
        }
    } )
    $scope.on('click', '.btn-pre',function() {
        controlManager.prev();
        $scope.trigger('play:change', controlManager.index);
    } )
    $scope.on('click', '.btn-next',function() {
        controlManager.next();
        $scope.trigger('play:change', controlManager.index);
    })
    $scope.on('click', '.btn-songlist', function () {
        $scope.find('.songlist').toggleClass('show');
    })
    
}
function bindTouch() {
    var $slider = $('.slider-pointer');
    var offset = $('.pro-bottom').offset();
    var left = offset.left,
        width = offset.width;
    $slider.on('touchstart', function () {
        root.processor.stop();
    }).on('touchmove', function (e) {
        var cltX = e.changedTouches[0].clientX;
        var per = (cltX - left) / width;
        if(per > 1 || per < 0) {
            per = 0;
        }
        // console.log(per)
        root.processor.updata(per);
    }).on('touchend', function (e) {
        var cltX = e.changedTouches[0].clientX;
        var per = (cltX - left) / width;
        if(per > 1 || per < 0) {
            per = 0;
        }
        var curDuration = songlist[controlManager.index].duration;
        var curT = per * curDuration;
        audioManager.jumpTo(curT);
        root.processor.start(per);
        $scope.find('.btn-play').addClass('play');
    })
}
getData('../../source/data.json');