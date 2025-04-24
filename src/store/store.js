import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './slices/transactionSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        categories: categoryReducer
    }
});