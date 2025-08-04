import { useEffect, useState } from "react";
import axios from "../libs/axios";

const AdminView = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      const email = localStorage.getItem("VITE_ADMIN_EMAIL") || import.meta.env.VITE_ADMIN_EMAIL;
      const password = localStorage.getItem("VITE_ADMIN_PASSWORD") || import.meta.env.VITE_ADMIN_PASSWORD;

      try {
        const res = await axios.get("/users/applicants", {
          headers: {
            "x-admin-email": email,
            "x-admin-password": password,
          },
        });

        setApplicants(res.data.users || []);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to load applicants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Registered Applicants</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applicants.length === 0 ? (
        <p className="text-gray-600">No applicants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{applicant.name}</td>
                  <td className="px-4 py-2 border">{applicant.email}</td>
                  <td className="px-4 py-2 border capitalize">{applicant.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminView;
