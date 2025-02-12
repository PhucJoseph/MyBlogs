import logo from "../logo.svg";
import React from "react";
import "../App.css";
import { collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import TextEditor from "../components/TextEditor";

function HomePage() {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate(); 


  React.useEffect(() => {
    // const addUser = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "blogs"), {
    //       name: "Alice Smith",
    //       age: 25,
    //       email: "alice@example.com",
    //     });
    //     //console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // };
    // addUser();

    const fetchUsers = async () => {
      const q = query(collection(db, "blogs"), where("age", ">=", 25));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => data.push({id: doc.id, ...doc.data()}));
      setData(data);
    };

    fetchUsers();
  }, []);

  const handleNavigate = (id) => {

    let path = '/' + id; 
    navigate(path);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: "#282c34" }}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TextEditor />  
        <>
          {data.map(({ email, age, name, id }, index) => (
            <div
              onClick={() => handleNavigate(id)}
              style={{
                backgroundColor: "#282c34",
                boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                width: "300px",
                height: "100px",
                cursor: "pointer",
                color: "black",
                marginTop: "10px",
                textDecoration: "none",
              }}
              key={id}
            >
              <p>{name}</p>
            </div>
          ))}
        </>

      </header>
    </div>
  );
}

export default HomePage;
