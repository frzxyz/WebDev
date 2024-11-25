import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { TiEdit, TiTrash } from "react-icons/ti";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEdit } from "../cms-global/cms-edit";
import axios from 'axios'; // Untuk HTTP request
import "../../styles/Countries.css";
import "../../styles/Awards.css";
import StatusPopup from "../StatusPopup";

function TableCountries() {
  const { cancelEdit, edit } = useEdit(); // Destructure dari objek
  const [countries, setCountries] = useState([]); // State untuk daftar negara
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [statusPopup, setStatusPopup] = useState({
    show: false,
    type: "",
    message: "",
    onConfirm: null,
    isConfirm: false,
  });  
  
  const showPopup = (type, message, onConfirm = null, isConfirm = false) => {
    setStatusPopup({ show: true, type, message, onConfirm, isConfirm });
  };  
  
  const hidePopup = () => {
    setStatusPopup({ show: false, type: "", message: "", onConfirm: null, isConfirm: false });
  };

  // Fungsi untuk melakukan sorting
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedCountries = [...countries].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setCountries(sortedCountries);
  };

  // Fungsi untuk mengambil data dari API
  const fetchCountries = async () => {
    try {
      const response = await axios.get('/api/cms/countries'); // Mengambil data negara dari API
      setCountries(response.data); // Set data negara ke state
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  // useEffect untuk memanggil fetchCountries saat komponen di-mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fungsi untuk menghapus negara (DELETE)
  const deleteCountry = async (id) => {
    const onConfirm = async () => {
      try {
        const response = await axios.delete('/api/cms/countries', { params: { id } });
  
        if (response.status === 200) {
          setCountries(countries.filter((country) => country.id !== id));
          showPopup("success", response.data.message || "Country deleted successfully!");
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        showPopup("error", error.response?.data?.error || "Failed to delete country.");
      }
    };
  
    showPopup("warning", "Are you sure you want to delete this country?", onConfirm, true);
  };  

  // Fungsi untuk menyimpan perubahan (PUT)
  const saveEdit = async (id) => {
    const tr = document.getElementById(`row${id}`);
    const tds = tr.getElementsByTagName("td");
    let updatedCountryName = ""; // Variabel untuk menyimpan nilai negara baru

    for (let i = 1; i < tds.length - 1; i++) {
      const td = tds[i];
      const input = td.getElementsByTagName("input")[0];
      if (input) {
        updatedCountryName = input.value;
        td.innerHTML = updatedCountryName; // Ubah input menjadi teks biasa
      }
    }

    // Kirim request PUT ke API untuk menyimpan perubahan
    try {
      const response = await axios.put('/api/cms/countries', {
        id, // Kirim ID negara yang akan diperbarui
        name: updatedCountryName // Kirim nama negara yang baru
      });

      if (response.status >= 200 && response.status < 300) {
        // Update state countries untuk mencerminkan perubahan
        setCountries(
          countries.map((country) =>
            country.id === id ? { ...country, name: updatedCountryName } : country
          )
        );
        showPopup("success", "Country updated successfully!");
      } else {
        showPopup("error", "Failed to update country.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to update actor.";
      showPopup("error", errorMessage);
    }

    // Ubah tombol setelah menyimpan
    const editBtn = document.getElementById(`editBtn${id}`);
    const saveBtn = document.getElementById(`saveBtn${id}`);
    const deleteBtn = document.getElementById(`deleteBtn${id}`);
    const cancelBtn = document.getElementById(`cancelBtn${id}`);

    if (editBtn) editBtn.classList.remove("d-none");
    if (saveBtn) saveBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.remove("d-none");
    if (cancelBtn) cancelBtn.classList.add("d-none");
  };

  return (
    <div className="table-countries">
      <h5>List Countries</h5>

      {statusPopup.show && (
        <StatusPopup
          type={statusPopup.type}
          message={statusPopup.message}
          onClose={hidePopup}
          onConfirm={statusPopup.onConfirm}
          isConfirm={statusPopup.isConfirm}
        />
      )}

      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortBy("name")}>
          Sort By Countries {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>

        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
              Countries {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {countries.map((country, index) => (
            <tr key={country.id} id={`row${country.id}`}>
              <td>{index + 1}</td>
              <td name="name">{country.name}</td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  id={`editBtn${country.id}`}
                  onClick={() => edit(country.id)}
                >
                  <span className="d-flex align-items-center">
                    <TiEdit className="me-2" />
                    Edit
                  </span>
                </button>
                <button className="btn btn-success mx-2 d-none" id={`saveBtn${country.id}`}
                  onClick={() => saveEdit(country.id, setCountries, countries)}>
                  <span className="d-flex align-items-center">
                    Save
                  </span>
                </button>
                <button
                  className="btn btn-warning mx-2 d-none"
                  id={`cancelBtn${country.id}`}
                  onClick={() => cancelEdit(country.id)}
                >
                  <span className="d-flex align-items-center">
                    Cancel
                  </span>
                </button>
                <button 
                  className="btn btn-danger" 
                  id={`deleteBtn${country.id}`}
                  onClick={() => deleteCountry(country.id)}>
                  <span className="d-flex align-items-center">
                    <TiTrash className="me-2" />
                    Delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  );
}

export default TableCountries;
