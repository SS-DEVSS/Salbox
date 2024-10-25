package com.salbox.salboxdriverapp.data.services

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.IBinder
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.salbox.salboxdriverapp.R
import com.salbox.salboxdriverapp.data.repository.LocationRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class LocationService : Service() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private val locationRepository = LocationRepository()

    companion object {
        private const val CHANNEL_ID = "LocationServiceChannel" // Define your channel ID
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel() // Create the notification channel
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        startForeground(1, createNotification())
        requestLocationUpdates()
    }

    private fun createNotificationChannel() {
        // Create the NotificationChannel only on API 26+ because
        // the NotificationChannel class is new and is not in the
        // support library
        val serviceChannel = NotificationChannel(
            CHANNEL_ID,
            "Location Service Channel",
            NotificationManager.IMPORTANCE_LOW // Set importance level
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager?.createNotificationChannel(serviceChannel)
    }

    private fun createNotification(): Notification {
        val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Location Service")
            .setContentText("Tracking location...")
            .setSmallIcon(R.drawable.baseline_location_on_24)
            .setPriority(NotificationCompat.PRIORITY_LOW)

        return notificationBuilder.build()
    }

    private fun requestLocationUpdates() {
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.locations.forEach { location ->
                    sendLocationToBackend(location)
                }
            }
        }

        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10000L)
            .setWaitForAccurateLocation(false)
            .setMinUpdateIntervalMillis(5000L)
            .setMaxUpdateDelayMillis(20000L)
            .build()

        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null)
    }

    private fun sendLocationToBackend(location: Location) {
        CoroutineScope(Dispatchers.IO).launch {
            locationRepository.sendLocationToBackend(location)
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        fusedLocationClient.removeLocationUpdates(locationCallback)
    }
}
