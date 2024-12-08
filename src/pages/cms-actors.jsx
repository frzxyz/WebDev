// src/pages/cms-actors.js

import Sidebar from '../components/cms-actors/Sidebar-actors';
import TableActors from '../components/cms-actors/TableActors';
import FormsActors from '../components/cms-actors/FormsActors';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Countries.css";

export default function Actors() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
          <h3 className='countries-title'>ACTORS</h3>
            <FormsActors />
            <EditProvider>
            <TableActors />
            </EditProvider>
          </main>
        </div>
      );
}