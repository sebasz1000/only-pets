import Container from "@/components/ui/Container"

export default async function ProfilePage({ 
  params } 
  : { params: Promise<{ username: string}>
}) {
  const { username } = await params
  return (
  <Container>
    <section className="flex flex-col justify-center border-1 border-white">
  
    <article className="max-w-xs m-auto">
      <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg" className="w-full h-full object-cover"/>
    </article>
    <h1 className="text-4xl text-center">{username}</h1>
      <div className="w-[80%] mx-auto grid grid-cols-[30%_1fr] gap-8 bg-slate-800">
        <div className="text-right">
          <p>Aleman Shepard</p>
          <p>6<span className="text-xs">years old</span></p>
          <p>30<span className="text-xs">kg</span></p>
        </div>
        <div className="text-sm">
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet felis at mi interdum, et iaculis lacus pellentesque. Ut aliquet, purus vitae cursus viverra, odio tortor porttitor magna, a porttitor nunc nulla ornare magna.</p>
        </div>
      </div>
    </section>
  </Container>)
}