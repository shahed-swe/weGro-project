import { useSelector } from "react-redux";
import { Error, Layout, Loader, SongCard } from "../components";
import { useGetTopSongsQuery } from "../redux/services/music";
import { useState, useEffect } from "react";

const TopCharts = () => {
    const [page, setPage] = useState(1);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data: initialData, isFetching, isLoading, error, isFetchingMore } = useGetTopSongsQuery({ page: page, perPage: 20 });

    // Use state to store the data
    const [data, setData] = useState([]);

    useEffect(() => {
        if (initialData && !isFetching) {
            setData(prevData => prevData.concat(initialData));
        }
    }, [initialData, isFetching]); // Add dependencies to prevent infinite loop

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (isLoading && page === 1) return <Loader title="Loading top charts" />;
    if (error) return <Error />;

    return (
        <Layout>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                    Discover Top Charts
                </h2>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data.map((song, i) => (
                        <SongCard
                            key={i}
                            song={song}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}
                            i={i}
                        />
                    ))}
                </div>

                {isFetchingMore && <Loader title="Loading more songs" />}
                <button
                    onClick={handleLoadMore}
                    className="text-white px-4 py-2 rounded mt-4"
                    disabled={isFetchingMore}
                >
                    Load More
                </button>
            </div>
        </Layout>
    );
};

export default TopCharts;
