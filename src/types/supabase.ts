export type Profile = {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string | null;
  title: string;
  bio: string;
  created_at: string;
  updated_at: string;
};

export type RequestError = {
  id: number;
  region: string;
  type: string;
  casenumber: string;
  sourcefilename: string;
  errormessage: string;
  created_at: string;
  active: number;
}; 