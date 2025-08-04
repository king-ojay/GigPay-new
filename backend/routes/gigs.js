// routes/gigs.js
const express = require("express");
const router = express.Router();

// Placeholder DB helpers - replace with your actual data access (ORM / queries)
const db = {
  gigs: [], // example in-memory store; replace with real DB
  findGigById: (id) => db.gigs.find((g) => g.id === id),
  updateGig: (id, updates) => {
    const gig = db.gigs.find((g) => g.id === id);
    if (!gig) return null;
    Object.assign(gig, updates);
    return gig;
  },
  listOpenGigs: () => db.gigs.filter((g) => g.status === "open"),
};

// Middleware stub: ensure authenticated, expects req.user populated
const ensureAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  next();
};

// GET /gigs - list open gigs (could add query filters)
router.get("/", async (req, res) => {
  try {
    const gigs = db.listOpenGigs();
    res.json(gigs);
  } catch (err) {
    console.error("Failed to list gigs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /gigs/:id
router.get("/:id", async (req, res) => {
  const gig = db.findGigById(req.params.id);
  if (!gig) return res.status(404).json({ error: "Gig not found" });
  res.json(gig);
});

// PUT /gigs/:id - update gig (including mark as completed)
router.put("/:id", ensureAuth, async (req, res) => {
  const gig = db.findGigById(req.params.id);
  if (!gig) return res.status(404).json({ error: "Gig not found" });

  // Only employer who posted or admin can update status ideally; skip role-check for brevity
  const updates = {};
  if (req.body.status) updates.status = req.body.status;
  if (req.body.title) updates.title = req.body.title;
  if (req.body.description) updates.description = req.body.description;

  const updated = db.updateGig(req.params.id, updates);
  res.json(updated);
});

module.exports = router;
