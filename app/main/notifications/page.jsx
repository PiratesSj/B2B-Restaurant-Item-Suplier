"use client"
import React, { useState, useEffect } from "react";
import api from "@/app/api/mainapi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch notifications when the component mounts
  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const data = await api.getAllNotifications(); // Fetch notifications from the API
        setNotifications(data); // Store notifications in the state
      } catch (error) {
        setError("Failed to fetch notifications"); // Handle error if API call fails
      } finally {
        setLoading(false);
      }
    };

    loadNotifications(); // Call the function to load notifications
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="s p-4 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Notifications
        </h2>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Icon */}
            <img
              src={notification.icon}
              alt="icon"
              className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-300"
            />
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-medium text-gray-800 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {notification.description}
              </p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
        You’re all caught up! 🎉
      </div>
    </div>
  );
};

export default Notifications;
