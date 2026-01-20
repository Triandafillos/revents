import {z} from 'zod';

const requiredString = (fieldName: string) => 
    z.string().min(1, `${fieldName} is required`);

const venueSchema = z.object({
    venue: requiredString("Venue"),
    latitude: z.number(),
    longitude: z.number(),
});

export const eventFormSchema = z.object({
    title: requiredString("Title"),
    category: requiredString("Category"),
    description: requiredString("Description")
        .min(5, "Description must be at least 5 characters long"),
    date: requiredString("Date")
        .refine((value) => {
            const selectedDate = new Date(value);
            return selectedDate > new Date();
        }, {
            message: "Date must be in the future"
        }),
    city: z.string().optional(),
    venue: venueSchema,
})

export type EventFormSchema = z.infer<typeof eventFormSchema>;