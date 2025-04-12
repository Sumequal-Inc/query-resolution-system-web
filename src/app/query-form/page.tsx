"use client"; 

import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography, Box, MenuItem, Select, InputLabel, FormControl, Paper, Grid } from '@mui/material';

const QueryPage: React.FC = () => {
  const [state, setState] = useState({
    department: 'sales',
    queryType: '',
    query: '',
    error: null,
    loading: false,
    successMessage: null,
  });

  // Handle the department selection
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

  // Handle the query type selection
  const handleQueryTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setState({
      ...state,
      queryType: e.target.value as string,
      error: null,
      successMessage: null,
    });
  };

  // Handle the query input
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      query: e.target.value,
      error: null,
      successMessage: null,
    });
  };

  // Mock backend submission function
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8', padding: 2 }}>
      <Paper sx={{ maxWidth: 600, width: '100%', padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 600, color: 'primary.main' }}>
          Raise a Query
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Department Selector */}
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={state.department}
                  onChange={handleDepartmentChange}
                  label="Department"
                  required
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

            {/* Query Type Selector */}
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Query Type</InputLabel>
                <Select
                  value={state.queryType}
                  onChange={handleQueryTypeChange}
                  label="Query Type"
                  required
                  fullWidth
                >
                  {state.department === 'sales' && (
                    <>
                      <MenuItem value="headset">Headset Issue</MenuItem>
                      <MenuItem value="system">System Issue</MenuItem>
                      <MenuItem value="data">Data Issue</MenuItem>
                      <MenuItem value="dialer">Dialer Issue</MenuItem>
                      <MenuItem value="ticketing">Ticketing System</MenuItem>
                      <MenuItem value="hrms">HRMS Portal</MenuItem>
                    </>
                  )}
                  {state.department === 'marketing' && (
                    <>
                      <MenuItem value="strategy">Marketing Strategy</MenuItem>
                      <MenuItem value="branding">Branding Issue</MenuItem>
                      <MenuItem value="campaign">Campaign Issue</MenuItem>
                    </>
                  )}
                  {state.department === 'tech' && (
                    <>
                      <MenuItem value="network">Network Issue</MenuItem>
                      <MenuItem value="hardware">Hardware Issue</MenuItem>
                      <MenuItem value="software">Software Issue</MenuItem>
                      <MenuItem value="database">Database Issue</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Query Details Input */}
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

            {/* Submit Button */}
            <Grid item xs={12}>
              {state.loading ? (
                <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
              ) : (
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginTop: 2 }}>
                  Submit
                </Button>
              )}
            </Grid>

            {/* Success/Error Message */}
            {state.successMessage && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'green', marginTop: 2 }}>
                  {state.successMessage}
                </Typography>
              </Grid>
            )}
            {state.error && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: 'red', marginTop: 2 }}>
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
