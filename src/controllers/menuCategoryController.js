import MenuCategory from "../models/MenuCategory.js";

/* CREATE CATEGORY */
export const createCategory = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const exists = await MenuCategory.findOne({ name: req.body.name });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await MenuCategory.create({
      name: req.body.name,
      order: req.body.order,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Category create failed" });
  }
};

/* UPDATE CATEGORY IMAGE */
export const updateCategoryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file missing" });
    }

    const category = await MenuCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.image = req.file.path; // 🔥 force set
    await category.save();

    res.json({
      message: "Image updated successfully",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image update failed" });
  }
};


/* GET CATEGORIES */
export const getCategories = async (req, res) => {
  const categories = await MenuCategory.find({ active: true }).sort({ order: 1 });
  res.json(categories);
};
