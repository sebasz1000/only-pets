"use client"
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { Loader } from "lucide-react";
import { FormState, FormInputError } from "@/types";
import { validateSinginInputs } from "@/lib/formValidations";
import { useForm } from "@/hooks/useForm";


const initErrors: FormInputError = {
  email: null,
  password: null
}
const initFormState: FormState = {
  email: "",
  password: ""
}

export default function SignInPage() {

  const {
    formState,
    error,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useForm(initFormState, initErrors, validateSinginInputs)

  const { email, password } = formState
  const opacityClass = isLoading ? "opacity-50" : ""

  const signIn = async (): Promise<void> => {
    console.log("Signin....")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("Signed!!")
    console.log(`Logged user: ${formState.email} | password: ${formState.password}`)
  }

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(signIn)
  }

  return <div className="flex justify-center items-center mt-30 flex-col">
    <div className={`relative max-w-md w-[350px] mx-6 ${opacityClass} `}>
      {
        isLoading
          ? <Loader size="40" className="absolute top-[20%] left-[45%]" />
          : null
      }
      <section className="flex flex-col w-full ">
        <h1 className="mb-3 text-2xl text-center">Log into OnlyPets</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Input placeholder="Mobile number, username or email"
            type="text"
            name="email"
            onChange={handleInputChange}
            value={email as string}
            error={error.email} />
          <Input placeholder="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={password as string}
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