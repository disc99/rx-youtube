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
    private load();
    static builder(): PlayerBuilder;
    eventStream(): Rx.Observable<any>;
    sync(state: PlayState): void;
}
export declare class PlayState {
    container: string;
    videoId: string;
    playlistId: string;
    currentTime: number;
    currentState: number;
    constructor(container: string, videoId: string, playlistId: string, currentTime: number, currentState: number);
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
