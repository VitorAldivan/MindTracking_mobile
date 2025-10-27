import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

// Configure these values for your Cloudinary account.
// You can also move them to a .env file and load via process.env or a config file.
const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"; // e.g. 'mycloud'
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET"; // unsigned preset

/**
 * Upload an image (local URI) to Cloudinary and return the upload response.
 *
 * Usage (React Native):
 * const res = await uploadImageToCloudinary(uri);
 * const imageUrl = res.secure_url;
 */
export async function uploadImageToCloudinary(uri: string, options?: { uploadPreset?: string; folder?: string; public_id?: string; }) {
  const cloudName = CLOUDINARY_CLOUD_NAME;
  const uploadPreset = options?.uploadPreset || CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in service/profileService.tsx or load from config.");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  // In React Native, file field should be an object with uri, type and name
  // type is optional but recommended
  formData.append('file' as any, {
    uri,
    type: 'image/jpeg',
    name: `photo.jpg`,
  } as any);

  formData.append('upload_preset' as any, uploadPreset as any);
  if (options?.folder) formData.append('folder' as any, options.folder as any);
  if (options?.public_id) formData.append('public_id' as any, options.public_id as any);

  const resp = await fetch(url, {
    method: 'POST',
    body: formData as any,
    headers: {
      // Let fetch set Content-Type with boundary
      Accept: 'application/json',
    } as any,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Cloudinary upload failed: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  return data;
}

/**
 * Send the image URL to your backend to save as the user's profile photo.
 * Adjust the endpoint '/usuario/photo' to match your backend API.
 */
export async function saveProfilePhoto(photoUrl: string) {
  try {
    const resp = await api.post('/usuario/photo', { foto: photoUrl });
    // persist locally for fast access
    try {
      await AsyncStorage.setItem('foto', String(photoUrl));
    } catch (e) {
      // ignore storage errors
    }
    return resp.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || 'Erro ao salvar foto no servidor';
    throw new Error(message);
  }
}

export default { uploadImageToCloudinary, saveProfilePhoto };
