(function($, root) {
    var $scope = $(document.body);
    function renderList(info) {
        var html = '';
        for(var i = 0; i < info.length; i ++) {
            html += '<li>\
                <strong>' + info[i].song + '</strong><span class="right">' + info[i].singer + '</span>\
            </li>'
        }
        $scope.find('.play-list').html(html);
    }
    root.songList = {
        renderList: renderList
    }
})(window.Zepto, window.player || (window.player = {}))