import React, { useState } from "react";
import styles from "./SpotifyMiniPlayer.module.css";

// Cycles through playlist names to show "now playing" feel
const PLAYLISTS = [
  { name: "Lo-Fi Study",    sub: "Chill Study Mix"   },
  { name: "Deep Focus",     sub: "Ambient Coding"    },
  { name: "Coding Mode",    sub: "Electronic Beats"  },
  { name: "Peaceful Piano", sub: "Calm & Focused"    },
];

// Animated music bars SVG
function MusicBars({ playing }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={playing ? styles.barsPlaying : styles.barsPaused}
    >
      <rect x="1"  y="6"  width="2" height="8" rx="1" fill="currentColor" className={styles.bar1} />
      <rect x="5"  y="3"  width="2" height="11" rx="1" fill="currentColor" className={styles.bar2} />
      <rect x="9"  y="5"  width="2" height="9"  rx="1" fill="currentColor" className={styles.bar3} />
      <rect x="13" y="7"  width="2" height="7"  rx="1" fill="currentColor" className={styles.bar4} />
    </svg>
  );
}

export default function SpotifyMiniPlayer() {
  const [playing,  setPlaying]  = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  const track = PLAYLISTS[trackIdx];

  function togglePlay() {
    setPlaying((v) => !v);
  }

  function nextTrack() {
    setTrackIdx((i) => (i + 1) % PLAYLISTS.length);
  }

  return (
    <div className={styles.wrap} title="Study Music">

      {/* Music bars indicator */}
      <div className={`${styles.barsWrap} ${playing ? styles.barsActive : ""}`}>
        <MusicBars playing={playing} />
      </div>

      {/* Track info — click cycles playlist */}
      <button className={styles.trackBtn} onClick={nextTrack} title="Next playlist">
        <span className={styles.trackName}>{track.name}</span>
        <span className={styles.trackSub}>{track.sub}</span>
      </button>

      {/* Play / Pause */}
      <button
        className={`${styles.playBtn} ${playing ? styles.playBtnActive : ""}`}
        onClick={togglePlay}
        title={playing ? "Pause" : "Play"}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "⏸" : "▶"}
      </button>

    </div>
  );
}
