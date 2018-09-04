var oMap = document.getElementsByClassName('map')[0];
var oInfo = document.getElementsByClassName('info')[0];
var oBg = document.getElementsByClassName('begin')[0];
var oBgBtn = document.getElementsByClassName('beginBtn')[0];
var oOver = document.getElementsByClassName('over')[0];
var oSuccess = document.getElementsByClassName('success')[0];
var oBtn = document.getElementsByClassName('btn')[0];
var oScore = document.getElementsByClassName('score')[0];
var oTime = document.getElementsByClassName('time')[0];
var oRate = document.getElementsByClassName('rate')[0];
var oRateInp = oRate.getElementsByTagName('input');
var oRateBoard = document.getElementsByClassName('rate_board')[0];
var gd = oMap.getElementsByClassName('grid'),
    sf = oMap.getElementsByClassName('safe');
    // 定义地图
var map = {
    width: '',
    height: '',
    // 设置地图宽高
    setMap: function () {
        oMap.style.width = this.width + 'px';
        oMap.style.height = this.height + 'px';
        return this;
    },
    // 获得地图宽度
    getWidth: function () {
        return this.width;
    },
    // 获得地图高度
    getHeight: function () {
        return this.height;
    },
    // 设置地图宽度
    setWidth: function (width) {
        this.width = width;
        return this;
    },
    // 设置地图高度
    setHeight: function (height) {
        this.height = height;
        return this;
    }
};
// 定义格子
var grid = {
    width: '',
    height: '',
    row: '',
    col: '',
    // 获取格子宽度
    getWidth: function () {
        return this.width;
    },
    // 获取所有格子dom
    getGrid: function () {
        return oMap.getElementsByClassName('grid');
    },
    // 设置格子dom
    setGrid: function (mapWidth, mapHeight, num) {
        this.width = mapWidth / num;
        this.height = this.width;
        this.setRow(mapHeight / this.width);
        this.setCol(num);
        var len = this.setRow * this.setCol;
        var str = '';
        var count = 0;
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.col; j++) {
                if (i == 0 || i == this.col - 1 || j == 0 || j == this.row - 1) {
                    str += '<li class="wrap" " style="width:' + this.width + 'px;height:' + this.height + 'px"></li>';
                } else {
                    str += '<li class="grid" style="width:' + this.width + 'px;height:' + this.height + 'px"></li>';
                    count++;
                }
            }
        }
        oMap.innerHTML = str;
        return this;
    },
    // 获取行数
    getRow: function () {
        return this.row;
    },
    // 设置行数
    setRow: function (row) {
        this.row = row;
        return this;
    },
    // 获取列数
    getCol: function () {
        return this.col;
    },
    // 设置列数
    setCol: function (col) {
        this.col = col;
        return this;
    }
}
// 定义游戏
var game = {
    rate: 1,
    rateDes: '',
    mineNum: 0,
    mineCount: 0,
    flagRight: 0,
    timer: null,
    // 开始游戏
    start: function () {
        var _this = this;
        oBgBtn.onclick = function () {
            oMap.classList.remove('hide');
            oInfo.classList.add('hide');
            oRate.classList.add('hide');
            oBg.classList.remove('show');
            // console.log(this);
            _this.init();
            oRateBoard.innerText = _this.rateDes;
            var date = new Date().getTime();
            clearInterval(_this.timer);
            _this.timer = setInterval(function () {
                oTime.innerText = _this.calTime(date);
            }, 1000);
        }
        oRate.onclick = function () {
            for (var i = 0; i < oRateInp.length; i++) {
                if (oRateInp[i].checked) {
                    _this.rate = parseInt(oRateInp[i].value);
                }
            }
        }
        return this;
    },
    // 触发失败
    end: function (target) {
        target.classList.add('mine');
        oInfo.classList.remove('hide');
        oOver.classList.add('show');
        oBtn.classList.add('show');
        oMap.onmouseup = null;
        oMap.oncontextmenu = null;
        clearInterval(this.timer);
        oBtn.onclick = function () {
            oBtn.classList.remove('show');
            oOver.classList.remove('show');
            oBg.classList.add('show');
            oRate.classList.remove('hide');
            oMap.classList.add('hide');
            oScore.innerText = '';
            oTime.innerText = '';
            oRateBoard.innerText = '';
        }
        return this;
    },
    // 触发胜利
    success: function () {
        oInfo.classList.remove('hide');
        oSuccess.classList.add('show');
        oBtn.classList.add('show');
        oMap.onmouseup = null;
        oMap.oncontextmenu = null;
        clearInterval(this.timer);
        oBtn.onclick = function () {
            oBtn.classList.remove('show');
            oSuccess.classList.remove('show');
            oBg.classList.add('show');
            oRate.classList.remove('hide');
            oMap.classList.add('hide');
            oScore.innerText = '';
            oTime.innerText = '';
            oRateBoard.innerText = '';
        }
        return this;
    },
    // 初始化地图，格子，雷
    init: function () {
        if (this.rate >= 3) {
            map.setWidth(600).setHeight(600).setMap();
            grid.setGrid(map.getWidth(), map.getHeight(), 30);
        } else if (this.rate >= 2) {
            map.setWidth(450).setHeight(450).setMap();
            grid.setGrid(map.getWidth(), map.getHeight(), 20);
        } else {
            map.setWidth(300).setHeight(300).setMap();
            grid.setGrid(map.getWidth(), map.getHeight(), 10);
        }
        this.addMine();
        this.bindEvent();
        return this;
    },
    // 设置游戏难度
    setRate: function (rate) {
        this.rate = rate;
        return this;
    },
    // 添加地雷
    addMine: function () {
        var mineIndex = {};
        var oGrid = grid.getGrid();
        var len = oGrid.length;
        var index = '';
        if (this.rate >= 3) {
            this.mineNum = 99;
            this.rateDes = '高级';
        } else if (this.rate >= 2) {
            this.mineNum = 40;
            this.rateDes = '中级';
        } else {
            this.mineNum = 10;
            this.rateDes = '初级';
        }
        this.mineCount = this.mineNum;
        oScore.innerText = this.mineNum;
        for (var i = 0; i < this.mineNum;) {
            index = Math.floor(Math.random() * len);
            if (!mineIndex[index]) {
                oGrid[index].setAttribute('data-id_card', 1);
                mineIndex[index] = 1;
                i++;
            }
        }
        for (i = 0; i < len; i++) {
            if (!mineIndex[i]) {
                oGrid[i].setAttribute('data-id_card', 0);
            }
        }
        return this;
    },
    // 绑定事件，左键翻开，右键插旗
    bindEvent: function () {
        var _this = this;
        oMap.onmouseup = function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (!event.button && target.classList.contains('grid')) {
                if (!target.classList.contains('safe')) {
                    if (target.dataset['id_card'] == 1) {
                        _this.end(target);
                    } else {
                        target.classList.add('safe');
                        _this.scanMine(target);
                        if (gd.length - sf.length <= _this.mineCount) {
                            _this.success();
                        }
                    }
                }
            }
        }
        oMap.oncontextmenu = function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            var len = document.getElementsByClassName('flag').length;
            event.preventDefault();
            if (len < _this.mineCount) {
                if (!target.classList.contains('flag')) {
                    target.classList.add('flag');
                    _this.mineNum--;
                    if (parseInt(target.dataset['id_card']) == 1) {
                        _this.flagRight++;
                    }
                    if (_this.flagRight == _this.mineCount) {
                        _this.success();
                    }
                } else {
                    target.classList.remove('flag');
                    _this.mineNum++;
                }
                oScore.innerText = _this.mineNum;
            }
        }
        return this;
    },
    // 扫描周围雷的数量
    scanMine: function (target) {
        var _this = this;
        var oGrid = grid.getGrid();
        var len = oGrid.length;
        var count = 0;
        var arr = [];
        var oL = target.offsetLeft,
            oT = target.offsetTop,
            x = oL + grid.getWidth() / 2,
            y = oT + grid.getWidth() / 2,
            r = Math.sqrt(Math.pow(grid.getWidth() / 2, 2) * 2) * 2;
        var nX, nY;
        for (var i = 0; i < len; i++) {
            if (!oGrid[i].classList.contains('safe')) {
                nX = oGrid[i].offsetLeft + grid.getWidth() / 2;
                nY = oGrid[i].offsetTop + grid.getWidth() / 2;
                if (Math.sqrt(Math.pow(Math.abs(nX - x), 2) + Math.pow(Math.abs(nY - y), 2)) <= r) {
                    if (oGrid[i].dataset['id_card'] == '1') {
                        count++;
                    } else {
                        arr.push(oGrid[i]);
                    }
                }
            }
        }
        if (count == 0) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].classList.add('safe');
                _this.scanMine(arr[i]);
            }
        } else {
            target.innerText = count;
        }
        return this;
    },
    // 计算当前所用时间
    calTime: function (date) {
        var curDate = new Date().getTime();
        var h, m, s;
        var dif = parseInt((curDate - date) / 1000);
        if (dif > 3600) {
            return parseInt(dif / 3600) + 'h ' + parseInt((dif % 3600) / 60) + 'm ' + parseInt((dif % 3600) % 60) + 's';
        } else if (dif > 60) {
            return parseInt(dif / 60) + 'm ' + parseInt(dif % 60) + 's';
        } else {
            return dif + 's';
        }
    }

}
game.start();