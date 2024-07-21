// this is for crudding the post
import api from "./api-config";

// get all user's playlists
export async function getPlaylists() {
  const response = await api.get(`/playlists`);
  return response.data;
}

// get playlist by id
export async function getPlaylist( id: string ) {
  const response = await api.get(`/playlists/${ id }`);
  return response.data;
}