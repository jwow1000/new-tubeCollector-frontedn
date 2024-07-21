import { useState, useEffect } from "react";
import { signOut } from "../services/users";
import { useNavigate, Link } from "react-router-dom";
import { getPlaylists } from "../services/playlists.ts"
import { verifyUser } from "../services/users";
import { User } from "../lib/types.ts";
import styles from "../ui/globStyles.module.css"
import useStore from "../lib/useStore.ts";

// Define the types
interface Playlist {
  id: string;
  title: string;
}

type FetchPlists = () => Promise<Playlist[]>;

function Root() {
  // global user 
  const { user, setUser } = useStore();
  const [plists, setPlists] = useState<Playlist[]>([]);
  
  useEffect(() => {
    // fetch the user function
    const fetchUser = async () => {
      try{
        const userData = await verifyUser();
        console.log("user datatat", userData)
        setUser( userData.user );
        console.log( "verified", user)

      } catch(error) {
        navigate("/login");
      }
    };

    // get the playlists function
    const fetchPlists = async () => {
      const data = await getPlaylists();
      setPlists( data);
    }

    // fetch the user if there is none
    if(!user) {
      fetchUser();
    }

    // fetch the playlists
    fetchPlists();
  }, []);     

  const navigate = useNavigate();
  // get data from loader function

  const handleLogout = async () => {
    await signOut();
    
    navigate("/login");
    
    // Redirect or perform other actions after logout
  };
  
  
  return (
    <div>
      <h1> hello {user?.username}</h1>
      <button 
        type="button"
        onClick={handleLogout}
      >
        Log Out!
      </button>
      <div id={styles.grid}>
        {
          plists?.map((item, idx) => (
            <Link
              key={`my-playlists-${idx}`}
              to={`playlists/${item.id}`}
            >
              {item.title}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Root