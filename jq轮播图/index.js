var oImgBox = $('.imgBox');
var oLeftBtn = $('.leftBtn');
var oRightBtn = $('.rightBtn');
var oSpan = $('.circle');
var lock = true;
var timer = null;
var sIndex = 0;
function init() {
	var str = '';
	str += '<li class="bImg">\
				<img src="./images/1.jpg" alt="">\
			</li>\<li class="bImg">\
				<img src="./images/2.jpg" alt="">\
			</li>\<li class="bImg">\
				<img src="./images/3.jpg" alt="">\
			</li>\<li class="bImg">\
				<img src="./images/4.jpg" alt="">\
			</li>\<li class="bImg">\
				<img src="./images/1.jpg" alt="">\
			</li>'
	oImgBox.append(str);
}
init();
for(var i = 0; i < oSpan.length; i++) {
	(function (index) {
		oSpan.eq(index).on('click', function () {
			if(lock){
				lock = false;
				clearTimeout(timer);
				oImgBox.animate({
					left: - index * oImgBox.children().width()
				}, 300, 'linear', function () {
					changeIndex(index);
					lock = true;
					timer = setTimeout(autoMove, 1500);
				})
			}
		})
	})(i);
}
oLeftBtn.on('click', function () {
	autoMove('right->left');
})
oRightBtn.on('click', function () {
	autoMove('left->right');
})
function autoMove(direction) {
	if(lock){
		lock = false;
		var num = oImgBox.children().length - 1;
		clearTimeout(timer);
		if(!direction || direction == 'left->right'){	
			if($(oImgBox).position().left <= - num * $(oImgBox).children().width()){
					$(oImgBox).css('left', 0);
					sIndex = - $(oImgBox).position().left / 500;
					changeIndex(sIndex);
				}
			oImgBox.animate({
				left: oImgBox.position().left - oImgBox.children().width()
			}, 300, 'easeInBack' , function () {
				if($(this).position().left <= - num * $(this).children().width()){
					$(this).css('left', 0);
				}
				sIndex = - $(oImgBox).position().left / 500;
				changeIndex(sIndex);
				timer = setTimeout(autoMove, 1500);
				lock = true;
			})
		}else if(direction == 'right->left') {
			sIndex--;
			if(oImgBox.position().left >= 0){
					oImgBox.css('left', - num * oImgBox.children().width());
					sIndex = - $(oImgBox).position().left / 500;
					changeIndex(sIndex);
				}
					
			oImgBox.animate({ //他不会等到anmate执行完才执行下面的
			left: oImgBox.position().left + oImgBox.children().width()
			}, 300, 'easeInBack' , function () {
				if($(this).position().left >= 0){
					$(this).css('left', - num * $(this).children().width());
				}
				sIndex = - $(oImgBox).position().left / 500;
				if(sIndex == num) {
					sIndex = 0;
				}
				changeIndex(sIndex);
				timer = setTimeout(autoMove, 1500);
				lock = true;
			})
		}
	}
}
function changeIndex(index) {
	$('.active').removeClass('active');
	$('.circle').eq(index).addClass('active');
}
timer = setTimeout(autoMove, 1500);