import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function EventCard({ id, event }) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          minWidth: 200,
          marginBottom: 10,
          width: 600
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/events/${event.created_by}`}>
            <Button size="small">Go to {event.name}</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}

export default EventCard;
