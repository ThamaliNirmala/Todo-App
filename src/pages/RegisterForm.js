import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={formValiadationHelper.registrationSchema}
      onSubmit={(values) => {
        const { name, email, password } = values;
        dispatch(register({ name, email, password }));
        navigate("/");
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 container">
          <Field name="name" as={Input} placeholder="Name" />
          <ErrorMessage name="name" component="div" className="text-red-500" />

          <Field name="email" as={Input} placeholder="Email" />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <Field name="password" as={Input.Password} placeholder="Password" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          <Field
            name="confirmPassword"
            as={Input.Password}
            placeholder="Confirm Password"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="text-red-500"
          />

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
