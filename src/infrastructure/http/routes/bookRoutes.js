const express = require("express");

module.exports = (controller) => {
    const router = express.Router();

    router.post("/my-library", controller.create);
    router.get("/my-library", controller.getAll);
    router.put("/my-library/:id", controller.update);
    router.delete("/my-library/:id", controller.remove);
    router.get("/search", controller.search);

    router.get("/last-search", controller.lastSearch);

    return router;
};
