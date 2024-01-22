import React from "react";
import styles from "./NewProduct.module.css";

const EditProduct = () => {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Edit Product</h2>
        <div className={styles.inputcontainer}>
          <Input
            label={"Product Name"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleChange}
          />
          <div className={styles.inputsubcontainer}>
            <Select
              label={"Brand"}
              option={brands}
              value={brand}
              name={"brand"}
              onChange={handleChange}
            />
            <Select
              label={"Category"}
              option={categories}
              value={category}
              name={"category"}
              onChange={handleChange}
            />
            <Select
              label={"Sub Category"}
              option={subCategories}
              value={subcategory}
              name={"subcategory"}
              onChange={handleChange}
            />
            <Input
              label={"Description"}
              type={"text"}
              name={"description"}
              value={description}
              onChange={handleChange}
            />
            <Input
              label={"Price"}
              type={"number"}
              name={"price"}
              value={price}
              onChange={handleChange}
            />
            <Input
              label={"Discount Price"}
              type={"number"}
              name={"discountprice"}
              value={discountprice}
              onChange={handleChange}
            />
            <Input
              label={"Stock"}
              type={"number"}
              name={"stock"}
              value={stock}
              onChange={handleChange}
            />
            <Input
              label={"Image"}
              type={"file"}
              name={"image"}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Edit product</Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
