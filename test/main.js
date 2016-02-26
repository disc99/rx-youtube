"use strict";
var Youtebe = require('../src/ts/youtube');
var player = new Youtebe.Player();
player.eventStream()
    .subscribe(function (e) { return console.log(e); });
