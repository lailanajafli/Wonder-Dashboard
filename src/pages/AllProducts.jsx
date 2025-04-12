import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]); // Məhsul siyahısını local state-də saxlayırıq

  // API-dən məhsulları yükləmək
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(process.env.REACT_APP_ALL_PRODUCTS);
      setProducts(res.data); // Yüklənən məhsulları local state-ə əlavə edirik
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Məhsul silmək
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_DELETE}/${id}`);
      // Silinən məhsulu local state-dən çıxarırıq
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts); // Yeni məhsul siyahısını state-ə təyin edirik
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // İlk render zamanı məhsul siyahısını yükləyirik
  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return <Loader />; // Yüklənmə zamanı Loader göstərilir
  }

  return (
    <section className="allProducts">
      <div className="container">
        <div className="row">
          <h2 className="title">All Product List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Product Brand</th>
                <th>Product Price</th>
                <th>Edit Product</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td className="carImg">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${product.image}`}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td className="edit">
                    <Link to={`/edit-product/${product.id}`}>
                      <FaEdit />
                    </Link>
                    <FaTrash onClick={() => deleteProduct(product.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
