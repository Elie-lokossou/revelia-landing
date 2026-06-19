const Nav = ({ route, onNav }) => {
  const links = ['WORK', 'NOTES', 'ABOUT', 'CONTACT'];
  const map = { WORK: 'home', NOTES: 'notes', ABOUT: 'home', CONTACT: 'contact' };
  const active = (l) => {
    if (l === 'WORK') return route === 'home' || route === 'work';
    if (l === 'NOTES') return route === 'notes';
    if (l === 'CONTACT') return route === 'contact';
    return false;
  };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#EAEAEA',
      borderBottom: '1px solid #CCC',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 48px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <a onClick={() => onNav('home')}
           style={{ cursor:'pointer', fontFamily:"'Inter',sans-serif", fontWeight:900, fontSize:22, letterSpacing:'-0.02em', color:'#111', textDecoration:'none' }}>
          SABLE<span style={{ color:'#7B61FF' }}>·</span>
        </a>
        <nav style={{ display:'flex', gap:32 }}>
          {links.map(l => (
            <a key={l} onClick={() => onNav(map[l])}
               style={{
                 cursor:'pointer',
                 fontFamily:"'Space Mono',monospace",
                 fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase',
                 color: active(l) ? '#111' : '#888',
                 textDecoration: active(l) ? 'underline' : 'none',
                 textUnderlineOffset: 5,
               }}>
              {l}
            </a>
          ))}
        </nav>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:'#888', letterSpacing:'0.08em' }}>
          PARIS / <Clock/>
        </div>
      </div>
    </header>
  );
};

const Clock = () => {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000 * 30);
    return () => clearInterval(i);
  }, []);
  const p = (n) => String(n).padStart(2, '0');
  return <span>{p(t.getHours())}:{p(t.getMinutes())}</span>;
};

window.Nav = Nav;
