import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ListFood.css";
import { getFoodList, deleteFood } from "../../services/foodService";

const ListFood = ({ darkMode }) => {
  const [list, setList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error fetching food list");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const removeFood = async (id) => {
    try {
      const success = await deleteFood(id);
      if (success) {
        toast.success("Food removed.");
        fetchList();
      }
    } catch (error) {
      toast.error("Error removing food");
    }
  };
  return (
    <div
      className={`py-5 row justify-content-center ${
        darkMode ? "bg-dark text-light" : "bg-white"
      }`}
    >
      <div className={`col-11 card ${darkMode ? "bg-dark style-dark" : ""}`}>
        <table className={`table ${darkMode ? "table-dark" : "table-white"}`}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.imageUrl} alt="" height={60} width={60} />
                </td>
                <td style={{ color: darkMode ? "#c6c8c9ff" : "#41464aff" }}>
                  {item.name}
                </td>
                <td style={{ color: darkMode ? "#c6c8c9ff" : "#41464aff" }}>
                  {item.category}
                </td>
                <td
                  className={darkMode ? "text-white-50" : ""}
                  style={{ maxWidth: "320px" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      whiteSpace: expanded[index] ? "normal" : "nowrap",
                      overflow: expanded[index] ? "visible" : "hidden",
                      textOverflow: expanded[index] ? "clip" : "ellipsis",
                      verticalAlign: "middle",
                      maxWidth: expanded[index] ? "none" : "300px",
                    }}
                  >
                    {item.description}
                  </span>
                  {item.description.length > 30 && (
                    <button
                      className="btn btn-link btn-sm p-0 ms-2"
                      style={{ color: darkMode ? "#c6c8c9ff" : "#41464aff" }}
                      onClick={() =>
                        setExpanded((exp) => ({ ...exp, [index]: !exp[index] }))
                      }
                    >
                      {expanded[index] ? "See less" : "See more"}
                    </button>
                  )}
                </td>
                <td style={{ color: darkMode ? "#c6c8c9ff" : "#41464aff" }}>
                  ${item.price}
                </td>
                <td>
                  <i
                    className="bi bi-x-circle-fill text-danger"
                    onClick={() => removeFood(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFood;
