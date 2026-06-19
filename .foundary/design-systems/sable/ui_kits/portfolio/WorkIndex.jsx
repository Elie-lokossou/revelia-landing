const WORKS = [
  { n:'01', title:'Atlas Archive',      tag:'Editorial · identity', year:'2024', img:'../../assets/photo-01.jpg' },
  { n:'02', title:'Concrete Journal',   tag:'Web · product',        year:'2023', img:'../../assets/photo-04.jpg' },
  { n:'03', title:'Silver Halide Press',tag:'Print · editorial',    year:'2023', img:'../../assets/photo-03.jpg' },
  { n:'04', title:'Meridian Studio',    tag:'Identity · web',       year:'2022', img:'../../assets/photo-02.jpg' },
  { n:'05', title:'Slow Notes',         tag:'Product · writing',    year:'2021', img:'../../assets/photo-05.jpg' },
  { n:'06', title:'Field Guide',        tag:'App · UX',             year:'2020', img:'../../assets/photo-06.jpg' },
];

const WorkIndex = ({ onOpen }) => {
  const [hover, setHover] = React.useState(null);
  return (
    <section style={{ padding:'48px 48px 96px', maxWidth:1400, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:32 }}>
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:32, letterSpacing:'-0.02em', margin:0 }}>
          Selected work, 2020–2026
        </h2>
        <span style={labelCss}>INDEX · 06 PROJECTS</span>
      </div>

      <div style={{ borderTop:'1px solid #CCC' }}>
        {WORKS.map((w, i) => (
          <div key={w.n}
               onClick={() => onOpen(w)}
               onMouseEnter={() => setHover(i)}
               onMouseLeave={() => setHover(null)}
               style={{
                 display:'grid',
                 gridTemplateColumns:'48px 1fr 200px 120px 40px',
                 gap:24,
                 padding:'24px 8px',
                 borderBottom:'1px solid #CCC',
                 alignItems:'center',
                 cursor:'pointer',
                 background: hover === i ? '#e0e0e0' : 'transparent',
                 transition:'background 120ms ease-out',
               }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888' }}>{w.n}</div>
            <div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:28, letterSpacing:'-0.02em', lineHeight:1 }}>
                {w.title}
              </div>
            </div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:'#888' }}>{w.tag}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:'#888' }}>{w.year}</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:16, textAlign:'right', color: hover === i ? '#7B61FF' : '#111' }}>→</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const labelCss = {
  fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888',
  letterSpacing:'0.1em', textTransform:'uppercase',
};

window.WorkIndex = WorkIndex;
window.WORKS = WORKS;
