import SessionClient from "../clients/sessionClient"
import { Router } from "express"
import dayjs from "dayjs"

const router = Router()
const sessionClient = new SessionClient()

router.get("/", async (req, res) => {
  const now = dayjs().format("HH:mm")
  const data = await sessionClient.getSessionByTime(now)

  return res.json({ hihi: data })
})

export default router
