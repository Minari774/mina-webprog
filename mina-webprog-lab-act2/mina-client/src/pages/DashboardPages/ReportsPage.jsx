import { useRef } from 'react';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const viewData = [4200, 6100, 7800, 9200, 11800, 14300];
const shareData = [1200, 1800, 2600, 3100, 4200, 5100];
const ratingData = [4.1, 4.2, 4.4, 4.35, 4.6, 4.8];
const genreData = [
  { id: 0, value: 35, label: 'Animation', color: '#f97316' },
  { id: 1, value: 25, label: 'Comedy', color: '#facc15' },
  { id: 2, value: 22, label: 'Action', color: '#fb923c' },
  { id: 3, value: 18, label: 'Family', color: '#fdba74' },
];

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

const printChartSx = {
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: '#555' },
  '& .MuiChartsAxis-tickLabel, & .MuiChartsLegend-label': { fill: '#111' },
  '& .MuiChartsGrid-line': { stroke: '#ddd' },
};

const ReportsPage = () => {
  const reportRef = useRef(null);

  const handlePrint = () => {
    const printContent = reportRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>M Movies Reports Summary</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              background: #ffffff;
              color: #111827;
              font-family: Arial, Helvetica, sans-serif;
            }
            .report-shell {
              padding: 32px;
            }
            .report-header {
              border-bottom: 3px solid #f97316;
              margin-bottom: 24px;
              padding-bottom: 16px;
            }
            .report-header h1 {
              margin: 0;
              font-size: 28px;
            }
            .report-header p {
              margin: 8px 0 0;
              color: #555;
            }
            .report-card {
              border: 1px solid #ddd;
              border-radius: 8px;
              margin-bottom: 20px;
              padding: 18px;
              break-inside: avoid;
            }
            .report-card h2 {
              margin: 0 0 8px;
              font-size: 18px;
            }
            .report-card p {
              margin: 0 0 14px;
              color: #555;
              line-height: 1.5;
            }
            svg {
              max-width: 100%;
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box>
          <Typography variant="h4" fontWeight={900}>
            Reports
          </Typography>
          <Typography sx={mutedTextSx}>
            Data visualization for views, ratings, and genre distribution.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ bgcolor: '#f97316', fontWeight: 900, '&:hover': { bgcolor: '#ea580c' } }}
        >
          Print PDF
        </Button>
      </Box>

      <Box ref={reportRef} className="report-shell">
        <Box className="report-header" sx={{ display: { xs: 'none', print: 'block' } }}>
          <Typography component="h1">M Movies Reports Summary</Typography>
          <Typography>Printable dashboard report based on the Lab Activity 5 Reports page design.</Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid item xs={12} lg={7}>
            <Card sx={cardSx} className="report-card">
              <CardContent>
                <Typography variant="h6" fontWeight={800} component="h2">
                  Monthly Views
                </Typography>
                <Typography sx={mutedTextSx}>
                  Views and shares across six months of movie dashboard activity.
                </Typography>
                <Box sx={{ width: '100%', height: 340 }}>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: months }]}
                    series={[
                      { data: viewData, label: 'Views', color: '#f97316' },
                      { data: shareData, label: 'Shares', color: '#facc15' },
                    ]}
                    sx={chartSx}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Card sx={cardSx} className="report-card">
              <CardContent>
                <Typography variant="h6" fontWeight={800} component="h2">
                  Genre Split
                </Typography>
                <Typography sx={mutedTextSx}>
                  Current percentage of movie categories watched by app users.
                </Typography>
                <Box sx={{ width: '100%', height: 340 }}>
                  <PieChart
                    series={[
                      {
                        data: genreData,
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
            <Card sx={cardSx} className="report-card">
              <CardContent>
                <Typography variant="h6" fontWeight={800} component="h2">
                  Average Ratings Trend
                </Typography>
                <Typography sx={mutedTextSx}>
                  Average user rating trend from January to June.
                </Typography>
                <Box sx={{ width: '100%', height: 320 }}>
                  <LineChart
                    xAxis={[{ scaleType: 'point', data: months }]}
                    yAxis={[{ min: 3, max: 5 }]}
                    series={[
                      { data: ratingData, label: 'Ratings', color: '#f97316' },
                    ]}
                    sx={chartSx}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'none' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: months }]}
          series={[
            { data: viewData, label: 'Views', color: '#f97316' },
            { data: shareData, label: 'Shares', color: '#facc15' },
          ]}
          sx={printChartSx}
        />
      </Box>
    </Stack>
  );
};

export default ReportsPage;
