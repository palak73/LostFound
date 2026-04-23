const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const item = new Item({
    ...req.body,
    userId: req.user
  });
  await item.save();
  res.json(item);
});

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.get("/search", async (req, res) => {
  const name = req.query.name;
  const items = await Item.find({
    temName: { $regex: name, $options: "i" }
  });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

router.put("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.userId.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;