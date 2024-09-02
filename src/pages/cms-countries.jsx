// src/pages/cms-countries.js

import Sidebar from '../components/cms-countries/Sidebar-cms';
import AddCountry from '../components/cms-countries/AddCountry';
import TableCountry from '../components/cms-countries/TableCountry';

export default function Countries() {
  return (
    <div className="cms-countries">
      <Sidebar/>
      <main className="col-2 col-10 px-md-4 main-content">
        <AddCountry />
        <TableCountry />
      </main>
    </div>
  );
}
