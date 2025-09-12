import { useEffect, useState } from "react";
import DonorCard from "../../components/blood/DonorCard";
import apiClient from "../../services/apiClient";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [showAvailable, setShowAvailable] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("All");
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const donorsPerPage = 10;

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Fetch donors from API
  const fetchDonors = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = { page };
      if (bloodGroup !== "All") params.blood_group = bloodGroup;
      if (showAvailable) params.availability_status = "available";
      if (debouncedSearch.trim() !== "") params.search = debouncedSearch.trim();

      const res = await apiClient.get("/auth/donors/", { params });
      setDonors(res.data.results || []);
      setTotalPages(Math.ceil(res.data.count / donorsPerPage));
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching donors:", err);
      setError("Failed to fetch donors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch donors when filters or debounced search change
  useEffect(() => {
    fetchDonors(1);
  }, [showAvailable, bloodGroup, debouncedSearch]);

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showAvailable}
            onChange={() => setShowAvailable(!showAvailable)}
          />
          <span>Only Available</span>
        </label>
      </div>

      {/* Summary */}
      <p className="mb-4 text-gray-700">
        Showing {donors.length} donor{donors.length !== 1 ? "s" : ""}
      </p>

      {/* Donor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.length > 0 ? (
          donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
        ) : (
          <p className="text-center col-span-full">No donors found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => fetchDonors(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchDonors(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DonorList;
