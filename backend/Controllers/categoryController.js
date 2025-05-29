import { Category } from "../Models/catgoryModel.js"

export const addCategory = async (req, res) => {
    const { categoryName, slug } = req.body;
    try {
        const existingCategory = await Category.findOne({ categoryName: categoryName });
        if (existingCategory) {
            return res.status(401).json({ message: "Category Already Exists" })
        } else {
            const newcategory = new Category({
                categoryName: categoryName,
                slug: slug
            })
            await newcategory.save()
            return res.status(201).json({ message: "Category Added Successfully" })
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
        console.log(error)
    }
}

export const getCategory = async (req, res) => {
    try {
        const allCategory = await Category.find();
        if (allCategory) {
            return res.status(201).json(allCategory)
        } else {
            return res.status(401).json({ message: "No Category Found" })
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const editCategory = async (req, res) => {
    try {
        const { _id, categoryName, slug } = req.body
        const category = await Category.findOne({ _id: _id });
        if (category) {
            category.categoryName = categoryName;
            category.slug = slug;
            await category.save()
            return res.status(201).json({message:"Category Updated Successfully"})
        }else{
            return res.status(401).json({message:"Uncaught Error"})
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {categoryId} = req.body
        if (categoryId) {
            const category = await Category.findByIdAndDelete({ _id: categoryId });
            if(category){
                return res.status(201).json({message:"Category Deleted Successfully"})
            }
        }else{
            return res.status(401).json({message:"Uncaught Error"})
        }

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}