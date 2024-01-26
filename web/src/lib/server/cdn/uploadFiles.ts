import type { IUploadResult } from '$lib';
import { createId } from '@paralleldrive/cuid2';

import type { CdnProvider } from './cdn-provider';
import { CloudinaryProvider } from './cloudinary-provider';
import type { Image } from '@prisma/client';
import prisma from '../prisma';

export const uploadImages = async (files: File[], folder?: string, imageId?: string) => {
  let existingFiles: Image[] = [];
  let uploadResult: IUploadResult[] = [];

  if (imageId) {
    existingFiles = await prisma.image.findMany({
      where: {
        id: imageId
      }
    });
  }

  const cdnProvider: CdnProvider = new CloudinaryProvider();

  try {
    if (files?.length) {
      uploadResult = await cdnProvider.upload(files, folder ?? createId(), [
        {
          width: 640,
          height: 480,
          crop: 'fill',
          gravity: 'auto',
          format: 'jpg'
        },
        {
          width: 400,
          height: 175,
          crop: 'fill',
          gravity: 'auto',
          aspect_ratio: '21:9',
          format: 'jpg'
        }
      ]);
    }

    if (existingFiles.length) {
      const uniqueIds = existingFiles.map((f) => f.uniqueId);
      await cdnProvider.delete(uniqueIds);
    }

  } catch (error) {
    console.log(error)
  }


  return uploadResult;
};
