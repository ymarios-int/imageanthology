import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from '$env/static/private';
import type { IUploadResult } from '$lib';
import cloudinary, { type TransformationOptions, type UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import type { CdnProvider } from './cdn-provider';

export class CloudinaryProvider implements CdnProvider {
  constructor() {
    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true
    });
  }

  async upload(
    files: File[],
    folder?: string,
    transformation?: TransformationOptions
  ): Promise<IUploadResult[]> {
    try {
      const promises = files.map((file) => {

        return new Promise<UploadApiResponse>((resolve, reject) => {
          const readable = new Readable();
          const cloudStream = cloudinary.v2.uploader.upload_stream(
            {
              resource_type: 'auto',
              folder,
              use_filename: true,
              filename_override: file.name,
              eager: transformation
            },
            (err, result) => {
              if (err || !result) {
                reject(err);
              }
              if (!result) {
                reject(new Error('Cloudinary upload error'));
              }

              result && resolve(result);
            }
          );

          return file.arrayBuffer().then((arrBuffer) => {
            const byteArray = new Uint8Array(arrBuffer);
            readable.push(byteArray);
            readable.push(null);
            readable.pipe(cloudStream);
          });
        });
      });

      const responses = await Promise.all(promises);

      if (responses?.length) {
        const uploads = responses.map((resp) => {
          return {
            name: resp.original_filename,
            message: '',
            url: resp.eager[0].secure_url,
            mimeType: resp.resource_type,
            folder,
            uniqueId: resp.public_id,
            thumbnailUrl: resp.eager[1].secure_url
          };
        });

        return uploads;
      }

      return [];
    } catch (e) {
      return [];
    }
  }

  async delete(publicIds: string[]) {
    try {
      const promises = publicIds.map((id) => {
        return cloudinary.v2.uploader.destroy(id);
      });

      const responses = await Promise.all(promises);

      if (responses.every((v) => v === 'ok')) {
        return publicIds;
      }

      return [];
    } catch (e) {
      return [];
    }
  }
}
