import Rx = require('rx');
declare const YT: any;

export class Player {
  private youtubePlayer: any;
  private events: Rx.Observable<any>;

  constructor(private container: string,
              private videoId: string,
              private playlistId: string,
              private height: string,
              private width: string) {

    // create api call script
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let addHandler = handler => {
      window['onYouTubeIframeAPIReady'] = () => {
        this.youtubePlayer = new YT.Player(this.container, {
          height: this.height,
          width: this.width,
          videoId: this.videoId,
          events: {
            'onReady': e => handler({'name': 'onReady', 'event': e}),
            'onStateChange': e => handler({'name': 'onStateChange', 'event': e})
          }
        });
      }
    };

    this.events = Rx.Observable.fromEventPattern(addHandler, null);
  }

  private load():void {

  }

  static builder():PlayerBuilder {
    return new PlayerBuilder();
  }

  eventStream(): Rx.Observable<any> {
    return this.events;
  }

  sync(state: PlayState): void {
    let videoId:string = this.youtubePlayer.getVideoData().video_id;
    let currentTime:number = this.youtubePlayer.getCurrentTime();
    let currentState:number = this.youtubePlayer.getPlayerState();

    if (videoId != state.videoId) {
      this.youtubePlayer.loadVideoById({'videoId': state.videoId, 'startSeconds': state.currentTime});
    }

    if (currentTime != state.currentTime) {
      this.youtubePlayer.seekTo(state.currentTime);
    }

    if (currentState != state.currentState) {
      switch(currentState) {
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
  }
}

export class PlayState {
    constructor(public container: string,
                public videoId: string,
                public playlistId: string,
                public currentTime: number,
                public currentState: number){}
}


export class PlayerBuilder {
  private _container: string;
  private _videoId: string;
  private _playlistId: string;
  private _height: string;
  private _width: string;

  container(container: string): PlayerBuilder {
    this._container = container;
    return this;
  }

  videoId(videoId: string): PlayerBuilder {
    this._videoId = videoId;
    return this;
  }

  playlistId(playlistId: string): PlayerBuilder {
    this._playlistId = playlistId;
    return this;
  }

  height(height: string): PlayerBuilder {
    this._height = height;
    return this;
  }

  width(width: string): PlayerBuilder {
    this._width = width;
    return this;
  }

  build(): Player {
    return new Player(this._container,
                      this._videoId,
                      this._playlistId,
                      this._height,
                      this._width)
  }
}
