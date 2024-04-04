# Generated by Django 3.2.13 on 2023-12-19 13:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_threatinfo_signature'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile_pic',
            name='num_assigned_alerts',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile_pic',
            name='num_resolved_alerts',
            field=models.IntegerField(default=0),
        ),
    ]