import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AlbumPhotos({ albumId }) {
  const [photos, setPhotos] = useState([]);

  const getAlbumPhotos = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    setPhotos(data);
  };

  useEffect(() => {
    getAlbumPhotos();
  }, [albumId]);

  return (
    <>
      <div class="row">
        {photos.map((photo) => (
          <div className="col-sm-6 col-md-4 col-lg-3  d-flex justify-content-center mb-5 p-3">
            <Link to={`/photo/${photo.id}`} className="link-overlay">
              <div class="card shadow ">
                <img src={photo.thumbnailUrl} class="card-img-top " />
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
