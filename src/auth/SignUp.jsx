import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Button from '../components/Button.jsx'
import { useAuthContext } from '../context/AuthStateManager.jsx';


const SignUp = () => {
  const { setUsername } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      console.log('Starting sign up process');
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user.uid);

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: newUsername,
        createdAt: new Date(),
      });

      // Cache the username in AuthContext
      setUsername(newUsername);

      // User signed up successfully
      setSuccess(true);
      setError(null);
      setEmail('');
      setPassword('');
      setNewUsername('');
    } catch (error) {
      // Provide more detailed error messages
      let errorMessage = 'An error occurred during sign-up. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters long.';
      }
      setError(errorMessage);
      setSuccess(false);
    }
  };

  return (
    <form className="flex flex-col p-8 gap-5" onSubmit={handleSignUp}>
      <h2 className="text-2xl text-center capitalize">Sign Up for a free account</h2>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="Username"
        required
        className="h-10 px-3 border border-gray-300 rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="h-10 px-3 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="h-10 px-3 border border-gray-300 rounded"
      />
      <Button type="submit">Sign Up</Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Successfully signed up!</p>}
    </form>
  );
};

export default SignUp;