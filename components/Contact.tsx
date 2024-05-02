"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import connectDB from "@/lib/conncetDB";
import ContactUS from "@/schema/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactAction } from "@/actions/actions";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "email is required.",
  }),
  message: z.string().min(5, {
    message: "message is required and should be atleast 5 char",
  }),
});
export type contactData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<contactData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setLoading(true);
    const res = await ContactAction(values);
    const response = JSON.parse(res);

    setTimeout(() => {
      if (response.status === "success") {
        toast({
          title: "Message Send",
        });
      } else {
        toast({
          title: "Message Not Send",
          variant: "destructive",
        });
      }
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 2000);
  }
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin" size={25} />
      </div>
    );
  } else {
    return (
      <div className="w-[70%] mx-auto pt-[200px]">
        <p className="text-2xl md:text-4xl text-gray-600 tracking-widest font-mono">
          Conatct.
        </p>
        <p className="text-[10px] md:text-sm text-gray-500 tracking-wider my-6">
          Get in touch or shoot me an email directly on aakashtyagi354@gmail.com
        </p>
        <div className="w-[90%] md:w-[50%] flex flex-col gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="flex flex-col gap-8"
          >
            <Input
              {...register("name", { required: true })}
              placeholder="Name"
              type="text"
              name="name"
              className="bg-transparent outline-none h-[50px]  "
            />
            {errors?.name && (
              <p className="text-red-600 text-sm my-2">
                {errors?.name?.message}
              </p>
            )}
            <Input
              {...register("email", { required: true })}
              placeholder="Email"
              name="email"
              type="email"
              className="bg-transparent outline-none  h-[50px]  "
            />
            {errors?.email && (
              <p className="text-red-600 text-sm my-2">
                {errors?.email?.message}
              </p>
            )}

            <Textarea
              {...register("message", { required: true })}
              placeholder="Message"
              name="message"
              className="h-[150px] bg-transparent outline-none "
            />
            {errors?.message && (
              <p className="text-red-600 text-sm my-2">
                {errors?.message?.message}
              </p>
            )}
            <Button className="text-white bg-[#434445]" type="submit">
              Send
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
