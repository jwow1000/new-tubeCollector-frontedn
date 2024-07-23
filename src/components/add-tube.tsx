import { useState } from 'react';
import { Tube } from '../lib/types';
import { useParams } from 'react-router-dom';
import { addTube as postTube } from '../services/playlists';
// with form submission:
// create a tube, than use add tube and current playlist id
// passed as a prop is fine
// this will be just a pop up in playlist
// post mvp is a way to check if the url is a viable youtube link before submitting

const tubeCred: Tube = {
  title: "",
  description: "",
  url: "",
  posX: 0.5,
  posY: 0.5,
}


function AddTube( { setAddTubeState } ) {
  // get the params
  const params = useParams();
  //console.log("add tube params: ", params);
  
  // state for the tube data
  const [ data, setData ] = useState<Tube>( tubeCred );
  
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

    try {
      // post the new tube to the current playlist
      const userData = await postTube( data, params.id );
      // close the add-tube window
      setAddTubeState( false );
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
          Tube Name: 
          <input 
            type="text" 
            name="title"
            value={data.title} 
            onChange={handleInputChange}
          />
        </label>
        
        <label>
          Tube URL: 
          <input 
            type="url" 
            name="url"
            value={data.url} 
            onChange={handleInputChange}
          />
        </label>

        <label>
          Tube Description: 
          <input 
            type="text" 
            name="description"
            value={data.description} 
            onChange={handleInputChange}
          />
        </label>
         
        <label>
          Tube URL: 
          <input 
            type="number" 
            name="posX"
            value={data.posX} 
            onChange={handleInputChange}
          />
        </label>
        
        <label>
          Tube URL: 
          <input 
            type="number" 
            name="posY"
            value={data.posY} 
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleCreate}> add the tube! </button>
        <button onClick={() => setAddTubeState(false)}> cancel </button>

        
      </form>
    </div>
  )
}

export default AddTube