var oWrapper = $('.wrapper');
var oHead = $('.head');
var oBody = $('.sBody');
var oFood = $('.food');
var oP = $('.score');
var oBtn = $('.btn');
var oInfo = $('.info');
var oBodyItems = oBody.children();
var firstItems = oBodyItems.first();
var lastItems = oBodyItems.last();
var len;
var headX;
var headY;
var key;
var lastDirection;
var timer;
var timer1;
var flag;
var foodArr;
var lastX,
    lastY;
var speed;
var t;
var score;
var oW = oHead.width();
var oWinW = Math.round(oWrapper.width() / oW) * oW,
    oWinH = Math.round(oWrapper.height() / oW) * oW;
var die = false;
function init() {
    clearTimeout(timer1);
    clearInterval(timer);
    len = oBodyItems.length;
    // console.log(lastItems)
    key = null;
    lastDirection = 'swipeRight';
    timer = null;
    timer1 = null;
    flag = true;
    score = 0;
    foodArr = [];
    oHead.css({
        'left': 3 * oW,
        'top': 3 * oW,
        'height': oW
    })
    $('.sBody>li').css('height', oW);
    firstItems.css({
        'left': 2 * oW,
        'top': 3 * oW
    })
    $(document).on('swipeUp', function (e) {
        if (flag) {
            flag = false;
            changeDir(e.type);
        }
    })
    $(document).on('swipeRight', function (e) {
        if (flag) {
            flag = false;
            changeDir(e.type);
        }
    })
    $(document).on('swipeDown', function (e) {
        if (flag) {
            flag = false;
            changeDir(e.type);
        }
    })
    $(document).on('swipeLeft', function (e) {
        if (flag) {
            flag = false;
            changeDir(e.type);
        }
    })
    move(lastDirection);
    food();
}
init();
function changeDir(direction) {
    if (!(direction == lastDirection || isDir(direction, lastDirection))) {
        lastDirection = direction;
    }
}
function move(direction) {
    var itemsArr = Array.prototype.slice.call(oBodyItems);
    headX = oHead.offset().left;
    headY = oHead.offset().top;
    lastX = headX;
    lastY = headY;
    var curX,
        curY;
    var lock = true;
    t = Math.max(500 - itemsArr.length * 9, 50);
    if (direction == 'swipeUp') {
        if (headY > 0) {
            oHead.css('top', headY - oW)
        } else {
            lock = false;
        }
    } else if (direction == 'swipeDown') {
        if (headY < (oWinH - oW)) {
            oHead.css('top', headY + oW);
        } else {
            lock = false;
        }
    } else if (direction == 'swipeLeft') {
        if (headX > 0) {
            oHead.css('left', headX - oW)
        } else {
            lock = false;
        }
    } else if (direction == 'swipeRight') {
        if (headX < (oWinW - oW)) {
            oHead.css('left', headX + oW)
        } else {
            lock = false;
        }
    }
    if (lock) {
        itemsArr.forEach(function (ele, index) {
            curX = $(ele).offset().left;
            curY = $(ele).offset().top;
            $(ele).css({
                'top': lastY,
                'left': lastX
            })
            lastX = curX;
            lastY = curY; 
        });
        headX = oHead.offset().left;
        headY = oHead.offset().top;
        eat(headX, headY);
        if (!die) {
            flag = true;
            clearTimeout(timer);
            timer = setTimeout(function () {
                move(lastDirection);
            }, t);
        }
    } else {
        oInfo.css('display', 'block');
        clearTimeout(timer);
        clearTimeout(timer1);
    }
}
//判断方向是否相反
function isDir(dir1, dir2) {
    if (dir1 == 'swipeLeft' && dir2 == 'swipeRight' || dir1 == 'swipeDown' && dir2 == 'swipeUp' || dir1 == 'swipeRight' && dir2 == 'swipeLeft' || dir1 == 'swipeUp' && dir2 == 'swipeDown') {
        return true;
    }
}
// 生成食物

function food() {
    var arr = Array.prototype.slice.call(oBodyItems);
    arr.push(oHead);
    var bL = arr.length,
        arr = arr.concat(foodArr),
        fL = foodArr.length;
    // console.log(arr);
    var posX,
        posY;
    var r,
        g,
        b;
    var oLi;
    var fit = true;
    speed = fL <= 15 ? 3000 - fL * 100 : 2000 + fL * 100;
    r = Math.floor((Math.random() * 256));
    g = Math.floor((Math.random() * 256));
    b = Math.floor((Math.random() * 256));
    // oLi = document.createElement('li');
    // oLi.className = 'food';
    // oLi.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    oLi = $('<li class="food"></li>').css('backgroundColor', 'rgb(' + r + ',' + g + ',' + b + ')');
    function isFit() {
        arr.forEach(function (ele, index) {
            if ($(ele).offset().left == posX && $(ele).offset().top == posY) {
                fit = false;
            }
        })
    }
    for (var i = 0; i < 100; i++) {
        fit = true;
        posX = Math.floor((Math.random() * 9)) * oW;
        posY = Math.floor((Math.random() * 9)) * oW;
        isFit();
        if (fit) {
            break;
        }
    }
    oFood.append(oLi);
    foodArr.push(oLi);

    // console.log(foodArr);
    // console.log(foodArr);
    $(oLi).css({
        'left': posX + 'px',
        'top': posY + 'px',
        'height': oW + 'px'
    })
    clearTimeout(timer1);
    timer1 = setTimeout(food, speed);
    return;
}
// 吃食物
function eat(x, y) {
    var l = foodArr.length;
    var itemsArr = Array.prototype.slice.call(oBodyItems);
    itemsArr.forEach(function (ele, index) {
        if ($(ele).offset().left == x && $(ele).offset().top == y) {
            die = true;
            oInfo.css('display', 'block');
            clearTimeout(timer);
            clearTimeout(timer1);
        }
    })
    for (var i = 0; i < l; i++) {
        if (foodArr[i].offset().left == x && foodArr[i].offset().top == y) {
            foodArr[i].remove();
            foodArr.splice(i, 1);
            var oTail = $('<li></li>');
            oBody.append(oTail);
            $(oTail).css({
                'left': lastX,
                'top': lastY,
                'height': oW
            })
            oBodyItems = oBody.children();
            score++;
            oP.html(score);
            break;
        }
    }
}
 $('#bt').on('tap', function () {
     console.log('a');
     move(lastDirection);
 })
function clearFood() {
    foodArr.forEach(function (ele) {
        ele.remove();
    })
}
function clearBody() {
    var itemsArr = Array.prototype.slice.call(oBodyItems);
    var len = itemsArr.length;
    if (len > 1) {
        for(var i = 1; i < len; i++) {
            $(itemsArr[i]).remove();
        }
    }
    oBodyItems = oBody.children();
}

$('.btn').on('tap', function () {
    oInfo.css('display', 'none');
    clearFood();
    clearBody();
    die = false;
    score = 0;
    oP.html(score);
    init();
})
document.querySelector('body').addEventListener('touchmove', function (ev) {
    ev.preventDefault();
});