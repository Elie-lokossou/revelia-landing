const Contact = () => {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', email:'', message:'' });
  const send = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section style={{ padding:'48px 48px 120px', maxWidth:1000, margin:'0 auto' }}>
      <div style={{ borderBottom:'1px solid #CCC', paddingBottom:24, marginBottom:40 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>
          04 / CONTACT
        </div>
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:72, letterSpacing:'-0.02em', margin:0, lineHeight:0.95 }}>
          Write a note<span style={{ color:'#7B61FF' }}>.</span>
        </h2>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:64 }}>
        {sent ? (
          <div style={{ border:'1px solid #111', padding:32 }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:28, letterSpacing:'-0.02em', marginBottom:12 }}>
              Got it<span style={{ color:'#7B61FF' }}>.</span>
            </div>
            <p style={{ fontFamily:"'Space Mono',monospace", fontSize:14, lineHeight:1.8, margin:0 }}>
              I read everything and reply within a few days.
            </p>
          </div>
        ) : (
          <form onSubmit={send} style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <Field label="NAME"    value={form.name}    onChange={v => setForm({...form, name:v})}    />
            <Field label="EMAIL"   value={form.email}   onChange={v => setForm({...form, email:v})}   />
            <Field label="MESSAGE" value={form.message} onChange={v => setForm({...form, message:v})} area />
            <button type="submit" style={{
              alignSelf:'flex-start',
              padding:'14px 24px', fontFamily:"'Space Mono',monospace", fontSize:12,
              fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase',
              background:'#111', color:'#EAEAEA', border:'1px solid #111',
              cursor:'pointer', borderRadius:0, marginTop:12,
            }}>Send →</button>
          </form>
        )}

        <aside>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16 }}>
            DIRECT
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13, lineHeight:2 }}>
            <div>hello@sable.studio</div>
            <div style={{ color:'#888' }}>—</div>
            <div>Instagram <span style={{ color:'#888' }}>/@sable</span></div>
            <div>Are.na <span style={{ color:'#888' }}>/sable</span></div>
            <div>Read.cv <span style={{ color:'#888' }}>/sable</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, area }) => {
  const [focus, setFocus] = React.useState(false);
  const base = {
    width:'100%', padding:'12px 14px',
    fontFamily:"'Space Mono',monospace", fontSize:13, lineHeight:1.8,
    background:'transparent', color:'#111',
    border:`1px solid ${focus ? '#111' : '#CCC'}`,
    borderRadius:0, outline:'none', resize:'none',
    transition:'border-color 120ms ease-out',
  };
  return (
    <label style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase' }}>
        {label}
      </span>
      {area
        ? <textarea rows={5} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={base}/>
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={base}/>
      }
    </label>
  );
};

window.Contact = Contact;
