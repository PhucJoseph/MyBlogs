// import React from "react"
// import { auth } from "../firebase"
import { query, doc ,getDocs, collection, addDoc, deleteDoc, updateDoc, getDoc, where } from "firebase/firestore";
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

  export const getBlogById = async (id) => {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datas = { id: docSnap.id, ...docSnap.data() };
      return datas;
    } else {
      console.log("No such document!");
    }
  };

  
export const getBlogByTab = async (tab) => {
  const q = query(collection(db, "blogs"), where("type", "==", tab));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  return data
}


export const addBlog = async (params) => {
      try {
        await addDoc(collection(db, "blogs"), params);
        return {success: true, message: "Đăng bài thành công ヾ(≧▽≦*)o "};
      } catch (e) {
        return {success: false, message: "Đăng bài thất bại `(*>﹏<*)′ "};
      }
    };

export const deleteDocument = async (documentId) => {
  try {
    // Get a reference to the document
    const docRef = doc(db, "blogs", documentId); // Replace 'users' with your collection name

    // Delete the document
    await deleteDoc(docRef);

    return {success: true, message: "Xóa bài thành công ヾ(≧▽≦*)o "};

  } catch (error) {
    return {success: false, message: "Xóa bài thất bại `(*>﹏<*)′ "};

  }
};

export const updateBlogs = async (documentId, newData) => {
  try {
    // Get reference to the document
    const docRef = doc(db, "blogs", documentId);

    // Update document fields
    await updateDoc(docRef, newData);

    return {success: true, message: "Cập nhật bài thành công ヾ(≧▽≦*)o "};

  } catch (error) {
    return {success: false, message: "Cập nhật bài thất bại `(*>﹏<*)′ "};
  }
};