// src/pages/cms-countries.js

import Sidebar from '../components/cms-countries/Sidebar-cms';
import AddCountry from '../components/cms-countries/AddCountry';
import TableCountry from '../components/cms-countries/TableCountry';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Countries.css";

export default function Countries() {
  return (
    <div className="cms-countries">
      <Sidebar/>
      <main className="col-2 col-10 px-md-4 main-content">
      <h3 className='countries-title'>COUNTRIES</h3>
        <AddCountry />
        <EditProvider>
        <TableCountry />
        </EditProvider>
      </main>
    </div>
  );
}
