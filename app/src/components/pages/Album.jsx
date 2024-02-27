/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AlbumPhotos from "../assets/AlbumPhotos";
import Loader from "../assets/Loader";
import { googleLogout } from "@react-oauth/google";

export default function Album() {
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getUserSession = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.access_token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const logout = () => {
    googleLogout();
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const getAlbum = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${id}`
      );
      setAlbum(data);
      setLoading(false);
    };
    setTimeout(() => {
      getAlbum();
      getUserSession();
    }, 3000);
  }, [id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {profile && (
            <>
              <div
                className="mb-5 mt-2 me-1 position-absolute top-0 end-0"
                style={{ fontSize: "1em" }}
              >
                <div className="d-flex align-items-center">
                  <Link to="/home" className=" me-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </Link>
                  <div className="dropdown">
                    <button
                      className="bg-transparent btn-sm border-0 dropdown-toggle d-flex align-items-center mt-1"
                      data-bs-toggle="dropdown"
                    >
                      Hello, {profile.name}
                      <img
                        src={profile.picture}
                        className="rounded-5 ms-2"
                        width="25"
                        height="25"
                      />
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
              </div>
            </>
          )}

          <div className="container w-75 d-flex justify-content-center mb-5">
            <h1 className="text-center" data-testid="album">
              ALBUM: {album.title}
            </h1>
          </div>

          <div>
            <AlbumPhotos albumId={id} />
          </div>
        </div>
      )}
    </>
  );
}
