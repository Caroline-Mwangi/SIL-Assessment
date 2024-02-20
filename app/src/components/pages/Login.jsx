import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
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
      <div className="container-fluid position-absolute top-0 ">
        <div className=" text-center p-3 ">
          <div className="row d-flex align-items-center justify-content-center vh-100">
            <div className="col-lg-6 col-md-12 mt-5 p-3">
              <h1
                className="mt-3 mb-4"
                style={{
                  fontWeight: "700",
                  fontSize: "3em",
                  letterSpacing: "6px",
                }}
              >
                SIL ASSESSMENT
              </h1>
              <p
                className="login-sub-head text-secondary px-4 mb-5"
                style={{ fontSize: "1.4em", letterSpacing: "1px" }}
              >
                A photo gallery application designed to
                allow you to seamlessly browse through albums and photo
                collections curated by different users. Sign in to begin the journey!!
              </p>
              <button
                className="btn btn-success rounded-5 w-75"
                onClick={login}
              >
                <img
                  src="google.svg"
                  alt="Google Logo"
                  className="border-0 me-1"
                  width="18"
                  height="18"
                />
                Sign in with Google
              </button>
            </div>
            <div className="col-lg-6 col-md-12">
              <img
                src="image.png"
                className="mt-5 img-fluid"
                style={{ maxWidth: "85%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
