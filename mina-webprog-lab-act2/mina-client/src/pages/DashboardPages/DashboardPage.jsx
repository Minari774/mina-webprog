import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

const cardSx = {
  bgcolor: '#27272a',
  color: '#ffffff',
  border: '2px solid #3f3f46',
  borderRadius: 2,
  boxShadow: 'none',
};

const mutedTextSx = { color: '#d4d4d8' };

const chartSx = {
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: '#71717a' },
  '& .MuiChartsAxis-tickLabel, & .MuiChartsLegend-label': { fill: '#d4d4d8' },
  '& .MuiChartsGrid-line': { stroke: '#3f3f46' },
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

const summaryCards = [
  { label: 'Total Movies', value: '128', helper: '+18 this month', icon: <MovieCreationIcon />, color: '#f97316' },
  { label: 'Registered Users', value: '2,840', helper: '+14.2% growth', icon: <PeopleAltIcon />, color: '#fb923c' },
  { label: 'Monthly Views', value: '84.3K', helper: 'Strong traffic', icon: <VisibilityIcon />, color: '#facc15' },
  { label: 'Top Ratings', value: '4.8', helper: 'Average score', icon: <StarIcon />, color: '#fdba74' },
];

const userRows = [
  { id: 1, firstName: 'Jane', lastName: 'Snow', age: 14, fullName: 'Jane Snow' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31, fullName: 'Cersei Lannister' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31, fullName: 'Jaime Lannister' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, fullName: 'Arya Stark' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 30, fullName: 'Daenerys Targaryen' },
];

const userColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', flex: 1, minWidth: 130 },
  { field: 'lastName', headerName: 'Last name', flex: 1, minWidth: 130 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'fullName', headerName: 'Full name', flex: 1.3, minWidth: 180 },
];

const DashboardPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Overview
        </Typography>
        <Typography sx={mutedTextSx}>
          Quick summary of the movie web app activity.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {summaryCards.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.label}>
            <Card sx={{ ...cardSx, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={mutedTextSx}>
                      {card.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={900} sx={{ mt: 1 }}>
                      {card.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: '#18181b',
                      border: `1px solid ${card.color}`,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, color: card.color, fontWeight: 700 }}>
                  {card.helper}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ ...cardSx, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Movie Analytics
              </Typography>
              <Box sx={{ height: 320, width: '100%' }}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
                  series={[
                    { label: 'Movie 1', data: [35, 44, 24, 34], color: '#f97316' },
                    { label: 'Movie 2', data: [51, 6, 49, 30], color: '#facc15' },
                  ]}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ ...cardSx, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Audience Share
              </Typography>
              <Box sx={{ height: 320, width: '100%' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 35, label: 'Kids', color: '#f97316' },
                        { id: 1, value: 25, label: 'Teens', color: '#facc15' },
                        { id: 2, value: 40, label: 'Adults', color: '#fb923c' },
                      ],
                      innerRadius: 0,
                      outerRadius: 105,
                    },
                  ]}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={cardSx}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={800}>
                Users Overview
              </Typography>
              <Typography variant="body2" sx={mutedTextSx}>
                Sample records displayed using MUI X Data Grid.
              </Typography>
            </Box>
            <Chip label="MUI Data Grid" sx={{ bgcolor: '#f97316', color: '#ffffff', fontWeight: 800 }} />
          </Box>
          <Box sx={{ height: 360, width: '100%' }}>
            <DataGrid
              rows={userRows}
              columns={userColumns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5, page: 0 },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              sx={dataGridSx}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default DashboardPage;
