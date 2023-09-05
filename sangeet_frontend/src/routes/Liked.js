
import { useEffect, useState, useContext } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import songContext from "../contexts/songContext";

const LikedComponent = () => {
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/liked");
      setuserDetails(response);
      console.log(response);
      console.log(userDetails);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen={"liked"}>
      {/* console.log(userDetails._id); */}
      {/* <div className="text-white text-xl pt-8 font-semibold">Liked Songs</div> */}
      {userDetails.user && (
        <div>
          <div className="text-white text-xl pt-8 font-semibold">
            Liked Songs
          </div>
          <div className="py-5 grid gap-5 grid-cols-5">
            {userDetails.user.Likedsongs.map((item) => {
              return <Card2 info={item} playSound={() => {}} />;
            })}
          </div>
        </div>
      )}
    </LoggedInContainer>
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
      <div className="text-white mt-8">
        {/* <div className="text-2xl font-semibold mb-5">{titleText}</div> */}
        <div className="w-full flex justify-between space-x-4">
          <img className="w-full rounded-md" src={info.thumbnail} alt="label" />
        </div>
        <div className="text-white font-semibold py-3">{info.name}</div>
        <div className="text-gray-500 text-sm">
          {info.artist.firstName + " " + info.artist.lastName}
        </div>
      </div>
    </div>
  );
};

export default LikedComponent;