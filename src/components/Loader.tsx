import React from 'react';

export default function Loader() {
    return (
        <div className="loader">
             <style jsx>{`
             /* Ajoute un peu de style pour l'élément qui tourne */
             .loader {
               border: 4px solid rgba(0, 0, 0, 0.1);
               border-top: 4px solid #3498db;
               border-radius: 50%;
               width: 50px;
               height: 50px;
               animation: spin 1s linear infinite;
             }
         
             @keyframes spin {
               0% {
                 transform: rotate(0deg);
               }
               100% {
                 transform: rotate(360deg);
               }
             }`                
             }    
            </style>
        </div>
    );
}
