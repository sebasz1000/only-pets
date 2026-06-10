"use client"
import LoginForm from "@/components/auth/LoginForm"

export default function SignInPage() {

  return <div className="flex justify-center items-center mt-30 flex-col">
    <LoginForm title="Log into OnlyPets" />
  </div>
}