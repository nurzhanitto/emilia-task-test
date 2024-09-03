import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TablePagination } from '@mui/material';
import { AppDispatch, TState } from '../../store';
import { getUsersRem, setPage, setRowsPerPage } from '../../store/users.slice';

export const UserTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, page, rowsPerPage } = useSelector((state: TState) => state.users);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(getUsersRem({ skip: newPage * rowsPerPage, limit: rowsPerPage }));
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        dispatch(setRowsPerPage(newRowsPerPage));
        dispatch(setPage(0));
        dispatch(getUsersRem({ skip: 0, limit: newRowsPerPage }));
    };

    return (
        <Box sx={{ padding: '0 16px' }}>
            <TableContainer component={Paper} sx={{ backgroundColor: '#242424', colorScheme: 'light dark', color: 'rgba(255, 255, 255, 0.87)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>Name</TableCell>
                            <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>Phone number</TableCell>
                            <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>Birthday</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.users && users.users.length > 0 ? (
                            users.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{`${user.firstName} ${user.lastName}`}</TableCell>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{user.phone}</TableCell>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>{new Date(user.birthDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.87)' }} colSpan={3}>No users available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    style={{ color: 'rgba(255, 255, 255, 0.87)' }}
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={users.total || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};