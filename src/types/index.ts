export interface User {
  id: number
  name: string
  username: string
  email: string
  
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