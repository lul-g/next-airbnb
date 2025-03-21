import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/components/ClientOnly';
import { EmptyState } from '@/components/EmptyState';
import React from 'react';
import { ListingClient } from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const listing = await getListingById(await params);
  const user = await getCurrentUser();
  const reservations = await getReservations(await params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={user}
      />
    </ClientOnly>
  );
};

export default ListingPage;
