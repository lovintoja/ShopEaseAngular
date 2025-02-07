import { Profile } from "./profile.model";

export interface ProfileWithData {
    username: string;
    email: string;
    profile: Profile;
  }
  