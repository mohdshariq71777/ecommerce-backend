const db=require('../database/db')
const authMiddle=require('./../middleware/auth')

//api controller functions start here

//get all main categories
const getMainCategories = async (req, res) => {
    const main_categories= await db.query(`select * from main_categories`);
    const responseData={
        success:true,
        message:'',
        main_categories:main_categories.rows
    }
    res.status(200).json(responseData);
}
//Get type categories on the basis of main_category_id
const getTypeCategories = async (req, res) => {
    const mainCategoryId = req.query.main_category_id;
    const type_categories = await db.query(`select distinct tc.* from type_categories tc 
    inner join product_categories_mapping pcm 
    on pcm.type_category_id=tc.type_category_id where pcm.main_category_id='${mainCategoryId}';`);
    const responseData = {
        success: true,
        message: 'Type categories fetched successfully!',
        type_categories: type_categories.rows,
    };
    res.status(200).json(responseData);
}

//Get categories on the basis of main_category_id & type_category_id
const getCategories = async (req, res) => {
    const mainCategoryId = req.query.main_category_id;
    const typeCategoryId = req.query.type_category_id;
    const categories = await db.query(`select distinct c.* from categories c 
    inner join product_categories_mapping pcm 
    on pcm.category_id=c.category_id 
    where pcm.type_category_id='${typeCategoryId}' and pcm.main_category_id='${mainCategoryId}';`);
    const responseData = {
        success: true,
        message: 'Categories fetched successfully!',
        categories: categories.rows,
    };
    res.status(200).json(responseData);
}
//Get products on the basis of main_category_id & type_category_id & category_id
const getProducts = async (req, res) => {
    const mainCategoryId = req.query.main_category_id;
    const typeCategoryId = req.query.type_category_id;
    const categoryId = req.query.category_id;
    const products = await db.query(`select distinct p.* from products p 
    inner join product_categories_mapping pcm 
    on pcm.product_id=p.product_id 
    where pcm.type_category_id='${typeCategoryId}' and
    pcm.main_category_id='${mainCategoryId}' and 
    pcm.category_id='${categoryId}';`);
    const responseData = {
        success: true,
        message: 'Products fetched successfully!',
        products: products.rows,
    };
    res.status(200).json(responseData);
}
//api controller functions end here

module.exports={getMainCategories,getTypeCategories,getCategories,getProducts}