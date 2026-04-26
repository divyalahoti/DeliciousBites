import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import { toast } from "react-toastify";
import "./Expenses.css";

const Expenses = () => {
  const { backendUrl } = useContext(ShopContext);
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: ""
  });
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    note: ""
  });

  // ✅ FETCH
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/expense/list");
      if (res.data.success) {
        setExpenses(res.data.expenses);
      }
    } catch {
      toast.error("Failed to fetch");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ✅ DELETE CONFIRM
  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        backendUrl + "/api/expense/delete/" + id
      );

      if (res.data.success) {
        toast.success("Deleted ✅");
        fetchExpenses();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  // ✅ OPEN EDIT MODAL
  const openEdit = (exp) => {
    setForm(exp);
    setEditId(exp._id);
    setShowModal(true);
  };

  // ✅ SAVE (ADD / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) {
      toast.error("Fill all fields");
      return;
    }

    try {
      let res;

      if (editId) {
        // UPDATE
        res = await axios.put(
          backendUrl + "/api/expense/update/" + editId,
          form
        );
      } else {
        // ADD
        res = await axios.post(
          backendUrl + "/api/expense/add",
          form
        );
      }

      if (res.data.success) {
        toast.success(editId ? "Updated ✅" : "Added ✅");
        fetchExpenses();
        setShowModal(false);
        setEditId(null);
        setForm({ title: "", amount: "", category: "", note: "" });
      }

    } catch {
      toast.error("Error saving");
    }
  };

  // ✅ DATE FILTER
  const filteredExpenses = expenses.filter((exp) => {
    if (!dateFilter.from || !dateFilter.to) return true;

    const expDate = new Date(exp.date);
    return (
      expDate >= new Date(dateFilter.from) &&
      expDate <= new Date(dateFilter.to)
    );
  });

  // ✅ TOTAL
  const totalExpense = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <div className="expense-page">

      <div className="expense-header">
        <div>
          <h2>💰 Expense Manager</h2>
          <h3>Total Expense: ₹{totalExpense}</h3>
        </div>

        <button className="add-btn" onClick={() => setShowModal(true)}>
          ➕ Add Expense
        </button>
      </div>

      {/* DATE FILTER */}
      <div className="date-filter">
        <input
          type="date"
          onChange={(e) =>
            setDateFilter({ ...dateFilter, from: e.target.value })
          }
        />
        <input
          type="date"
          onChange={(e) =>
            setDateFilter({ ...dateFilter, to: e.target.value })
          }
        />
      </div>
      {/* TABLE */}
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp._id}>
                <td>{exp.title}</td>
                <td>₹{exp.amount}</td>
                <td>{exp.category}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEdit(exp)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteExpense(exp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">

            <h3>
              {editId ? "✏️ Edit Expense" : "➕ Add Expense"}
            </h3>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Category</option>
                <option>Electricity</option>
                <option>Grocery</option>
                <option>Staff</option>
                <option>Other</option>
              </select>

              <input
                placeholder="Note"
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="submit">
                  {editId ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;