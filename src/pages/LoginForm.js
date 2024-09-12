import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";

const LoginForm = () => {
  const dispatch = useDispatch();
  const registeredUser = useSelector(
    (state) => state.auth.registeredUser || {}
  );
  const navigate = useNavigate();

  console.log("authDetails", registeredUser);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={formValiadationHelper.loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        if (
          email === registeredUser?.email &&
          password === registeredUser?.password
        ) {
          notification.success({
            message: "You are logged in successfully",
            placement: "topRight",
          });
          dispatch(login({ email, password }));
          navigate("/todos");
        } else {
          setSubmitting(false);
          notification.error({
            message: "Invalid Credentials",
            placement: "topRight",
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 container">
          <Field name="email" as={Input} placeholder="Email" />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <Field name="password" as={Input.Password} placeholder="Password" />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
          <div>
            <Link to={"/register"}>Create account</Link>
          </div>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
