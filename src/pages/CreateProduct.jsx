import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const newProductSchema = object({
  name: string().trim().min(3).required("Name is required"),
  details: string().trim().min(10).required("Details are required"),
  price: string().trim().min(2).required("Price is required"),
});

const CreateProduct = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newProductSchema),
  });

  useEffect(() => {
    // html və body üzərində stil dəyişiklikləri
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    // Cleanup function (komponent silindiyində bu tərz dəyişikliklərini geri qaytarır)
    return () => {
      document.documentElement.style.height = "";
      document.documentElement.style.overflow = "";

      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, []);

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
    setPreview(res);
  };

  const submitForm = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("price", data.price);
    formData.append("productImage", image);

    try {
      await axios.post(process.env.REACT_APP_CREATE_PRODUCT, formData);
      navigate("/all-products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="createCartCon">
      <div className="createCar">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>

        <div className="container">
          <div className="row">
            <h2 style={{ color: "white" }} className="title">
              Add new product
            </h2>
            <div className="login-box">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="user-box">
                  <input
                    className={errors.name && "error"}
                    type="text"
                    name="name"
                    {...register("name")}
                  />
                  <label className={errors.name && "error"}>Product Name</label>
                </div>
                {errors.name && (
                  <span className="errorMsg">{errors.name.message}</span>
                )}
                <div className="user-box">
                  <input
                    className={errors.details && "error"}
                    type="text"
                    name="details"
                    {...register("details")}
                  />
                  <label className={errors.details && "error"}>
                    Product Details
                  </label>
                </div>
                {errors.details && (
                  <span className="errorMsg">{errors.details.message}</span>
                )}
                <div className="user-box">
                  <input
                    className={errors.price && "error"}
                    type="text"
                    name="price"
                    {...register("price")}
                  />
                  <label className={errors.price && "error"}>Product Price</label>
                </div>
                {errors.price && (
                  <span className="errorMsg">{errors.price.message}</span>
                )}
                <div className="user-box">
                  <input
                    type="file"
                    name="productImage"
                    id="cImg"
                    onChange={onSelectImage}
                  />
                  {preview && (
                    <div className="previewImage">
                      <img src={preview} alt="uploaded-img" />
                    </div>
                  )}
                </div>
                <div
                  className={`btn ${
                    (errors.name || errors.details || errors.price) && "error"
                  }`}
                >
                  <button>
                    Create Product
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

export default CreateProduct;
