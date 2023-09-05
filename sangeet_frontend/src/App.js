import "./output.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import LikedComponent from "./routes/Liked";
import UploadSong from "./routes/UploadSong";
import UpdateProfile from "./routes/Profile";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import Library from "./routes/Library";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import LoggedInContainer from "./containers/LoggedInContainer";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);
  // const [token, setToken, removeToken] = useCookies(["loginToken"]);
  const a = () => {
    return alert("Log-In First");
  };
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              {/* <Route path="/" element={<HelloComponent />} /> */}
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/liked" element={<LikedComponent />} />
              <Route path="/profile" element={<UpdateProfile />} />
              {/* <Route path="/logout" element={<LoggedInContainer/>} /> */}  
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // logged out routes
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />

            {/* <Route path="*" element={<Logout />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return <div>This is hello from component</div>;
};

export default App;