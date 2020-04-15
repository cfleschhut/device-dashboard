import React from 'react';
import './main.css';

const Counter = ({ readings }) => {
  const totalReadings = readings.length;
  const activeReadings = readings.filter((reading) => reading.active).length;
  const inactiveReadings = readings.filter((reading) => !reading.active).length;

  return (
    <small className="readings-counter">
      Total: <strong>{totalReadings}</strong> | Active:{' '}
      <strong>{activeReadings}</strong> | Inactive:{' '}
      <strong>{inactiveReadings}</strong>
    </small>
  );
};

const Main = ({
  readings,
  readingUpdatingName,
  readingUpdatingError,
  onBtnClick,
}) => {
  const toggleReadingStatus = ({ name, active }) => {
    onBtnClick(name, !active);
  };

  return (
    <main>
      <div>
        <h2 className="readings-heading">
          <span>Device readings</span>
          <Counter readings={readings} />
        </h2>
      </div>

      <ul className="readings-list">
        {readings.map((reading, i) => (
          <li key={i}>
            <div className="card">
              <div className="card-header">
                <div className="card-header-meta">
                  {new Date(reading.timestamp).toLocaleString()}
                </div>
                <h3 className="card-header-title">{reading.name}</h3>
              </div>
              <div className="card-body">
                <div className="statistics">
                  <div className="statistic">
                    <div className="statistic-label">Value</div>
                    <div className="statistic-value">
                      {reading.value.toFixed(2)} {reading.unit}
                    </div>
                  </div>

                  <div className="statistic">
                    <div className="statistic-label">Status</div>
                    <div className="statistic-value">
                      {reading.active ? (
                        <span className="status-indicator status-indicator-active">
                          Active
                        </span>
                      ) : (
                        <span className="status-indicator status-indicator-inactive">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn"
                  onClick={() => toggleReadingStatus(reading)}
                >
                  {readingUpdatingName === reading.name
                    ? readingUpdatingError
                      ? 'Error updating!'
                      : 'Updating…'
                    : 'Toggle status'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
