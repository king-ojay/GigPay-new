// routes/notifications.js
const express = require("express");
const router = express.Router();

// Simple in-memory store placeholder
const db = {
  notifications: [], // { id, userId, type, message, read, createdAt }
  listForUser: (userId) => db.notifications.filter((n) => n.userId === userId),
  add: (n) => db.notifications.push(n),
  markRead: (id) => {
    const notif = db.notifications.find((n) => n.id === id);
    if (notif) notif.read = true;
    return notif;
  },
};

const ensureAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  next();
};

// GET /users/:userId/notifications  (or /notifications/me)
router.get("/me", ensureAuth, (req, res) => {
  const notifs = db.listForUser(req.user.id);
  res.json(notifs);
});

// PUT /notifications/:id/read
router.put("/:id/read", ensureAuth, (req, res) => {
  const updated = db.markRead(req.params.id);
  if (!updated) return res.status(404).json({ error: "Notification not found" });
  res.json(updated);
});

// Utility: create a notification (could be called internally)
const createNotification = ({ userId, type, message }) => {
  const n = {
    id: `${Date.now()}-${Math.random()}`,
    userId,
    type,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  db.add(n);
  return n;
};

module.exports = { router, createNotification };
