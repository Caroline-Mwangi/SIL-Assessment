import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../assets/Loader";
import axios from "axios";
import EditPhoto from "../assets/EditPhoto";
import { googleLogout } from "@react-oauth/google";

export default function Photo() {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

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
        if (res && res.data) {
          setProfile(res.data);
        } else {
          console.error("Invalid response:", res);
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    googleLogout();
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const getPhoto = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );
      setPhoto(data);
      setLoading(false);
    };
    setTimeout(() => {
      getPhoto();
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
                  <ul className="dropdown-menu bg-success-subtle position-absolute end-0 start-25 mt-2 ">
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

          <div>
            <div className="container w-75">
              <p className="text-center fs-4 text-uppercase ">
                <b> Photo Title: </b>
                {photo.title}
                <EditPhoto />
              </p>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <img src={photo.url} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
