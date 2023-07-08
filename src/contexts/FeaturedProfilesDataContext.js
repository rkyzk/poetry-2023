import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

const FeaturedProfilesDataContext = createContext();
const SetFeaturedProfilesDataContext = createContext();

export const useFeaturedProfilesData = () => useContext(FeaturedProfilesDataContext);
export const useSetFeaturedProfilesData = () => useContext(SetFeaturedProfilesDataContext);

export const FeaturedProfilesDataProvider = ({ children }) => {
  const currentUser = useCurrentUser();
  const [featuredProfilesData, setFeaturedProfilesData] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?featured_flag=1"
        );
        setFeaturedProfilesData(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [currentUser]);

  return (
    <FeaturedProfilesDataContext.Provider value={featuredProfilesData}>
      <SetFeaturedProfilesDataContext.Provider
        value={setFeaturedProfilesData}
      >
        {children}
      </SetFeaturedProfilesDataContext.Provider>
    </FeaturedProfilesDataContext.Provider>
  );
};