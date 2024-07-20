import { signOut } from "../services/users";
import { useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    
    // Redirect or perform other actions after logout
  };
  
  
  return (
    <div>
      <h1></h1>
      <button 
        type="button"
        onClick={handleLogout}
      >
        Log Out!
      </button>
      
    </div>
  )
}

export default Root