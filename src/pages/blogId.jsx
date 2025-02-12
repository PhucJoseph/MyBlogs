import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { getDoc, doc} from "firebase/firestore";

export default function BlogId() {
    const param = useParams()
    const [data,setData] = React.useState([])

    React.useEffect(() => {
        const fetchUsers = async () => {
            const docRef = doc(db, "blogs", param.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const datas = { id: docSnap.id, ...docSnap.data() };
                console.log(datas);
                setData(datas);
            } else {
                console.log("No such document!");
            }
        };

        fetchUsers();
    }, [param.id]);

  return (
    <div>
      <div>{data.name}</div>
      <div>{data.age}</div>
      <div>{data.email}</div>
    </div>
  );
}
