import React, { useEffect, useState } from 'react';
import './Transactions.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransaction, updateTransaction, fetchDashboardData } from '../../store/slices/transactionSlice';
import { TransactionTable } from '../common/TransactionTable';
import { TransactionModal } from '../common/TransactionModal';
import { format } from 'date-fns';
import 'react-toastify/dist/ReactToastify.css';
import '../../../src/assets/css/components.css';

export const Transactions = () => {
    const dispatch = useDispatch();
    const { transactions, status, error } = useSelector((state) => state.transactions);
    const { userData } = useSelector((state) => state.transactions);  // Add this line
    const { expenseCategories, incomeCategories } = useSelector((state) => state.categories);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const ITEMS_PER_PAGE = 15;
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination calculations
    const totalPages = Math.ceil((transactions?.data?.length || 0) / ITEMS_PER_PAGE);
    const paginatedTransactions = transactions?.data?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    ) || [];

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [editForm, setEditForm] = useState({
        notes: '',
        category: '',
        amountSpent: '',
        dateTime: '',
        paidTo: '',
        transactionType: ''
    });

    // Function to fetch all data
    const refreshData = async () => {
        setIsRefreshing(true);
        try {
            await dispatch(fetchTransactions()).unwrap();
            await dispatch(fetchDashboardData()).unwrap();
        } catch (error) {
            toast.error('Failed to refresh data');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error('Error fetching transactions. Please try again later.');
        }
    }, [error]);

    const handleView = (transaction) => {
        setSelectedTransaction(transaction);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleEdit = (transaction) => {
        const formattedDateTime = transaction.dateTime ? new Date(transaction.dateTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16);
        
        setSelectedTransaction(transaction);
        setEditForm({
            notes: transaction.notes || '',
            category: transaction.category || '',
            amountSpent: transaction.amountSpent || '',
            dateTime: formattedDateTime,
            paidTo: transaction.paidTo || '',
            transactionType: transaction.transactionType || 'expense'
        });
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await dispatch(deleteTransaction(id)).unwrap();
                toast.success('Transaction deleted successfully');
                refreshData();
            } catch (err) {
                toast.error('Failed to delete transaction');
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTransaction({
                id: selectedTransaction._id,
                formData: editForm
            })).unwrap();
            setIsModalOpen(false);
            toast.success('Transaction updated successfully');
            refreshData();
        } catch (err) {
            toast.error('Failed to update transaction');
        }
    };

    return (
        <div className="main-content">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="page-container">
                <div className="dashboard-header">
                    <h1>Transactions</h1>
                    <div className="user-profile">
                        <span>Welcome, {userData?.firstName} </span>
                        <div className="user-avatar">{`${userData?.firstName?.[0]}${userData?.lastName?.[0]}`}</div>
                    </div>
                </div>

                <div className="section-header">
                    <h2>Your Transactions</h2>
                    <button 
                        onClick={refreshData} 
                        className={`btn btn-outline ${isRefreshing ? 'refreshing' : ''}`}
                        disabled={isRefreshing}
                    >
                        <svg 
                            className="refresh-icon" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 16 16"
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M13.65 2.35A7.958 7.958 0 0 0 8 0a8 8 0 1 0 8 8h-2a6 6 0 1 1-1.35-3.65l1 1V2.35z" 
                                fill="currentColor"
                            />
                        </svg>
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                <TransactionTable 
                    transactions={paginatedTransactions}
                    isLoading={status === 'loading'}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showDelete={true}
                    showPaidTo={true}
                    showType={true}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showPagination={true}
                />
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                transaction={selectedTransaction}
                isEditing={isEditing}
                editForm={editForm}
                onEditChange={setEditForm}
                onUpdate={handleUpdate}
                expenseCategories={expenseCategories}
                incomeCategories={incomeCategories}
            />
        </div>
    );
}
