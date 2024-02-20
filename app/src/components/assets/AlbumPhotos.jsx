/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AlbumPhotos({ albumId }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getAlbumPhotos = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );
      setPhotos(data);
    };
    getAlbumPhotos();
  }, [albumId]);

  return (
    <>
      <div className="row">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="col-sm-6 col-md-4 col-lg-3  d-flex justify-content-center mb-5 p-3"
          >
            <Link to={`/photo/${photo.id}`} className="link-overlay">
              <div className="card shadow ">
                <img
                  src={photo.thumbnailUrl}
                  className="card-img-top "
                  data-testid="img"
                />
                <div className="overlay d-flex align-items-center justify-content-center ">
                  <p className="text-success text-center text-opacity-75 mt-3">
                    View Photo
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

AlbumPhotos.propTypes = {
  albumId: PropTypes.number.isRequired,
};
