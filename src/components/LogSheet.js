import React from 'react';
import './LogSheet.css';

function LogSheet({ day, drivingHours, breaks, totalOnDuty }) {
  const getBarSegments = () => {
    const segments = Array(24).fill("off"); // default: Off Duty

    // Assume driver starts duty at 6AM
    let start = 6;

    // On Duty (not driving)
    segments.fill("onduty", start, start + 1);

    // Driving
    segments.fill("driving", start + 1, start + 1 + drivingHours);

    // Breaks (assume after driving)
    segments.fill("sleeper", start + 1 + drivingHours, start + 1 + drivingHours + breaks);

    return segments;
  };

  const segments = getBarSegments();

  return (
    <div className="log-sheet">
      <h4>Day {day}</h4>
      <div className="log-bar">
        {segments.map((type, hour) => (
          <div key={hour} className={`log-segment ${type}`}>
            {hour}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogSheet;
