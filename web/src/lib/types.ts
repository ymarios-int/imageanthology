import type { Image, User } from "@prisma/client";


export interface IImageInfiniteResponse {
  items: (Image & { user: User })[];
  nextCursor?: string;
}

export interface IImageFormErrors {
  userId?: string,
  title?: string,
  description?: string
  file?: string
}

export interface IFormResponse {
  type: 'success' | 'failure';
  data?: {
    image: Image; // Any other data you expect in a successful response
    errors?: IImageFormErrors
  }
}
