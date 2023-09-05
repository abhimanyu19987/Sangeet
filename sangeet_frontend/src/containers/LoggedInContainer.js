import {useContext, useState, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const LoggedInContainer = ({children, curActiveScreen}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
        useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
      
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };
    const addSongToLiked = async () => {
        const songId = currentSong._id;
        const payload = { songId };
    
        const response = await makeAuthenticatedPOSTRequest(
          "/song/add/liked",
          payload
        );
    
        console.log(response);
        if (response === 1) {
          alert("Song already liked");
        } else if (response._id) {
          alert("added to liked");
        }
      };
    
    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };

    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };
    const logout = async () => {
        removeCookie("token");
        navigate("/login");
      };
    return (
        <div className="h-full w-full bg-gray-600
        ">
             {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-full" :"h-full"} w-full flex`}>
                {/* This first div will be the left panel */}
                <div className="h-9/10 w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                    <div className="logo p-1/10 border-b border-solid border-gray-300 w-full flex justify-center">
               <h1 style={{  fontFamily: 'Times-BoldItalic',fontSize : 25 ,color: 'white',}}>SANGEET</h1>
               <Icon icon="mdi:music-note-plus"   width ="30" color=' white' />
               </div>
                        <div className="py-5">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "material-symbols:library-music-sharp"
                                }
                                displayText={"My Music"}
                                targetLink="/myMusic"
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                             <IconText
                                    iconName={"mdi:cards-heart"}
                                    displayText={"Liked Songs"}
                                    active={curActiveScreen === "liked"}
                                    targetLink={"/liked"}
                                />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>
                {/* This second div will be the right part(main content) */}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-2/3 border-r border-white"></div>
                            </div>
                            <div className="w-2/3 flex justify-around h-full items-center">
                            <IconText
                               
                                displayText={"Upload Song"}
                                targetLink={"/UploadSong"}
                            />
                                 <button
                                    className="bg-gray-300 font-semibold p-1/2 px-2 rounded-full "
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                    }}
                                    >
                                    LOG OUT
                                    </button>


                                       <a
                                            className="bg-gray-300 font-semibold p-1/2 px-2 rounded-full "
                                            href="/profile"
                                        >
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6 bg-gray"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="3"
                                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                            </svg>
                                        </a>
                            </div>
                        </div>
                    </div>
                    <div className="content p-7 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSong && (
                <div className="  w-full bg-black bg-opacity text-white flex items-center px-2 fixed-bottom ">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="h-14 w-14 rounded"
                        />
                        <div className="pl-3">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.artist.firstName +
                                    " " +
                                    currentSong.artist.lastName}
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex justify-center h-full flex-col items-center ">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-bottom">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                         <Icon
                                icon="ph:heart-bold"
                                fontSize={25}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={() => {
                                    addSongToLiked();
                                }}
                                />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;