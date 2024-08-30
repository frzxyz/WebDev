// src/pages/cms-countries.js

import Sidebar from '../components/cms-countries/Sidebar-cms';
import AddCountry from '../components/cms-countries/AddCountry';
import TableCountry from '../components/cms-countries/TableCountry';

export default function Countries() {
  return (
    <div>
      <Sidebar/>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <AddCountry />
        <TableCountry />
      </main>
    </div>
  );
}
