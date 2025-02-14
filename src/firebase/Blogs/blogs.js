// import React from "react"
// import { auth } from "../firebase"
import { query, where ,getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

export const getAllTypeOfBlogs = async () => {
    const q = query(collection(db,'typeOfBlogs'))
    const queryRes = await getDocs(q)
    const data = []
    queryRes.forEach((doc) => data.push({id: doc.id, ...doc.data()}))
    return data
}

export const getAllBlogs = async () => {
        const q = query(collection(db, "blogs"));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        return data
}