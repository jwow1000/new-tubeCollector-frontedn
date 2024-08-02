import { useState } from "react"
import useStore from "../lib/useStore";
import { useNavigate, NavLink } from "react-router-dom";
import { UserCred, User } from "../lib/types";
import { Login as loginUser } from "../services/users"
import styles from "../ui/globStyles.module.css";

function Login() {
  const navigate = useNavigate();

  const loginCred: UserCred = {
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  } 

  const initUser: User = {
    username: "",
    id: 0,
  }

  const { setGlobalUser } = useStore();

  const [ data, setData ] = useState( loginCred );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    try {
      // 
      const userData = await loginUser( data );
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
      <NavLink to="/register" className={ styles.signUpLink }>
          
        Don't have an account: Sign Up!
      </NavLink>
      <button>  </button>
      <form 
        onSubmit={handleLogin}
      >
        <label>
          USERNAME: 
          <input 
            type="string" 
            name="username"
            value={data.username} 
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password: 
          <input 
            type="password" 
            name="password" 
            value={data.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">
          Log IN!
        </button>
      </form>
    </div>
  )
}

export default Login