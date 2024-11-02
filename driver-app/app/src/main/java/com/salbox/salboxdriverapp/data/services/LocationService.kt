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

/**
 * LocationService is a foreground service that continuously updates the user's location
 * and sends the data to the backend server.
 */
class LocationService : Service() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private val locationRepository = LocationRepository()

    companion object {
        private const val CHANNEL_ID = "1902"
    }

    /**
     * Called when the service is created. Initializes the location client, starts the
     * foreground service with a notification, and begins requesting location updates.
     */
    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        startForeground(1, createNotification())
        requestLocationUpdates()
    }

    /**
     * Creates a notification channel required for running the service in the foreground.
     */
    private fun createNotificationChannel() {
        val serviceChannel = NotificationChannel(
            CHANNEL_ID,
            "Location Service Channel",
            NotificationManager.IMPORTANCE_LOW
        )
        val manager = getSystemService(NotificationManager::class.java)
        manager?.createNotificationChannel(serviceChannel)
    }


    /**
     * Builds and returns a notification that displays the service's status to the user.
     * This notification is displayed while the service is running in the foreground.
     *
     * @return A Notification instance displaying "Servicio de Ubicación" information.
     */
    private fun createNotification(): Notification {
        val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Servicio de Ubicación")
            .setContentText("Compartiendo ubicación en tiempo real...")
            .setSmallIcon(R.drawable.baseline_location_on_24)
            .setPriority(NotificationCompat.PRIORITY_LOW)

        return notificationBuilder.build()
    }

    /**
     * Sets up and starts requesting location updates from the location client.
     * The location data is sent to the backend every time it updates.
     */
    private fun requestLocationUpdates() {
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.locations.forEach { location ->
                      sendLocationToBackend(location)
                }
            }
        }

        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 500L)
            .setWaitForAccurateLocation(true)
            .setMinUpdateIntervalMillis(500L)
            .setMaxUpdateDelayMillis(100L)
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

    /**
     * Sends the location data to the backend server.
     *
     * @param location The user's current location to be sent to the backend.
     */
    private fun sendLocationToBackend(location: Location) {
        CoroutineScope(Dispatchers.IO).launch {
            locationRepository.sendLocationToBackend(location)
        }
    }

    /**
     * Binding is not used for this service, so this function returns null.
     *
     * @param intent The intent that was used to bind to this service.
     * @return Always returns null since this is not a bound service.
     */
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    /**
     * Called when the service is destroyed. Removes location updates to prevent
     * unnecessary battery usage and stop receiving location callbacks.
     */
    override fun onDestroy() {
        super.onDestroy()
        fusedLocationClient.removeLocationUpdates(locationCallback)
    }
}
