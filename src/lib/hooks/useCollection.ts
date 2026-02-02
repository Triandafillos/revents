import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { setCollection, setError, setLoading } from "../firebase/firestoreSlice";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useCallback, useSyncExternalStore } from "react";
import { convertTimestamps } from "../util/util";

type Options = {
    path: string;
    listen?: boolean;
}

export const useCollection = <T extends DocumentData>({ path, listen = true }: Options) => {
    const dispatch = useAppDispatch();
    const collectionData = useAppSelector(state => state.firestore.collections[path]) as T[];
    const loading = useAppSelector(state => state.firestore.loading);

    const subscribeToCollection = useCallback(() => {
        if (!listen) return () => { };

        dispatch(setLoading(true));

        const colRef = collection(db, path);

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const data: T[] = [];
            snapshot.forEach((doc) => {
                const converted = convertTimestamps(doc.data() as T);
                data.push({ id: doc.id, ...converted as T });
            });
            dispatch(setCollection({ path, data }));
            dispatch(setLoading(false));
        }, (error) => {
            console.log(error);
            dispatch(setLoading(false));
            dispatch(setError(error.message));
            toast.error(error.message);
        });

        return () => {
            unsubscribe();
        }
    }, [dispatch, path, listen]);

    useSyncExternalStore(subscribeToCollection, () => collectionData);

    return { data: collectionData, loading };
}