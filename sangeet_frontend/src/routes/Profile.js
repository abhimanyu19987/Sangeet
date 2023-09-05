import { useState } from "react";
import { Icon } from "@iconify/react";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import TextWithHover from "../components/shared/TextWithHover";
import { makeAuthenticatedPUTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";

const UpdateProfile = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const update = async () => {
    const data = { password, username, firstname, lastname };
    const response = await makeAuthenticatedPUTRequest(
      "/auth/updateprofile",
      data
    );
    if (response.err) {
      alert("error in update");
      return;
    }
    alert("Success");
    navigate("/home");
  };

  return (
    <LoggedInContainer curActiveScreen="uploadsong">
      <div className="content p-8 pt-0 overflow-auto text-xs sm:text-base md:text-lg divide-y-8 space y-7">
        <div className="text-2xl font-semibold mb-5 text-white mt-8">
          PROFILE
        </div>

        <div className="w-2/3  divide-y-2 ">
          <div className="w-1/2">
            <TextInput
              label="Update Password"
              labelClassName={"text-white"}
              placeholder="update password"
              value={password}
              setValue={setpassword}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label="UserName"
              labelClassName={"text-white"}
              placeholder="Name"
              value={username}
              setValue={setusername}
            />
          </div>

          <div className="w-1/2">
            <TextInput
              label="Firstname"
              labelClassName={"text-white"}
              placeholder="Firstname"
              value={firstname}
              setValue={setfirstname}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label="Lastname"
              labelClassName={"text-white"}
              placeholder="Lastname"
              value={lastname}
              setValue={setlastname}
            />
          </div>
        </div>
       
        <div
          className="bg-white space y-2 w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
          onClick={update}
        >
          Update
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UpdateProfile;