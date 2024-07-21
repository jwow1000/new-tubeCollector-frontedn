import React from 'react'

// with form submission:
// create a tube, than use add tube and current playlist id
// passed as a prop is fine
// this will be just a pop up in playlist
// post mvp is a way to check if the url is a viable youtube link before submitting

function AddTube() {
  return (
    <div>
      <form>

        <input type="text" name="" id="" />
        <input type="url" name="tube-url" />
        <input type="number" name="tube-xpos" id="" />
        <input type="number" name="tube-ypos" id="" />

      </form>
    </div>
  )
}

export default AddTube