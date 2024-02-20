/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPhoto() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let getPhoto = async () => {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/photos/${id}`
      );

      setTitle(result.data.title);
    };
    getPhoto();
  }, [id]);

  const editTitle = async () => {
    let field = new FormData();

    field.append("title", title);

    try {
      await axios({
        method: "PUT",
        url: `https://jsonplaceholder.typicode.com/photos/${id}`,
        data: field,
      }).then(() => {
        navigate(`/photo/${id}`);
        console.log("Success!");
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <button
        className="border-0 bg-transparent"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3vw"
          height="3vh"
          viewBox="0 1.5 24 24"
          fill="none"
        >
          <path
            d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C20.8027 6.94749 20.8763 6.8376 20.9264 6.71663C20.9766 6.59565 21.0024 6.46597 21.0024 6.335C21.0024 6.20403 20.9766 6.07435 20.9264 5.95338C20.8763 5.83241 20.8027 5.72252 20.71 5.63L18.37 3.29C18.2775 3.1973 18.1676 3.12375 18.0466 3.07357C17.9257 3.02339 17.796 2.99756 17.665 2.99756C17.534 2.99756 17.4043 3.02339 17.2834 3.07357C17.1624 3.12375 17.0525 3.1973 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
            fill="green"
            fillOpacity="0.4"
          />
        </svg>
      </button>
      <div
        className="modal fade  "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                EDIT PHOTO TITLE
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mt-3 mb-3 border-black "
                placeholder="Photo Title..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn bg-success-subtle"
                data-bs-dismiss="modal"
                onClick={editTitle}
              >
                Edit Title
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
