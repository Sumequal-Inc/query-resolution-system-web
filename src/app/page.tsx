'use client';

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleResolve = () => {
    // Simulated response — replace with actual API call later
    if (!query.trim()) {
      setResponse("Please enter a query to resolve.");
      return;
    }
    setResponse(`✅ Answer for: "${query}"\n\nThis is a mock response from the Query Resolution System.`);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        py: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack spacing={5}>
        {/* HEADER */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Query Resolution System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ask a question and get instant AI-powered answers.
          </Typography>
        </Box>

        {/* INPUT */}
        <Stack spacing={3} alignItems="center">
          <TextField
            label="Enter your query"
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleResolve}
            sx={{ width: { xs: "100%", sm: "auto" }, textTransform: "none", px: 4, borderRadius: 999 }}
          >
            Resolve
          </Button>
        </Stack>

        {/* RESPONSE */}
        {response && (
          <Paper elevation={3} sx={{ p: 3, whiteSpace: "pre-line" }}>
            <Typography variant="body1">{response}</Typography>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
