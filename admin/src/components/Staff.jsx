import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const defaultStaff = {
  name: "",
  no: "" 
};

const Staff = () => {
  const [staffs, setStaff] = useState([]);
  const [form, setForm] = useState(defaultStaff);
  const [editingId, setEditingId] = useState(null);

  // Fetch rooms on mount
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:8000/api/allStaffs",{
        headers: { Authorization: `Bearer ${token}` }
      });
    setStaff(res.data);
  };

  const handleChange = (e) => {
    const { name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Edit room
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:8000/api/updateStaff/${editingId}`, form,{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Room updated:', response.data);
    } else {
      // Add room
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8000/api/addStaff", form,{
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }        
    setForm(defaultStaff);
    setEditingId(null);
    await fetchStaff();
  };

  const handleEdit = (staff) => {
    setForm({
      ...staff,
      // If available is undefined in old data, default to true
      available: typeof staff.available === "boolean" ? staff.available : true,
    });
    setEditingId(staff._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:8000/api/deleteStaff/${id}`,{
      headers: { Authorization: `Bearer ${token}` }
    });
    const msg = await response.data
    if(!msg.message){
        console.log("msg not found")
      }
    toast.success(`${msg.message}`)
    await fetchStaff();
    } catch (error) {
      console.error('Error deleting staff:', error);
    }    
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Staff Room Management</h2>

      {/* Add/Edit Room Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Staff Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
          <input
            type="number"
            name="no"
            placeholder="Staff No"
            value={form.no}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>                
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {editingId ? "Update Room" : "Add Room"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(defaultRoom);
            }}
            className="ml-4 text-gray-600 underline cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Room List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">All Staffs</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Staff Name</th>
              <th className="py-2">Staff No</th>
              <th className="py-2">Room</th>
              <th className="py-2">TaskType</th>
              <th className="py-2">Status</th>              
              <th className="py-2">Action</th>              
            </tr>
          </thead>
          <tbody>
            {staffs && staffs.map((staff) => (
              <tr key={staff._id} className="border-t">
                <td className="py-2">{staff.name}</td>
                <td className="py-2">{staff.no}</td>
                <td className="py-2">{staff.room ? `${staff.room.name} (${staff.room.roomNo})` : "Unassigned"}</td>
                <td className="py-2">{staff.taskType}</td>
                <td className="py-2 text-green-600">{staff.status}</td>                
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {staffs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No staffs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;