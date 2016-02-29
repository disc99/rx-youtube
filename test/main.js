"use strict";
var Youtebe = require('../ts/rx-youtube');
var player = Youtebe.Player.builder()
    .container('player')
    .videoId('M7lc1UVf-VE')
    .height('390')
    .width('640')
    .build();
player.eventStream()
    .subscribe(function (e) { return console.log(e); });
