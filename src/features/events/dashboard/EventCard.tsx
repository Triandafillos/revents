import type { AppEvent } from "../../../lib/types";
import EventAttendees from "./EventAttendees";

type Props = {
    event: AppEvent;
    selectEvent: (event: AppEvent) => void;
    deleteEvent: (eventId: string) => void;
}

export default function EventCard({ event, selectEvent, deleteEvent }: Props) {
    const host = event.attendees.find(x => event.hostUid === x.id);

    return (
        <div className="card card-border bg-base-100 w-full">
            <div className="card-body">
                <div className="flex items-center gap-3">
                    <figure className="card-figure w-14 rounded-lg">
                        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" alt="user image" />
                    </figure>
                    <div>
                        <h2 className="card-title">{event.title}</h2>
                        <p className="text-sm text-neutral">Hosted by {host?.displayName}</p>
                    </div>
                </div>

                <div className="bg-base-200 -mx-6 my-3 px-4 py-2 border-y border-neutral/20">
                    <EventAttendees attendees={event.attendees} />
                </div>

                <div className="card-actions flex">
                    <div className="flex flex-1">
                        {event.description}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => deleteEvent(event.id)} className="btn btn-error">Delete</button>
                        <button onClick={() => selectEvent(event)} className="btn btn-primary">View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}