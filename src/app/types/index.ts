import { Listing, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export interface Cloudinary {
  upload: (file: string, options?: UploadOptions) => Promise<UploadResult>;
  url: (publicId: string, options?: UrlOptions) => string;
  // Add more methods if needed
}

interface UploadOptions {
  folder?: string;
  tags?: string[];
  context?: Record<string, string>;
}

interface UploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  // Add more properties from the Cloudinary API if needed
}

interface UrlOptions {
  secure?: boolean;
}
