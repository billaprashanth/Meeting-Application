import React, { useState, useEffect } from "react";
import axios from "axios";

function MeetingCard(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: props.img,
              per_page: 1,
            },
            headers: {
              Authorization: `y94ilOzL6i9fu5vbdxD8xTqaWriTFVa7Tuanc-voNKE`, 
            },
          }
        );
        if (response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.regular); // Use the regular size URL
        } else {
          setImageError(true);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageError(true);
      }
    };

    fetchImage();
  }, [props.img]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="meeting-card">
      {imageError || !imageUrl ? (
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
