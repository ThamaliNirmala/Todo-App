import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { formValiadationHelper } from "../helpers/formValidationHelper";
import { constants } from "../constants/constants";
import Background from "../assets/bgImg.jpeg";
import Logo from "../assets/logo.png";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || []
  );

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
        {/* <h1 className="inter text-center text-4xl font-semibold mb-8 uppercase">
          Register
        </h1> */}
        <div className="relative flex justify-center ">
          <img src={Logo} class="w-44" alt="CodeQ Logo" />
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
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
            <Form className="">
              <Field
                name="name"
                as={Input}
                placeholder="Name"
                className="inter h-9"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                name="email"
                as={Input}
                placeholder="Email"
                className="mt-7 inter h-9"
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

              <Field
                name="confirmPassword"
                as={Input.Password}
                placeholder="Confirm Password"
                className="mt-7 inter h-9"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />

              <div className="mt-7 text-end ">
                <Link
                  to={"/"}
                  className="no-underline text-xs font-medium text-[#1565d8] inter"
                >
                  Already have an account?
                </Link>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button h-9 mt-2"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
