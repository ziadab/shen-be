---
to: src/routes/<%= name %>.router.ts
---
import { Router } from "express"

const router = Router()

router.get("/", async (req, res) => {})

router.post("/", async (req, res) => {})

router.patch("/:id", async (req, res) => {
  const id = req.params.id
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
})


export default router


