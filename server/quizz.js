const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Web Uquizz quizz");
});

module.exports = router;