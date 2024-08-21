// src/components/SearchBar.js

export default function SearchBar() {
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Search Drama</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <input type="text" className="form-control" placeholder="Search Drama" aria-label="Search" />
        </div>
      </div>
    );
  }
  