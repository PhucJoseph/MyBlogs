import toast from "react-hot-toast";

export async function convertImageToBase64(file) {
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  try {
    const base64 = await getBase64(file);
    return base64;
  } catch (error) {
    toast.error("Error converting image to Base64:", error);
    throw error;
  }
}

export function formatDate(timestamp) {
  if (!timestamp || !timestamp.seconds) {
      return "Invalid date"; // Handle the case where timestamp is undefined
  }

  const milliseconds = timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1_000_000;
  const date = new Date(milliseconds);

  // Format to dd/MM/yyyy
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function isMoreThanThreeDaysAgo(inputSeconds) {
  const inputDate = new Date(inputSeconds * 1000); // Convert seconds to milliseconds
  const currentDate = new Date();
  
  // Calculate the difference in days
  const diffInTime = currentDate - inputDate;
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  return diffInDays > 0.00001;
}
