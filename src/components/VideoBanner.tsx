import { useRef, useState } from 'react';

import trailer from '../assets/trailer.mp4';
import playIcon from '../assets/icons/play.svg';
import stopIcon from '../assets/icons/stop.svg';
import unmuteIcon from '../assets/icons/unmute.svg';
import muteIcon from '../assets/icons/mute.svg';

function VideoBanner() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(true);
  const [mute, setMute] = useState(true);

  const onClickPause = () => {
    const video = playerRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlay(true);
    } else {
      video.pause();
      setPlay(false);
    }
  };

  const onClickMute = () => {
    const video = playerRef.current;
    if (!video) return;
    video.muted = !video.muted;
    !video.muted && (video.volume = 0.1);
    setMute(video.muted);
  };

  return (
    <div className="video-section relative max-h-[360px] sm:max-h-[520px] xl:max-h-[650px]">
      <div className="video-background">
        <video
          ref={playerRef}
          className="w-full"
          src={trailer}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"></video>
      </div>
      <div className="video-controls right-5! bottom-5! lg:right-[120px]! lg:bottom-[70px]!">
        <div onClick={() => onClickPause()} className="video-controls-button video-play-button">
          <img src={play ? stopIcon : playIcon} alt="" />
        </div>
        <div onClick={() => onClickMute()} className="video-controls-button video-mute-button">
          <img src={mute ? muteIcon : unmuteIcon} alt="" />
        </div>
      </div>
      <div className="video-content">
        <div className="container mx-auto px-4 sm:px-0">
          <div className="video-logo">
            <img
              src="https://occ-0-769-768.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABeSjwC8CWoIYnAYzhzcVURB8Ocix2yvfolLp4goDoFc-0hO6EkzuTYTQiRx4Z_4jvBR_vyr6bpo8BhtsTwq_UAa8tTDNYv4kig.webp?r=f32"
              alt=""
            />
          </div>
          <div className="poster-anouns flex-wrap">
            <span className="text-white">ONLY ON</span>
            <img
              width="160"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ecd51263-bb0f-4465-af86-f7ed25e58e70/df6xk9d-3bac3151-c02b-4501-bc3a-e8e07ed7e5b2.png/v1/fill/w_1280,h_390/netflix_logo_by_amazingtoludada3000_df6xk9d-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzkwIiwicGF0aCI6IlwvZlwvZWNkNTEyNjMtYmIwZi00NDY1LWFmODYtZjdlZDI1ZTU4ZTcwXC9kZjZ4azlkLTNiYWMzMTUxLWMwMmItNDUwMS1iYzNhLWU4ZTA3ZWQ3ZTViMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.b9-3yDtVSELMO-LtkGCxGuM6kFSEY13bekSGyY1yI54"
              alt=""
            />
            <span className="poster-devider text-white">
              <hr /> NOVEMBER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoBanner;
