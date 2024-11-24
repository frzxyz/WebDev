import React from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";
import "../styles/StatusPopup.css";

function StatusPopup({ type, message, onClose, onConfirm, isConfirm }) {
  const renderIcon = () => {
    if (type === "success") return <FaCheckCircle />;
    if (type === "error") return <FaTimesCircle />;
    if (type === "warning") return <FaExclamationCircle />;
    return null;
  };

  return (
    <div className={`status-popup ${type}`}>
      <div className="status-popup-icon">{renderIcon()}</div>
      <div className="status-popup-message">{message}</div>
      <div className="status-popup-buttons">
        {isConfirm ? (
          <>
            <button className="status-popup-button yes" onClick={onConfirm}>
              Yes
            </button>
            <button className="status-popup-button no" onClick={onClose}>
              No
            </button>
          </>
        ) : (
          <button className="status-popup-button" onClick={onClose}>
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default StatusPopup;
