// src/components/admin/Bookings.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw, Filter, Calendar, User, MapPin } from "lucide-react";

export default function Bookings() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchReservations();
        // // Auto-refresh every 30 seconds to catch new bookings
        // const interval = setInterval(fetchReservations, 30000);
        // return () => clearInterval(interval);
    }, []);

    const fetchReservations = async () => {
        try {
            setRefreshing(true);
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:8000/api/allReservation",{
                headers: { Authorization: `Bearer ${token}` }
            });
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const updateStatus = async (reservationId, newStatus) => {
        try {
            await axios.put(`http://localhost:8000/api/reservations/${reservationId}/status`, {
                status: newStatus
            });
            fetchReservations(); // Refresh the list
        } catch (error) {
            alert('Failed to update status: ' + error.response?.data?.error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'booked': 'bg-blue-100 text-blue-800',
            'checked-in': 'bg-green-100 text-green-800',
            'checked-out': 'bg-gray-100 text-gray-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    // Filter reservations based on search and status
   const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = searchTerm === '' ||
        (reservation._id && reservation._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reservation.room && reservation.room.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (reservation.guests && reservation.guests.toString().toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;

    return matchesSearch && matchesStatus;
});

    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading reservations...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Reservations Management</h2>
                <button
                    onClick={fetchReservations}
                    disabled={refreshing}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                
                {/* Status Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="booked">Booked</option>
                        <option value="checked-in">Checked In</option>
                        <option value="checked-out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Stats */}
                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-bold text-blue-600">
                        Total Reservations: {filteredReservations.length}
                    </p>
                </div>
            </div>

            {filteredReservations.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">
                        {searchTerm || statusFilter !== 'all'
                            ? 'No reservations match your filters.'
                            : 'No reservations found.'
                        }
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Room ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Room Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stay Period
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Guests
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReservations.map((reservation) => (
                                    <tr key={reservation._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {reservation.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                  {reservation.room.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                Room {reservation.room.roomNO}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {reservation.room.type} - ${reservation.room.price}/night
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                *Check-in:* {reservation.checkInDate ?
                                                    new Date(reservation.checkInDate).toLocaleDateString() :
                                                    'Not set'
                                                }
                                            </div>
                                            <div className="text-sm text-gray-900">
                                                *Check-out:* {reservation.checkOutDate ?
                                                    new Date(reservation.checkOutDate).toLocaleDateString() :
                                                    'Not set'
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {reservation.guests || 'Not specified'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                                                {reservation.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={reservation.status}
                                                onChange={(e) => updateStatus(reservation._id, e.target.value)}
                                                className="text-sm border border-gray-300 rounded px-2 py-1"
                                            >
                                                <option value="booked">Booked</option>
                                                <option value="checked-in">Checked In</option>
                                                <option value="checked-out">Checked Out</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4 p-4">
                        {filteredReservations.map((reservation) => (
                            <div key={reservation._id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-400" />
                                        <span className="font-medium">{reservation.user.name}</span>
                                    </div>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                                        {reservation.status}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-400" />
                                        <span>Room {reservation.room.roomNumber} - {reservation.room.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span>
                                            {reservation.checkInDate ? new Date(reservation.checkInDate).toLocaleDateString() : 'Not set'} -
                                            {reservation.checkOutDate ? new Date(reservation.checkOutDate).toLocaleDateString() : 'Not set'}
                                        </span>
                                    </div>
                                    <div className="text-gray-600">
                                        {reservation.user.email} • {reservation.guests} guests
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <select
                                        value={reservation.status}
                                        onChange={(e) => updateStatus(reservation._id, e.target.value)}
                                        className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                                    >
                                        <option value="booked">Booked</option>
                                        <option value="checked-in">Checked In</option>
                                        <option value="checked-out">Checked Out</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            )
            }
        </div >
    );
}