import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(process.env.REACT_APP_ALL_PRODUCTS);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
     await axios.delete(
        `${process.env.REACT_APP_DELETE}/${id}`
      );
      const updated = products.filter((item) => item.id !== id);
      setProducts(updated);
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
    <section className="allProducts">
      {/* {loading && <Loader />} */}
      <div className="container">
        <div className="row">
          <h2 className="title">All Product List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Details</th>
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
                  <td>{product.details}</td>
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