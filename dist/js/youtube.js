"use strict";
var Rx = require('rx');
var Player = (function () {
    function Player() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.events = Rx.Observable.fromEventPattern(function addHandler(handler) {
            var _this = this;
            window['onYouTubeIframeAPIReady'] = function () {
                _this.youtubePlayer = new YT.Player('player', {
                    height: '390',
                    width: '640',
                    videoId: 'M7lc1UVf-VE',
                    events: {
                        'onStateChange': handler
                    }
                });
            };
        }, null);
    }
    Player.prototype.eventStream = function () {
        return this.events;
    };
    return Player;
}());
exports.Player = Player;
var player = new Player();
player.eventStream()
    .subscribe(function (e) { return console.log(e); });
