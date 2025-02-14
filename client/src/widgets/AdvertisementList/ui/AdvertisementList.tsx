import React from "react";
import { Grid } from "@mui/material";
import { AdvertisementCard } from "../../../entities/AdvertisementCard/ui/AdvertisementCard";
import { Advertisement } from "../../../shared/types/advertesementTypes";

interface AdvertisementListProps {
  advertisements: Advertisement[];
}

export const AdvertisementList = ({
  advertisements,
}: AdvertisementListProps) => {
  return (
    <Grid container spacing={3}>
      {advertisements.map((ad) => (
        <Grid item xs={12} sm={6} md={4} key={ad.id}>
          <AdvertisementCard advertisement={ad} />
        </Grid>
      ))}
    </Grid>
  );
};
