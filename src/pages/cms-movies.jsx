// src/pages/cms-users.js

import Sidebar from '../components/cms-movies/Sidebar-movies';
import TableUsers from '../components/cms-movies/TableMovies';
import FormsUsers from '../components/cms-movies/FormsMovies';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Awards.css";

export default function Movies() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
          <h3 className='awards-title'>MOVIES</h3>
            <FormsUsers />
            <EditProvider>
            <TableUsers />
            </EditProvider>
          </main>
        </div>
      );
}