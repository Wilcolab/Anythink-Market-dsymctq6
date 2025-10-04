/**
 * Router for comment-related API endpoints.
 *
 * @module routes/api/comments
 *
 * @description
 * Express router exposing endpoints to list and delete Comment documents from MongoDB.
 * Uses Mongoose's Comment model (registered as mongoose.model("Comment")).
 *
 * Endpoints:
 *  - GET  /           -> Fetch all comments
 *  - DELETE /:id      -> Delete a comment by its id
 *
 * GET / (async)
 * @function getComments
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @example
 * // Success: 200
 * res.json([{ _id: "abc123", text: "a comment", ... }])
 * @throws {500} When unable to fetch comments:
 * res.status(500).json({ error: "Failed to fetch comments" })
 *
 * DELETE /:id (async)
 * @function deleteComment
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.params.id - The id of the comment to delete
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 * @example
 * // Success: 200
 * res.json({ message: "Comment deleted successfully" })
 * @throws {500} When unable to delete comment:
 * res.status(500).json({ error: "Failed to delete comment" })
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
})

// Add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.findByIdAndDelete(commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
})



module.exports = router;
