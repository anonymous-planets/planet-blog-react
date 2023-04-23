import {useEffect, useState} from "react";
import Video from "../../components/youtube/Video";

declare global {
  interface Window {
    onYouTubePlayerAPIReady : ()=> void;
  }
}
interface Player {
  player ?: YT.Player;
  playerId : string;
  videoId : string;
}

export default function YoutubeAPIPage() {
  const [players, setPlayers] = useState<Array<Player>>([]);

  useEffect(() => {
    const youtubeScript = document.createElement('script');
    youtubeScript.src = 'https://www.youtube.com/iframe_api';
    const head = document.head;
    head.insertAdjacentElement('beforeend', youtubeScript);
    youtubeScript.onload = () => {
      window.onYouTubePlayerAPIReady = () => {
        youtubeIframeReady(players)
      }
    }
  });

  if(players.length === 0) {
    const _player = [];
    for(let i =0 ; i<5; i++) {
      _player.push({playerId : `player${i}`, videoId : `XKiWxK_4xjo`})
    }
    setPlayers(_player);
  }

  const youtubeIframeReady = (youtubePlayers:Player[], options?:any) => {
    youtubePlayers.forEach((youtubePlayer:Player) => {
      youtubePlayer.player = new YT.Player(youtubePlayer.playerId, {
        videoId : youtubePlayer.videoId
        , width : '400px'
        , height : '100px'
        , host : 'https://www.youtube-nocookie.com'
        , playerVars : {
          'controls' : 0       // 0:컨트롤바 안보임, 1:컨트롤바 보임
          , 'rel' : 0          // 0:연관동영상 표시 안함, 1:표시함
          // , 'frameborder' : 0  // 아이프레임의 테투리 설정
          , 'autoplay' : 0     // 0:자동재생 안함, 1:자동재생
          , 'mute' : 0         // 음소거 (1:음소거)
          , 'loop' : 1         // 반복재생 여부(1:반복재생)
          , 'playsinline' : 1  // iOS환경에서 전체화면으로 재생하지 않게
          , 'playlist' : youtubePlayer.videoId
          , 'origin' : window.location.origin
        }
      }) ;
    });
  }

  return (
    <>
      {
        players.map((player, index) => {
          return <Video key={index} playerId={player.playerId}/>
        })
      }
    </>
  );
}