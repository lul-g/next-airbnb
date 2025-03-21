'use client';

import React, { useCallback, useState } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/components/listings/ListingCard';

interface PropertiesClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser;
}
export const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  // const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, []);

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
