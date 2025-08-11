import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [form, setForm] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form === 'signup') {
      if (!email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
    }

    if(form==='signup'){
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, {email, password, role: 'user'});
        if (res.data) {
          console.log(res.data);
        } else {
          setError('Sign up failed');
        }
      } catch (err) {
        setError('An error occurred');
      }
    } else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {email, password});
        if (res.data) {
          console.log(res.data);
        } else {
          setError('Login failed');
        }
      } catch (err) {
        setError('An error occurred');
      }
    }
      

    
  } 

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {form === 'signup' && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              )}

              {error && <div className="text-red-500">{error}</div>}
              <div className="flex flex-col gap-3">
                {form === 'login' && (
                  <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Login
                  </Button>
                )}
                {form === 'signup' && (
                  <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Sign up
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {form === 'login' && (
                <div>
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4" onClick={() => setForm('signup')}>
                    Sign up
                  </a>
                </div>
              )}
              {form === 'signup' && (
                <div>
                  Already have an account?{" "}
                  <a href="#" className="underline underline-offset-4" onClick={() => setForm('login')}>
                    Login
                  </a>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
