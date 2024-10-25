package com.salbox.salboxdriverapp.data.repository

import android.location.Location
import android.util.Log
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.salbox.salboxdriverapp.data.model.LocationData
import kotlinx.coroutines.tasks.await

class LocationRepository() {
    private val databaseReference: DatabaseReference = FirebaseDatabase.getInstance().getReference("location")

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