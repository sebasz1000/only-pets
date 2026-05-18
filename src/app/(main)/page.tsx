import { PostFeed } from "@/components/posts/PostFeed";
import Container from "@/components/ui/Container";
import dynamic from "next/dynamic";

interface APIResponse {
  author: string;
  download_url: string;
  id: string;
}

interface FeedPageType {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export default async function FeedPage({ searchParams }: FeedPageType) {

  const data = await fetch("https://picsum.photos/v2/list")
  const imgs: APIResponse[] = await data.json()
  const resolvedParams = await searchParams
  const rawPhotoId = resolvedParams["photoId"]
  const photoId = Array.isArray(rawPhotoId) ? rawPhotoId[0] : rawPhotoId

  const DynamicPhotoDetailModal = dynamic(() => import("../../components/posts/PhotoDetailModal"))

  return (
    <>
      {
        photoId ? <DynamicPhotoDetailModal photoId={photoId} /> : null
      }
      <Container>
        <PostFeed posts={imgs} />
      </Container>
    </>)
}