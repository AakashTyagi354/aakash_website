import mongoose, { Document, Schema } from "mongoose";

interface IContact extends Document {
  Name: string;
  Email: string;
  Message: string;
}

const contactSchema: Schema<IContact> = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true, // assuming email should be unique
      lowercase: true, // save emails in lowercase to ensure uniqueness
      trim: true, // remove leading/trailing whitespace
    },
    Message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to prevent redefining it
export default mongoose.models.ContactUS ||
  mongoose.model<IContact>("ContactUS", contactSchema);
