import { ChangeEvent, useState } from "react"
import { UserCred } from "../lib/types";
import { Login as loginUser } from "../services/users"

function Root() {

  const loginCred: UserCred = {
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  } 
  // define global user type
  type User = {
    username: string;
  };

  const initUser: User = {
    username: "",
  }

  const [ data, setData ] = useState( loginCred );
  const [ globUser, setGlobUser] = useState( initUser );

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
      setGlobUser( userData );

    } catch(error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      <form 
        onSubmit={handleLogin}
      >
        <label>
          EMAIL: 
          <input 
            type="string" 
            name="username"
            value={data.email} 
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
        <button>
          Log IN!
        </button>
      </form>
    </div>
  )
}

export default Root