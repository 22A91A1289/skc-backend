// import MenuCategory from "../models/MenuCategory.js";
// import MenuItem from "../models/MenuItem.js";
// import MenuMeta from "../models/MenuMeta.js";

// /**
//  * GET /api/menu
//  * Returns categories with items
//  */
// export const getMenu = async (req, res) => {
//   try {
//     const categories = await MenuCategory.find({ active: true })
//       .sort({ order: 1 })
//       .lean();

//     const items = await MenuItem.find({ active: true }).lean();

//     // Group items by category
//     const menu = categories.map((cat) => ({
//       _id: cat._id,
//       name: cat.name,
//       items: items.filter(
//         (item) => item.categoryId.toString() === cat._id.toString()
//       ),
//     }));

//     res.json(menu);
//   } catch (error) {
//     console.error("Get menu error:", error);
//     res.status(500).json({ message: "Failed to fetch menu" });
//   }
// };

// /**
//  * GET /api/menu/pdf
//  * Returns menu PDF info
//  */
// export const getMenuPdf = async (req, res) => {
//   try {
//     const meta = await MenuMeta.findOne().sort({ createdAt: -1 });
//     if (!meta) {
//       return res.status(404).json({ message: "Menu PDF not found" });
//     }
//     res.json(meta);
//   } catch (error) {
//     console.error("Get menu pdf error:", error);
//     res.status(500).json({ message: "Failed to fetch menu pdf" });
//   }
// };
import MenuCategory from "../models/MenuCategory.js";
import MenuItem from "../models/MenuItem.js";
import MenuMeta from "../models/MenuMeta.js";

/**
 * GET /api/menu
 * Categories + items
 */
export const getMenu = async (req, res) => {
  try {
    const categories = await MenuCategory.find({ active: true })
      .sort({ order: 1 })
      .lean();

    const items = await MenuItem.find({ active: true }).lean();

    const menu = categories.map((cat) => ({
      _id: cat._id,
      name: cat.name,
      image: cat.image || null,
      items: items.filter(
        (item) => item.categoryId.toString() === cat._id.toString()
      ),
    }));

    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

/**
 * GET /api/menu/pdf/:type
 * type = standard | traditional | economic
 */
export const getMenuPdf = async (req, res) => {
  try {
    const { type } = req.params;

    const meta = await MenuMeta.findOne({ menuType: type });

    if (!meta) {
      return res.status(404).json({ message: "Menu PDF not found" });
    }

    res.json(meta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch menu pdf" });
  }
};
