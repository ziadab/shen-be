import { Router } from "express";
import { RegisterInput } from "../types";
import { Admin } from "../schemas/admin";
import generateProfileImg from "../utils/generateProfileImg";
import { createAdmin } from "../validations/registration.validation";
import allowRegiter from "../middleware/allowRegisters";

const router = Router();

router.post("/", allowRegiter, async (req, res) => {
  const data: RegisterInput = req.body;

  const { error } = createAdmin.validate(data);
  if (error) {
    const errors = error.details.map((el) => el.message + "\n");
    return res.status(400).json({ errors });
  }

  const adminExist = await Admin.findOne({ email: data.email });
  if (adminExist)
    return res.status(400).json({ errors: "email already exist!" });

  const profileImage = generateProfileImg();
  const admin = new Admin({ ...data, profileImage });
  await admin.save();

  const token = admin.generateToken();

  return res.json({ token });
});

export default router;
