// routes/applications.js
const express = require("express");
const router = express.Router();

// Placeholder stores; replace with real persistence layer
const db = {
  applications: [], // { id, gigId, applicantId, createdAt, status }
  findDuplicate: (gigId, applicantId) =>
    db.applications.find((a) => a.gigId === gigId && a.applicantId === applicantId),
  add: (application) => db.applications.push(application),
  listForGig: (gigId) => db.applications.filter((a) => a.gigId === gigId),
  listForUser: (userId) => db.applications.filter((a) => a.applicantId === userId),
};

// Middleware stub: ensure authenticated, expects req.user
const ensureAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  next();
};

// POST /gigs/:id/apply
router.post("/gigs/:id/apply", ensureAuth, async (req, res) => {
  const gigId = req.params.id;
  const applicantId = req.user.id;

  // Prevent double application
  const existing = db.findDuplicate(gigId, applicantId);
  if (existing) {
    return res.status(400).json({ error: "Already applied to this gig" });
  }

  const newApp = {
    id: `${Date.now()}-${Math.random()}`, // simple unique; replace with uuid
    gigId,
    applicantId,
    createdAt: new Date().toISOString(),
    status: "pending", // could be accepted/rejected later
  };
  db.add(newApp);

  // Optionally: create notification for gig owner (needs gig lookup)
  // e.g., emit event to notifications system here

  res.status(201).json(newApp);
});

// GET /applications/me
router.get("/me", ensureAuth, (req, res) => {
  const apps = db.listForUser(req.user.id);
  res.json(apps);
});

module.exports = router;
