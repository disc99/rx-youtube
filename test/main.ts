import Youtebe = require('../src/ts/youtube');

let player = Youtebe.Player.builder()
      .container('player')
      .videoId('M7lc1UVf-VE')
      .height('390')
      .width('640')
      .build();

player.eventStream()
    .subscribe(e => console.log(e));
