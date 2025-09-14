import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DonorCard from "../../components/blood/DonorCard";
import apiClient from "../../services/apiClient";
import { useToast } from "../../components/ui/Toast.jsx";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters
  const [showAvailable, setShowAvailable] = useState(
    searchParams.get("available") === "1"
  );
  const [bloodGroup, setBloodGroup] = useState(searchParams.get("bg") || "All");
  const [search, setSearch] = useState(searchParams.get("q") || "");

  // Pagination
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);
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
      const msg = "Failed to fetch donors. Please try again later.";
      setError(msg);
      toast.error(msg);
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
    // Sync URL query params for shareable filters
    const params = {};
    if (bloodGroup !== "All") params.bg = bloodGroup;
    if (showAvailable) params.available = "1";
    if (debouncedSearch.trim() !== "") params.q = debouncedSearch.trim();
    if (currentPage > 1) params.page = String(currentPage);
    setSearchParams(params, { replace: true });
  }, [bloodGroup, showAvailable, debouncedSearch, currentPage, setSearchParams]);

  useEffect(() => {
    fetchDonors(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAvailable, bloodGroup, debouncedSearch, currentPage]);

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
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white shadow-md rounded-lg p-5 border border-gray-200">
                <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3 mx-auto mb-1" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mb-1" />
                <div className="h-3 bg-gray-100 rounded w-1/3 mx-auto mb-4" />
                <div className="h-9 bg-gray-200 rounded w-full" />
              </div>
            ))
          : donors.length > 0
          ? donors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
          : <p className="text-center col-span-full">No donors found.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
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
