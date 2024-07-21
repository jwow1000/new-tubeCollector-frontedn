// this is for crudding the post
import api from "./api-config";

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