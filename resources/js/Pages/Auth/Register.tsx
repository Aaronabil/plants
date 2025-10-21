import { Flower } from "lucide-react"
// import { RegisterForm } from "@/Components/register-form"
import InputError from '@/Components/InputError';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Flower className="size-4" />
                        </div>
                        Plants
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={submit}>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Register</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Register to your account
                                </p>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        autoComplete="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        type="email"
                                        placeholder="m@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        placeholder="Enter your password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        type="password"
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-1" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        type="password"
                                        placeholder="Please confirm password"
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-1" />
                                </div>
                                <Button type="submit" className="w-full" disabled={processing}>
                                    Submit
                                </Button>
                                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <img
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        alt="Google"
                                        className="h-5 w-5"
                                    />
                                    Login with Google
                                </Button> */}
                            </div>
                            <div className="text-center text-sm">
                                Already have account?{" "}
                                <a href={route('login')} className="underline underline-offset-4">
                                    Log in
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/loginphoto.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
