!function(a,i){var t=a(document.body);function o(){this.audio=new Audio,this.status="pause"}o.prototype={play:function(){this.audio.play(),this.audio.status="play",t.find(".btn-play").addClass("play")},pause:function(){this.audio.pause(),this.audio.status="pause",t.find(".btn-play").removeClass("play")},setSrc:function(a){this.audio.src=a,this.audio.load()},jumpTo:function(a){this.audio.currentTime=a,this.play()}},i.audioManager=o}(window.Zepto,window.player||(window.player={}));