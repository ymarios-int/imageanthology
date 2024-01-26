import type { IUploadResult } from '$lib';
import type { TransformationOptions } from 'cloudinary';

export interface ICDNProvider {
  upload: (files: File[]) => Promise<IUploadResult[]>;
}

export abstract class CdnProvider implements ICDNProvider {
  abstract upload(
    files: File[],
    folder?: string,
    transformation?: TransformationOptions
  ): Promise<IUploadResult[]>;

  abstract delete(publicIds: string[]): Promise<string[]>;
}
