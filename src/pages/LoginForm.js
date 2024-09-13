import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";
import { constants } from "../constants/constants";
import Background from "../assets/bgImg.jpeg";
import Logo from "../assets/logo.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || []
  );
  const navigate = useNavigate();

  return (
    <div className="md:grid md:grid-cols-2 md:h-screen">
      <div
        className="bg-cover bg-center md:block hidden"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="xl:mx-36 md:mx-20 mx-10 md:my-28 my-20">
        <div className="relative flex justify-center ">
          <img src={Logo} class="w-44" alt="CodeQ Logo" />
        </div>
        {/* <h1 className="inter text-center text-4xl font-semibold mb-8 uppercase">Login</h1> */}
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
            <Form className="">
              <Field
                name="email"
                as={Input}
                placeholder="Email"
                className="inter h-9"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <Field
                name="password"
                as={Input.Password}
                placeholder="Password"
                className="mt-7 inter h-9"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <div className="mt-7 text-end ">
                <Link
                  to={"/register"}
                  className="no-underline text-xs font-medium text-[#1565d8] inter"
                >
                  Create Account
                </Link>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button h-9 mt-2"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
