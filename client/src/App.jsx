import { Route, Routes } from 'react-router-dom';
import {  AroundYou, Discover, Search, TopCharts, Login, Registration, PlayListSongs, PersonalPlaylist } from './pages';

const App = () => {
  return (
    <div>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Discover />} />
          <Route path="/top-charts" element={<TopCharts />} />
          <Route path="/play-lists" element={<AroundYou />} />
          <Route path="/personal-play-list" element={<PersonalPlaylist />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/playlist/:id" element={<PlayListSongs/>}/>
        </Routes>
    </div>
  );
};

export default App;
