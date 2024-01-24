import React from "react";

export default function LoaderDot() {
  return (
    <div className="loading-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>

      <style jsx>{`
             .loading-container {
                display: flex;
              }
              
              .dot {
                width: 5px;
                height: 5px;
                background-color: #3498db;
                border-radius: 50%;
                margin: 0 5px;
                animation: pulse 1s infinite;
                animation-delay: 0s; /* Ajoutez un délai à chaque point pour une animation décalée */
              }
              
              @keyframes pulse {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.7);
                }
                100% {
                  transform: scale(1);
                }
              }`                
             }    
        </style>
    </div>
  );
}
