import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "types";
import database from "database";

const adminSchema = new Schema({
  profileImage: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    trim: true,
    required: true,
  },
});

adminSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject["pwd"];
  return userObject;
};

adminSchema.statics.hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, 8);
};

adminSchema.pre<Admin>("save", async function (next) {
  if (this?.isModified("pwd")) {
    this.pwd = await bcrypt.hash(this?.pwd, 8);
  }
  next();
});

adminSchema.methods.generateToken = function () {
  return jwt.sign(
    JSON.stringify({
      _id: this._id?.toString(),
    }),
    process.env.JWT_SECRET || ""
  );
};

const Admin = database.model("admin", adminSchema);

export { Admin };
