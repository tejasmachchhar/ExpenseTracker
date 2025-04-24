import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/expense', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/userExpenses');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  'transactions/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/dashboard');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  transactions: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  dashboardData: {
    income: {
      total: 0,
      thisMonth: 0,
      monthlyAverage: 0
    },
    expense: {
      total: 0,
      thisMonth: 0,
      monthlyAverage: 0
    },
    categoryWiseTotal: []
  },
  userData: {
    firstName: localStorage.getItem('username') || '',
    lastName: localStorage.getItem('surname') || ' '
  }
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle addTransaction
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.data.push(action.payload);
      })
      // Handle fetchDashboardData
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUserData } = transactionSlice.actions;
export default transactionSlice.reducer;