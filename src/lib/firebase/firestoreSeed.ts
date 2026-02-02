import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { readFileSync } from 'fs';
import { getAuth } from "firebase-admin/auth";
import { events, users } from "../data/sampleData";

const serviceAccount = JSON.parse(readFileSync('./src/lib/firebase/admin-creds.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const auth = getAuth();

async function seedAuthUsers() {
    for (const user of users) {
        try {
            const createdUser = await auth.createUser({
                uid: user.uid,
                email: user.email,
                password: 'Pa$$w0rd',
                displayName: user.displayName,
                photoURL: user.photoURL
            });
            
            await db.collection('profiles').doc(createdUser.uid).set({
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                createdAt: Timestamp.now()
            });
            console.log(`Created user: ${createdUser.uid}`);

        } catch (error) {
            console.log(error);
        }
    }
}

async function seedEvents() {
    const batch = db.batch();
    events.forEach(event => {
        const eventRef = db.collection('events').doc(event.id);
        batch.set(eventRef, {
            ...event,
            date: Timestamp.fromDate(new Date(event.date))
        });
    });
    batch.commit();
}

(async () => {
    await seedAuthUsers();
    await seedEvents();
    console.log('Seeding completed');
})();
