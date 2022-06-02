import CryptoJs from "crypto-js";
import { Request, Response } from "express";

const allowRegiter = async (req: Request, res: Response, next) => {
  try {
    const token = req.header("X-Shen");
    if (!token) throw new Error();

    const decoded = CryptoJs.AES.decrypt(token!, process.env.SECRET!).toString(
      CryptoJs.enc.Utf8
    );

    const obj = JSON.parse(decoded);
    if (obj.code != process.env.CODE!) throw new Error();
    next();
  } catch (e) {
    res.status(401).json({ message: "you simply out class..." });
  }
};

export default allowRegiter;
