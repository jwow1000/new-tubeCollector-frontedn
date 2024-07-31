import { useState } from 'react';
import { Playlist } from '../lib/types';
import { createPlaylist } from '../services/playlists';
import useStore from "../lib/useStore.ts";

const pListCred: Playlist = {
  title: "",
  tubes: [],
  userId: 0,
}

function AddPlaylist( { setAddPlaylistState } ) {
  // get global user data
  const { user, setUser } = useStore();

  // state for the tube data
  const [ data, setData ] = useState<Playlist>( pListCred );
  
  // handle input changes
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
  
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("input change add-tube", data);
  }

  // handle create action, form submit
  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setData((prev) => ({
      ...prev,
      userId: user.userId,
    }));

    try {
      // post the new tube to the current playlist
      const userData = await createPlaylist( data );
      // close the add-tube window
      setAddPlaylistState( false );
      return userData;

    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form  
        onSubmit={handleCreate} 
      >
        <label>
          Playlist Name: 
          <input 
            type="text" 
            name="title"
            value={data.title} 
            onChange={ handleInputChange }
          />
        </label>
        
       
        <button onClick={ handleCreate }> add the tube! </button>
        <button onClick={() => setAddPlaylistState(false)}> cancel </button>

        
      </form>
    </div>
  )
}

export default AddPlaylist