import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const InviteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async ({
    email,
    UAN,
    firstName,
    lastName,
    associateId,
    designation,
  }) => {
    const apiUrl = `${import.meta.env.VITE_API_URI}/api/user/invitation`;
    const requestData = {
      email,
      UAN,
      firstName,
      lastName,
      associateId,
      designation,
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
          Invite Employees
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="firstName"
              >
                FIRST NAME
              </label>
              <input
                defaultValue=""
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "FIRST NAME is required",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="lastName"
              >
                LAST NAME
              </label>
              <input
                defaultValue=""
                {...register("lastName", { required: "Email is required" })}
                id="lastName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="email"
              >
                Email
              </label>
              <input
                defaultValue=""
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="associateId"
              >
                Associate Id
              </label>
              <input
                defaultValue=""
                id="associateId"
                {...register("associateId", {
                  required: "associateId is required",
                })}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                defaultValue=""
                {...register("designation", { required: "Email is required" })}
                id="designation"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="UAN">
                UAN
              </label>
              <input
                defaultValue=""
                {...register("UAN", { required: "Email is required" })}
                id="UAN"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "..." : "Invite"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default InviteEmployee;
