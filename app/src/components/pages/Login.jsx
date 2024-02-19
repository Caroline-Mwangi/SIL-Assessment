import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUser(response);
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate("/home");
    },

    onError: (error) => console.log("Login failed", error),
  });

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="row container mx-auto text-center">
          <div className="col-md-6">
            <div className=" position-relative text-center p-3 d-flex flex-column justify-content-center align-items-center">
              <h1 className="login-head">PHOTO HUB</h1>
              <p className=" login-sub-head text-secondary mt-5 mb-5">
                Welcome to Photo Hub! A photo gallery experience designed to
                allow you to seamlessly browse through albums and photo
                collections curated by different users. Sign in to begin the
                Photo Hub journey!!
              </p>
              <button
                className="bg-success-subtle bg-opacity-50 border-1 p-2 rounded-3 w-75"
                onClick={login}
              >
                <img
                  src="google.svg"
                  className="border-0 me-1 "
                  width="18"
                  height="18"
                />
                Sign in with google
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center p-5">
            <img
              src="image.png"
              className="img-fluid ms-5 mt-3"
              width="600"
              height="500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
