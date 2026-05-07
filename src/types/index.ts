export interface User {
  id: number
  name: string
  username: string
  email: string
  
}
//Temporal
export interface Product{
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
  price: number;
}
export interface APIResponse{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}


export interface Post {
  id: string
  caption?: string
  imageUrl: string
  userId: string 
  createdAt: Date
}

export interface Comment {
  id: string
  content: string
  userId: string
  postId: string
  createdAt: Date
}