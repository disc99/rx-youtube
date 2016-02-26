# Rx Youtube Player
rx-youtube is [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) wrapper module and event stream publisher.

## How to use
TODO

```javascript
let player = new Player.Builder()
    .videoId('M7lc1UVf-VE')
    .height('390')
    .width('640')
    // ...
    .build();

player.eventStream()
    .filer(e => e.type == 'onStateChange')
    // ...
    .map(e => e.target.getCurrentTime())
    .subscribe(t => console.log(`status change time:${t}`))

```
