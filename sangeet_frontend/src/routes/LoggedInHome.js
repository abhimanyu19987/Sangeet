import { useState, useEffect, useContext } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";

import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SongCard from "../components/shared/SingleSongCard";
import songContext from "../contexts/songContext";
const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const SangeetPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];


const Home = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
      const getData = async () => {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        // console.log(response);
        setMyPlaylists(response.data);
      };
      getData();
    }, []);
  
    const [playlistData, setplaylistData] = useState([]);
    useEffect(() => {
      const getData = async () => {
        const response = await makeAuthenticatedGETRequest(
          "/playlist/get/musicco_playlists"
        );
        setplaylistData(response.data);
      };
      getData();
    }, []);
  
    const [songData, setSongData] = useState([]);
    useEffect(() => {
      const getData = async () => {
        const response = await makeAuthenticatedGETRequest("/song/get/songs");
        setSongData(response.data);
      };
      getData();
    }, []);
    return (
        <LoggedInContainer curActiveScreen="home">
          <div classname="text-xs sm:text-base md:text-lg ">
            <View titleText="Focus" cardsData={focusCardsData} />
            {/* <PlaylistView */}
    
            <div className="text-white text-xl pt-8 font-semibold">
              Sangeet's Songs
            </div>
            <div className="py-5 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {songData.map((item) => {
                return <Card2 info={item} playSound={() => {}} />;
              })}
            </div>
    
            <div className="text-white text-xl pt-8 font-semibold">
            Sangeet's Playlists
            </div>
            <div className="py-5 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {playlistData.map((item) => {
                return (
                  <Card
                    key={JSON.stringify(item)}
                    title={item.name}
                    description=""
                    imgUrl={item.thumbnail}
                    playlistId={item._id}
                  />
                );
              })}
            </div>
    
            <div className="text-white text-xl pt-8 font-semibold">
              My Playlists
            </div>
            <div className="py-5 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
              {myPlaylists.map((item) => {
                return (
                  <Card
                    key={JSON.stringify(item)}
                    title={item.name}
                    description=""
                    imgUrl={item.thumbnail}
                    playlistId={item._id}
                  />
                );
              })}
            </div>
            
          </div>
        </LoggedInContainer>
      );
    };

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
const View = ({ titleText, cardsData }) => {
    return (
      <div className="text-white mt-8">
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between grid-gap-2 sm:grid-gap-3 md:grid-gap-5 space-x-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {
            // cardsData will be an array
            cardsData.map((item) => {
              return (
                <Card1
                  title={item.title}
                  description={item.description}
                  imgUrl={item.imgUrl}
                />
              );
            })
          }
        </div>
      </div>
    );
  };
  const Card = ({ title, description, imgUrl, playlistId }) => {
    const navigate = useNavigate();
    return (
      <div
        className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer "
        onClick={() => {
          navigate("/playlist/" + playlistId);
        }}
      >
        <div className="text-white mt-8 text-xs sm:text-base md:text-lg">
          {/* <div className="text-2xl font-semibold mb-5">{titleText}</div> */}
          <div className="w-full flex justify-between space-x-4">
            <img className="w-full rounded-md" src={imgUrl} alt="label" />
          </div>
          <div className="text-white font-semibold py-3">{title}</div>
          <div className="text-gray-500  ">{description}</div>
        </div>
      </div>
    );
  };
  const Card2 = ({ info }) => {
    const { currentSong, setCurrentSong } = useContext(songContext);
    return (
      <div
        className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
        onClick={() => {
          setCurrentSong(info);
        }}
      >
        <div className="text-white mt-8 xs:text-xs text-xs sm:text-base md:text-lg">
          {/* <div className="text-2xl font-semibold mb-5">{titleText}</div> */}
          <div className="w-full flex justify-between space-x-4">
            <img className="w-full rounded-md" src={info.thumbnail} alt="label" />
          </div>
          <div className="text-white font-semibold py-3">{info.name}</div>
          <div className="text-gray-500 ">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
      </div>
    );
  };
  const Card1 = ({ title, description, imgUrl }) => {
    return (
      <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg text-xs sm:text-base md:text-lg">
        <div className="pb-4 pt-2">
          <img className="w-full rounded-md" src={imgUrl} alt="label" />
        </div>
        <div className="text-white font-semibold py-3">{title}</div>
        <div className="text-gray-500 ">{description}</div>
      </div>
    );
  };
  
  export default Home;
