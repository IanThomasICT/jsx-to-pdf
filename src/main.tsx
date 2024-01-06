import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const BASE_URL = process.env.BASE_URL;

function App() {
  
  async function downloadFile(fileId: number) {
    const filePDF = await fetch(`${BASE_URL}/api/${fileId}/download`, {});
    
  }



  return (
  <div>
  <button onClick={() => downloadFile(1)}> 
  Download file
  </button>
  </div>
  );
}
