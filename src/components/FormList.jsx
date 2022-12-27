import { Button, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormList = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (value) => {
        return (
          <Link
            to={`/form/${value}`}
          >{`${process.env.REACT_APP_BASE_URL}/form/${value}`}</Link>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Total Responses",
      dataIndex: "totalResponses",
      key: "totalResponses",
    },
  ];

  useEffect(() => {
    async function fetchForms() {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/forms`
      );
      const formData = res.data.map((f, index) => {
        return {
          key: index,
          title: f.title,
          url: f._id,
          createdAt: moment(f.createdAt).format("DD/MM/YYYY HH:mm"),
          totalResponses: f.totalResponses,
        };
      });
      setForms(formData);
    }
    fetchForms();
  }, []);

  return (
    <div>
      <div className="list-title">Form List</div>
      <div className="list-table">
        <Table columns={columns} dataSource={forms} />
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => {
            navigate("/create-form");
          }}
        >
          Create Form
        </Button>
      </div>
    </div>
  );
};

export default FormList;
