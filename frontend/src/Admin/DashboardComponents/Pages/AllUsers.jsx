import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import avatar from '../../../assets/avatar.png';
import GetAllUsers from '../../../contextApi/GetAllUsers';

const AllUsers = () => {
  const [users, loading, setUsers] = GetAllUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/user/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success('User deleted successfully.');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error while deleting user:', error);
      toast.error('Error occurred while deleting the user. Please try again.');
    }
  };

  const handleEditRole = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/edit-role/${selectedUser._id}`,
        { role },
        { withCredentials: true }
      );
      toast.success('User role updated successfully.');
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, role } : user
        )
      );
      setModalVisible(false);
    } catch (error) {
      console.error('Error while updating user role:', error);
      toast.error('Error occurred while updating user role. Please try again.');
    }
  };

  return (
    <div>
      <div className="">
        <div className="container p-6 bg-white shadow-sm rounded-3">
          <h3 className="text-2xl font-semibold font-[Lora] py-3 border-b-2 border-slate-100">
            All Users ({users.length})
          </h3>

          <div className="mt-5">
            {users.length === 0 && !loading && (
              <div className="text-center text-gray-500 mt-5">
                No user found.
              </div>
            )}

            <div>
              {
                loading ? (
                  // Skeleton Loader
                  <div className="flex flex-wrap gap-5 mt-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="w-full p-4 bg-gray-200 rounded-md animate-pulse h-20"></div>
                    ))}
                  </div>
                ) : (
                  users.map((user, index) => (
                    <div
                      key={user?._id}
                      className="py-3 px-2 lg:px-8 border mb-2 flex flex-col md:flex-row gap-3 gap-sm-0 justify-between items-start"
                    >
                      <div className="flex gap-2 lg:gap-4">
                        <span className="font-bold text-primary">{index + 1}.</span>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3 items-start">
                            <div className="">
                              <img
                                src={user?.profileImage || avatar}
                                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full"
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="flex gap-3 items-center justify-start">
                                <span className="font-semibold">Name:</span>
                                <span className="font-medium capitalize text-[16px]">
                                  {user?.username}
                                </span>
                              </div>
                              <div className="flex gap-3 items-center justify-start">
                                <span className="font-semibold">Role:</span>
                                <span className="font-normal text-slate-600">
                                  {user?.role}
                                </span>
                              </div>
                              <div className="flex gap-3 items-center justify-start">
                                <span className="font-semibold">Email:</span>
                                <span className="font-normal text-slate-600">
                                  {user?.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-5 md:pl-0">
                        <button
                          title="edit role"
                          onClick={() => {
                            setSelectedUser(user);
                            setModalVisible(true);
                            setRole(user.role);
                          }}
                          className="px-3 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          <i className="ri-edit-2-line"></i>
                        </button>
                        <button
                          title="delete user"
                          onClick={() => handleDelete(user?._id)}
                          className="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          <i className="ri-delete-bin-6-fill"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )

              }
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed w-[100%] h-[100vh] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white lg:w-1/3 lg:h-1/2 p-10 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary font-[Lora]">Edit User Role</h3>
            <p className="mb-2">
              Update role for user: <strong className=' capitalize'>{selectedUser?.username}</strong>
            </p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditRole}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
