import { PhotoDetailModal } from "@/components/posts/PhotoDetailModal";
import Container from "@/components/ui/Container";
import Link from "next/link";

interface APIResponse{
  author: string;
  download_url: string;
  id: string;
}

interface FeedPageType{
  searchParams: Promise<{ photoId: string}>
}
export default async function FeedPage({ searchParams} : FeedPageType ) {

  const data = await fetch("https://picsum.photos/v2/list")
  const imgs: APIResponse[] = await data.json()
  const { photoId } = await searchParams
  
  return (
    <>
      {
        photoId 
          ? <PhotoDetailModal photoId={photoId} />
          : null
      }
    <Container>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 rounded-xl overflow-hidden" >
        { imgs.map( img => {
          return (
          <Link href={`/?photoId=${img.id}`} key={img.id} scroll={false}>
            <div className="aspect-3/4 w-full"  >
              <img 
                  className="w-full h-full object-cover"
                  src={img.download_url} 
                  width="300" 
                  height="200" 
                  style={{ border: "1px solid black"}}/>
            </div>
          </Link>)
        })
        }
        </div>
      </Container>
    </>)
}