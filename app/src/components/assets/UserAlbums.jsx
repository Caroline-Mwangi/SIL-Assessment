/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import PhotoCount from "./PhotoCount";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function UserAlbums({ userId }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getUserAlbums = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      setAlbums(data);
    };
    getUserAlbums();
  }, [userId]);

  return (
    <>
      <div className="row">
        {albums.map((album) => (
          <div
            key={album.id}
            className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5"
          >
            <div className="card w-75 shadow">
              <h5 className="card-header" data-testid="album-title">
                {album.title}
              </h5>
              <div className="card-body">
                <p className="card-text">
                  <PhotoCount albumId={album.id} />
                </p>
                <Link
                  to={`/album/${album.id}`}
                  className="card-link position-absolute bottom-0 end-0 m-1 me-2 link-secondary link-underline-opacity-0 link-underline-opacity-75-hover link-offset-1-hover"
                >
                  View Album {">>"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

UserAlbums.propTypes = {
  userId: PropTypes.number.isRequired,
};
