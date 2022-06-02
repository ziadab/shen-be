import { Router } from "express";
import CryptoJs from "crypto-js";

const router = Router();

// router.get("/", async (req, res) => {
//   const f = CryptoJs.AES.decrypt(req.body.thla, process.env.SECRET!).toString(
//     CryptoJs.enc.Utf8
//   );
//   return res.json(JSON.parse(f));
// });

router.get("/", async (req, res) => {
  return res.redirect("https://youtu.be/pwSUJM2EyqE");
});

router.post("/", async (req, res) => {
  const data = CryptoJs.AES.encrypt(
    JSON.stringify({ date: new Date(), code: process.env.CODE! }),
    process.env.SECRET!
  ).toString();

  return res.status(200).json({ data });
});

export default router;
