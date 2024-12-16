// services/imageUpload.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

interface ImageData {
  uri: string;
  userId: string;
  timestamp: number;
  metadata?: {
    // location?: string;
    deviceInfo?: string;
    // Add any other metadata you want to track
  };
}

export class ImageUploadService {
  // Upload image to remote storage (example using Firebase Storage)
  static async uploadImage(localUri: string, userId: string): Promise<string> {
    try {
      // Convert local URI to blob
      const response = await fetch(localUri);
      const blob = await response.blob();

      // Generate unique filename
      const filename = `${userId}_${Date.now()}.jpg`;

      // TODO: Replace with your actual storage upload logic
      // Example using Firebase Storage:
      // const storageRef = ref(storage, `users/${userId}/images/${filename}`);
      // await uploadBytes(storageRef, blob);
      // const downloadUrl = await getDownloadURL(storageRef);

      // For now, we'll simulate by returning the local URI
      return localUri;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Save image metadata to local storage (temporary solution)
  static async saveImageMetadata(imageData: ImageData): Promise<void> {
    try {
      const existingData = await AsyncStorage.getItem(
        `user_images_${imageData.userId}`
      );
      const images = existingData ? JSON.parse(existingData) : [];
      images.push(imageData);
      await AsyncStorage.setItem(
        `user_images_${imageData.userId}`,
        JSON.stringify(images)
      );
    } catch (error) {
      console.error('Error saving image metadata:', error);
      throw error;
    }
  }

  // Get all images for a user
  static async getUserImages(userId: string): Promise<ImageData[]> {
    try {
      const data = await AsyncStorage.getItem(`user_images_${userId}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting user images:', error);
      throw error;
    }
  }
}
