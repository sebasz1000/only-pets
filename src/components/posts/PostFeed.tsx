import Link from "next/link";

export async function PostFeed({ 
    posts 
} : {
    posts: { id: string; download_url: string }[]
}){
    return (
         <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 rounded-xl overflow-hidden" >
        { posts.map( ({ id, download_url}) => {
          return (
          <Link href={`/?photoId=${id}`} key={id} scroll={false}>
            <div className="aspect-3/4 w-full"  >
              <img 
                  className="w-full h-full object-cover"
                  src={download_url} 
                  width="300" 
                  height="200" 
                  style={{ border: "1px solid black"}}/>
            </div>
          </Link>)
        })
        }
        </div>
    )
}