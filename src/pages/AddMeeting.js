import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddMeetings() {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const titleInput = useRef();
  const imageInput = useRef();
  const linkInput = useRef();
  const dateInput = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    let successTimer;
    if (showSuccessMessage) {
      successTimer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
    return () => clearTimeout(successTimer);
  }, [showSuccessMessage]);

  function AddMeetingHandler() {
    setLoadingStatus(true);
    // To save the Data
    const tempmeeting = {
      title: titleInput.current.value,
      img: imageInput.current.value,
      link: linkInput.current.value,
      date: dateInput.current.value,
    };
    console.log(tempmeeting);
    fetch(
      "https://meeting-application-5a5c3-default-rtdb.firebaseio.com/meetings.json",
  {
    method: "POST",
    body: JSON.stringify(tempmeeting),
    headers: {
      "Content-Type": "application/json"
    }
  }
    )
      .then(() => {
        setLoadingStatus(false);
        setShowSuccessMessage(true);
        navigate("/upcoming-meetings");
        console.log(tempmeeting);
      })
      .catch((error) => {
        console.error("Error adding meeting:", error);
        setLoadingStatus(false);
      });
  }

  return (
    <div>
      <h1 className="heading">Add New Meetings</h1>
      <div className="input-links">
        <input type="text" ref={titleInput} placeholder="Enter Meeting Title" />
        {/* <input type="text" ref={imageInput}  placeholder="Enter Meeting Image" /> */}
        <input type="text" ref={linkInput} placeholder="Enter Meeting Link" />
        <input
          type="datetime-local"
          ref={dateInput}
          className="datelocal"
          placeholder="Enter Meeting date"
        />
        <button className="add-btn" onClick={AddMeetingHandler}>
          <div className={loadingStatus === true ? "" : "d-none"}>
            Adding New Meeting
          </div>
          <div className={loadingStatus === true ? "d-none" : ""}>
            Add New Meeting
          </div>
          <div className={loadingStatus === true ? "loader" : ""}></div>
        </button>
        {showSuccessMessage && (
          <div className="Success">Meeting Added Successfully</div>
        )}
      </div>
    </div>
  );
}

export default AddMeetings;
