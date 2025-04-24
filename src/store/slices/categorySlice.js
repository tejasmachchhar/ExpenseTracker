import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenseCategories: [
        'Food & Dining',
        'Transportation',
        'Shopping',
        'Entertainment',
        'Bills & Utilities',
        'Health & Medical',
        'Travel',
        'Education',
        'Personal Care',
        'Home',
        'Other'
    ],
    incomeCategories: [
        'Salary',
        'Business',
        'Investments',
        'Freelance',
        'Rental',
        'Gift',
        'Other'
    ]
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addExpenseCategory: (state, action) => {
            if (!state.expenseCategories.includes(action.payload)) {
                state.expenseCategories.push(action.payload);
            }
        },
        addIncomeCategory: (state, action) => {
            if (!state.incomeCategories.includes(action.payload)) {
                state.incomeCategories.push(action.payload);
            }
        },
        removeExpenseCategory: (state, action) => {
            state.expenseCategories = state.expenseCategories.filter(cat => cat !== action.payload);
        },
        removeIncomeCategory: (state, action) => {
            state.incomeCategories = state.incomeCategories.filter(cat => cat !== action.payload);
        }
    }
});

export const { 
    addExpenseCategory, 
    addIncomeCategory, 
    removeExpenseCategory, 
    removeIncomeCategory 
} = categorySlice.actions;

export default categorySlice.reducer;