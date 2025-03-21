'use client';

import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/components/listings/ListingCard';

interface TripsClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser;
}
export const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  // const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation Cancelled');
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
