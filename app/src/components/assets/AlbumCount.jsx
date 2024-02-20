import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function AlbumCount({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getAlbumCount = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      setCount(response.data.length);
    };
    getAlbumCount();
  }, [userId]);

  return (
    <>
      <span className="badge bg-success-subtle text-secondary">
        <b>Albums:</b> {count}
      </span>
    </>
  );
}

AlbumCount.propTypes = {
  userId: PropTypes.number.isRequired,
};
