import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box, FormLabel } from "@mui/material";
import { UserContext } from "./context/UserContext";

function Register() {
  const [refreshPage, setRefreshPage] = useState(false);
  const { register } = useContext(UserContext)

  function handleSubmit(e){
    e.preventDefault();
    const { email, password, name } = formik.values;
    register({ email, password, name })
  }



  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phoneNumber: Yup.string()
        .max(10, "Must be 10 characters or less")
        .required("Required"),
      role: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 200) {
          setRefreshPage(!refreshPage);
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
  });

  return (
    <div className="bg-white py-10">
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <FormLabel style={{ color: "black" }}>First Name</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="firstName"
              name="firstName"
              label="First Name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <FormLabel style={{ color: "black" }}>Last Name</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="lastName"
              name="lastName"
              label="Last Name"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormLabel style={{ color: "black" }}>Email</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email Address"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <FormLabel style={{ color: "black" }}>Phone Number</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <FormLabel style={{ color: "black" }}>Role</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="role"
              name="role"
              label="Role"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />
            <FormLabel style={{ color: "black" }}>Password</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormLabel style={{ color: "black" }}>Confirm Password</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Link to="/login">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
            </Link>
          </form>
        </Box>
        <p className="mt-7">
          Already have an account?
          <Link className="text-sky-800 underline" to="/login">
            Log In
          </Link>
        </p>
      </Container>
    </div>
  );
}

export default Register;
