# Generated by Django 3.0.7 on 2020-07-25 16:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200726_0045'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='team',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='members', to='core.Team'),
        ),
    ]
