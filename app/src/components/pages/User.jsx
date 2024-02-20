/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAlbums from "../assets/UserAlbums";
import Loader from "../assets/Loader";
import { googleLogout } from "@react-oauth/google";

export default function User() {
  const [user, setUser] = useState([]);
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

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUser(data);
      setLoading(false);
    };
    setTimeout(() => {
      getUser();
      getUserSession();
    }, 3000);
  }, [id]);

  const logout = () => {
    googleLogout();
    sessionStorage.removeItem("user");
    navigate("/");
  };
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

          <h1 className="text-center mb-5 text-uppercase" data-testid="user">
            {user.username}&#39;s ALBUMS
          </h1>

          <div>
            <UserAlbums userId={id} />
          </div>
        </div>
      )}
    </>
  );
}
