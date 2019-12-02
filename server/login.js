const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Web Uquizz login");
});

module.exports = router;
