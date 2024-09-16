import React from "react";
import { useState } from "react";
import MeetingCard from "../components/MeetingCard";
import "../assets/css/App.css";
function PastMeetings() {
  
  const [meetings, setMeetings] = useState([]);
  fetch(
    "https://meeting-application-5a5c3-default-rtdb.firebaseio.com/meetings.json"
  )
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
    <div className="Meetingpage">
      <h1 className="heading">Past Meetings</h1>

      <div className="meetings-container">
        {meetings
          .filter((meeting) => {
            let today = new Date();
            return new Date(meeting.date) < today;
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

export default PastMeetings;
