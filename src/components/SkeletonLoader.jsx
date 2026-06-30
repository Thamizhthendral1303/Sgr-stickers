import React from "react";
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";

export const CardSkeleton = () => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Skeleton variant="rectangular" height={220} animation="wave" sx={{ bgcolor: "rgba(255,255,255,0.03)" }} />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.03)" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="rectangular" width="40%" height={36} sx={{ borderRadius: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: "rgba(255,255,255,0.03)" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const GridSkeleton = ({ count = 6, xs = 12, sm = 6, md = 4 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid key={index} size={{ xs, sm, md }}>
          <CardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export const GallerySkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Box sx={{ borderRadius: 3, overflow: "hidden", mb: 2 }}>
            <Skeleton variant="rectangular" height={260} animation="wave" sx={{ bgcolor: "rgba(255,255,255,0.03)" }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export const DetailSkeleton = () => {
  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Skeleton variant="text" width="40%" height={60} sx={{ mb: 3, mx: "auto", bgcolor: "rgba(255,255,255,0.03)" }} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4, bgcolor: "rgba(255,255,255,0.03)" }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="text" width="30%" height={30} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="text" width="90%" height={24} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="text" width="92%" height={24} sx={{ mb: 4, bgcolor: "rgba(255,255,255,0.03)" }} />
          <Skeleton variant="rectangular" width="50%" height={50} sx={{ borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)" }} />
        </Grid>
      </Grid>
    </Box>
  );
};
