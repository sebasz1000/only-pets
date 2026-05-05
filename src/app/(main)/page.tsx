import Container from "@/components/ui/Container";

interface APIResponse{
  author: string;
  download_url: string;
  id: string;
}
export default async function FeedPage() {

  const data = await fetch("https://picsum.photos/v2/list")
  const imgs: APIResponse[] = await data.json()

  return <Container>
      <div className="border-1 border-pink grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden" >
      { imgs.map( img => {
        return (
        <div className="aspect-3/4 w-full" key={img.id} >
        <img 
             className="w-full h-full object-cover"
             src={img.download_url} 
             width="300" 
             height="200" 
             style={{ border: "1px solid black"}}/>
        </div>)
      })
      }
      </div>
    </Container>
}