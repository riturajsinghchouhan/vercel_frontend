// Updated: AddCategory.js
import './Addcategory.css';
import { useState } from 'react';
import axios from 'axios';
import { categoryApi } from '../../Api_url';

function AddCategory() {
  const [output, setOutput] = useState();
  const [catnm, setCatnm] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var formData = new FormData();
    formData.append("catnm", catnm);
    formData.append("caticon", file);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };

    axios.post(categoryApi + "save", formData, config)
      .then((response) => {
        setOutput("Category Added successfully");
        setCatnm("");
        setFile(null);
      })
      .catch((err) => {
        setOutput("Category not Added successfully");
      });
  };

  return (
    <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
      <div className="container about px-lg-0">
        <div className="col-lg-12 about-text py-5">
          <h1>Add Category Here!!!!</h1>
          <span style={{ color: "red" }}>{output}</span>
          <form>
            <div className="form-group">
              <label>Category Name :</label>
              <input type="text" className="form-control" value={catnm} onChange={e => setCatnm(e.target.value)} />
            </div>
            <br />
            <div className="form-group">
              <label>Category Icon :</label>
              <input type="file" className="form-control" onChange={handleChange} />
            </div>
            <br />
            <button type="button" className="btn btn-info" onClick={handleSubmit}>Add Category</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;