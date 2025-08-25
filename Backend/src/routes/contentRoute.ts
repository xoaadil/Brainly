import { Router } from "express";
import { create, edit, remove, getAllByUser, getAllByType } from "../controllers/contentController";
import { isAuthorized } from "../middleware/isAuthorized";
import { contentValidation } from "../middleware/authValidation";

const router = Router();

// Root test
router.get("/", (req, res) => {
  res.send("hi i am content root");
});

// Create new content
router.post("/create", isAuthorized, contentValidation, create);

// Edit content (by ID)
router.put("/edit/:id", isAuthorized, contentValidation, edit);

// Delete content (by ID)
router.delete("/delete/:id", isAuthorized, remove);

// Get all content by the logged-in user
router.get("/my-posts", isAuthorized, getAllByUser);

// Get all content by type
router.get("/type/:type", getAllByType);

export default router;
