
(function($, root) {
    $scope = $(document.body);
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            root.blurImg(img, $scope);
            $scope.find('.songImg .imgWrapper img').attr('src', src);
        }
    }
    function renderInfo(info) {
        var html = '<div class="songName">' + info.song + '</div>\
        <div class="singer">' + info.singer + '</div>\
        <div class="author">' + info.album + '</div>'
        $scope.find('.songInfo').html(html);
    }
    function renderIsLike(isLike) {
        if(isLike) {
            $scope.find('.btn-like').addClass('liking');
        }
    }
    
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}));