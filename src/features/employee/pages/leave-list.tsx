import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LeaveList = () => {
    const [leaves, setleaves] = useState<any[]>([])
const user = JSON.parse(localStorage.getItem('user') as any)

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URI}/api/leave/get-user-leaves/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            // Other headers as needed
            token: `${localStorage.getItem("token")}`,
          }, // Pass the headers in the configuration
        })
        .then(function (response) {
          // Handle the successful response here
          setleaves(response.data);
          console.log("Response Data:", response.data
          );
        })
        .catch(function (error) {
          // Handle any errors here
          console.error("Error:", error);
        });
    }, [])
    
  return (
    <div>

<section className="container px-4 mx-auto">
  
  <div className="flex flex-col mt-6">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-x-3">
                  
                    <span>startDate</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-x-2">
                    <span>endDate</span>
                    
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <div className="flex items-center gap-x-2">
                    <span>status</span>
                    
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  leaveType
                </th>
              
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <tr>
                {leaves?.map(leave =>(

              
              <>
              
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {leave.startDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {leave.endDate}
                </td>

                
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {leave.status}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                {leave.leaveType}
                </td></>
                  ))}
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
</section>

    </div>
  )
}

export default LeaveList