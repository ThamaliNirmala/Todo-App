import { Table, Button, Checkbox, Modal, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleComplete, deleteTodo } from "../redux/slices/todoSlice";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import TodoForm from "../components/TodoForm";
import NavBar from "../components/NavBar";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("ADD");
  const [todo, setTodo] = useState({});

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed, todo) => (
        <Checkbox
          checked={completed}
          onChange={() => dispatch(toggleComplete(todo.id))}
        >
          {completed ? "Completed" : "Incomplete"}
        </Checkbox>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, todo) => (
        <div>
          <Switch
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
            checkedChildren="Complete"
            unCheckedChildren="Incomplete"
            style={{ marginRight: 8 }}
          />
          <Button
            style={{ marginRight: 8 }}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <DeleteOutlined /> Delete
          </Button>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => {
              setType("EDIT");
              setTodo(todo);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined /> Update
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <div className="container">
        <Button
          className=" float-end mb-4"
          onClick={() => {
            setType("ADD");
            setIsModalOpen(true);
          }}
        >
          <PlusOutlined /> Add Todo
        </Button>
        <Table
          dataSource={todos.map((todo) => ({ ...todo, key: todo.id }))}
          columns={columns}
          pagination={true}
        />
        <Modal
          title={`${type === "ADD" ? "Add" : "Update"} Todo Item`}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
          <TodoForm type={type} setIsModalOpen={setIsModalOpen} todo={todo} />
        </Modal>
      </div>
    </>
  );
};

export default TodoList;
