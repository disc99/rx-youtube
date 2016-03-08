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
    getNativePlayer(): any;
    eventStream(): Rx.Observable<any>;
    sync(state: PlayState): void;
}
export declare class PlayState {
    videoId: string;
    playlistId: string;
    currentTime: number;
    currentState: number;
    constructor(videoId: string, playlistId: string, currentTime: number, currentState: number);
}
export declare class PlayList {
    private playlistId;
    private videos;
    private position;
    constructor(playlistId: string, videos: Array<Video>, position: number);
}
export declare class Video {
    private videoId;
    private title;
    private length;
    private position;
    constructor(videoId: string, title: string, length: number, position: number);
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
