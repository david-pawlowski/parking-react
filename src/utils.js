// import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

// export const getParkings = async () => {
//   try {
//     const response = await axios.get(
//       `${API_URL}/parkings`
//     );
//     return response.data;
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message || "An unexpected error occurred.";
//     const data = null;
//     return { error: errorMessage, data };
//   }
// };
