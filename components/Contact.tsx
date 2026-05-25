"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactAction } from "@/actions/actions";
import { useToast } from "./ui/use-toast";
import { Loader2, Send, Mail, Github, Linkedin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Valid email required." }),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }),
});
export type contactData = z.infer<typeof contactSchema>;

const SOCIALS = [
  {
    label: "GitHub",
    handle: "AakashTyagi354",
    href: "https://github.com/AakashTyagi354",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "aakash-tyagi",
    href: "https://www.linkedin.com/in/aakash-tyagi-274228206/",
    icon: Linkedin,
  },
  {
    label: "Email",
    handle: "aakashtyagi354@gmail.com",
    href: "mailto:aakashtyagi354@gmail.com",
    icon: Mail,
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const {
    handleSubmit, register,
    formState: { errors },
    reset,
  } = useForm<contactData>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: contactData) {
    setLoading(true);
    try {
      const res = await ContactAction(values);
      const response = JSON.parse(res);
      setTimeout(() => {
        if (response.status === "success") {
          toast({ title: "Message sent!" });
          reset();
        } else {
          toast({ title: "Something went wrong.", variant: "destructive" });
        }
        setLoading(false);
      }, 1500);
    } catch {
      setLoading(false);
      toast({ title: "Something went wrong.", variant: "destructive" });
    }
  }

  return (
    <section id="contact" className="max-w-[1100px] mx-auto px-6 py-24">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono-custom text-xs tracking-[0.2em] uppercase
                      text-[#78355b] mb-3">
          03 — Contact
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Get in touch
        </h2>
        <p className="mt-3 text-muted-foreground max-w-[440px] leading-relaxed">
          Open to product company roles. Reach me directly or use the form.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10">

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <Input
                {...register("name")}
                placeholder="Your name"
                className="bg-card/50 border-border/80 h-12 rounded-xl
                           font-body placeholder:text-muted-foreground/50
                           focus-visible:ring-[#78355b]/30
                           focus-visible:border-[#78355b]/40"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 font-mono-custom">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Input
                {...register("email")}
                placeholder="your@email.com"
                type="email"
                className="bg-card/50 border-border/80 h-12 rounded-xl
                           font-body placeholder:text-muted-foreground/50
                           focus-visible:ring-[#78355b]/30
                           focus-visible:border-[#78355b]/40"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-mono-custom">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                {...register("message")}
                placeholder="What's on your mind?"
                className="h-[140px] bg-card/50 border-border/80 rounded-xl
                           font-body placeholder:text-muted-foreground/50
                           focus-visible:ring-[#78355b]/30
                           focus-visible:border-[#78355b]/40 resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1.5 font-mono-custom">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 rounded-xl bg-[#78355b] hover:bg-[#5e2947]
                         text-white font-medium flex items-center gap-2
                         transition-colors w-full md:w-auto md:px-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <Send size={15} />
                  Send message
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Socials sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border border-border/80
                           rounded-xl p-4 bg-card/50 backdrop-blur-sm
                           card-hover group"
              >
                <div className="w-9 h-9 rounded-lg border border-border/80
                                flex items-center justify-center flex-shrink-0
                                group-hover:border-[#78355b]/40 transition-colors">
                  <Icon size={16} className="text-muted-foreground
                                             group-hover:text-[#78355b]
                                             transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono-custom text-[10px] tracking-widest
                                 uppercase text-muted-foreground/60 mb-0.5">
                    {social.label}
                  </p>
                  <p className="text-sm text-foreground/80 truncate">
                    {social.handle}
                  </p>
                </div>
              </a>
            );
          })}

          {/* Availability badge */}
          <div className="border border-emerald-500/20 rounded-xl p-4
                          bg-emerald-500/5 mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono-custom text-[10px] tracking-widest
                               uppercase text-emerald-600 dark:text-emerald-400">
                Available
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Open to full-time SDE roles at product companies.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-20 pt-8 border-t border-border/40 flex items-center
                   justify-between flex-wrap gap-4"
      >
        <p className="font-mono-custom text-xs text-muted-foreground/50
                      tracking-widest">
          © 2026 Aakash Tyagi
        </p>
        <p className="font-mono-custom text-xs text-muted-foreground/50
                      tracking-widest">
          Built with Next.js · Deployed on aakashtyagi.in
        </p>
      </motion.div>

    </section>
  );
}