import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, fetchUserProfile } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>
      <div className="max-w-sm mx-auto bg-white p-4 shadow-md rounded">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}
        <h2 className="text-xl font-bold text-center">{user.username}</h2>
        <p className="text-gray-700 text-center">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
