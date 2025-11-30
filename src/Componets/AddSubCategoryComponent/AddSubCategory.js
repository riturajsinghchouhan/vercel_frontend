// Updated: AddSubCategory.js
import './AddSubCategory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { categoryApi, subcategoryApi } from '../../Api_url';

function AddSubCategory() {
  const [file, setFile] = useState();
  const [catName, setCatName] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const [weight, setWeight] = useState("");       // ✅ new state
  const [price, setPrice] = useState("");         // ✅ new state
  const [output, setOutput] = useState();
  const [cDetails, setCategoryDetails] = useState([]);

  useEffect(() => {
    axios.get(categoryApi + "fetch")
      .then((response) => setCategoryDetails(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append('catnm', catName);
    formData.append('subcatnm', subCatName);
    formData.append('weight', weight);     // ✅ append weight
    formData.append('price', price);       // ✅ append price
    formData.append('caticon', file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };

    axios.post(subcategoryApi + "save", formData, config)
      .then((response) => {
        setCatName("");
        setSubCatName("");
        setWeight("");
        setPrice("");
        setFile(null);
        setOutput("Sub Category Added Successfully....");
      });
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-12">
            <h1 className="display-5 mb-0">Add SubCategory Here!!!!!</h1>
            <span style={{ color: "red" }}>{output}</span>
            <form>
              <div className="form-group">
                <label>Category Name:</label>
                <select className="form-control" value={catName} onChange={e => setCatName(e.target.value)}>
                  <option>Select Category</option>
                  {cDetails.map((row) => (
                    <option key={row._id} value={row.catnm}>{row.catnm}</option>
                  ))}
                </select>
              </div>
              <br />

              <div className="form-group">
                <label>Sub Category Name:</label>
                <input type="text" className="form-control" value={subCatName} onChange={e => setSubCatName(e.target.value)} />
              </div>
              <br />

              <div className="form-group">
                <label>Weight (e.g. 500gms / 1kg):</label>
                <input type="text" className="form-control" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
              <br />

              <div className="form-group">
                <label>Price (in Rs):</label>
                <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <br />

              <div className="form-group">
                <label>Sub Category Icon:</label>
                <input type="file" className="form-control" onChange={handleChange} />
              </div>
              <br />

              <button type="button" className="btn btn-danger" onClick={handleSubmit}>Add Sub Category</button>
              <br /><br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSubCategory;
