import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { makeAuthenticatedDELETERequest } from "../../utils/serverHelpers";

const SingleSongCard = ({ info, playSound }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const { currentdelSong, setCurrentdelSong } = useContext(songContext);
  // console.log(info);
  const deletesng = async () => {
    // const songId = currentdelSong._id;
    // const payload = { songId };
    // console.log("a");
    // const response = await makeAuthenticatedDELETERequest(
    //   "/song/deletesong",
    //   payload
    // );
    // if (response.err) {
    //   alert("error in update");
    //   return;
    // }
    alert("Success");
    // navigate("/home");
  };
  return (
    <div
      className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("${info.thumbnail}")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center  flex-col pl-4 w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>3:44</div>
        </div>
        <div
          className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
          onClick={() => {
            setCurrentdelSong(info);
            deletesng();
          }}
        >
          <a class="flex items-center hover:text-gray-200" href="/delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;