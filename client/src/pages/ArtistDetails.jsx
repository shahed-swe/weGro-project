import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Layout, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/wegro";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  if (error) return <Error />;

  return (
    <Layout>
      <div className="flex flex-col">
        <DetailsHeader
          artistId={artistId}
          artistData={artistData}
        />

        <RelatedSongs
          data={Object.values(artistData?.songs)}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
    </Layout>
  );
};

export default ArtistDetails;
