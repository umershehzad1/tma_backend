import { BlobServiceClient } from "@azure/storage-blob";
import { azureConfig } from "../config/config";

const { containerName, connectionString } = azureConfig;

if (!connectionString) {
  throw new Error("Azure Storage connection string is not defined in environment variables.");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadImageToAzure(file: Express.Multer.File): Promise<string> {
  try {
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
  } catch (error) {
    throw new Error(`Failed to upload image to Azure: ${error.message}`);
  }
}

async function deleteImageFromAzure(url: string): Promise<void> {
  try {
    const blobName = url.split("/").pop();
    if (!blobName) {
      throw new Error("Invalid URL format, unable to extract blob name.");
    }
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
  } catch (error) {
    throw new Error(`Failed to delete image from Azure: ${error.message}`);
  }
}

export { uploadImageToAzure, deleteImageFromAzure };
