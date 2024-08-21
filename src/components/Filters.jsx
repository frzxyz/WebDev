// src/components/Filters.js

export default function Filters() {
    return (
      <div className="row mb-4">
        <div className="col">
          <label>Filtered by:</label>
          <select className="form-select d-inline-block w-auto me-2">
            <option>Year</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2">
            <option>Genre</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2">
            <option>Status</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2">
            <option>Availability</option>
          </select>
          <select className="form-select d-inline-block w-auto me-2">
            <option>Award</option>
          </select>
          <button className="btn btn-primary">Submit</button>
        </div>
        <div className="col text-end">
          <label>Sorted by:</label>
          <select className="form-select d-inline-block w-auto">
            <option>Alphabetics</option>
          </select>
        </div>
      </div>
    );
  }
  