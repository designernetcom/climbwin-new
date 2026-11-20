import { useState, useEffect } from 'react';
import { userService } from '../../services';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiCheck } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    type: 'shipping',
    is_default: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await userService.getAddresses();
      setAddresses(response.addresses || []);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      Swal.fire('Error', 'Failed to load addresses', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const response = await userService.updateAddress(editingId, formData);
        setAddresses(prev =>
          prev.map(addr => addr.id === editingId ? response.address : addr)
        );
        Swal.fire('Success', 'Address updated successfully', 'success');
      } else {
        const response = await userService.createAddress(formData);
        setAddresses(prev => [...prev, response.address]);
        Swal.fire('Success', 'Address added successfully', 'success');
      }

      resetForm();
    } catch (error) {
      console.error('Failed to save address:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to save address', 'error');
    }
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData({
      name: address.name,
      phone: address.phone,
      email: address.email || '',
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip || address.zip_code || '',
      country: address.country || 'United States',
      type: address.type || 'shipping',
      is_default: address.is_default,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Address?',
      text: 'Are you sure you want to delete this address? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await userService.deleteAddress(id);
        setAddresses(prev => prev.filter(addr => addr.id !== id));
        Swal.fire('Deleted', 'Address deleted successfully', 'success');
      } catch (error) {
        console.error('Failed to delete address:', error);
        Swal.fire('Error', 'Failed to delete address', 'error');
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await userService.updateAddress(id, { is_default: true });
      setAddresses(prev =>
        prev.map(addr => ({
          ...addr,
          is_default: addr.id === id
        }))
      );
      Swal.fire('Success', 'Default address updated', 'success');
    } catch (error) {
      console.error('Failed to set default address:', error);
      Swal.fire('Error', 'Failed to update default address', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      type: 'shipping',
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Addresses</h1>
          <p className="text-gray-600">Add, edit, or remove your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus />
          Add New Address
        </button>
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Street Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input"
                  rows="3"
                  placeholder="House number, street name, apartment, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_default"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <label htmlFor="is_default" className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingId ? 'Update Address' : 'Add Address'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Addresses Grid */}
      {addresses.length === 0 ? (
        <div className="text-center py-16">
          <FiMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No addresses yet</h3>
          <p className="text-gray-600 mb-6">Add your first delivery address to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <FiPlus className="mr-2" />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map(address => (
            <div
              key={address.id}
              className={`card p-6 hover:shadow-lg transition ${
                address.is_default ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Default Badge */}
              {address.is_default && (
                <div className="flex items-center gap-1 text-primary font-semibold text-sm mb-3">
                  <FiCheck className="w-4 h-4" />
                  Default Address
                </div>
              )}

              {/* Address Details */}
              <div className="mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <FiMapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">{address.name}</p>
                    <p className="text-gray-600 text-sm">{address.phone}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm">
                  {address.address}
                </p>
                <p className="text-gray-700 text-sm">
                  {address.city}, {address.state} {address.zip || address.zip_code}
                </p>
                {address.country && (
                  <p className="text-gray-700 text-sm">{address.country}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <button
                  onClick={() => handleEdit(address)}
                  className="btn btn-sm btn-outline flex items-center gap-1 flex-1"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                {!address.is_default && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="btn btn-sm btn-outline flex items-center gap-1 flex-1"
                  >
                    <FiCheck className="w-4 h-4" />
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
