import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="not-found">
            <div className="not-found-contain">
              <div className="not-found-text">
                <h1>404</h1>
                <h3>Page not found</h3>
                <p>
                  The page you are looking for might have been removed had its
                  name changed or is temporarily unavailable.
                </p>
                <Link to="/">Home Page</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
