import axios from "axios";
import { useEffect, useState } from "react";

export default function PhotoCount({ albumId }) {
  const [count, setCount] = useState(0);

  const getPhotoCount = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    setCount(response.data.length);
  };

  useEffect(() => {
    getPhotoCount();
  }, [albumId]);

  return (
    <>
      <span class="badge bg-success-subtle text-secondary">
        <b>Photos:</b> {count}
      </span>
    </>
  );
}
