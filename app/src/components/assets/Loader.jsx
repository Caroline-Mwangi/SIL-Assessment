export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info ms-5 me-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
