import { Alert, Box } from "@mui/material";

export const ErrorMessage = ({ message }: { message: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{message}</Alert>
    </Box>
);