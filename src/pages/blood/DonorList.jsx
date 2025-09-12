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
  const donorsPerPage = 9;

  // Fetch donors from API
  const fetchDonors = async () => {
    try {
      const res = await apiClient.get("/auth/donors/");
      setDonors(Array.isArray(res.data) ? res.data : res.data.results);
    } catch (err) {
      console.error("Error fetching donors:", err);
      setError("Failed to fetch donors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [showAvailable, bloodGroup, search]);

  if (loading) return <p className="text-center mt-10">Loading donors...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Apply filters
  let filteredDonors = donors;

  if (showAvailable) {
    filteredDonors = filteredDonors.filter((d) => d.availability_status);
  }

  if (bloodGroup !== "All") {
    filteredDonors = filteredDonors.filter(
      (d) => d.blood_group.toLowerCase() === bloodGroup.toLowerCase()
    );
  }

  if (search.trim() !== "") {
    filteredDonors = filteredDonors.filter(
      (d) =>
        d.full_name.toLowerCase().includes(search.toLowerCase()) ||
        d.address.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort available donors first
  filteredDonors = filteredDonors.sort(
    (a, b) => b.availability_status - a.availability_status
  );

  // Pagination
  const totalPages = Math.ceil(filteredDonors.length / donorsPerPage);
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = filteredDonors.slice(
    indexOfFirstDonor,
    indexOfLastDonor
  );

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
        />

        {/* Blood Group Filter */}
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

        {/* Availability Filter */}
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
        Showing {filteredDonors.length} donor
        {filteredDonors.length !== 1 ? "s" : ""}
      </p>

      {/* Donor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDonors.length > 0 ? (
          currentDonors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
        ) : (
          <p className="text-center col-span-full">No donors found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
