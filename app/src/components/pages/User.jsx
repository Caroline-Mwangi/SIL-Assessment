import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAlbums from "../assets/UserAlbums";
import Loader from "../assets/Loader";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getUser = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <p>
            <b>Name: </b>
            {user.name}
          </p>
          <h1 className="mb-5">ALBUMS</h1>
          <UserAlbums userId={id} />
        </div>
      )}
    </>
  );
}
