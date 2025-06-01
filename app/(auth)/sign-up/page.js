"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signupSchema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDebounce } from "@/hooks/debounce.js";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GiWorld } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Image from "next/image";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 500);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (debouncedUsername) {
      setIsCheckingUsername(true);
      setUsernameMessage("Checking username availability...");

      const checkUsername = async () => {
        try {
          const response = await axios.get(
            `/api/check-unique-name?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const message =
            error?.response?.data?.message?.[0] || "Error checking username.";
          setUsernameMessage(message);
        } finally {
          setIsCheckingUsername(false);
        }
      };

      checkUsername();
    }
  }, [debouncedUsername]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post("/api/signup", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        router.replace("/sign-in");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
      <div
        className="h-10 absolute top-0 left-0 m-4 flex items-center gap-x-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
        onClick={() => router.push("/")}
      >
        <Image src="/messenger.png" width={40} height={50} alt="Logo" className=" object-cover" />
        <span className="text-lg font-bold">Get Chat</span>
      </div>
      <div className="flex w-full max-w-5xl rounded-xl shadow-xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 text-left md:block relative">
          <div className="h-[100%] flex flex-col items-center justify-center gap-y-4">
            <Image src="/messenger.png" width={150} height={150} alt="Logo"/>
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

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 bg-white text-black px-8 py-10">
          <h2 className="text-2xl font-semibold mb-6">Create account</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    <div className="flex items-center gap-2 mt-1">
                      {isCheckingUsername && (
                        <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                      )}
                      <p
                        className={`text-sm ${
                          usernameMessage === "Username is unique"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
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
                        className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
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
                        placeholder="Create a password"
                        className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500">
                      Must be at least 6 characters
                    </p>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-700 to-black hover:from-black hover:to-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Create account"
                )}
              </Button>

              <div className="w-full text-center">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-black font-semibold py-2 rounded-md hover:bg-gray-50 transition-all duration-300 ease-in-out"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FcGoogle className="h-4" />
                    Sign up with Google
                  </span>
                </button>
              </div>

              <p
                className="text-sm text-center mt-2"
                onClick={() => router.push("/sign-in")}
              >
                Already have an account?{" "}
                <span className="text-blue-500 hover:underline cursor-pointer font-bold">
                  Log in
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
