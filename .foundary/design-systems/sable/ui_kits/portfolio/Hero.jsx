const Hero = ({ onNav }) => (
  <section style={{ padding: '80px 48px 48px', maxWidth: 1400, margin: '0 auto' }}>
    <div style={{
      display:'grid',
      gridTemplateColumns:'1fr 360px',
      gap: 48,
      alignItems:'end',
      borderBottom:'1px solid #CCC',
      paddingBottom: 48,
    }}>
      <div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom: 24 }}>
          Designer · Paris · 2026
        </div>
        <h1 style={{
          fontFamily:"'Inter',sans-serif", fontWeight:900,
          fontSize:'clamp(64px, 10vw, 140px)', lineHeight:0.9, letterSpacing:'-0.03em',
          color:'#111', margin:0,
        }}>
          A quiet<br/>archive of<br/>careful work<span style={{ color:'#7B61FF' }}>.</span>
        </h1>
      </div>
      <div>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:14, lineHeight:1.8, color:'#111', margin:0 }}>
          I design interfaces and write about craft. Currently independent, working with
          small teams on editorial, identity, and product.
        </p>
        <div style={{ marginTop: 24, display:'flex', gap:12 }}>
          <button onClick={() => onNav('contact')} style={btnSolid}>Get in touch →</button>
          <button onClick={() => onNav('home')} style={btnGhost}>View work</button>
        </div>
      </div>
    </div>
  </section>
);

const btnSolid = {
  padding:'14px 20px', fontFamily:"'Space Mono',monospace", fontSize:12,
  fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
  background:'#111', color:'#EAEAEA', border:'1px solid #111', cursor:'pointer',
  borderRadius:0,
};
const btnGhost = {
  padding:'14px 20px', fontFamily:"'Space Mono',monospace", fontSize:12,
  fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
  background:'transparent', color:'#111', border:'1px solid #CCC', cursor:'pointer',
  borderRadius:0,
};

window.Hero = Hero;
window.__btnSolid = btnSolid;
window.__btnGhost = btnGhost;
