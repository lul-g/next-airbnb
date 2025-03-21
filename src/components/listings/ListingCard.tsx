'use client';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import useCountries from '@/hooks/useCountries';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { HeartButton } from '../HeartButton';
import { Button } from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  console.log(data);
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} -  ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div className="relative w-11/12 aspect-square">
      <div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="col-span-1 cursor-pointer group z-0"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="h-[230px] w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              alt="Listing"
              src={data.imageSrc}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          </div>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <HeartButton listingId={data.id} currentUser={currentUser} />
      </div>
    </div>
  );
};
