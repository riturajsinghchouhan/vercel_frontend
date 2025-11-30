// Updated: ManageUser.js
import './ManageUser.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { userapi } from '../../Api_url';
import { useNavigate } from 'react-router-dom';

function ManageUser() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    reload();
  }, []);

  const changeStatus = (_id, action) => {
    let updateDetail;

    if (action === 'verify') {
      updateDetail = {
        condition_obj: { _id },
        content_obj: { status: 1 }
      };
    } else if (action === 'block') {
      updateDetail = {
        condition_obj: { _id },
        content_obj: { status: 0 }
      };
    }else if (action === 'delete') {
  axios.delete(`${userapi}delete`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: { _id }
  })
  .then(() => {
    alert('User deleted successfully');
    reload();
  })
  .catch((err) => {
    console.error(err);
    alert('Error deleting user');
  });
  return;
}


    axios.patch(`${userapi}update`, updateDetail)
      .then(() => {
        alert(`User ${action}ed successfully`);
        reload();
      })
      .catch(() => alert(`Error ${action}ing user`));
  };

  const reload = () => {
    axios.get(`${userapi}fetch?role=user`)
      .then((response) => {
        setUserDetail(response.data);
      });
  };

  return (
    <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
      <div className="container about px-lg-0">
        <div className="col-lg-12 about-text py-5">
          <div className="p-lg-5 pe-lg-0">
            <h1 className="mb-4">Manage Users</h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Reg ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Info</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetail.length === 0 ? (
                    <tr><td colSpan="8" className="text-center">No users found.</td></tr>
                  ) : (
                    userDetail.map((row) => (
                      <tr key={row._id}>
                        <td>{row._id}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.mobile}</td>
                        <td>{row.address || 'N/A'}</td>
                        <td>{row.info || 'N/A'}</td>
                        <td>
                          {row.status === 0 ? (
                            <button className="btn btn-sm btn-success" onClick={() => changeStatus(row._id, 'verify')}>Verify</button>
                          ) : (
                            <button className="btn btn-sm btn-warning" onClick={() => changeStatus(row._id, 'block')}>Block</button>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => changeStatus(row._id, 'delete')}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;