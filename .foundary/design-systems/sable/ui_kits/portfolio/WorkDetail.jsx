const WorkDetail = ({ work, onBack }) => (
  <section style={{ padding:'48px 48px 96px', maxWidth:1400, margin:'0 auto' }}>
    <div onClick={onBack} style={{ cursor:'pointer', fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', marginBottom:32 }}>
      ← BACK TO INDEX
    </div>
    <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:48, borderBottom:'1px solid #CCC', paddingBottom:48, marginBottom:48 }}>
      <div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16 }}>
          {work.n} / {work.tag}
        </div>
        <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:'clamp(56px, 8vw, 96px)', lineHeight:0.95, letterSpacing:'-0.02em', margin:0 }}>
          {work.title}
        </h1>
      </div>
      <div>
        <dl style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:'8px 16px', margin:0, fontFamily:"'Space Mono',monospace", fontSize:12 }}>
          <dt style={{ color:'#888' }}>YEAR</dt><dd style={{ margin:0 }}>{work.year}</dd>
          <dt style={{ color:'#888' }}>CLIENT</dt><dd style={{ margin:0 }}>Independent</dd>
          <dt style={{ color:'#888' }}>ROLE</dt><dd style={{ margin:0 }}>Design, art direction</dd>
          <dt style={{ color:'#888' }}>STATUS</dt><dd style={{ margin:0, color:'#7B61FF' }}>● Live</dd>
        </dl>
      </div>
    </div>

    <div style={{ marginBottom:48 }}>
      <img src={work.img} alt="" style={{ display:'block', width:'100%', height:560, objectFit:'cover', filter:'grayscale(100%) contrast(1.1)' }}/>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, marginBottom:48 }}>
      <div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>NOTE</div>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:14, lineHeight:1.8, margin:0 }}>
          An editorial platform built for a long-running archive of photography. The
          interface gets out of the way — quiet navigation, large imagery, tight
          typographic rhythm.
        </p>
      </div>
      <div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>APPROACH</div>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:14, lineHeight:1.8, margin:0 }}>
          Monospace for chrome, a single display face for marquee moments. No
          gradients, no illustration, no color — the photographs carry the weight.
        </p>
      </div>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'#CCC', border:'1px solid #CCC' }}>
      <img src="../../assets/photo-05.jpg" style={{ display:'block', width:'100%', height:380, objectFit:'cover', filter:'grayscale(100%) contrast(1.1)' }}/>
      <img src="../../assets/photo-06.jpg" style={{ display:'block', width:'100%', height:380, objectFit:'cover', filter:'grayscale(100%) contrast(1.1)' }}/>
    </div>
  </section>
);

window.WorkDetail = WorkDetail;
