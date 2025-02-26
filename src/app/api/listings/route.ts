'use server';

import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  console.log(request);
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    );

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // const arr = [
  //   {
  //     bathroomCount: 3,
  //     category: 'Luxury',
  //     createdAt: '2025-02-12T10:15:00.000Z',
  //     description: 'Stunning luxury apartment with ocean view',
  //     guestCount: 6,
  //     id: '67aa48a30e90d50eb45a9521',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zla.jpg',
  //     locationValue: 'Miami, US',
  //     price: 1500,
  //     roomCount: 4,
  //     title: 'Luxury Oceanfront Apartment',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 2,
  //     category: 'Traditional',
  //     createdAt: '2025-02-11T15:30:00.000Z',
  //     description: 'Cozy traditional cottage near the woods',
  //     guestCount: 4,
  //     id: '67aa48a30e90d50eb45a9522',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zlb.jpg',
  //     locationValue: 'London, UK',
  //     price: 800,
  //     roomCount: 3,
  //     title: 'Charming Woodland Cottage',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 4,
  //     category: 'Modern',
  //     createdAt: '2025-02-10T18:42:43.506Z',
  //     description: 'Best villa in the city',
  //     guestCount: 10,
  //     id: '67aa48a30e90d50eb45a9524',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zla.jpg',
  //     locationValue: 'Los Angeles, US',
  //     price: 2000,
  //     roomCount: 5,
  //     title: 'Luxury Villa in Los Angeles',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 3,
  //     category: 'Rustic',
  //     createdAt: '2025-02-09T12:00:00.000Z',
  //     description: 'Quaint rustic farmhouse in the countryside',
  //     guestCount: 8,
  //     id: '67aa48a30e90d50eb45a9525',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zlc.jpg',
  //     locationValue: 'Paris, France',
  //     price: 1200,
  //     roomCount: 6,
  //     title: 'Rustic Countryside Retreat',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 2,
  //     category: 'Seaside',
  //     createdAt: '2025-02-08T09:45:00.000Z',
  //     description: 'Charming seaside cottage with stunning views',
  //     guestCount: 4,
  //     id: '67aa48a30e90d50eb45a9526',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zld.jpg',
  //     locationValue: 'Sydney, Australia',
  //     price: 1000,
  //     roomCount: 3,
  //     title: 'Seaside Escape in Sydney',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 3,
  //     category: 'Modern',
  //     createdAt: '2025-02-07T14:20:00.000Z',
  //     description: 'Contemporary city apartment with rooftop terrace',
  //     guestCount: 6,
  //     id: '67aa48a30e90d50eb45a9527',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zle.jpg',
  //     locationValue: 'New York City, US',
  //     price: 1800,
  //     roomCount: 4,
  //     title: 'Modern City Living',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 2,
  //     category: 'Traditional',
  //     createdAt: '2025-02-06T11:10:00.000Z',
  //     description: 'Classic cottage nestled in the mountains',
  //     guestCount: 4,
  //     id: '67aa48a30e90d50eb45a9528',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zlf.jpg',
  //     locationValue: 'Vancouver, Canada',
  //     price: 900,
  //     roomCount: 3,
  //     title: 'Mountain Retreat',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 1,
  //     category: 'Cozy',
  //     createdAt: '2025-02-05T08:00:00.000Z',
  //     description: 'Warm and cozy cabin by the lake',
  //     guestCount: 2,
  //     id: '67aa48a30e90d50eb45a9529',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zlg.jpg',
  //     locationValue: 'Zurich, Switzerland',
  //     price: 600,
  //     roomCount: 2,
  //     title: 'Lakefront Cabin',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 4,
  //     category: 'Luxury',
  //     createdAt: '2025-02-04T16:30:00.000Z',
  //     description: 'Elegant luxury penthouse with panoramic views',
  //     guestCount: 10,
  //     id: '67aa48a30e90d50eb45a9530',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zlh.jpg',
  //     locationValue: 'Tokyo, Japan',
  //     price: 2500,
  //     roomCount: 5,
  //     title: 'Tokyo Skyline Penthouse',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  //   {
  //     bathroomCount: 3,
  //     category: 'Modern',
  //     createdAt: '2025-02-03T19:00:00.000Z',
  //     description: 'Sleek modern loft in the heart of the city',
  //     guestCount: 6,
  //     id: '67aa48a30e90d50eb45a9531',
  //     imageSrc:
  //       'https://res.cloudinary.com/dzrkpjcn2/image/upload/v1739212941/k60hcxxm0k7p9nyd7zli.jpg',
  //     locationValue: 'Berlin, Germany',
  //     price: 1700,
  //     roomCount: 4,
  //     title: 'City Center Loft',
  //     userId: '679ce2371ce87eb62404ed29',
  //   },
  // ];

  // arr.map(async (ls) => {
  //   await prisma.listing.create({
  //     data: {
  //       title: ls.title,
  //       description: ls.description,
  //       imageSrc: ls.imageSrc,
  //       category: ls.category,
  //       roomCount: ls.roomCount,
  //       bathroomCount: ls.bathroomCount,
  //       guestCount: ls.guestCount,
  //       locationValue: ls.locationValue,
  //       price: parseInt(price, 10),
  //       userId: currentUser.id,
  //     },
  //   });
  // });

  // return NextResponse.json('hi');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.json({ error: `Something is required` }, { status: 400 });
    }
  });

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Failed to create listing' },
        { status: 500 }
      );
    }
  }
}
