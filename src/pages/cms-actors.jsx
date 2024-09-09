// src/pages/cms-actors.js

import Sidebar from '../components/cms-actors/Sidebar-actors';
import TableActors from '../components/cms-actors/Tableactors';
import FormsActors from '../components/cms-actors/Formsactors';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Awards.css";

export default function Actors() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
          <h1 className='awards-title'>ACTORS</h1>
            <FormsActors />
            <EditProvider>
            <TableActors />
            </EditProvider>
          </main>
        </div>
      );
}