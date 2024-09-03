import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../types/api";
import { apiConnector } from "../integrations/api.connector";

export const getUsersRem = createAsyncThunk(
    'users/getUsersRem',
    async ({ skip, limit }: { skip: number; limit: number }): Promise<UserResponse> => {
        try {
            return await apiConnector.getUsersWithPagination(skip, limit);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            throw new Error(e)
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {} as UserResponse,
        loading: false,
        error: null as string | null,
        page: 0,
        rowsPerPage: 10,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setRowsPerPage(state, action) {
            state.rowsPerPage = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUsersRem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsersRem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(getUsersRem.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            });
    }
})

export const { setPage, setRowsPerPage } = usersSlice.actions;

