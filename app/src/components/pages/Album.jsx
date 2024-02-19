import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlbumPhotos from "../assets/AlbumPhotos";
import Loader from "../assets/Loader";
import { googleLogout } from "@react-oauth/google";

export default function Album() {
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAlbum = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    setAlbum(data);
    setLoading(false);
  };

  const getUserSession = () => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("user")).access_token
          }`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    googleLogout();
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    setTimeout(() => {
      getAlbum();
      getUserSession();
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {profile && (
            <>
              <div className="d-flex justify-content-end mb-5 position-relative">
                <div className="dropdown me-2 mt-2">
                  <button
                    className="bg-transparent btn-sm border-0 dropdown-toggle d-flex align-items-center mt-1"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={profile.picture}
                      className="rounded-5 me-2"
                      width="25"
                      height="25"
                    />
                    Hello, {profile.name}
                  </button>
                  <ul className="dropdown-menu bg-success-subtle end-0 mt-2 ">
                    <li className="d-flex justify-content-center align-items-center">
                      <button
                        className=" bg-transparent border-0 btn-sm"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="container w-75 d-flex justify-content-center mb-5">
            <h1 className="text-center  ">ALBUM: {album.title}</h1>
          </div>

          <div>
            <AlbumPhotos albumId={id} />
          </div>
        </div>
      )}
    </>
  );
}
