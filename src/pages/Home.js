import "../assets/css/App.css";
import { useState, useEffect } from "react";
import MeetingCard from "../components/MeetingCard";
import { Link } from "react-router-dom";

const Home = ()=> {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(
      "https://meeting-application-5a5c3-default-rtdb.firebaseio.com/meetings.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        let tempMeeting = []; // To store data in Array of Objects.
        for (const key in data) {
          let meeting = {
            id: key,
            ...data[key],
          };
          tempMeeting.push(meeting);
        }
        setMeetings(tempMeeting);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  return (
    <div className="page">
      <div className="hero">
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
        {error && <p className="error">Error: {error}</p>}
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
                key={meeting.id}
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
