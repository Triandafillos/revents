import { users } from "../../../lib/data/sampleData";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { AppEvent } from "../../../lib/types";
import { closeForm, createEvent, updateEvent } from "../eventSlice";

export default function EventForm() {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(state => state.event.selectedEvent);

    const initialValue = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    };

    const onSubmit = (formData: FormData) => {
        const data = Object.fromEntries(formData.entries()) as unknown as AppEvent;

        if (selectedEvent) {
            dispatch(updateEvent({ ...selectedEvent, ...data }));
            dispatch(closeForm());
            return;
        }

        dispatch(createEvent({
            ...data,
            id: crypto.randomUUID(),
            hostUid: users[0].uid,
            attendees: [{
                id: users[0].uid,
                displayName: users[0].displayName,
                photoURL: users[0].photoURL,
                isHost: true
            }],
        }));

        dispatch(closeForm());
    }

    return (
        <div className="card bg-base-100 p-4 flex flex-col w-full gap-3">
            <h3 className="text-2xl font-semibold text-center text-primary">
                {selectedEvent ? 'Edit Event' : 'Create Event'}
            </h3>
            <form action={onSubmit} className="flex flex-col gap-3 width-full">
                <input defaultValue={initialValue.title}
                    name="title" type="text" className="input input-lg w-full" placeholder="Event Title" />
                <input defaultValue={initialValue.category}
                    name="category" type="text" className="input input-lg w-full" placeholder="Category" />
                <textarea defaultValue={initialValue.description}
                    name="description" className="textarea textarea-lg w-full" placeholder="Description" />
                <input defaultValue={initialValue.date ? new Date(initialValue.date).toISOString().slice(0, 16) : ''}
                    name="date" type="datetime-local" className="input input-lg w-full" placeholder="Dates" />
                <input defaultValue={initialValue.city}
                    name="city" type="text" className="input input-lg w-full" placeholder="City" />
                <input defaultValue={initialValue.venue}
                    name="venue" type="text" className="input input-lg w-full" placeholder="Venue" />
                <div className="flex justify-end w-full gap-3">
                    <button type="button" className="btn btn-neutral" onClick={() => dispatch(closeForm())}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}