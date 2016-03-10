import Rx = require('rx');
export declare class Player {
    private container;
    private videoId;
    private playlistId;
    private height;
    private width;
    private youtubePlayer;
    private events;
    constructor(container: string, videoId: string, playlistId: string, height: string, width: string);
    static builder(): PlayerBuilder;
    getNativePlayer(): any;
    eventStream(): Rx.Observable<any>;
    sync(state: PlayState): void;
}
export declare class PlayState {
    youtubeUrl: string;
    currentTime: number;
    currentState: number;
    isRepeat: boolean;
    sendTime: number;
    constructor(youtubeUrl: string, currentTime: number, currentState: number, isRepeat: boolean, sendTime: number);
    toVideoId(): string;
}
export declare class PlayerBuilder {
    private _container;
    private _videoId;
    private _playlistId;
    private _height;
    private _width;
    container(container: string): PlayerBuilder;
    videoId(videoId: string): PlayerBuilder;
    playlistId(playlistId: string): PlayerBuilder;
    height(height: string): PlayerBuilder;
    width(width: string): PlayerBuilder;
    build(): Player;
}
