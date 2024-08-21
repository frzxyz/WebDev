// src/pages/index.js

import React from 'react';
import GlobalLayout from '../components/GlobalLayout';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DramaCard from '../components/DramaCard';
import { dramas } from '../data/dramas';

export default function HomePage() {
  return (
    <GlobalLayout>
      <Sidebar />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <SearchBar />
        <Filters />
        <div className="row">
          {dramas.map(drama => (
            <DramaCard key={drama.id} drama={drama} />
          ))}
        </div>
      </main>
    </GlobalLayout>
  );
}
