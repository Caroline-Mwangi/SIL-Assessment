import { useEffect, useState } from "react";
import axios from "axios";
import AlbumCount from "../assets/AlbumCount";

export default function Home() {
  document.title = "SIL Assessment | Home";
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div class="row">
        {users.map((user) => (
          <div className="col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center mb-5">
            <div class="card w-75">
              <h5 class="card-header">{user.name}</h5>
              <div class="card-body">
                <p class="card-title">
                  <b>Username: </b>
                  {user.username}
                </p>
                <p class="card-text">
                  <AlbumCount userId={user.id} />
                </p>
                <a href="#">View User</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
