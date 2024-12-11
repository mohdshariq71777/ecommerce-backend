const express = require('express');
const db=require('./../database/db')
const router = express.Router();
/* GET home page. */
router.get('/all-products', async (req, res) => {
  const products = await db.query(`
    Select p.product_name,c.category_name,tc.type_category_name,mc.main_category_name from products p 
left join 
categories c on p.category_id=c.category_id
left join
type_categories tc on c.type_category_id=tc.type_category_id
left join
main_type_category_mapping mtcm on mtcm.type_category_id=tc.type_category_id
left join
main_categories mc on mc.main_category_id=mtcm.main_category_id`);
  const responseData = {
      success: true,
      message: 'Api response sent successfully!',
      products: products.rows,
  };

  // Send JSON response
  res.status(200).json(responseData);
});

module.exports = router;
