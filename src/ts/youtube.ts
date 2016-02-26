import Rx = require('rx');
declare const YT: any;

export class Player {
  youtubePlayer: any;
  events: Rx.Observable<any>;

  constructor() {
    // create api call script
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.events = Rx.Observable.fromEventPattern(function addHandler(handler: any) {
      window['onYouTubeIframeAPIReady'] = () => {
        this.youtubePlayer = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            // 'onReady': onPlayerReady,
            'onStateChange': handler
          }
        });
      }
    }, null);
  }

  eventStream(): Rx.Observable<any> {
    return this.events;
  }

  sync(state: PlayState): void {
    // TODO
  }
}

export class PlayState {

}

export class PlayList {

}
