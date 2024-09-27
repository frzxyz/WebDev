// src/pages/cms-users.js

import Sidebar from '../components/cms-genres/Sidebar-genres';
import TableGenres from '../components/cms-genres/Tablegenres';
import FormsGenres from '../components/cms-genres/Formsgenres';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Awards.css";

export default function Genres() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
          <h3 className='awards-title'>GENRES</h3>
            <FormsGenres />
            <EditProvider>
            <TableGenres />
            </EditProvider>
          </main>
        </div>
      );
}