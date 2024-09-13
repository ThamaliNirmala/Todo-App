import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/slices/todoSlice";
import { formValiadationHelper } from "../helpers/formValidationHelper";
import { constants } from "../constants/constants";

const TodoForm = ({ type = "ADD", setIsModalOpen, todo }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={todo}
      validationSchema={formValiadationHelper.todoSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          if (type === "ADD") dispatch(addTodo(values));
          else dispatch(updateTodo(values));
          setIsModalOpen(false);
          resetForm();
          notification.success({
            message:
              type === "ADD"
                ? constants.TODO_ADDED_SUCCESS
                : constants.TODO_UPDATED_SUCCESS,
            placement: "topRight",
          });
        } catch (error) {
          notification.error({ message: error, placement: "topRight" });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <Field name="title" as={Input} placeholder="Title" />
          <ErrorMessage name="title" component="div" className="text-red-500" />

          <Field name="description" as={Input} placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />

          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className=" block mx-auto"
          >
            {type === "ADD" ? "Add" : "Update"} Todo
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
