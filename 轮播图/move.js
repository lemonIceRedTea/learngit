// ******************************************************************************************************************
// *轮播图运动* *借用了链式运动框架*
// ******************************************************************************************************************
		


		function getStyle(obj, style) {
				if(obj.currentStyle){
					return obj.currentStyle[style];
				}else {
					// console.log(window.getComputedStyle(obj, false)[style]);
					return window.getComputedStyle(obj, false)[style];
				}
			}
		function startMove(obj, attr, fuc) {
			clearInterval(obj.timer);
			// console.log(box.offsetLeft);
			var iCur,
				iSpeed;
			obj.timer = setInterval(function () {
			var iStop = true;
			for(var prop in attr){
				if(prop == 'opacity'){
					iCur = parseFloat(getStyle(obj, prop)) * 100;					
				}else {
					iCur = parseInt(getStyle(obj, prop));
					// console.log(iCur);	
				}
				iSpeed = (attr[prop] - iCur) / 7;
				// console.log(iSpeed);
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(prop == 'opacity'){
					obj.style[prop] = (iCur + iSpeed) / 100;
				}else {
					obj.style[prop] = iCur + iSpeed + 'px';
				}
				if(iCur != attr[prop]){
					iStop = false;
					// console.log(iStop);
				}
				// console.log(iCur);
			}
			if(iStop){
				clearInterval(obj.timer);
				fuc();
			}
			}, 30)
		}