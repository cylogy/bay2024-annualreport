interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
}

interface YT {
  Player: new (element: Element, options: any) => YTPlayer;
}

interface Window {
  YT: YT;
  onYouTubeIframeAPIReady?: () => void;
}
