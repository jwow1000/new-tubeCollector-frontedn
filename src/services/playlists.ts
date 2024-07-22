// this is for crudding the post
import api from "./api-config";
import { Playlist, Tube } from "../lib/types";

// get all user's playlists
export async function getPlaylists() {
  const response = await api.get(`/playlists`);
  return response.data;
}

// get playlist by id
export async function getPlaylist( id: number ) {
  const response = await api.get(`/playlists/${ id }`);
  console.log("is get playlist with id working?", response.data)
  return response.data;
}

// create new playlist
export async function createPlaylist( cred: Playlist) {
  const response = await api.post('playlists/create', cred);
  return response.data;
}

// create a tube and add it to a playlist
export async function addTube( cred: Tube, listID: number ) {
  // create the new tube
  const tubeRes = await api.post('tubes/new_tube/', cred);
  // console.log("tubeRes", tubeRes);
  // add the new tube (ref the Id) to target Plist
  const pListRes = await api.post(`playlists/${ listID }/add_tube/${ tubeRes.data.id }/`);
  return pListRes;
}

// remove a tube from a playlist

// edit a tube