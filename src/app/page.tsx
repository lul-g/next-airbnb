export const dynamic = 'force-dynamic';

import ClientOnly from '@/components/ClientOnly';
import Container from '@/components/Container';
import { EmptyState } from '@/components/EmptyState';
import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';
import { ListingCard } from '@/components/listings/ListingCard';
import { SafeListing } from './types';

interface HomeProps {
  searchParams: Promise<IListingsParams>;
}
export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(await searchParams);
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings?.map((listing: SafeListing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
