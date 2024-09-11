from django.db import models

class Tender(models.Model):
    title = models.CharField(max_length=255)
    bidder_name = models.CharField(max_length=255)
    bidder_link = models.URLField()
    purchase_type = models.CharField(max_length=100)
    announcement_type = models.CharField(max_length=100)
    publication_date = models.DateField()
    submission_deadline = models.DateField()
    cpv_code = models.CharField(max_length=100)

    def __str__(self):
        return self.title
