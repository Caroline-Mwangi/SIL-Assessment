import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumPhotos from "../assets/AlbumPhotos";

export default function Album() {
  const [album, setAlbum] = useState([]);
  const { id } = useParams();

  const getAlbum = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    setAlbum(data);
  };

  useEffect(() => {
    getAlbum();
  }, []);
  return (
    <>
      <div>
        <p>
          <b>Album Title: </b>
          {album.title}
        </p>
        <h1 className="mb-5">PHOTOS</h1>
        <AlbumPhotos albumId={id} />
      </div>
    </>
  );
}