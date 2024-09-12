import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";
import { constants } from "../constants/constants";

const LoginForm = () => {
  const dispatch = useDispatch();
  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || []
  );
  const navigate = useNavigate();

  console.log("registeredUsers", registeredUsers);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={formValiadationHelper.loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          const { email, password } = values;
          const userFound = registeredUsers.find(
            (user) => user.email === email && user.password === password
          );
          if (userFound) {
            notification.success({
              message: constants.LOGIN_SUCCESS_MSG,
              placement: "topRight",
            });
            dispatch(login({ email, password }));
            navigate("/todos");
          } else {
            setSubmitting(false);
            notification.error({
              message: constants.INVALID_CREDENTIALS,
              placement: "topRight",
            });
          }
        } catch (error) {
          setSubmitting(false);
          notification.error({
            message: error,
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
