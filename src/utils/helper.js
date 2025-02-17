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