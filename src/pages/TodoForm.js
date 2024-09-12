import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

const todoSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const TodoForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ title: "", description: "" }}
      validationSchema={todoSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addTodo(values));
        resetForm();
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

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Add Todo
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
