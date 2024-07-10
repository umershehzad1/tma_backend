"use strict";
// import { BlobServiceClient } from '@azure/storage-blob';
// const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
// if (!AZURE_STORAGE_CONNECTION_STRING) {
//   throw new Error("Azure Storage connection string is not defined in environment variables.");
// }
// //enter your connection string here
// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
// // metnion the container name here
// const containerClient = blobServiceClient.getContainerClient('picturestoragetma');
// async function uploadImageToAzure(file: Express.Multer.File): Promise<string> {
//   const blobName = `${Date.now()}-${file.originalname}`;
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.uploadData(file.buffer);
//   return blockBlobClient.url;
// }
// async function deleteImageFromAzure(url: string): Promise<void> {
//   const blobName = url.split('/').pop();
//   if (!blobName) {
//     throw new Error("Invalid URL format, unable to extract blob name.");
//   }
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.delete();
// }
// export { uploadImageToAzure, deleteImageFromAzure };
