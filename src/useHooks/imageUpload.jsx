import axios from "axios";

const imageUpload = async (imagData) => {
  const formData = new FormData();
  formData.append("image", imagData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  const img_url = data.data.display_url;
  return img_url;
};
export default imageUpload;
