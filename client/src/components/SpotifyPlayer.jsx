import React, { useState } from "react";

// Curated study/lo-fi playlists — no Spotify login required for embed
const PLAYLISTS = [
  { label: "Lo-Fi Study",    id: "37i9dQZF1DX8Uebhn9wzrS" },
  { label: "Deep Focus",     id: "37i9dQZF1DWZeKCadgRdKQ" },
  { label: "Coding Mode",    id: "37i9dQZF1DX5trt9i14X7j" },
  { label: "Peaceful Piano", id: "37i9dQZF1DX4sWSpwq3LiO" },
];

export default function SpotifyPlayer() {
  const [open,       setOpen]       = useState(false);
  const [activeIdx,  setActiveIdx]  = useState(0);

  const playlist = PLAYLISTS[activeIdx];

  return (
    <div style={styles.wrapper}>
      {/* Expanded player */}
      {open && (
        <div style={styles.card}>
          {/* Playlist selector */}
          <div style={styles.header}>
            <span style={styles.headerLabel}>🎵 Study Music</span>
            <button style={styles.closeBtn} onClick={() => setOpen(false)} title="Minimise">
              ✕
            </button>
          </div>

          <div style={styles.tabs}>
            {PLAYLISTS.map((p, i) => (
              <button
                key={p.id}
                style={{ ...styles.tab, ...(i === activeIdx ? styles.tabActive : {}) }}
                onClick={() => setActiveIdx(i)}
              >
                {p.label}
              </button>
            ))}
          </div>

          <iframe
            title={`Spotify — ${playlist.label}`}
            src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`}
            width="300"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={styles.iframe}
          />
        </div>
      )}

      {/* Floating toggle button */}
      <button
        style={{ ...styles.fab, ...(open ? styles.fabOpen : {}) }}
        onClick={() => setOpen((v) => !v)}
        title={open ? "Hide player" : "Open study music"}
        aria-label="Toggle Spotify player"
      >
        🎵
      </button>
    </div>
  );
}

// ── Inline styles — no CSS file needed, no class conflicts ────
const styles = {
  wrapper: {
    position:   "fixed",
    bottom:     "24px",
    right:      "24px",
    zIndex:     9999,
    display:    "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap:        "10px",
    pointerEvents: "none",   // wrapper itself doesn't block clicks
  },
  card: {
    pointerEvents: "auto",
    background:    "rgba(14, 10, 7, 0.88)",
    backdropFilter:"blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border:        "1px solid rgba(194, 168, 120, 0.2)",
    borderRadius:  "16px",
    overflow:      "hidden",
    boxShadow:     "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(194,168,120,0.08)",
    width:         "300px",
    animation:     "spotifySlideUp 0.22s cubic-bezier(0.34,1.2,0.64,1)",
  },
  header: {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    padding:        "10px 14px 8px",
    borderBottom:   "1px solid rgba(194,168,120,0.1)",
  },
  headerLabel: {
    fontSize:    "12px",
    fontWeight:  700,
    color:       "#c2a878",
    letterSpacing: "0.3px",
  },
  closeBtn: {
    background: "none",
    border:     "none",
    color:      "rgba(183,169,153,0.6)",
    fontSize:   "13px",
    cursor:     "pointer",
    padding:    "2px 6px",
    borderRadius: "5px",
    lineHeight: 1,
    transition: "color 0.15s",
  },
  tabs: {
    display:    "flex",
    gap:        "2px",
    padding:    "6px 8px",
    flexWrap:   "wrap",
    borderBottom: "1px solid rgba(194,168,120,0.08)",
  },
  tab: {
    background:   "none",
    border:       "1px solid transparent",
    borderRadius: "5px",
    padding:      "3px 8px",
    fontSize:     "10.5px",
    fontWeight:   600,
    color:        "rgba(183,169,153,0.55)",
    cursor:       "pointer",
    transition:   "all 0.12s",
    fontFamily:   "inherit",
  },
  tabActive: {
    background:   "rgba(194,168,120,0.12)",
    borderColor:  "rgba(194,168,120,0.25)",
    color:        "#c2a878",
  },
  iframe: {
    display: "block",
    border:  "none",
  },
  fab: {
    pointerEvents: "auto",
    width:         "44px",
    height:        "44px",
    borderRadius:  "50%",
    background:    "rgba(14,10,7,0.88)",
    backdropFilter:"blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border:        "1px solid rgba(194,168,120,0.25)",
    fontSize:      "18px",
    cursor:        "pointer",
    display:       "flex",
    alignItems:    "center",
    justifyContent:"center",
    boxShadow:     "0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(194,168,120,0.1)",
    transition:    "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
    lineHeight:    1,
  },
  fabOpen: {
    borderColor: "rgba(194,168,120,0.5)",
    boxShadow:   "0 8px 24px rgba(0,0,0,0.5), 0 0 20px rgba(194,168,120,0.2)",
  },
};
