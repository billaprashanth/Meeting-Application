import "../assets/css/App.css";
import { useState } from "react";
import MeetingCard from "../components/MeetingCard";
// import Home2 from "../assets/img/Img3.jpg";
import { Link } from "react-router-dom";
function Home() {
  const [meetings, setMeetings] = useState([]);
  fetch("https://todo-react-a3274-default-rtdb.firebaseio.com/meet.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let tempMeeting = []; // To store data in Array of Objects.
      for (const key in data) {
        // console.log(key);
        let meeting = {
          id: key,
          ...data[key],
        };
        tempMeeting.push(meeting);
      }
      // console.log(tempMeeting);
      setMeetings(tempMeeting);
    });
  return (
    <div className="page">
      <div className="hero">
        {/* <img src={Home2} alt="Not Found" /> */}
        <h1 className="title">
          Organize your all Live
          <span className="highlight"> meetings in one place</span>
        </h1>
        <div>
          <Link to="/add-meetings" className="add-meetings">
            Add New Meeting
          </Link>
        </div>
      </div>
      <div className="meetings">
        {meetings
          .filter((meeting) => {
            let today = new Date();
            let meetingDate = new Date(meeting.date);
            return (
              meetingDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
            );
          })
          .map((meeting) => {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            };
            let date = new Date(meeting.date);
            let fdate = date.toLocaleDateString("en-us", options);
            return (
              <MeetingCard
                title={meeting.title}
                img={meeting.img}
                date={fdate}
                link={meeting.link}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Home;
