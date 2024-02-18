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
      <div>
        <button className="mt-5 ms-3 position-relative" onClick={login}>
          Sign in with google
        </button>
      </div>
    </>
  );
}
