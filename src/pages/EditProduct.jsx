import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { productID } = useParams();
  const [productData, setProductData] = useState({
    id: "5",
    name: "Firming face serum Orange",
    details: "Perfect for natural skin tightening",
    price: 69,
    brand: "MOKOSH",
    currency: "USD",
    image: "uploads/mokosh-firming-main.webp",
    hoverImage: "uploads/mokosh-firming-hover.webp",
    mlOptions: ["12 ml", "24 ml", "36 ml"],
    category: "face-care",
    bestSeller: true,
    created_at: "2025-05-02",
    stock: 15,
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PRODUCT_DETAILS}/${productID}`
        );
        setProductData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [productID]);

  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";

      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSelectImage = async (e) => {
    setImage(e.target.files[0]);
    const res = await convertImageToBase64(e.target.files[0]);
    setProductData((prev) => ({
      ...prev,
      image: res,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);
    formData.append("price", productData.price);
    formData.append("productImage", image);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_UPDATE_PRODUCT}/${productID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast.success("The product has been updated successfully🎉", {
        position: "bottom-right",
      });
      navigate("/all-products");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Update failed. ❌", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="editProductContainer">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="editCar">
        <div className="container">
          <div className="row">
            <h2 style={{ color: "white" }} className="title">
              Edit product's data
            </h2>
            <div className="login-box">
              <form>
                <div className="userBoxContainer">
                  <div className="userBoxCont">
                    <div className="user-box">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={productData.name}
                      />
                      <label>Product Name</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="text"
                        name="category"
                        onChange={handleChange}
                        value={productData.category}
                      />
                      <label>Product Category</label>
                    </div>
                  </div>

                  <div className="userBoxCont">
                    <div className="user-box">
                      <input
                        type="text"
                        name="brand"
                        onChange={handleChange}
                        value={productData.brand}
                      />
                      <label>Product Brand</label>
                    </div>
                    <div className="user-box">
                      <input
                        type="text"
                        name="price"
                        onChange={handleChange}
                        value={productData.price}
                      />
                      <label>Product Price</label>
                    </div>
                  </div>
                </div>
                <div className="user-box">
                  <input
                    type="file"
                    name="image"
                    id="cImg"
                    onChange={onSelectImage}
                  />
                  {productData.image && (
                    <div className="previewImage">
                      <img
                        src={
                          image
                            ? productData.image
                            : `${process.env.REACT_APP_BASE_URL}/${productData.image}`
                        }
                        alt="new-img"
                      />
                    </div>
                  )}
                </div>
                <div className="btn" onClick={onSubmit}>
                  <button>
                    Edit product
                    <span></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
