import { IEvent } from '@/lib/database/models/event.model';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteConfirmation } from './DeleteConfirmation';

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  console.log(userId);
  const isEventCreator = userId === event.organizer._id;

  return (
    <div className="group relative flex min-h-[280px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {isEventCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/create/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {event.category.name}
          </p>
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-4 py-1 text-primary-500 line-clamp-1">
            Production Year: {event.productionYear} r.
          </p>
        </div>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-18 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
