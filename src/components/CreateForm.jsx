import { Button, Form, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [addFieldForm] = Form.useForm();
  const columns = [
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
    },
  ];

  const onClickAddField = () => {
    addFieldForm.resetFields();
    setShowOptions(false);
    setIsModalOpen(true);
  };

  const onFieldTypeSelected = (value) => {
    if (value !== "text") setShowOptions(true);
    else setShowOptions(false);
  };

  const onClickSaveField = (values) => {
    let options;
    if (values.options) options = values.options.split(/\r?\n/);
    const fieldValues = { ...values, options };
    setFields((fields) => [...fields, fieldValues]);
    setFormFields((fields) => [...fields, { ...values, key: fields.length }]);
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const formData = { ...values, fields };
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/form`, formData);
    navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderFields = () => {
    return (
      <div>
        <div className="fields-title">Questions</div>
        <Table columns={columns} dataSource={formFields} pagination={false} />
      </div>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        title="Add Question"
        open={isModalOpen}
        footer={[
          <Button key="submit" type="primary" onClick={addFieldForm.submit}>
            Add Question
          </Button>,
        ]}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          name="add-field"
          initialValues={{ label: "", type: "text", options: "" }}
          form={addFieldForm}
          onFinish={onClickSaveField}
        >
          <Form.Item
            label="Question"
            name="label"
            rules={[{ required: true, message: "Please enter label!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Answer Type"
            name="type"
            rules={[{ required: true, message: "Please select type!" }]}
          >
            <Select onChange={onFieldTypeSelected}>
              <Select.Option value="text">Text</Select.Option>
              <Select.Option value="checkbox">Checkbox</Select.Option>
              <Select.Option value="radio">Radio</Select.Option>
            </Select>
          </Form.Item>
          {showOptions && (
            <Form.Item label="Options" name="options">
              <Input.TextArea
                rows={4}
                placeholder="Enter the options in separate lines"
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <div className="create-form-title">Create Form</div>
      <div className="create-form">
        <Form
          name="basic"
          initialValues={{ title: "", slug: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title!" }]}
          >
            <Input />
          </Form.Item>
          {renderFields()}
          <Form.Item style={{ margin: "16px", textAlign: "right" }}>
            <Button onClick={onClickAddField}>Add Question</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {renderModal()}
      </div>
    </div>
  );
};

export default CreateForm;
