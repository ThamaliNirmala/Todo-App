import { Table, Button, Checkbox, Modal, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleComplete, deleteTodo } from "../redux/slices/todoSlice";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TodoForm from "../components/TodoForm";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { csvHelper } from "../helpers/csvHelper";
import { GetColumnSearchProps } from "../helpers/searchHelper";
import moment from "moment";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("ADD");
  const [todo, setTodo] = useState({ title: "", description: "" });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      ...GetColumnSearchProps("title"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      ...GetColumnSearchProps("description"),
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
      filters: [
        { text: "Completed", value: true },
        { text: "Incomplete", value: false },
      ],
      onFilter: (value, record) => record.completed === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, todo) => (
        <div className="flex gap-5">
          <div className="flex items-center">
            <Switch
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
              checkedChildren="Complete"
              unCheckedChildren="Incomplete"
            />
          </div>
          <Button
            onClick={() => dispatch(deleteTodo(todo.id))}
            type="primary"
            danger
            ghost
            className="hover:bg-[#ff4d4f] hover:text-white"
          >
            <DeleteOutlined /> Delete
          </Button>
          <Button
            onClick={() => {
              setType("EDIT");
              setTodo(todo);
              setIsModalOpen(true);
            }}
            type="primary"
            ghost
            className="text-[#04AA6D]  border-[#04AA6D] hover:bg-[#04AA6D] hover:text-white"
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
      <div className="pt-28 bg-[#F0F0F9] min-h-screen  ">
        <div className=" mx-auto px-3 md:px-32">
          <div className="flex justify-end mb-4 gap-4">
            <Button
              className=" hover:bg-[#4096ff] hover:text-white"
              type="primary"
              ghost
              onClick={() => {
                setType("ADD");
                setTodo({ title: "", description: "" });
                setIsModalOpen(true);
              }}
            >
              <PlusOutlined /> Add Todo
            </Button>
            <Button onClick={() => csvHelper.handleDownloadCSV(todos)}>
              <DownloadOutlined /> Export as a CSV
            </Button>
          </div>
          <Table
            dataSource={[...todos]
              ?.sort((cur, next) => {
                const curDate = moment(parseInt(cur.id));
                const nextDate = moment(parseInt(next.id));
                return nextDate - curDate;
              })
              .map((todo) => ({
                ...todo,
                key: todo.id,
                completedStatus: todo.completed ? "Completed" : "Incomplete",
              }))}
            columns={columns}
            pagination={true}
            scroll={{
              x: 800,
            }}
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
      </div>
    </>
  );
};

export default TodoList;
