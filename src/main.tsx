import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { User } from '@prisma/client';
import downloadIcon from './assets/download.svg'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const BASE_URL = "http://localhost:3000"

function App() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const getUsers = async () => {
      return await fetch(`${BASE_URL}/api/users`).then(res => res.json())
    }

    getUsers().then((u) => setUsers(u));
  }, []);

  async function downloadFile(fileName: string, fileId: number) {
    const filePDF = await fetch(`${BASE_URL}/api/download/${fileId}?name=${fileName}`, {});
    const pdfBlob = await filePDF.blob();

    saveFile(`${fileName}.pdf`, pdfBlob);
  }



  return (
    <div className='flex flex-col px-10 gap-6 h-screen justify-center items-center'>
      {users?.map((u) => {
        if (u) {
          return (
            <div id={String(u.id)} className='w-full px-4 border border-blue-800 rounded-md items-center py-6 flex justify-between'>
              <span>{u.id} {u.name}</span>

              <button type="button"
                className="bg-blue-500 text-white min-h-12 px-4 py-2 rounded-md"
                onClick={() => downloadFile(u.name ?? "unknown", u.id)}>
                <img src={downloadIcon} alt="download icon" className='invert w-5 h-5' />
              </button>
            </div>
          )
        }
      })}
    </div>
  );
}

function saveFile(fileName: string, fileBlob: Blob) {
  // const fileBlob = new Blob([fileBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(fileBlob);

  const anchorElement = document.createElement('a');
  anchorElement.href = url;
  anchorElement.download = fileName;
  anchorElement.target = "_blank";

  anchorElement.click();
  anchorElement.remove();
  URL.revokeObjectURL(url);
}
