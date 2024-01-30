import React from "react";
import styles from "./Styles/NewProduct.module.css";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    discountprice: "",
    stock: "",
    image: null,
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/api/brand/brands")
      .then((response) => {
        setBrands(response.data.brands);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });

    axiosInstance
      .get("/api/category/category")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/admin/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product added successfully!");
      toast.success("Product Add");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return <div>NewProduct</div>;
};

export default NewProduct;
