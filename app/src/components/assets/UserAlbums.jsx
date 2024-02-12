import axios from "axios";
import { useEffect, useState } from "react";
import PhotoCount from "./PhotoCount";

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
      <div class="row">
        {albums.map((album) => (
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5">
            <div class="card w-75">
              <h5 class="card-header">{album.title}</h5>
              <div class="card-body">
                <p class="card-text">
                  <PhotoCount albumId={album.id} />
                </p>
                <a href="">View Album</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
