interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Job {
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
}

export { User, Job };
