import { useState, useEffect } from 'react';
import { useAuth } from '../../store/hooks';
import { userService } from '../../services';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiEdit2, FiSave, FiX, FiLock, FiShoppingBag, FiHeart, FiPackage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    addresses: 0,
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getProfile();
      if (response.success) {
        setProfile(response.data);
        setProfileForm({
          name: response.data.name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch user statistics (orders, wishlist count, etc.)
      // This is optional - you can add these endpoints if needed
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const formData = new FormData();

      formData.append('name', profileForm.name);
      formData.append('email', profileForm.email);
      if (profileForm.phone) {
        formData.append('phone', profileForm.phone);
      }
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await userService.updateProfile(formData);

      if (response.success) {
        setProfile(response.data);
        updateUser(response.data);
        toast.success('Profile updated successfully!');
        setIsEditingProfile(false);
        setSelectedImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordForm.password !== passwordForm.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSaving(true);
      const response = await userService.updatePassword(passwordForm);

      if (response.success) {
        toast.success('Password updated successfully!');
        setPasswordForm({
          current_password: '',
          password: '',
          password_confirmation: '',
        });
        setIsEditingPassword(false);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      const message = error.response?.data?.message || 'Failed to update password';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const cancelProfileEdit = () => {
    setIsEditingProfile(false);
    setProfileForm({
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const cancelPasswordEdit = () => {
    setIsEditingPassword(false);
    setPasswordForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : profile?.image ? (
                      <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl text-white font-bold">
                        {profile?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {isEditingProfile && (
                    <label className="absolute bottom-4 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark transition shadow-lg">
                      <FiCamera className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile?.name}</h2>
                <p className="text-gray-600 mb-4">{profile?.email}</p>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-outline btn-sm flex items-center gap-2 mx-auto"
                  >
                    <FiEdit2 /> Edit Profile
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <Link
                    to="/orders"
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FiShoppingBag className="text-white" />
                      </div>
                      <span className="font-medium">Orders</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{stats.orders}</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <FiHeart className="text-white" />
                      </div>
                      <span className="font-medium">Wishlist</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">{stats.wishlist}</span>
                  </Link>

                  <Link
                    to="/dashboard/addresses"
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <FiMapPin className="text-white" />
                      </div>
                      <span className="font-medium">Addresses</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{stats.addresses}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiUser className="text-primary" />
                  Profile Information
                </h3>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="btn btn-outline btn-sm flex items-center gap-2"
                  >
                    <FiEdit2 /> Edit
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="input"
                      placeholder="Optional"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="spinner-small"></div> Saving...
                        </>
                      ) : (
                        <>
                          <FiSave /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={cancelProfileEdit}
                      disabled={isSaving}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiUser className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{profile?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FiMail className="text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{profile?.email}</p>
                    </div>
                  </div>

                  {profile?.phone && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <FiPhone className="text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{profile.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Change Password Card */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiLock className="text-primary" />
                  Change Password
                </h3>
                {!isEditingPassword && (
                  <button
                    onClick={() => setIsEditingPassword(true)}
                    className="btn btn-outline btn-sm flex items-center gap-2"
                  >
                    <FiEdit2 /> Change
                  </button>
                )}
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.password}
                      onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                      className="input"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.password_confirmation}
                      onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="spinner-small"></div> Updating...
                        </>
                      ) : (
                        <>
                          <FiSave /> Update Password
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={cancelPasswordEdit}
                      disabled={isSaving}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Keep your account secure by using a strong password and changing it regularly.
                  </p>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/orders"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                >
                  <FiPackage className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">My Orders</p>
                    <p className="text-sm text-gray-600">View order history</p>
                  </div>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                >
                  <FiHeart className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Wishlist</p>
                    <p className="text-sm text-gray-600">Saved items</p>
                  </div>
                </Link>

                <Link
                  to="/dashboard/addresses"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                >
                  <FiMapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Addresses</p>
                    <p className="text-sm text-gray-600">Manage addresses</p>
                  </div>
                </Link>

                <Link
                  to="/products"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                >
                  <FiShoppingBag className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Shop Now</p>
                    <p className="text-sm text-gray-600">Browse products</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
