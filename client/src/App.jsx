import { Route, Routes } from 'react-router-dom';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Login, Registration } from './pages';

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Discover />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/top-charts" element={<TopCharts />} />
          <Route path="/play-lists" element={<AroundYou />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/songs/:songid" element={<SongDetails />} />
          <Route path="/search/:searchTerm" element={<Search />} />
        </Routes>
    </div>
  );
};

export default App;
