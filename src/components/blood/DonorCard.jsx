import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const DonorCard = ({ donor }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleRequestBlood = () => {
    if (!user) {
      // Redirect to login and remember this donor
      navigate("/login", {
        state: { from: { pathname: "/create-blood-requests", donorId: donor.id, donorName: donor.full_name } },
      });
    } else {
      // Navigate to create blood request page
      navigate("/create-blood-requests", {
        state: { donorId: donor.id, donorName: donor.full_name },
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
      <img
        src={donor.picture || defaultImage}
        alt={donor.full_name}
        className="w-24 h-24 rounded-full object-cover border border-gray-300 mb-3"
      />
      <h3 className="text-xl font-semibold mb-2 text-red-700">{donor.full_name}</h3>
      <p className="text-gray-700 mb-1"><span className="font-medium">Age:</span> {donor.age}</p>
      <p className="text-gray-700 mb-1"><span className="font-medium">Blood Group:</span> {donor.blood_group}</p>
      <p className="text-gray-700 mb-1"><span className="font-medium">Address:</span> {donor.address}</p>
      <p className="text-gray-700 mb-1"><span className="font-medium">Phone:</span> {donor.phone || "N/A"}</p>
      <p className="text-gray-700 mb-1"><span className="font-medium">Last Donation:</span> {donor.last_donation_date || "Never"}</p>
      <p className="text-sm mt-1 mb-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-white text-xs ${donor.availability_status ? "bg-green-600" : "bg-gray-500"}`}
        >
          {donor.availability_status ? "Available" : "Unavailable"}
        </span>
      </p>

      {/* Protected Request Blood Button */}
      <button
        onClick={handleRequestBlood}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
      >
        Request Blood
      </button>
    </div>
  );
};

export default DonorCard;
