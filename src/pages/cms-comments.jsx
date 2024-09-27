// src/pages/cms-users.js

import Sidebar from '../components/cms-comments/Sidebar-comments';
import TableComments from '../components/cms-comments/Tablecomments';
import { EditProvider } from "../components/cms-global/cms-edit";

import "../styles/Countries.css";

export default function Comments() {
    return (
        <div className="cms-awards">
          <Sidebar/>
          <main className="col-2 col-10 px-md-4 main-content">
          <h3 className='awards-title'>COMMENTS</h3>
            <EditProvider>
            <TableComments />
            </EditProvider>
          </main>
        </div>
      );
    }