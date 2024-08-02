import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/users";
import useStore from "../lib/useStore";

type RegisterCred = {
  username: string;
  password: string;
  email: string;
  isError: boolean;
  errorMsg: string; 
}

const initCred: RegisterCred = {
  username: "",
  password: "",
  email: "",
  isError: false,
  errorMsg: "", 
}



function Register() {
  const navigate = useNavigate();

  const { setGlobalUser } = useStore();
  const [ data, setData ] = useState( initCred );
  
  // handle the input states
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // login handle function
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      //
      const cred = {
        username: data.username,
        email: data.email,
        password: data.password
      }
      const userData = await signUp( cred );
      // set the userr using useStore( Zustand )
      setGlobalUser( userData ); 
      // navigate to root
      navigate("/");

    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form 
        onSubmit={ handleSignUp }
      >
        <label>
          USERNAME: 
          <input 
            type="string" 
            name="username"
            value={data.username} 
            onChange={ handleInputChange }
          />
        </label>
        <label>
          EMAIL: 
          <input 
            type="email" 
            name="email"
            value={data.email} 
            onChange={ handleInputChange }
          />
        </label>
        <label>
          Password: 
          <input 
            type="password" 
            name="password" 
            value={data.password}
            onChange={ handleInputChange }
          />
        </label>
        <button type="submit">
          Sign Up!
        </button>
      </form>

    </div>
  )
}

export default Register