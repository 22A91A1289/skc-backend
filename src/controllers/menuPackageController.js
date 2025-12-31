import MenuPackage from "../models/MenuPackage.js";
import MenuCategory from "../models/MenuCategory.js";
import MenuItem from "../models/MenuItem.js";

/**
 * GET /api/menu-packages
 * Returns all menu packages with categories + items
 */
export const getMenuPackages = async (req, res) => {
  try {
    const packages = await MenuPackage.find({ active: true })
      .populate("categoryIds")
      .lean();

    const items = await MenuItem.find({ active: true }).lean();

    const result = packages.map(pkg => ({
      key: pkg.key,
      name: pkg.name,
      price: pkg.price,
      categories: pkg.categoryIds.map(cat => ({
        _id: cat._id,
        name: cat.name,
        items: items.filter(
          item => item.categoryId.toString() === cat._id.toString()
        )
      }))
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch menu packages" });
  }
};
