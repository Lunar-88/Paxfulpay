
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin');
        setAdmins(res.data);
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="py-4 overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-white">
          <tr className="text-sm text-gray-800">
            <th className="border p-2">Email</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Auth1</th>
            <th className="border p-2">Auth2</th>
            <th className="border p-2">Auth3</th>
            <th className="border p-2">Auth4</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm text-gray-600">
  {admins.map((admin, index) => (
    <tr key={index}>
      <td className="border p-2">{admin.email}</td>
      <td className="border p-2">{admin.password}</td>
      <td className="border p-2">{admin.codes?.code1 || '-'}</td>
      <td className="border p-2">{admin.codes?.code2 || '-'}</td>
      <td className="border p-2">{admin.codes?.code3 || '-'}</td>
      <td className="border p-2">{admin.codes?.code4 || '-'}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default AdminPage;

  