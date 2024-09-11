// ContactUs.js
import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";
import Footer from "../components/Footer";
import NavBar from "../components/UserNavBar";

function ContactUs() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Thank you for contacting us!");
  }

  return (
    <>
      <NavBar />
      <div className="form-page bg-white">
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <FormLabel>Name</FormLabel>
              <TextField fullWidth variant="outlined" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Email</FormLabel>
              <TextField fullWidth type="email" variant="outlined" required />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Message</FormLabel>
              <TextField
                fullWidth
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
