// this is for crudding the post
import api from "./api-config";
import { Playlist } from "../lib/types";

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

// add a tube to a playlist

// remove a tube from a playlist

// edit a tube