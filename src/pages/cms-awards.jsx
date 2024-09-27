// src/pages/cms-awards.js

import Sidebar from '../components/cms-awards/Sidebar-awards';
import TableAwards from '../components/cms-awards/TableAwards';
import FormsAwards from '../components/cms-awards/FormsAwards';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Countries.css";

export default function Awards() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
            <h3 className='countries-title'>AWARDS</h3>
            <FormsAwards />
            <EditProvider>
            <TableAwards />
            </EditProvider>
          </main>
        </div>
      );
}