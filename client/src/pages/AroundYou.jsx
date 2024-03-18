import { Playlist } from "../components";
import { useGetAllPlayListsQuery } from "../redux/services/music";
import Layout from "../components/Layout";

const AroundYou = () => {
    const { data } = useGetAllPlayListsQuery()


    return (
        <Layout>
            <div className="flex flex-col">
                <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                    Playlist
                </h2>

                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.map((playlist, i) => (
                        <Playlist playlist={playlist} key={i}/>
                    ))}
                </div>
            </div>
        </Layout>
    )

};

export default AroundYou;
