/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function PhotoCount({ albumId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getPhotoCount = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );
      setCount(response.data.length);
    };
    getPhotoCount();
  }, [albumId]);

  return (
    <>
      <span className="badge bg-success-subtle text-secondary">
        <b>Photos:</b> {count}
      </span>
    </>
  );
}

PhotoCount.propTypes = {
  albumId: PropTypes.number.isRequired,
};
