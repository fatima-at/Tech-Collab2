import { useState } from "react";// Import the API function
import { getUser } from "../../../../services/UserApi";

function useFetchSelectedUser(userId) {
  const [userLoading, setUserLoading] = useState(false); // Loading state
  const [userData, setUserData] = useState(null); // User data state

  // Function to fetch the user
  const fetchSelectedUser = async () => {
    try {
      setUserLoading(true); // Start loading
      const response = await getUser(userId); // Fetch user from API
      setUserData(response.data); // Assuming response has a `data` field containing user info
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserData(null); // In case of error, reset userData
    } finally {
      setUserLoading(false); // Stop loading
    }
  };

  return {
    userLoading,
    userData,
    fetchSelectedUser,
  };
}

export default useFetchSelectedUser;
