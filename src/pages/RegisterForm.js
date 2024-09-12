import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";
import { constants } from "../constants/constants";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || []
  );

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={formValiadationHelper.registrationSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          const { name, email, password } = values;
          if (registeredUsers.some((user) => user.email === email)) {
            notification.error({
              message: constants.ALREADY_HAVE_AN_ACCOUNT,
            });
            setSubmitting(false);
          } else {
            dispatch(register({ name, email, password }));
            navigate("/");
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
