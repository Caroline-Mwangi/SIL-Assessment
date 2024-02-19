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
              <div className="d-flex justify-content-end mb-5">
                <div className="dropdown mt-2 me-2">
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
                    <p className="card-title">
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
