import axios from "axios";
const { REACT_APP_IMAGENES } = process.env

const getBase64 = function (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export async function uploadImage (file) {
  try {
    const image = await getBase64(file);
    const res = await axios.post(REACT_APP_IMAGENES, {
      image: image,
      name: file.name,
    });
    return res.data;
  } catch (e) {
    throw new Error();
  }
};
