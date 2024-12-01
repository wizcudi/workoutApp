import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/premade/Form';
import { auth, db } from '../firebase';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSignUp = async ({ email, password }) => {
    try {

      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      
      // Create a user document in Firestore
      await setDoc(doc(db, email, 'user'), {
        email: user.email,
        uid: user.uid,  // Store UID for reference
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        // Add any additional user fields you want to store
      });
          
      navigate('/dashboard');

    } catch (error) {

      setError(error.message);
      throw error; // Propagate error to Form component

    }
  };

  return (
    <Form 
      heading="Create an account"
      buttonText="Sign Up"
      onSubmit={handleSignUp}
    />
  )
}
