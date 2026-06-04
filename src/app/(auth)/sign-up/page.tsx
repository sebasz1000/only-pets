"use client"
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { FormState, FormInputError } from "@/types";
import { validateSignupInputs } from "@/lib/formValidations";


const initErrorsState: FormInputError = {
  username: null,
  email: null,
  password: null,
  passwordConfirmation: null,
  termsConditions: null
}

const initFormState: FormState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  termsConditions: false
}


export default function SignUpPage() {

  const {
    formState,
    handleInputChange,
    handleSubmit,
    isLoading,
    error
  } = useForm(initFormState, initErrorsState, validateSignupInputs)


  const signUp = async (): Promise<void> => {
    console.log("Registering....")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log("Registered!!")
    console.log(`Registered user: ${formState.email} | password: ${formState.password}`)
  }

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(signUp)
  }

  const {
    username,
    email,
    password,
    passwordConfirmation,
    termsConditions
  } = formState

  const opacityClass = isLoading ? "opacity-50" : ""

  return <div className="flex justify-center items-center mt-30 flex-col">
    <div className={`relative max-w-md w-[350px] mx-6 ${opacityClass} `}>
      {
        isLoading
          ? <Loader size="40" className="absolute top-[20%] left-[45%]" />
          : null
      }
      <section className="flex flex-col w-full ">
        <h1 className="mb-3 text-2xl text-center">Signup into OnlyPets</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Input placeholder="LunitaM..."
            type="text"
            name="username"
            onChange={handleInputChange}
            value={username as string}
            error={error.username} />
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
          <Input placeholder="Confirm Password"
            type="password"
            name="passwordConfirmation"
            onChange={handleInputChange}
            value={passwordConfirmation as string}
            error={error.passwordconfirmation} />
          <Input
            type="checkbox"
            name="termsConditions"
            value="termsConditions"
            onChange={handleInputChange}
            checked={termsConditions as boolean}
            error={error.termsConditions} />
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