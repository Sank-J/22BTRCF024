import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

const log = (msg) => console.log(`[LOG]: ${msg}`);

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [custom, setCustom] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const [error, setError] = useState("");

  const handleShorten = () => {
    if (!url.startsWith("http")) {
      setError("Invalid URL! Must start with http or https");
      return;
    }
    setError("");

    const code = custom || Math.random().toString(36).substring(2, 8);
    const expiry = new Date(Date.now() + validity * 60000);

    const newLink = {
      original: url,
      short: `http://localhost:3000/${code}`,
      expiry: expiry.toLocaleString(),
    };

    setShortLinks([newLink, ...shortLinks]);
    log(`Shortened ${url} to ${newLink.short}`);
  };

  return (
    <Box>
      <Card elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Shorten Your URL
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Validity (minutes)"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              fullWidth
            />
            <TextField
              label="Custom Shortcode (optional)"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              size="large"
              sx={{ borderRadius: 8 }}
              onClick={handleShorten}
            >
              🚀 Shorten
            </Button>
          </Box>
        </CardContent>
      </Card>

      {shortLinks.map((link, i) => (
        <Card key={i} sx={{ mt: 3, borderRadius: 3 }} elevation={3}>
          <CardContent>
            <Typography>
              <b>🔗 Short:</b>{" "}
              <a href={link.short} target="_blank" rel="noreferrer">
                {link.short}
              </a>
            </Typography>
            <Typography>
              <b>🌍 Original:</b> {link.original}
            </Typography>
            <Typography>
              <b>⏳ Expires:</b> {link.expiry}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
