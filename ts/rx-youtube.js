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
    Player.prototype.load = function () {
        // TODO
    };
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
        if (videoId != state.videoId) {
            this.youtubePlayer.loadVideoById({ 'videoId': state.videoId, 'startSeconds': state.currentTime });
        }
        if (currentTime != state.currentTime) {
            this.youtubePlayer.seekTo(state.currentTime);
        }
        if (currentState != state.currentState) {
            switch (currentState) {
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
    function PlayState(videoId, playlistId, currentTime, currentState) {
        this.videoId = videoId;
        this.playlistId = playlistId;
        this.currentTime = currentTime;
        this.currentState = currentState;
    }
    return PlayState;
}());
exports.PlayState = PlayState;
var PlayList = (function () {
    function PlayList(playlistId, videos, position) {
        this.playlistId = playlistId;
        this.videos = videos;
        this.position = position;
    }
    return PlayList;
}());
exports.PlayList = PlayList;
var Video = (function () {
    function Video(videoId, title, length, position) {
        this.videoId = videoId;
        this.title = title;
        this.length = length;
        this.position = position;
    }
    return Video;
}());
exports.Video = Video;
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
