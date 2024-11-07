package com.salbox.salboxdriverapp.data.repository

import android.location.Location
import android.util.Log
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.salbox.salboxdriverapp.data.model.LocationData
import kotlinx.coroutines.tasks.await

/**
 * Repository responsible for handling location data persistence with a backend database.
 * In this implementation, it stores location data in Firebase Realtime Database.
 */
class LocationRepository() {
    private val databaseReference: DatabaseReference = FirebaseDatabase.getInstance().getReference("location")

    /**
     * Sends the location data to the Firebase backend asynchronously.
     *
     * This method creates a LocationData object from the provided [Location] object, logs the
     * location details for debugging, and uploads the data to the specified Firebase Database node.
     *
     * @param location A [Location] object representing the user's current location.
     */
    suspend fun sendLocationToBackend(location: Location) {
        try {
            Log.i("Location", "LAT: ${location.latitude}, LON: ${location.longitude}")
            val locationData = LocationData(location.latitude, location.longitude)
            databaseReference.push().setValue(locationData).await()
        } catch (e: Exception) {
            Log.e("Location", "Failed to send location", e)
        }
    }
}