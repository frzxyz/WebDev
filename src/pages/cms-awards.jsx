// src/pages/cms-awards.js

import Sidebar from '../components/cms-countries/Sidebar-cms';
import TableAwards from '../components/cms-awards/TableAwards';
import FormsAwards from '../components/cms-awards/FormsAwards';

export default function Awards() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
            <FormsAwards />
            <TableAwards />
          </main>
        </div>
      );
}