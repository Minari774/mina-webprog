import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const cardSx = {
  bgcolor: '#27272a',
  color: '#ffffff',
  border: '2px solid #3f3f46',
  borderRadius: 2,
  boxShadow: 'none',
};
const mutedTextSx = { color: '#d4d4d8' };
const dataGridSx = {
  border: 0,
  color: '#f4f4f5',
  '& .MuiDataGrid-columnHeaders': {
    bgcolor: '#18181b',
    color: '#ffffff',
    borderColor: '#3f3f46',
  },
  '& .MuiDataGrid-cell': { borderColor: '#3f3f46' },
  '& .MuiDataGrid-footerContainer': {
    borderColor: '#3f3f46',
    color: '#d4d4d8',
  },
  '& .MuiTablePagination-root, & .MuiSvgIcon-root': { color: '#d4d4d8' },
  '& .MuiDataGrid-row:hover': { bgcolor: 'rgba(249,115,22,0.08)' },
};

const rows = [
  { id: 1, name: 'Andrea Cruz', email: 'andrea.cruz@example.com', role: 'Admin', status: 'Active', joined: '2026-01-12' },
  { id: 2, name: 'Miguel Santos', email: 'miguel.santos@example.com', role: 'Editor', status: 'Active', joined: '2026-02-03' },
  { id: 3, name: 'Bianca Reyes', email: 'bianca.reyes@example.com', role: 'Viewer', status: 'Pending', joined: '2026-02-18' },
  { id: 4, name: 'Carlo Garcia', email: 'carlo.garcia@example.com', role: 'Editor', status: 'Active', joined: '2026-03-07' },
  { id: 5, name: 'Dianne Lim', email: 'dianne.lim@example.com', role: 'Viewer', status: 'Inactive', joined: '2026-03-26' },
  { id: 6, name: 'Rafael Aquino', email: 'rafael.aquino@example.com', role: 'Viewer', status: 'Active', joined: '2026-04-09' },
];

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 170 },
  { field: 'email', headerName: 'Email', flex: 1.3, minWidth: 230 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => {
      const color = params.value === 'Active' ? 'success' : params.value === 'Pending' ? 'warning' : 'default';
      return <Chip label={params.value} size="small" color={color} />;
    },
  },
  { field: 'joined', headerName: 'Joined', width: 140 },
];

const UsersPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Users
        </Typography>
        <Typography sx={mutedTextSx}>
          User list built with the MUI X Data Grid component.
        </Typography>
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <Box sx={{ height: 470, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              sx={dataGridSx}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UsersPage;
