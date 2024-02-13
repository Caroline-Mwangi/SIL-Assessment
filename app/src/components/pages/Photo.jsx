import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../assets/Loader";
import axios from "axios";
import EditPhoto from "../assets/EditPhoto";

export default function Photo() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getPhoto = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    setPhoto(data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getPhoto();
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="d-flex justify-content-center mt-5">
            <img src={photo.url} />
          </div>
          <p className="text-center fs-3">
            <b>Title: </b>
            {photo.title}
            <EditPhoto />
          </p>
        </div>
      )}
    </>
  );
}
