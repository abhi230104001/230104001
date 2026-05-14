import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Stack,
} from "@mui/material";

const notifications = [
  {
    id: 1,
    type: "Placement",
    message: "Amazon interview tomorrow",
    timestamp: "2026-05-14T08:00:00Z",
    read: false,
  },
  {
    id: 2,
    type: "Result",
    message: "Mid semester result declared",
    timestamp: "2026-05-13T10:00:00Z",
    read: true,
  },
  {
    id: 3,
    type: "Event",
    message: "Hackathon starts tonight",
    timestamp: "2026-05-12T15:00:00Z",
    read: false,
  },
  {
    id: 4,
    type: "Placement",
    message: "Google hiring drive",
    timestamp: "2026-05-14T06:00:00Z",
    read: false,
  },
];

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function App() {
  const [data, setData] = useState(notifications);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

const itemsPerPage = 2;

  // Mark notification as read
  const markAsRead = (id) => {
    const updated = data.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );

    setData(updated);
  };

  // Calculate priority
  const calculatePriority = (item) => {
    return weights[item.type] || 0;
  };

  // Filter notifications
  const filteredData =
    filter === "All"
      ? data
      : data.filter((item) => item.type === filter);

  // Sort by priority
  const sortedData = [...filteredData].sort(
    (a, b) => calculatePriority(b) - calculatePriority(a)
  );
  const startIndex = (page - 1) * itemsPerPage;

const paginatedData = sortedData.slice(
  startIndex,
  startIndex + itemsPerPage
);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notification System
      </Typography>

      {/* Filter Buttons */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: 3 }}>
        <Button variant="contained" onClick={() => setFilter("All")}>
          All
        </Button>

        <Button
          variant="contained"
          onClick={() => setFilter("Placement")}
        >
          Placement
        </Button>

        <Button
          variant="contained"
          onClick={() => setFilter("Result")}
        >
          Result
        </Button>

        <Button
          variant="contained"
          onClick={() => setFilter("Event")}
        >
          Event
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {paginatedData.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card
              sx={{
                backgroundColor: item.read ? "#f5f5f5" : "#e3f2fd",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {item.type}
                </Typography>

                <Typography sx={{ marginY: 1 }}>
                  {item.message}
                </Typography>

                <Typography variant="body2">
                  {item.timestamp}
                </Typography>

                <Typography sx={{ marginTop: 1 }}>
                  Priority: {calculatePriority(item)}
                </Typography>

                {!item.read && (
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => markAsRead(item.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack
  direction="row"
  spacing={2}
  sx={{ marginTop: 4 }}
>
  <Button
    variant="contained"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </Button>

  <Typography sx={{ paddingTop: 1 }}>
    Page {page}
  </Typography>

  <Button
    variant="contained"
    disabled={startIndex + itemsPerPage >= sortedData.length}
    onClick={() => setPage(page + 1)}
  >
    Next
  </Button>
</Stack>
    </Container>
  );
}

export default App;
