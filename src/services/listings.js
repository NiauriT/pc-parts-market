import { db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const colRef = collection(db, "listings");

export async function createListing(data) {
  const ref = await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function fetchListings() {
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteListing(id) {
  await deleteDoc(doc(db, "listings", id));
}
