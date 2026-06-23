// import { useState } from "react";
// import { auth } from "../../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const signIn = async () => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <>
      <h1>HOME</h1>
      {/* <div>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign in</button>
      </div> */}
    </>
  );
}
