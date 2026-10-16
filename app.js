import { useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

function App() {
  const { user, login, logout } = useAuth();
  const [registerNo, setRegisterNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const saveStudent = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await addDoc(collection(db, "students"), {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        registerNo,
        department,
        year,
        createdAt: serverTimestamp()
      });

      setMessage("Student details saved successfully!");
      setRegisterNo("");
      setDepartment("");
      setYear("");
    } catch (error) {
      setMessage("Error saving details: " + error.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh"
      }}
    >
      <h1>Student Portal</h1>

      {!user ? (
        <>
          <p>Please sign in to continue.</p>
          <button onClick={login}>Sign in with Google</button>
        </>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            margin: "20px auto",
            maxWidth: "450px",
            borderRadius: "12px"
          }}
        >
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              width="80"
              style={{ borderRadius: "50%" }}
            />
          )}

          <h2>Welcome, {user.displayName}!</h2>
          <p>{user.email}</p>

          <h3>Student Registration</h3>

          <form onSubmit={saveStudent}>
            <input
              value={registerNo}
              onChange={(e) => setRegisterNo(e.target.value)}
              placeholder="Register Number"
              required
            />

            <br /><br />

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
              required
            />

            <br /><br />

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>

            <br /><br />

            <button type="submit">Save Student Details</button>
          </form>

          <p>{message}</p>

          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;