import React from "react";
import NavBar from "../components/UserNavBar";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box, FormLabel } from "@mui/material";

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const CreateEvent = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      start_time: "",
      end_time: "",
      created_by: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Event name is required").max(100),
      description: Yup.string().nullable(),
      location: Yup.string().required("Location is required").max(200),
      start_time: Yup.date().required("Start time is required"),
      end_time: Yup.date().required("End time is required"),
      created_by: Yup.number().required("Creator is required").integer(),
    }),
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        start_time: formatDateTime(values.start_time),
        end_time: formatDateTime(values.end_time),
      };

      console.log("Submitting values:", formattedValues); // Log the values being submitted
      fetch("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Event created successfully");
          } else {
            res.json().then((data) => {
              console.log("Event creation failed", data); // Log the response data
            });
          }
        })
        .catch((error) => {
          console.error("Error creating event:", error); // Log any network errors
        });
    },
  });

  return (
    <div>
      <NavBar />
      <div className="bg-white py-10">
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom className="text-center" mt={4}>
            Create Your Event
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
              }}
            >
              <FormLabel htmlFor="name">Event Name</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                type="text"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="description"
                name="description"
                type="text"
                multiline
                rows={4}
                {...formik.getFieldProps("description")}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />

              <FormLabel htmlFor="location">Location</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="location"
                name="location"
                type="text"
                {...formik.getFieldProps("location")}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />

              <FormLabel htmlFor="start_time">Start Time</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="start_time"
                name="start_time"
                type="datetime-local"
                {...formik.getFieldProps("start_time")}
                error={formik.touched.start_time && Boolean(formik.errors.start_time)}
                helperText={formik.touched.start_time && formik.errors.start_time}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormLabel htmlFor="end_time">End Time</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="end_time"
                name="end_time"
                type="datetime-local"
                {...formik.getFieldProps("end_time")}
                error={formik.touched.end_time && Boolean(formik.errors.end_time)}
                helperText={formik.touched.end_time && formik.errors.end_time}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormLabel htmlFor="created_by">Created By</FormLabel>
              <TextField
                fullWidth
                margin="normal"
                id="created_by"
                name="created_by"
                type="number"
                {...formik.getFieldProps("created_by")}
                error={formik.touched.created_by && Boolean(formik.errors.created_by)}
                helperText={formik.touched.created_by && formik.errors.created_by}
              />

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Event
              </Button>
            </Box>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;
