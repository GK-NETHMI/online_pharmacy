import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(123,31,162,0.7), rgba(236,64,122,0.7))',
  },
});

const ExploreButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E91E63',
  color: 'white',
  borderRadius: '25px',
  padding: '10px 24px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#C2185B',
  },
}));

function AllEmployee() {
  const employees = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Senior Pharmacist',
      description: 'Experienced pharmacist with over 10 years of practice in pharmaceutical care and medication management. Specializes in patient counseling and drug therapy.',
      image: 'https://source.unsplash.com/random/800x600/?pharmacist',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Pharmacy Technician',
      description: 'Certified pharmacy technician with expertise in inventory management and prescription processing. Dedicated to providing excellent customer service.',
      image: 'https://source.unsplash.com/random/800x600/?medical',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Clinical Pharmacist',
      description: 'Clinical pharmacist specializing in medication therapy management and patient care services. Focuses on optimizing patient outcomes through evidence-based practice.',
      image: 'https://source.unsplash.com/random/800x600/?healthcare',
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Pharmacy Assistant',
      description: 'Detail-oriented pharmacy assistant with strong organizational skills. Assists in maintaining pharmacy operations and providing support to the pharmacy team.',
      image: 'https://source.unsplash.com/random/800x600/?medicine',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box mb={6} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Team
        </Typography>
        <ExploreButton variant="contained" size="large">
          Explore Team
        </ExploreButton>
      </Box>

      <Grid container spacing={4}>
        {employees.map((employee) => (
          <Grid item key={employee.id} xs={12} sm={6} md={6} lg={3}>
            <StyledCard>
              <StyledCardMedia
                image={employee.image}
                title={employee.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                  {employee.name}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {employee.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {employee.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Profile
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllEmployee;
