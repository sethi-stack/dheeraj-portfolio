from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D

class Charity(models.Model):
    name = models.CharField(max_length=255)
    location = models.PointField()  # PostGIS Point
    accepts_refrigerated = models.BooleanField(default=False)
    capacity_kg = models.IntegerField()

    def __str__(self):
        return self.name

class Listing(models.Model):
    donor = models.ForeignKey('Donor', on_delete=models.CASCADE)
    food_type = models.CharField(max_length=50)
    weight_kg = models.IntegerField()
    location = models.PointField()
    created_at = models.DateTimeField(auto_now_add=True)

    # Custom Manager for Geospatial Queries
    def find_matches(self, radius_km=20):
        """
        Finds eligible charities within X km.
        """
        return Charity.objects.filter(
            location__distance_lte=(self.location, D(km=radius_km)),
            capacity_kg__gte=self.weight_kg
        ).annotate(
            distance=models.functions.Distance('location', self.location)
        ).order_by('distance')
