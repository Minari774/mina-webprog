import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
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

const ReportsPage = () => {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={900}>
          Reports
        </Typography>
        <Typography sx={mutedTextSx}>
          Data visualization for views, ratings, and genre distribution.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Monthly Views
              </Typography>
              <Box sx={{ width: '100%', height: 340 }}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: months }]}
                  series={[
                    { data: [4200, 6100, 7800, 9200, 11800, 14300], label: 'Views', color: '#f97316' },
                    { data: [1200, 1800, 2600, 3100, 4200, 5100], label: 'Shares', color: '#facc15' },
                  ]}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Genre Split
              </Typography>
              <Box sx={{ width: '100%', height: 340 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 35, label: 'Animation', color: '#f97316' },
                        { id: 1, value: 25, label: 'Comedy', color: '#facc15' },
                        { id: 2, value: 22, label: 'Action', color: '#fb923c' },
                        { id: 3, value: 18, label: 'Family', color: '#fdba74' },
                      ],
                      innerRadius: 48,
                      outerRadius: 110,
                      paddingAngle: 3,
                    },
                  ]}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={cardSx}>
            <CardContent>
              <Typography variant="h6" fontWeight={800}>
                Average Ratings Trend
              </Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <LineChart
                  xAxis={[{ scaleType: 'point', data: months }]}
                  yAxis={[{ min: 3, max: 5 }]}
                  series={[
                    { data: [4.1, 4.2, 4.4, 4.35, 4.6, 4.8], label: 'Ratings', color: '#f97316' },
                  ]}
                  sx={chartSx}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ReportsPage;
