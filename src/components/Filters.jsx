// src/components/Filters.js

export default function Filters() {
    return (
      <div className="row mb-4">
        <div className="col">
          <label>Filtered by:</label>
          <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light">
            <option>Year</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light">
            <option>Genre</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light">
            <option>Status</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light">
            <option>Availability</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2 ms-2 shadow-sm bg-light">
            <option>Award</option>
          </select>
          <button className="btn btn-primary ms-2 shadow-sm ">Submit</button>
        </div>
        <div className="col text-end">
          <label>Sorted by:</label>
          <select className="form-select d-inline-block w-auto shadow-sm ms-2">
            <option>Alphabetics</option>
          </select>
        </div>
      </div>
    );
  }
  