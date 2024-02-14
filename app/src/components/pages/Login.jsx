import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [profile, setProfile] = useState(null);
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
        <button className="mt-5 ms-3" onClick={login}>Sign in with google</button>
      </div>
    </>
  );
}
