"use client"
import Button from "@/components/ui/Button";
import { redirect } from 'next/navigation';
import Input from "@/components/ui/Input";
import { emailIsValid } from "@/lib/utils";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { Loader } from "lucide-react";

interface FormState {
  email: string
  password: string
}

interface InputError {
  email: null | string
  password: null | string
}

const initError = { email: null, password: null }

export default function SignInPage() {


  const [error, setError] = useState<InputError>(initError)
  const [isLoading, setIsloading] = useState(false)
  const [formState, setFormState] = useState<FormState>({ email: "", password: "" })

  const isValidEmail = (): boolean => {

    if (formState.email.length === 0) {
      setError(prevState => ({ ...prevState, email: "Email field shouldn't be empty" }))
      return false
    } else if (!emailIsValid(email)) {
      setError(prevState => ({ ...prevState, email: "Email is not valid" }))
      return false
    }
    return true

  }

  const isValidPassword = (): boolean => {
    if (formState.password.length === 0) {
      setError(prevState => ({ ...prevState, password: "Password field shouldn't be empty" }))
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(initError)
    const validEmail = isValidEmail()
    const validPassword = isValidPassword()

    if (!validEmail || !validPassword) return

    setIsloading(true)
    console.log("Signin....")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("Signed!!")
    console.log(`Logged user: ${formState.email} | password: ${formState.password}`)
    setIsloading(false)
    redirect("/")
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const { email, password } = formState
  const opacityClass = isLoading ? "opacity-50" : ""

  return <div className="flex justify-center items-center mt-30 flex-col">
    <div className={`relative max-w-md w-[350px] mx-6 ${opacityClass} `}>
      {
        isLoading
          ? <Loader size="40" className="absolute top-[20%] left-[45%]" />
          : null
      }
      <section className="flex flex-col w-full ">
        <h1 className="mb-3 text-2xl text-center">Log into OnlyPets</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input placeholder="Mobile number, username or email"
            type="text"
            name="email"
            onChange={handleInputChange}
            value={email}
            error={error.email} />
          <Input placeholder="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={password}
            error={error.password} />

          <Button label="Log in" type="submit" disabled={isLoading} />
        </form>
        <Button type="button" label="Forgot password?" disabled={false} />


      </section>
      <section className="flex flex-col w-full">
        <p className="text-sm text-center mt-10">Or login with</p>
        <Button type="button" label="Log in with Facebook" disabled={false} />
        <Button type="button" label="Log in with Google" disabled={false} />
      </section>

      <section className="flex flex-col w-full mt-6">
        <p className="text-sm text-center">Not account yet? <Link href="/sign-up" ><span className="underline text-blue-500 hover:text-blue-400">Sign-up</span></Link></p>
      </section>

    </div>
  </div>
}