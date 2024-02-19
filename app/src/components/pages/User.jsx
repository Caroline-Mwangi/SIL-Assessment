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

  const getUser = async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setUser(data);
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

  useEffect(() => {
    setTimeout(() => {
      getUser();
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
              <div className="d-flex justify-content-end mb-5 me-2 position-relative">
                <p className="me-4  text-dark text-opacity-75 mt-2">
                  <div className="dropdown">
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
                    <ul className="dropdown-menu bg-success-subtle ">
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
                </p>
              </div>
            </>
          )}

          <h1 className="text-center mb-5 text-uppercase ">
            {user.username}'s ALBUMS
          </h1>

          <div>
            <UserAlbums userId={id} />
          </div>
        </div>
      )}
    </>
  );
}