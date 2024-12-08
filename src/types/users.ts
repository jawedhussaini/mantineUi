export interface User {
  id: number;
  username: string;
  email: string;
  [key: string]: any; // For any additional properties returned by Strapi
}