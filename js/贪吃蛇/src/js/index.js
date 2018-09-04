var oWrapper = document.getElementsByClassName('wrapper')[0];
var oHead = document.getElementsByClassName('head')[0];
var oBody = document.getElementsByClassName('sBody')[0];
var oFood = document.getElementsByClassName('food')[0];
var oP = document.getElementsByClassName('score')[0];
var oBtn = document.getElementsByClassName('btn')[0];
var oInfo = document.getElementsByClassName('info')[0];
var oBodyItems = oBody.children;
var firstItems = oBody.firstElementChild;
var lastItems = oBody.lastElementChild;
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
function init() {
    clearTimeout(timer1);
    clearInterval(timer);
    len = oBodyItems.length;
    key = null;
    lastDirection = undefined;
    timer = null;
    timer1 = null;
    flag = true;
    score = 0;
    foodArr = [];
    oHead.style.left = 300 + 'px';
    oHead.style.top = 300 + 'px';
    firstItems.style.left = 280 + 'px';
    firstItems.style.top = 300 + 'px';
    // firstItems.style.backgroundColor = 'rgb(33, 55, 100)';
    window.onkeypress = function (e) {
        key = e.key;
        if (flag) {
            flag = false;
            changeDir(key);
            // console.log(key);
        }
    }
    // autoMove();
    move();
    food();
}
init();
function changeDir(direction) {
    if (!(direction == lastDirection || isDir(direction, lastDirection))) {
        lastDirection = direction;
    }
}
function move(direction) {
    // console.log(1);
    var itemsArr = Array.prototype.slice.call(oBodyItems);
    headX = oHead.offsetLeft;
    headY = oHead.offsetTop;
    lastX = headX;
    lastY = headY;
    var curX,
        curY;
    var lock = true;
    t = Math.max(500 - itemsArr.length * 9, 50);
    if (direction == 'w') {
        if (oHead.offsetTop > 0) {
            oHead.style.top = headY - 20 + 'px';
        } else {
            lock = false;
        }
    } else if (direction == 's') {
        if (oHead.offsetTop < (oWrapper.offsetHeight - oHead.offsetHeight)) {
            oHead.style.top = headY + 20 + 'px';
        } else {
            lock = false;
        }
    } else if (direction == 'a') {
        if (oHead.offsetLeft > 0) {
            oHead.style.left = headX - 20 + 'px';
        } else {
            lock = false;
        }
    } else {
        if (oHead.offsetLeft < (oWrapper.offsetWidth - oHead.offsetWidth)) {
            oHead.style.left = headX + 20 + 'px';
        } else {
            lock = false;
        }
    }
    if (isCrash(itemsArr)) {
        console.log(!isCrash(itemsArr));
    }
    if (lock) {
        itemsArr.forEach(function (ele, index) {
            curX = ele.offsetLeft;
            curY = ele.offsetTop;
            ele.style.top = lastY + 'px';
            ele.style.left = lastX + 'px';
            lastX = curX;
            lastY = curY;
        });
        eat();
        flag = true;
        clearTimeout(timer);
        timer = setTimeout(function () {
            move(lastDirection);
        }, t);

    } else {
        oInfo.style.display = 'block';
        clearTimeout(timer);
        clearTimeout(timer1);
    }
}
// function autoMove() {
//     clearInterval(timer);
//     timer = setInterval(function () {
//         move(lastDirection);
//         flag = true;
//     }, 100);
// }
//判断方向是否相反
function isDir(dir1, dir2) {
    if (dir1 == 'w' && dir2 == 's' || dir1 == 's' && dir2 == 'w' || dir1 == 'a' && dir2 == 'd' || dir1 == 'd' && dir2 == 'a') {
        return true;
    }
}
// 判断是否与自己相撞
function isCrash(me) {
    me.forEach(function (ele, index) {
        if (ele.offsetLeft == oHead.offsetLeft && ele.offsetTop == oHead.offsetTop) {
            return true;
        }
    })
}
// 生成食物

function food() {
    var arr = Array.prototype.slice.call(oBodyItems);
    arr.push(oHead);
    bL = arr.length,
        arr = arr.concat(foodArr),
        fL = foodArr.length;
    var posX,
        posY;
    var r,
        g,
        b;
    var oLi;
    var fit = true;

    // speed = 3000 * Math.max(Math.abs((40 - l) / 40), 0.5);
    // speed = 3000 / (1 + (Math.min(bL, 50) / 50) + Math.min(fL, 20) / 20);
    speed = fL <= 15 ? 3000 - fL * 100 : 2000 + fL * 100; 
    r = Math.floor((Math.random() * 256));
    g = Math.floor((Math.random() * 256));
    b = Math.floor((Math.random() * 256));
    oLi = document.createElement('li');
    oLi.className = 'food';
    oLi.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    function isFit() {
        arr.forEach(function (ele, index) {
            if (ele.offsetLeft == posX && ele.offsetTop == posY) {
                fit = false;
            }
        })
    }
    // do {
    //     posX = Math.floor((Math.random() * 30)) * 20;
    //     posY = Math.floor((Math.random() * 30)) * 20;
    //     console.log(1); 
    //     isFit();
    // } while (!fit);
    for (var i = 0; i < 100; i++) {
        fit = true;
        posX = Math.floor((Math.random() * 30)) * 20;
        posY = Math.floor((Math.random() * 30)) * 20;
        isFit();
        if (fit) {
            break;
        }
    }
    oFood.appendChild(oLi);
    foodArr.push(oLi);
    // console.log(foodArr);
    oLi.style.left = posX + 'px';
    oLi.style.top = posY + 'px';

    clearTimeout(timer1);
    timer1 = setTimeout(food, speed);


    return;
}
// 吃食物
function eat() {
    var itemsArr = Array.prototype.slice.call(oBodyItems);
    
    itemsArr.forEach(function (ele, index) {
        if (ele.offsetLeft == oHead.offsetLeft && ele.offsetTop == oHead.offsetTop) {
            oInfo.style.display = 'block';
            clearTimeout(timer);
            clearTimeout(timer1);
        }
    })
    foodArr.forEach(function (ele, index) {
        if (ele.offsetLeft == oHead.offsetLeft && ele.offsetTop == oHead.offsetTop) {
            foodArr.splice(index, 1);
            oFood.removeChild(ele);
            var oTail = document.createElement('li');
            oBody.appendChild(oTail);
            oTail.style.left = lastX + 'px';
            oTail.style.top = lastY + 'px';
            score ++;
            oP.innerText = score;
        }
    })
}
function clearFood() {
    // console.log(foodArr);
    foodArr.forEach(function (ele) {
        oFood.removeChild(ele);
    })
}
oBtn.onclick = function () {
    oInfo.style.display = 'none';
    clearFood();
    init();
    
} 
oBtn.onmousedown = function () {
    this.style.boxShadow = '1px 3px 3px 0px #333';
    this.style.textShadow = '1px 1px 10px #888';
}
oBtn.onmouseup = function () {
    this.style.boxShadow = '';
    this.style.textShadow = '';
}
