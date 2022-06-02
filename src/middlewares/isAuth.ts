import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import { Admin } from "schemas/admin";

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) throw Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      _id: Schema.Types.ObjectId;
    };

    const user = await Admin.findOne({ _id: decoded["_id"] });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ code: 401, message: "You're not authenticated." });
  }
};

export default isAuth;
