import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function Contact() {
  return (
    <div className="w-[70%] mx-auto pt-[200px]">
      <p className="text-4xl text-gray-600 tracking-widest font-mono">
        Conatct.
      </p>
      <p className="text-sm text-gray-500 tracking-wider my-6">
        Get in touch or shoot me an email directly on aakashtyagi354@gmail.com
      </p>
      <div className="w-[50%] flex flex-col gap-8">
        <Input placeholder="Name" type="text" className="bg-transparent outline-none h-[50px]  " />
        <Input placeholder="Email" type="email" className="bg-transparent outline-none  h-[50px]  "  />
        <Textarea placeholder="Message" className="h-[150px] bg-transparent outline-none " />
        <Button className="text-white bg-[#434445]">Send</Button>
      </div>
    </div>
  );
}
