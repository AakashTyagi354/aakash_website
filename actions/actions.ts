"use server";

import { contactData } from "@/components/Contact";
import connectDB from "@/lib/conncetDB";
import ContactUS from "@/schema/contact";
import { NextResponse } from "next/server";

export const ContactAction = async (values: contactData) => {
  try {
    await connectDB();
    const newContactUS = await ContactUS.create({
      Name: values.name,
      Email: values.email,
      Message: values.message,
    });
    await newContactUS.save();
    console.log(newContactUS);
    const data = {
      status: "success",
      message: "Message Send Successfully",
    };
    return JSON.stringify(data);
  } catch (err) {
    console.log(err);
    const errData = {
      status: "faild",
      message: "Message Faild",
    };
    return JSON.stringify(errData);
  }
};
