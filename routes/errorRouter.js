import express from "express";

const router = express.Router();

router.use('/*', (req, res) => {
    res.status(403).send(`Страница не найдена`);
})

export default router;  