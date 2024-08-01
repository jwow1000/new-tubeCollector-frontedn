import { useState, useEffect } from "react";
import { signOut } from "../services/users";
import { useNavigate, Link, Outlet, NavLink} from "react-router-dom";
import { getPlaylists } from "../services/playlists.ts"
import { verifyUser } from "../services/users";
import AddPlaylist from "../components/add-playlist.tsx";
import { User } from "../lib/types.ts";
import styles from "../ui/globStyles.module.css";
import rootStyles from "../ui/root.module.css";
import useStore from "../lib/useStore.ts";

// Define the types
interface Playlist {
  id: string;
  title: string;
}

function Root() {
  // global user 
  const { user, setUser } = useStore();
  // useStates
  const [addPlaylistState, setAddPlaylistState] = useState(false);
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
    <body>
      <div id={styles.navBarContainer}>
        <h1 className={styles.userTitle}> user: {user?.username} </h1>
        
        <button 
          type="button"
          onClick={ () => setAddPlaylistState(!addPlaylistState) }
        >
          + Playlist
        </button>

        <button 
          type="button"
          onClick={handleLogout}
        >
          Log Out!
        </button>


      </div>
      <h2>{user?.username}'s playlists: </h2>
      <nav id={styles.pListContainer}>
        {
          plists?.map((item, idx) => (
            <NavLink
              key={`my-playlists-${idx}`}
              to={`playlists/${item.id}`}
              className={styles.pListLink}
            >
              {item.title}
            </NavLink>
          ))
        }
      </nav>
      {
        addPlaylistState &&
        <AddPlaylist setAddPlaylistState={setAddPlaylistState}/>
      }
      <Outlet />
    </body>
  )
}

export default Root