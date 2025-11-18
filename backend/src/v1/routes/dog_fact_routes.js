import { getRandomFact } from "../client/dogs/getDogs.js"

import { Router } from "express"

const router = Router()

router.get("/dogs/random-fact", getRandomFact)

export default router
