package com.salbox.salboxdriverapp.data.model

data class LocationData(
    val latitude: Double = 0.0,
    val longitude: Double = 0.0,
    val timestamp: Long = System.currentTimeMillis()
)
