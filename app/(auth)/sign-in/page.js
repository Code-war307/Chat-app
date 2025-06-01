"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GiWorld } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoggingIn(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        router.replace("/dashboard");
        toast.success("Login successful!");
      } else {
        //console.error("Login failed", result?.error);
        console.log(result);
        toast.error(result?.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
      <div
        className="h-10 absolute top-0 left-0 m-4 flex items-center gap-x-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => router.push("/")}
      >
        <img src="/messenger.png" alt="" className="h-[100%] object-cover" />
        <span className="text-lg font-bold">Get Chat</span>
      </div>
      <div className="flex w-full max-w-5xl rounded-xl shadow-xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 text-center">
          <div className="h-[100%] flex flex-col items-center justify-center gap-y-4">
            <img src="/messenger.png" alt="Logo" className="h-20" />
            <h1 className="text-5xl font-bold">Get Chat</h1>
            <p className="flex gap-x-1 text-xl">
              Bringing the{" "}
              <span className="flex gap-x-1 text-blue-500">
                World
                <GiWorld />
              </span>{" "}
              Closer
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 bg-white text-black px-8 py-10">
          <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-700 text-white font-semibold py-2 rounded-md"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Logging in
                  </>
                ) : (
                  "Log in"
                )}
              </Button>

              <button
                type="button"
                className="w-full mt-2 bg-white border border-gray-300 text-black font-semibold py-2 rounded-md hover:bg-gray-100"
              >
                <span className="flex items-center justify-center gap-3">
                  <FcGoogle className="h-4" /> Continue with Google
                </span>
              </button>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <span
                  onClick={() => router.push("/sign-up")}
                  className="text-blue-500 font-bold hover:underline cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
