import axios from "axios";
import { useEffect, useState } from "react";
import Photo from "../pages/Photo";
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
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5">
            <div class="card w-75">
              <img src={photo.thumbnailUrl} class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{photo.title}</h5>

                <Link to={`/photo/${photo.id}`}>View Photo</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
