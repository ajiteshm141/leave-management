import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Admin = () => {
  const [leaves, setleaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/api/leave/get-all-leaves/`, {
        headers: {
          "Content-Type": "application/json",
          // Other headers as needed
          token: `${localStorage.getItem("token")}`,
        }, // Pass the headers in the configuration
      })
      .then(function (response) {
        // Handle the successful response here
        setleaves(response.data);
        console.log("Response Data:", response.data);
      })
      .catch(function (error) {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []);

  const updateLeaveStatus = async (e: any, leaveId: string) => {
    const apiUrl = `${
      import.meta.env.VITE_API_URI
    }/api/leave/update-leave/${leaveId}`;
    const requestData = {
      status: e.target.value,
    };

    const headers = {
      // Authorization: "Bearer YourAccessToken",
      "Content-Type": "application/json",
      token: `${localStorage.getItem("token")}`,
      // Other headers as needed
    };

    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(apiUrl, requestData, {
        headers,
      });
      console.log(response);

      if (response.status === 200) {
        // return response.data;
        toast.success(response.data.message);
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error?.response?.data.message as string);
        setLoading(false);
        // Do something with this error...
      } else {
        console.error(error);
        toast.error("something went wrong");
        setLoading(false);
      }

      console.log(error);
    }
  };
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
                      {leaves?.map((leave) => (
                        <>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {leave.startDate}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {leave.endDate}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <select
                              name="leave status"
                              disabled={loading}
                              id="leaveStatus"
                              defaultValue={leave.status}
                              onChange={(e) => updateLeaveStatus(e, leave._id)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            {}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {leave.leaveType}
                          </td>
                        </>
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
  );
};

export default Admin;
