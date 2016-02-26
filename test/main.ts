import Youtebe = require('../src/ts/youtube');

let player = new Youtebe.Player();
player.eventStream()
    .subscribe(e => console.log(e));
