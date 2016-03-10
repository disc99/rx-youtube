"use strict";
var Rx = require('rx');
var Player = (function () {
    function Player(container, videoId, playlistId, height, width) {
        var _this = this;
        this.container = container;
        this.videoId = videoId;
        this.playlistId = playlistId;
        this.height = height;
        this.width = width;
        // create api call script
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var addHandler = function (handler) {
            window['onYouTubeIframeAPIReady'] = function () {
                _this.youtubePlayer = new YT.Player(_this.container, {
                    height: _this.height,
                    width: _this.width,
                    videoId: _this.videoId,
                    events: {
                        'onReady': function (e) { return handler({ 'name': 'onReady', 'event': e }); },
                        'onStateChange': function (e) { return handler({ 'name': 'onStateChange', 'event': e }); }
                    }
                });
            };
        };
        this.events = Rx.Observable.fromEventPattern(addHandler, null);
    }
    Player.builder = function () {
        return new PlayerBuilder();
    };
    Player.prototype.getNativePlayer = function () {
        return this.youtubePlayer;
    };
    Player.prototype.eventStream = function () {
        return this.events;
    };
    Player.prototype.sync = function (state) {
        var videoId = this.youtubePlayer.getVideoData().video_id;
        var currentTime = this.youtubePlayer.getCurrentTime();
        var currentState = this.youtubePlayer.getPlayerState();
        if (videoId != state.toVideoId()) {
            this.youtubePlayer.loadVideoById({ 'videoId': state.toVideoId(), 'startSeconds': state.currentTime });
        }
        if (currentTime != state.currentTime) {
            this.youtubePlayer.seekTo(state.currentTime);
        }
        if (currentState != state.currentState) {
            switch (state.currentState) {
                case YT.PlayerState.ENDED:
                    this.youtubePlayer.stopVideo();
                    break;
                case YT.PlayerState.PLAYING:
                    this.youtubePlayer.playVideo();
                    break;
                case YT.PlayerState.PAUSED:
                    this.youtubePlayer.pauseVideo();
                    break;
                case YT.PlayerState.BUFFERING:
                    break;
                case YT.PlayerState.CUED:
                    break;
            }
        }
    };
    return Player;
}());
exports.Player = Player;
var PlayState = (function () {
    function PlayState(youtubeUrl, currentTime, currentState, isRepeat, sendTime) {
        this.youtubeUrl = youtubeUrl;
        this.currentTime = currentTime;
        this.currentState = currentState;
        this.isRepeat = isRepeat;
        this.sendTime = sendTime;
    }
    PlayState.prototype.toVideoId = function () {
        return window.location.search.substring(1).split('&')
            .map(function (p) { return p.split('='); })
            .filter(function (p) { return p[0] == 'v'; })
            .map(function (p) { return p[1]; })[0];
    };
    return PlayState;
}());
exports.PlayState = PlayState;
var PlayerBuilder = (function () {
    function PlayerBuilder() {
    }
    PlayerBuilder.prototype.container = function (container) {
        this._container = container;
        return this;
    };
    PlayerBuilder.prototype.videoId = function (videoId) {
        this._videoId = videoId;
        return this;
    };
    PlayerBuilder.prototype.playlistId = function (playlistId) {
        this._playlistId = playlistId;
        return this;
    };
    PlayerBuilder.prototype.height = function (height) {
        this._height = height;
        return this;
    };
    PlayerBuilder.prototype.width = function (width) {
        this._width = width;
        return this;
    };
    PlayerBuilder.prototype.build = function () {
        return new Player(this._container, this._videoId, this._playlistId, this._height, this._width);
    };
    return PlayerBuilder;
}());
exports.PlayerBuilder = PlayerBuilder;
