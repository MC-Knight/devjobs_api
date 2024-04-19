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

interface Requirement {
  jobId: number;
  content: string;
  items: string[];
}

interface Role {
  jobId: number;
  content: string;
  items: string[];
}

export { User, Job, Requirement, Role };
