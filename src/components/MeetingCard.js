import React, { useState } from "react";

function MeetingCard(props) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = `https://source.unsplash.com/photos/?${encodeURIComponent(
    props.img
  )}`;
  // console.log(imageUrl);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="meeting-card">
      {imageError ? (
        <img
          src="https://via.placeholder.com/1600x900?text=Image+Not+Found"
          alt="Meeting"
        />
      ) : (
        <img src={imageUrl} alt="Meeting" onError={handleImageError} />
      )}
      <div className="meeting-card-body">
        <div className="flex">
          <h3>{props.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-bookmark"
            viewBox="0 0 16 16"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
        </div>
        <p>{props.date}</p>
        <p>{props.link}</p>
      </div>
    </div>
  );
}

export default MeetingCard;
