import React from 'react';
import TripForm from '../components/TripForm';

export default function Index() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    // You’ll send this to the Django API later
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl text-center p-4 font-bold">Trip Form</h1>
      <TripForm onSubmit={handleSubmit} />
    </div>
  );
}
