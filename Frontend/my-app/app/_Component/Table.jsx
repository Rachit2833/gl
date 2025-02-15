function Table({ fileData }) {
   return (
      <>
         {fileData?.data?.length > 0 ? (
            <div className="w-full  overflow-x-auto">
               <table className="w-full border border-gray-300 rounded-lg bg-white">
                  <thead className="bg-gray-200 text-gray-700">
                     <tr>
                        {fileData.data[0].map((header, index) => (
                           <th key={index} className="px-4 py-2 border text-center">
                              {header}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {fileData.data.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border hover:bg-gray-50">
                           {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-2 border text-center">
                                 {cell}
                              </td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="text-center text-gray-700">No data extracted from the file.</p>
         )}
      </>
   )
}

export default Table
