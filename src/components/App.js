import "../assets/css/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddMeetings from "../pages/AddMeeting";
import NotFound from "../pages/NotFound";
import Nav from "./Nav";
import UpcomingMeetings from "../pages/UpcomingMeeting";
import PastMeetings from "../pages/PastMeetings";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-meetings" element={<AddMeetings />} />
        <Route path="/upcoming-meetings" element={<UpcomingMeetings />} />
        <Route path="/past-meetings" element={<PastMeetings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
