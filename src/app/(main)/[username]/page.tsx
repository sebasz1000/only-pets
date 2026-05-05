import Container from "@/components/ui/Container"

export default async function ProfilePage({ 
  params } 
  : { params: Promise<{ username: string}>
}) {
  const { username } = await params
  return (
  <Container>
    <div>Profile Page - {username}</div>
  </Container>)
}