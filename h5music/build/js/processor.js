!function(n,e){var i,a,r,o,c=n(document.body);function m(n){var e=n*i;e=d(e),c.find(".curTime").html(e);var t=100*(n-1)+"%";c.find(".pro-top").css({transform:"translateX("+t+")"})}function d(n){n=Math.round(n);var e=Math.floor(n/60),t=n-60*e;return e<10&&(e="0"+e),t<10&&(t="0"+t),e+":"+t}e.processor={start:function(n){a=void 0===n?a:n,cancelAnimationFrame(r),o=(new Date).getTime(),function n(){var e=(new Date).getTime(),t=a+(e-o)/(1e3*i);t<1?(r=requestAnimationFrame(n),m(t)):(cancelAnimationFrame(r),c.find(".btn-next").trigger("click"))}()},stop:function(){var n=(new Date).getTime();a+=(n-o)/(1e3*i),cancelAnimationFrame(r)},renderEndTime:function(n){a=0,i=n,c.find(".endTime").html(d(n))},updata:m}}(window.Zepto,window.player||(window.player={}));