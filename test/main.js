"use strict";
var Youtebe = require('../src/ts/youtube');
var player = Youtebe.Player.builder()
    .container('player')
    .videoId('M7lc1UVf-VE')
    .height('390')
    .width('640')
    .build();
player.eventStream()
    .subscribe(function (e) { return console.log(e); });
