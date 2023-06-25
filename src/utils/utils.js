import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};

export const followHelper = (profile, clickedProfile_id, following_id) => {
  return profile.id === clickedProfile_id
    ? // If the profile is the newly followed profile,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // If the profile is the logged in user's
      // update its following count
      { ...profile, following_count: profile.following_count + 1 }
    : // otherwise just return the profile unchanged
      profile;
};

export const unfollowHelper = (profile, following_id) => {
  return profile.following_id === following_id
    ? // If the profile is the newly followed profile,
      // update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // If the profile is the logged in user's
      // update its following count
      { ...profile, following_count: profile.following_count - 1 }
    : // otherwise just return the profile unchanged
      profile;
};