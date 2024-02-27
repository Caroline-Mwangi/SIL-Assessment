/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import AlbumCount from "../assets/AlbumCount";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../assets/Loader";
import { googleLogout } from "@react-oauth/google";

export default function Home() {
  document.title = "SIL Assessment | Home";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(response.data);
    setLoading(false);
  };

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
    setTimeout(() => {
      getUsers();
      getUserSession();
    }, 3000);
  }, []);

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
            </>
          )}

          <h1 className="text-center mb-5 ">USERS</h1>

          <div className="row">
            {users.map((user) => (
              <div
                key={user.id}
                className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5"
              >
                <div className="card w-75 shadow">
                  <h5 className="card-header">{user.name}</h5>
                  <div className="card-body">
                    <p className="card-title" data-testid="username">
                      <b>Username: </b>
                      {user.username}
                    </p>
                    <p className="card-text">
                      <AlbumCount userId={user.id} />
                    </p>
                    <Link
                      to={`/user/${user.id}`}
                      className="card-link position-absolute bottom-0 end-0 m-1 me-2 link-secondary link-underline-opacity-0 link-underline-opacity-75-hover link-offset-1-hover"
                    >
                      View User {">>"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
