"use client";

import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Grid,
} from '@mui/material';

const QueryPage: React.FC = () => {
  const [state, setState] = useState({
    department: 'sales',
    queryType: '',
    query: '',
    error: null,
    loading: false,
    successMessage: null,
  });

  const handleDepartmentChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setState({
      ...state,
      department: e.target.value as string,
      queryType: '',
      query: '',
      error: null,
      successMessage: null,
    });
  };

  const handleQueryTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setState({
      ...state,
      queryType: e.target.value as string,
      error: null,
      successMessage: null,
    });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      query: e.target.value,
      error: null,
      successMessage: null,
    });
  };

  const submitQuery = async (department: string, queryType: string, query: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (query === 'error') {
          reject('Mock error from the backend');
        } else {
          resolve('Query submitted successfully');
        }
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.queryType || !state.query.trim()) {
      setState({ ...state, error: 'Please select a query type and enter details', successMessage: null });
      return;
    }

    setState({ ...state, loading: true, error: null, successMessage: null });

    try {
      const response = await submitQuery(state.department, state.queryType, state.query);
      setState({ ...state, successMessage: response, loading: false });
    } catch (err: any) {
      setState({ ...state, error: err, loading: false });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 4,
            textAlign: 'center',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Raise a Query
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={3}>
            {/* Department */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={state.department}
                  onChange={handleDepartmentChange}
                  label="Department"
                  fullWidth
                >
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="marketing">Marketing and Product</MenuItem>
                  <MenuItem value="ops">OPS and Credits</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                  <MenuItem value="itinfra">IT Infra</MenuItem>
                  <MenuItem value="tech">Tech Team</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Query Type */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Query Type</InputLabel>
                <Select
                  value={state.queryType}
                  onChange={handleQueryTypeChange}
                  label="Query Type"
                  fullWidth
                >
                  {state.department === 'sales' ? [
                    <MenuItem key="headset" value="headset">Headset Issue</MenuItem>,
                    <MenuItem key="system" value="system">System Issue</MenuItem>,
                    <MenuItem key="data" value="data">Data Issue</MenuItem>,
                    <MenuItem key="dialer" value="dialer">Dialer Issue</MenuItem>,
                    <MenuItem key="ticketing" value="ticketing">Ticketing System</MenuItem>,
                    <MenuItem key="hrms" value="hrms">HRMS Portal</MenuItem>,
                  ] : state.department === 'marketing' ? [
                    <MenuItem key="strategy" value="strategy">Marketing Strategy</MenuItem>,
                    <MenuItem key="branding" value="branding">Branding Issue</MenuItem>,
                    <MenuItem key="campaign" value="campaign">Campaign Issue</MenuItem>,
                  ] : state.department === 'tech' ? [
                    <MenuItem key="network" value="network">Network Issue</MenuItem>,
                    <MenuItem key="hardware" value="hardware">Hardware Issue</MenuItem>,
                    <MenuItem key="software" value="software">Software Issue</MenuItem>,
                    <MenuItem key="database" value="database">Database Issue</MenuItem>,
                  ] : null}
                </Select>
              </FormControl>
            </Grid>

            {/* Query Textarea */}
            <Grid item xs={12}>
              <TextField
                id="query"
                label="Query Details"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={state.query}
                onChange={handleQueryChange}
                error={!!state.error}
                helperText={state.error}
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              {state.loading ? (
                <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: '10px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  Submit
                </Button>
              )}
            </Grid>

            {/* Success/Error Messages */}
            {state.successMessage && (
              <Grid item xs={12}>
                <Typography textAlign="center" color="green">
                  {state.successMessage}
                </Typography>
              </Grid>
            )}
            {state.error && (
              <Grid item xs={12}>
                <Typography textAlign="center" color="red">
                  {state.error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default QueryPage;
