import axios from "axios";
import { API_FACE } from '@env';
import { Platform } from "react-native";


export async function registerFace(name: string, photoUri: string) {
  const cleanUri = Platform.OS === "android" && photoUri.startsWith("file://")
    ? photoUri
    : photoUri.replace("file://", "");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", {
    uri: cleanUri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any);

  console.log("📡 Enviando para:", `${API_FACE}/register`);

  return axios.post(`${API_FACE}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}

export async function verifyFace(photoUri: string) {
  const formData = new FormData();
  formData.append("image", {
    uri: photoUri,
    type: "image/jpeg",
    name: "photo.jpg",
  } as any);

  const response = await axios.post(`${API_FACE}/verify`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response; // { status, email, token }
}
