import type { AppEvent } from "../../../lib/types";
import { Link } from "react-router";

export default function EventDetailedSidebar({event}: {event: AppEvent}) {

  return (
    <div className="card bg-base-100">
      <div className="card-title rounded-t-lg justify-center bg-linear-to-r from-primary to-black text-white py-2">
        {event?.attendees.length} people going
      </div>
      <div className="card-body">
        <div className="flex flex-col gap-3">

          {event?.attendees.map((attendee, index) => (
            <Link to={`/profiles/${attendee.id}`} key={attendee.id}>
              <div className="flex gap-3 align-middle justify-between items-center">

                <div className="flex gap-3 items-center">
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img src={attendee.photoURL} alt="user avatar" />
                    </div>
                  </div>
                  <span className="text-2xl">{attendee.displayName}</span>
                </div>
                {event.hostUid === attendee.id &&
                  <div className="badge badge-info">Host</div>}

              </div>
              {index < event.attendees.length - 1 && (<div className="divider my-0"></div>)}
            </Link>
          ))}

        </div>
      </div>
    </div>
  )
}