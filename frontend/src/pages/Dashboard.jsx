import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    date: "",
    contactInfo: ""
  });

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/items/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/items", form);
    }

    setForm({
      itemName: "",
      description: "",
      type: "",
      location: "",
      date: "",
      contactInfo: ""
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  const editItem = (item) => {
    setForm({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date,
      contactInfo: item.contactInfo
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchItems = async () => {
    const res = await API.get(`/items/search?name=${search}`);
    setItems(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ background: "#f5f7fb", minHeight: "100vh", padding: "30px" }}>
      <div className="container" style={{ maxWidth: "950px" }}>
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">Dashboard</h2>
          <button className="btn btn-dark px-4" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Form Card */}
        <div
          className="card border-0 p-4 mb-4"
          style={{
            borderRadius: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
          }}
        >
          <h4 className="mb-3 fw-semibold">
            {editId ? "Update Item" : "Add New Item"}
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Item Name"
                  value={form.itemName}
                  onChange={(e) =>
                    setForm({ ...form, itemName: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Type (Lost/Found)"
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Date"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  className="form-control"
                  placeholder="Contact Info"
                  value={form.contactInfo}
                  onChange={(e) =>
                    setForm({ ...form, contactInfo: e.target.value })
                  }
                />
              </div>
            </div>

            <button className="btn btn-primary px-4 py-2">
              {editId ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>

        {/* Search Card */}
        <div
          className="card border-0 p-4 mb-4"
          style={{
            borderRadius: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
          }}
        >
          <h5 className="mb-3 fw-semibold">Search Items</h5>

          <div className="d-flex gap-2 flex-wrap">
            <input
              className="form-control"
              style={{ maxWidth: "400px" }}
              placeholder="Enter item name..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn btn-warning px-4" onClick={searchItems}>
              Search
            </button>

            <button className="btn btn-secondary px-4" onClick={fetchItems}>
              Show All
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="row">
          {items.map((item) => (
            <div className="col-md-6 mb-4" key={item._id}>
              <div
                className="card h-100 border-0 p-3"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                }}
              >
                <h5 className="fw-bold text-dark">{item.itemName}</h5>
                <p className="text-muted mb-2">{item.description}</p>

                <p className="mb-1">
                  <strong>Type:</strong> {item.type}
                </p>

                <p className="mb-1">
                  <strong>Location:</strong> {item.location}
                </p>

                <p className="mb-1">
                  <strong>Date:</strong> {item.date}
                </p>

                <p className="mb-3">
                  <strong>Contact:</strong> {item.contactInfo}
                </p>

                <div className="d-flex gap-2 mt-auto">
                  <button
                    className="btn btn-success w-50"
                    onClick={() => editItem(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger w-50"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;