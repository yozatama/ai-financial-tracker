"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Globe, Apple } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-[2.5rem] border-white/5 bg-card/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 p-8 pb-4">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-background">
                <Sparkles className="w-7 h-7" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black tracking-tighter text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-muted-foreground font-medium">
              Log in to manage your finances with AI
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold p-3 rounded-xl text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold ml-1">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-full h-12 bg-background/50 border-white/10 px-6 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" senior-class="font-bold">Password</Label>
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-full h-12 bg-background/50 border-white/10 px-6 focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full rounded-full h-12 font-bold bg-primary text-background hover:bg-primary/90 mt-2">
                {loading ? "Logging in..." : "Login"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-muted-foreground font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="rounded-full h-12 font-bold border-white/10 hover:bg-white/5">
                <Globe className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button variant="outline" className="rounded-full h-12 font-bold border-white/10 hover:bg-white/5">
                <Apple className="mr-2 h-4 w-4" /> Apple
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-0 flex justify-center">
            <p className="text-sm text-muted-foreground font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">Register now</Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
