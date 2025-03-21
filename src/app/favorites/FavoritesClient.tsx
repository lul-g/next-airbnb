import React from 'react';
import { SafeListing, SafeUser } from '../types';
import Heading from '@/components/Heading';
import Container from '@/components/Container';
import { ListingCard } from '@/components/listings/ListingCard';

interface FavoritesClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
