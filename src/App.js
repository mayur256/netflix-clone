import './App.css';
import Row from './components/layouts/Row';
import Banner from './components/layouts/Banner';
import Navbar from './components/layouts/Navbar';
import requests from './requests';

function App() {
  return (
    <div className="App">
      {/**To Navbar */}
      <Navbar />
      {/** A Banner displaying top content*/}
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.netflixOriginals} isLargeRow={true}/>
      <Row title="TRENDING NOW" fetchUrl={requests.trending} />
      <Row title="TOP RATED" fetchUrl={requests.topRated} />
      <Row title="ACTION MOVIES" fetchUrl={requests.actionMovies} />
      <Row title="COMEDY MOVIES" fetchUrl={requests.comedyMovies} />
      <Row title="HORROR MOVIES" fetchUrl={requests.horrorMovies} />
      <Row title="ROMANTIC MOVIES" fetchUrl={requests.romanticMovies} />
      <Row title="DOCUMENTARIES" fetchUrl={requests.documentaries} />

    </div>
  );
}

export default App;
