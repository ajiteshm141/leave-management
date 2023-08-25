import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const ApplyLeave = () => {
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState<any[]>([]);
  const [leaveTypeName, setLeaveTypeName] = useState("");


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/api/leave/get-leave-types`, {
        headers: {
          "Content-Type": "application/json",
          // Other headers as needed
          token: `${localStorage.getItem("token")}`,
        }, // Pass the headers in the configuration
      })
      .then(function (response) {
        // Handle the successful response here
        setLeaveType(response.data.leaveType);
        console.log("Response Data:", response.data
        );
      })
      .catch(function (error) {
        // Handle any errors here
        console.error("Error:", error);
      });
  }, []);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async ({
    startDate,
    endDate,
    reason,
    leaveType,
    
  }) => {
    const apiUrl = `${import.meta.env.VITE_API_URI}/api/leave/apply-leave`;
    const requestData = {
      startDate,
      endDate,
      reason,
      leaveType,
      leaveTypeName
    };

    const headers = {
      //   Authorization: "Bearer YourAccessToken",
      "Content-Type": "application/json",
      // Other headers as needed
      token: `${localStorage.getItem("token")}`,
    };

    try {
      setLoading(true);
      const response: AxiosResponse = await axios.post(apiUrl, requestData, {
        headers,
      });
      console.log(response);

      if (response.status === 200) {
        // return response.data;
        console.log(response);

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
    }
  };
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Orginization Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <input
                defaultValue=""
                id="startDate"
                type="date"
                {...register("startDate", {
                  required: "startDate is required",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="endDate"
              >
                End Date
              </label>
              <input
                defaultValue=""
                id="endDate"
                type="date"
                {...register("endDate", { required: "End Date is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="reason"
              >
                Reason
              </label>
              <textarea
                {...register("reason", { required: "Email is required" })}
                id="reason"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="leaveType"
              >
                Leave Type
              </label>
              <select
                defaultValue=""
                {...register("leaveType", { required: "Email is required" })}
                id="leaveType"
                onChange={e => setLeaveTypeName(e.target.name)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <>
                  {leaveType?.map((e) => (
                    <option value={e._id} key={e._id} >
                      {e.name}
                    </option>
                  ))}
                </>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Save"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ApplyLeave;
