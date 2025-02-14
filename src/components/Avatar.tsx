'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={25}
      width={25}
      alt="Avatar"
      src={src || '/images/placeholder.png'}
    />
  );
};
