import RouteMap from './RouteMap';
import React, { useState } from 'react';
import axios from 'axios';
import LogSheet from './LogSheet';

export default function TripForm() {
  const [form, setForm] = useState({
    current_location: '',
    pickup_location: '',
    dropoff_location: '',
    hours_used: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await axios.post('https://eldlogs-xkka.onrender.com/api/trip/plan/', form);
      setResult(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to fetch trip plan. Please check your input.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Submit Your Trip Details</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          className="p-3 border border-gray-300 rounded"
          type="text"
          name="current_location"
          placeholder="Current Location"
          value={form.current_location}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded"
          type="text"
          name="pickup_location"
          placeholder="Pickup Location"
          value={form.pickup_location}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded"
          type="text"
          name="dropoff_location"
          placeholder="Dropoff Location"
          value={form.dropoff_location}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 border border-gray-300 rounded"
          type="number"
          name="hours_used"
          placeholder="Hours Used"
          value={form.hours_used}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Planning trip...' : 'Plan Trip'}
        </button>
      </form>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {result && result.pickup_coords && result.dropoff_coords && (
        <>
          <div className="bg-gray-50 p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4">Trip Plan</h3>
            <p><strong>Total Miles:</strong> {result.total_miles}</p>
            <p><strong>Pickup Duration:</strong> {result.pickup_duration} hr</p>
            <p><strong>Dropoff Duration:</strong> {result.dropoff_duration} hr</p>

            <h4 className="text-lg font-semibold mt-4">Fuel Stops:</h4>
            <ul className="list-disc pl-5">
              {result.fuel_stops.map((stop, idx) => (
                <li key={idx}>{stop} miles</li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mt-4">Daily Schedule:</h4>
            <ul className="list-disc pl-5">
              {result.schedule.map((day, idx) => (
                <li key={idx}>
                  <strong>Day {day.day}:</strong> {day.driving_hours} hrs driving, {day.breaks} breaks, {day.total_on_duty} hrs on duty
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <RouteMap
              pickupCoords={result.pickup_coords}
              dropoffCoords={result.dropoff_coords}
              fuelStops={result.fuel_coords}
            />
          </div>

          <div className="bg-white rounded shadow p-6">
            <h3 className="text-xl font-bold mb-4">Daily Log Sheets</h3>
            <div className="space-y-6">
              {result.schedule.map((day, idx) => (
                <LogSheet
                  key={idx}
                  day={day.day}
                  drivingHours={day.driving_hours}
                  breaks={day.breaks}
                  totalOnDuty={day.total_on_duty}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
