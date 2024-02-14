export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow bg-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow bg-success ms-5 me-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow bg-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
