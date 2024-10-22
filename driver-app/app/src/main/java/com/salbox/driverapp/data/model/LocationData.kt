package com.salbox.driverapp.data.model

data class LocationData(
    val latitude: Double = 0.0,
    val longitude: Double = 0.0,
    val timestamp: Long = System.currentTimeMillis()
)
