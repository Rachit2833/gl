'use client'
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import Table from "./Table";
import { uploadFile } from "../_lib/action";


function NewForm() {
   const [file, setFile] = useState(null);
   const [fileData, setFileData] = useState(null);

   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
   };

   const handleRefresh = () => {
      setFile(null);
      setFileData(null);
      document.getElementById("fileInput").value = "";
   };

   return (
      <>
         <Card className="w-96 mx-auto shadow-lg p-6 bg-white rounded-lg">
            <CardTitle className="text-lg font-semibold">Upload an Excel File</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
               Select an Excel file to upload.
            </CardDescription>
            <CardContent>
               <form
                  action={async (formData) => {
                     const data = await uploadFile(formData);
                     setFileData(data);
                  }}
                  className="flex flex-col gap-4 mt-4"
               >
                  <input
                     id="fileInput"
                     name="file"
                     type="file"
                     accept=".xlsx, .xls"
                     onChange={handleFileChange}
                     className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                  />
                  {file && <p className="text-sm text-gray-700">Selected: {file.name}</p>}
                  <Button type="submit" className="w-full">
                     Upload
                  </Button>
               </form>
               <Button onClick={handleRefresh} className="w-full mt-2 bg-gray-500 hover:bg-gray-600">
                  Refresh
               </Button>
            </CardContent>
         </Card>
         <Table fileData={fileData} />
      </>
   );
}

export default NewForm;