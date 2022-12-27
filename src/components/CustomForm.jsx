import { Button, Checkbox, Form, Input, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomForm = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [form, setForm] = useState(undefined);

  useEffect(() => {
    async function getForm() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/form/` + slug
        );
        setForm(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getForm();
  });

  const onFinish = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/form/` + slug,
        values
      );
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const renderForm = () => {
    return (
      <>
        {form &&
          form.fields.map((field) => {
            let inputElement;
            switch (field.type) {
              case "text":
                inputElement = <Input />;
                break;
              case "checkbox":
                inputElement = <Checkbox.Group options={field.options} />;
                break;
              case "radio":
                inputElement = <Radio.Group options={field.options} />;
                break;
              default:
                break;
            }

            return (
              <Form.Item
                label={field.label}
                name={field.label}
                key={field.label}
              >
                {inputElement}
              </Form.Item>
            );
          })}
      </>
    );
  };

  return (
    <div>
      <div className="list-title">{form && form.title}</div>
      <div className="custom-form">
        <Form name="custom-form" onFinish={onFinish}>
          {renderForm()}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CustomForm;
