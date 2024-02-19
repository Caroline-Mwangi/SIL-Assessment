import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PhotoCount from "./PhotoCount";
import { Link } from "react-router-dom";

export default function UserAlbums({ userId }) {
  const [albums, setAlbums] = useState([]);

  const getUserAlbums = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    setAlbums(data);
  };

  useEffect(() => {
    getUserAlbums();
  }, [userId]);

  return (
    <>
      <div className="row">
        {albums.map((album) => (
          <div key={album.id} className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5">
            <div className="card w-75 shadow">
              <h5 className="card-header" data-testid="album-title">
                {album.title}
              </h5>
              <div className="card-body">
                <p className="card-text">
                  <PhotoCount albumId={album.id} />
                </p>
                <Link to={`/album/${album.id}`}>View Album</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
