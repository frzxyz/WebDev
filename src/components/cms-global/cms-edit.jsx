import React, { createContext, useContext, useState } from "react";
import axios from 'axios'; // Untuk HTTP request

import "bootstrap/dist/css/bootstrap.min.css";

const EditContext = createContext();

export const EditProvider = ({ children }) => {
  const [last_edit, setLastEdit] = useState(null);

  const cancelEdit = (id) => {
    const tr = document.getElementById(`row${id}`); // Gunakan format yang sesuai dengan ID row
    if (!tr) {
      console.error(`Row with id row${id} not found`);
      return; // Jika elemen tidak ditemukan, hentikan eksekusi
    }
  
    const tds = tr.getElementsByTagName("td");
    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const name = td.getAttribute("name");
      if (name === "img") {
        const input = td.getElementsByTagName("input")[0];
        if (input) {
          input.remove();
        }
      } else {
        const input = td.getElementsByTagName("input")[0];
        if (input) {
          td.innerHTML = input.getAttribute("old");
        }
      }
    }
  
    // Perbaiki pemanggilan ID elemen-elemen tombol
    const editBtn = document.getElementById(`editBtn${id}`);
    const editSaveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);
  
    if (editBtn) editBtn.classList.remove("d-none");
    if (editSaveBtn) editSaveBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.remove("d-none");
    if (cancelBtn) cancelBtn.classList.add("d-none");
  
    setLastEdit(null);
  };
  

  const edit = (id) => {
    if (last_edit !== null) {
      cancelEdit(last_edit);
    }
    setLastEdit(id);
  
    // Pastikan ID yang sesuai
    const tr = document.getElementById(`row${id}`); // Gunakan format yang sesuai dengan baris yang Anda buat
    if (!tr) {
      console.error(`Row with id row${id} not found`);
      return; // Jika elemen tidak ditemukan, hentikan eksekusi
    }
  
    const tds = tr.getElementsByTagName("td");
    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const value = td.innerText;
      const name = td.getAttribute("name");
      if (name === "img") {
        td.innerHTML =
          td.innerHTML +
          `<input type="file" name="${name}" class="form-control">`;
      } else {
        td.innerHTML = `<input type="text" value="${value}" name="${name}" old="${value}" class="form-control">`;
      }
    }
  
    const editBtn = document.getElementById(`editBtn${id}`);
    const editSaveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);
  
    if (editBtn) editBtn.classList.add("d-none");
    if (editSaveBtn) editSaveBtn.classList.remove("d-none");
    if (deleteBtn) deleteBtn.classList.add("d-none");
    if (cancelBtn) cancelBtn.classList.remove("d-none");
    
  };

  // const saveEdit = async (id, setCountries, countries) => {
  //   const tr = document.getElementById(`row${id}`);
  //   const tds = tr.getElementsByTagName("td");
  //   let updatedCountryName = ""; // Variabel untuk menyimpan nilai negara baru

  //   for (let i = 1; i < tds.length - 1; i++) {
  //     const td = tds[i];
  //     const input = td.getElementsByTagName("input")[0];
  //     if (input) {
  //       const newValue = input.value;
  //       updatedCountryName = newValue; // Simpan nilai baru
  //       td.innerHTML = newValue; // Ubah input menjadi teks biasa
  //     }
  //   }

  //   // Panggil fungsi updateCountry untuk melakukan PUT request
  //   updateCountry(id, updatedCountryName);

  //   // Setelah berhasil save, ubah tombol
  //   const editBtn = document.getElementById(`editBtn${id}`);
  //   const saveBtn = document.getElementById(`saveBtn${id}`);
  //   const deleteBtn = document.getElementById(`deleteBtn${id}`);
  //   const cancelBtn = document.getElementById(`cancelBtn${id}`);

  //   if (editBtn) editBtn.classList.remove("d-none");
  //   if (saveBtn) saveBtn.classList.add("d-none");
  //   if (deleteBtn) deleteBtn.classList.remove("d-none");
  //   if (cancelBtn) cancelBtn.classList.add("d-none");

  //   setLastEdit(null);
  // };

  return (
    <EditContext.Provider value={{ last_edit, cancelEdit, edit}}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => useContext(EditContext);