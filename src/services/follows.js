// this is for crudding the follows
import api from "./apiConfig.js";

// get followers
export const followsList = async (profile_id) => {
    try {
      const response = await api.get(`follows/${profile_id}/users/`);
      return response.data;
    } catch (error) {
      throw error;
    }
}

// add Follower
export const addFollower = async (id) => {
    try {
      const response = await api.post("follows/", { isFollowing: id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
// remove Follower
export const removeFollower = async (id) => {
  try {
    const response = await api.delete(`follows/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// check follows

export const checkFollows = async (id) => {
  try {
    const response = await api.delete(`check-follow/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
