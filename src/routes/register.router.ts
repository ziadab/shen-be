import { Router } from "express";
import { RegisterInput } from "types";
import { Admin } from "schemas/admin";
import generateProfileImg from "utils/generateProfileImg";

const router = Router();

router.post("/", async (req, res) => {
  const data: RegisterInput = req.body;
  const profileImage = generateProfileImg();
  console.log({ ...data, profileImage });
  const admin = new Admin({ ...data, profileImage });
  console.log(admin);
  await admin.save();
  console.log(admin);

  //@ts-ignore
  const token = admin.generateToken();

  return res.json({ token });
});

export default router;
