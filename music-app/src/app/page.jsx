import Playlists from "@/components/others/Playlists";
import TrackListContainer from "@/components/others/TrackListContainer";
import { fetchSongs, fetchTopTracks } from "@/utils/fetchers";
import TopArtistsContainer from "@/components/others/TopArtistsContainer";

export default async function Home() {
  const tracks = await fetchSongs(1, 10);

  return (
    <div className='home-container'>
      <TrackListContainer
        header='Trending right now'
        tracks={ tracks }
      />
      <TopArtistsContainer limit={ 3 }/>
      <Playlists />
    </div>
  )
}
