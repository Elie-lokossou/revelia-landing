const App = () => {
  const [route, setRoute] = React.useState('home');
  const [selectedWork, setSelectedWork] = React.useState(null);

  const openWork = (w) => { setSelectedWork(w); setRoute('work'); };
  const nav = (r) => { if (r === 'home') setSelectedWork(null); setRoute(r); window.scrollTo(0, 0); };

  return (
    <React.Fragment>
      <Nav route={route} onNav={nav}/>
      {route === 'home' && (
        <React.Fragment>
          <Hero onNav={nav}/>
          <WorkIndex onOpen={openWork}/>
        </React.Fragment>
      )}
      {route === 'work' && selectedWork && (
        <WorkDetail work={selectedWork} onBack={() => nav('home')}/>
      )}
      {route === 'notes'   && <Notes/>}
      {route === 'contact' && <Contact/>}
      <Footer/>
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
