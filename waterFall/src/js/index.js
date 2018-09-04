(function () {
    var oLi = document.getElementsByTagName('li');
    var pageCount = 1;
    var lock = false;
    function addDom(data) {
        var dataList = JSON.parse(data);
        var oWidth = 200;
        dataList.forEach(function (ele, index) {
            var oItem = document.createElement('div');
            var oItemImg = document.createElement('div');
            var oP = document.createElement('p');
            var oImgW = ele.width;
            var oImgH = ele.height;
            var oH = oImgH / oImgW * oWidth;         
            oItem.className = 'item';
            oItemImg.className = 'itemImg';
            var oImg = new Image();
            oImg.src = ele.preview;
            oImg.onerror = function () {
                oImg.style.float = 'left';
            }          
            oItemImg.style.height = oH + 'px';   
            oP.innerText = ele.title;
            oItemImg.appendChild(oImg);
            oItem.appendChild(oItemImg);
            oItem.appendChild(oP);
            
            oLi[getMinIndex(oLi)].appendChild(oItem);
        })
        lock = false;
    }
    function getData() {
        if(!lock) {
            lock = true;
            ajax('GET', './src/getPics.php', addDom, cpage=pageCount, true);
            pageCount++;
        }
    }
    function getMinIndex(dom) {
        var minHeight = dom[0].offsetHeight;
        var index = 0;
        // console.log(minHeight);
        for(var i = 1; i < dom.length; i++) {
            if(dom[i].offsetHeight < minHeight) {
                minHeight = dom[i].offsetHeight;
                index = i;
                
            }
        }
        return index;
    }
    window.onscroll = function (e) {
        var event = e || window.event;
        var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var oWindowH = document.documentElement.clientHeight || document.body.clientHeight;
        if(oLi[getMinIndex(oLi)].offsetHeight < oScrollTop + oWindowH) {
            // console.log(1);
            getData();
        }
    }
    getData();
})();