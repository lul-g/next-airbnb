'use client';

import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import { Cloudinary } from '@/app/types/index';
declare global {
  let cloudinary: Cloudinary;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="iuhkyutsr"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative cursor-pointer hover:opacity-70 transition border-2 border-dashed p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            {!value && (
              <>
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </>
            )}
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
