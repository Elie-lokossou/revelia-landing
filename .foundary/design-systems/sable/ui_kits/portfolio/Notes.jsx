const NOTES = [
  { d:'04 / 12 / 2026', title:'On working slowly', tag:'Craft', read:'6 min' },
  { d:'03 / 28 / 2026', title:'Monospace as voice',  tag:'Type',  read:'4 min' },
  { d:'02 / 14 / 2026', title:'The case against white backgrounds', tag:'Color', read:'8 min' },
  { d:'01 / 09 / 2026', title:'Grain, film, and the analog feel',   tag:'Texture', read:'5 min' },
  { d:'12 / 20 / 2025', title:'Notes on restraint',  tag:'Process', read:'3 min' },
];

const Notes = () => (
  <section style={{ padding:'48px 48px 96px', maxWidth:1000, margin:'0 auto' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:32, borderBottom:'1px solid #CCC', paddingBottom:24 }}>
      <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:56, letterSpacing:'-0.02em', margin:0, lineHeight:1 }}>
        Notes
      </h2>
      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase' }}>
        ARCHIVE · {NOTES.length} ENTRIES
      </span>
    </div>

    <div>
      {NOTES.map((n, i) => (
        <a key={i} style={{
          display:'grid', gridTemplateColumns:'140px 1fr 100px 80px', gap:24,
          padding:'20px 8px', borderBottom:'1px solid #CCC', alignItems:'baseline',
          fontFamily:"'Space Mono',monospace", cursor:'pointer', textDecoration:'none', color:'#111',
        }}>
          <span style={{ fontSize:12, color:'#888' }}>{n.d}</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:22, letterSpacing:'-0.01em' }}>
            {n.title}
          </span>
          <span style={{ fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase' }}>{n.tag}</span>
          <span style={{ fontSize:12, color:'#888', textAlign:'right' }}>{n.read} →</span>
        </a>
      ))}
    </div>
  </section>
);

window.Notes = Notes;
