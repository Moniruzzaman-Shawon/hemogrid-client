import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import MainLayout from "../layouts/MainLayout";
import DonorCard from "../../components/blood/DonorCard";

const SearchDonors = () => {
  const [donors, setDonors] = useState([]);
  const [filters, setFilters] = useState({ blood_group: "", district: "" });

  const fetchDonors = async () => {
    const query = new URLSearchParams(filters).toString();
    try {
      const res = await apiClient.get(`/auth/donors/?${query}`);
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors();
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Search Donors</h1>
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Blood Group"
            value={filters.blood_group}
            onChange={(e) => setFilters({ ...filters, blood_group: e.target.value })}
            className="border px-4 py-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="District"
            value={filters.district}
            onChange={(e) => setFilters({ ...filters, district: e.target.value })}
            className="border px-4 py-2 rounded flex-1"
          />
          <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-black">
            Search
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchDonors;
