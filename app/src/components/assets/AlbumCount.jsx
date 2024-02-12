import axios from "axios";
import { useEffect, useState } from "react";

export default function AlbumCount({ userId }) {
  const [count, setCount] = useState(0);

  const getAlbumCount = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    setCount(response.data.length);
  };

  useEffect(() => {
    getAlbumCount();
  }, [userId]);

  return (
    <>
      <span class="badge bg-warning-subtle text-secondary">
        <b>Albums:</b> {count}
      </span>
    </>
  );
}
