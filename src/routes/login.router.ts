import { Router } from "express";

import { RegisterInput } from "types";
import { Admin } from "schemas/admin";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/", async (req, res) => {
  const data = req.body as RegisterInput;

  // Find user
  const admin = await Admin.findOne({ email: data.email });
  if (!admin)
    return res
      .status(403)
      .json({ code: 404, message: "No account found with this username" });

  // Check password
  const isMatch = await bcrypt.compare(data.pwd, admin.pwd);
  if (!isMatch) {
    return res.status(403).json({
      code: 400,
      message:
        "Password is incorrect, please double check your information and try again.",
    });
  }
  return res.status(200).json({
    message: "Admin signed in",
    token: admin.generateToken(),
    admin,
  });
});

export default router;
