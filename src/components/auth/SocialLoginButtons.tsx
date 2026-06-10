import Button from "../ui/Button";

export default function SocialLoginButtons() {
    return (
        <section className="flex flex-col w-full">
            <p className="text-sm text-center mt-10">
                Or login with
            </p>
            <Button type="button"
                label="Log in with Facebook"
                disabled={false} />
            <Button type="button"
                label="Log in with Google"
                disabled={false} />
        </section>
    )
}