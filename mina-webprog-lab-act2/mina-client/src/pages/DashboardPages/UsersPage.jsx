import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/users.json';

const roles = ['Admin', 'Editor', 'Viewer'];
const genders = ['Male', 'Female'];
const statuses = ['Active', 'Inactive'];

const emptyForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  role: '',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const cardSx = {
  bgcolor: '#27272a',
  color: '#ffffff',
  border: '2px solid #3f3f46',
  borderRadius: 2,
  boxShadow: 'none',
};

const fieldSx = {
  '& .MuiInputBase-root': { bgcolor: '#18181b', color: '#ffffff' },
  '& .MuiInputLabel-root': { color: '#d4d4d8' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#3f3f46' },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
  '& .MuiSvgIcon-root': { color: '#d4d4d8' },
};

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

const normalizeUser = (user, index) => ({
  id: index + 1,
  ...user,
  role: user.role || 'Viewer',
  gender: user.gender || 'Female',
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const UsersPage = () => {
  const [users, setUsers] = useState(() => usersSeed.map(normalizeUser));
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        [user.firstName, user.lastName, user.email, user.username]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesGender = !genderFilter || user.gender === genderFilter;
      const matchesStatus =
        !statusFilter ||
        (statusFilter === 'Active' ? user.isActive : !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [genderFilter, roleFilter, search, statusFilter, users]);

  const validateForm = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.role) nextErrors.role = 'Select a role';
    if (!form.gender) nextErrors.gender = 'Select a gender';
    if (!/^\d+$/.test(form.age)) nextErrors.age = 'Age must be a number only';
    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be 11 digits';
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }
    if (!form.username.trim()) {
      nextErrors.username = 'Username is required';
    } else if (/\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    const value = field === 'isActive' ? event.target.value === 'Active' : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleAddUser = () => {
    if (!validateForm()) return;

    setUsers((current) => [
      ...current,
      {
        id: current.length + 1,
        ...form,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        age: form.age.trim(),
        contactNumber: form.contactNumber.trim(),
      },
    ]);
    setForm(emptyForm);
    setErrors({});
    setDialogOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 140 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 140 },
    { field: 'username', headerName: 'Username', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.4, minWidth: 220 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            bgcolor: params.value ? '#16a34a' : '#52525b',
            color: '#ffffff',
            fontWeight: 800,
          }}
        />
      ),
    },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Users
        </Typography>
        <Typography sx={{ color: '#d4d4d8' }}>
          Search, filter, and validate user records from users.json.
        </Typography>
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Search users"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="First name, last name, email, or username"
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField select fullWidth label="Role" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} sx={fieldSx}>
                  <MenuItem value="">All roles</MenuItem>
                  {roles.map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField select fullWidth label="Gender" value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)} sx={fieldSx}>
                  <MenuItem value="">All genders</MenuItem>
                  {genders.map((gender) => <MenuItem key={gender} value={gender}>{gender}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <TextField select fullWidth label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} sx={fieldSx}>
                  <MenuItem value="">All statuses</MenuItem>
                  {statuses.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setDialogOpen(true)}
                  sx={{ height: '100%', minHeight: 56, bgcolor: '#f97316', fontWeight: 900, '&:hover': { bgcolor: '#ea580c' } }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ height: 520, width: '100%' }}>
              <DataGrid
                rows={filteredUsers}
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
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { bgcolor: '#27272a', color: '#ffffff', border: '2px solid #3f3f46' },
        }}
      >
        <DialogTitle fontWeight={900}>Add User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" fullWidth value={form.firstName} onChange={handleChange('firstName')} error={Boolean(errors.firstName)} helperText={errors.firstName} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" fullWidth value={form.lastName} onChange={handleChange('lastName')} error={Boolean(errors.lastName)} helperText={errors.lastName} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Username" fullWidth value={form.username} onChange={handleChange('username')} error={Boolean(errors.username)} helperText={errors.username || 'No spaces allowed'} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" type="email" fullWidth value={form.email} onChange={handleChange('email')} error={Boolean(errors.email)} helperText={errors.email} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Age" fullWidth value={form.age} onChange={handleChange('age')} error={Boolean(errors.age)} helperText={errors.age || 'Numbers only'} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField select label="Gender" fullWidth value={form.gender} onChange={handleChange('gender')} error={Boolean(errors.gender)} helperText={errors.gender} sx={fieldSx}>
                {genders.map((gender) => <MenuItem key={gender} value={gender}>{gender}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField select label="Role" fullWidth value={form.role} onChange={handleChange('role')} error={Boolean(errors.role)} helperText={errors.role} sx={fieldSx}>
                {roles.map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Contact Number" fullWidth value={form.contactNumber} onChange={handleChange('contactNumber')} error={Boolean(errors.contactNumber)} helperText={errors.contactNumber || 'Must be 11 digits'} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Password" type="password" fullWidth value={form.password} onChange={handleChange('password')} error={Boolean(errors.password)} helperText={errors.password || 'At least 8 characters'} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Status" fullWidth value={form.isActive ? 'Active' : 'Inactive'} onChange={handleChange('isActive')} sx={fieldSx}>
                {statuses.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Address" fullWidth value={form.address} onChange={handleChange('address')} sx={fieldSx} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: '#d4d4d8' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddUser} sx={{ bgcolor: '#f97316', fontWeight: 900, '&:hover': { bgcolor: '#ea580c' } }}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default UsersPage;
