package com.salbox.salboxdriverapp.ui.viewmodel

import android.annotation.SuppressLint
import android.app.Application
import android.content.pm.PackageManager
import android.location.Location
import android.os.Build
import androidx.core.content.ContextCompat
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.salbox.salboxdriverapp.data.repository.LocationRepository
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.BACKGROUND_LOCATION_PERMISSION_CODE
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.FOREGROUND_LOCATION_PERMISSIONS
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.LOCATION_PERMISSION_CODE
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.PERMISSION_BACKGROUND_LOCATION
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.launch

/**
 * Represents the different states of location permission that the app can handle.
 */
sealed class PermissionState {
    data object ShowForegroundRationale : PermissionState()   // Show rationale for foreground permission
    data object RequestForegroundPermissions : PermissionState()   // Request foreground location permission
    data object RequestBackgroundPermission : PermissionState()    // Request background location permission
    data object AllPermissionsGranted : PermissionState()  // All necessary permissions granted
    data class ShowToast(val message: String) : PermissionState()  // Show toast with message
}

sealed class LiveLocationButtonState {
    data object STOP : LiveLocationButtonState()
    data object SHARE : LiveLocationButtonState()
}

/**
 * ViewModel for handling location updates and permissions in an Android application.
 * Manages the location data, permissions, and interactions with the LocationRepository.
 */
class MainViewModel(application: Application) : AndroidViewModel(application) {
    private val _permissionState = MutableLiveData<PermissionState>()
    val permissionState: LiveData<PermissionState> = _permissionState

    private val _liveLocationButtonState = MutableLiveData<LiveLocationButtonState>()
    val liveLocationButtonState: LiveData<LiveLocationButtonState> = _liveLocationButtonState

    /**
     * Checks if the necessary permissions are granted and sets the appropriate permission state.
     */
    fun checkAndRequestPermissions() {
        when {
            hasAllPermissions() -> {
                _permissionState.value = PermissionState.AllPermissionsGranted
            }
            hasForegroundLocationPermissions() && !hasBackgroundLocationPermission() -> {
                _permissionState.value = PermissionState.RequestBackgroundPermission
            }
            else -> {
                _permissionState.value = PermissionState.RequestForegroundPermissions
            }
        }
    }

    /**
     * Handles the result of the permission request and updates the permission state accordingly.
     * @param requestCode The code identifying the permission request.
     * @param grantResults The result of the permission request.
     */
    fun handlePermissionResult(requestCode: Int, grantResults: IntArray) {
        when (requestCode) {
            LOCATION_PERMISSION_CODE -> {
                if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                    checkAndRequestPermissions()
                } else {
                    _permissionState.value = PermissionState.ShowToast("Location permissions are required to share your location")
                }
            }
            BACKGROUND_LOCATION_PERMISSION_CODE -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    _permissionState.value = PermissionState.AllPermissionsGranted
                } else {
                    _permissionState.value = PermissionState.ShowToast("Background location permission is needed for this feature")
                }
            }
        }
    }

    fun setLiveLocationButtonState(state: LiveLocationButtonState) {
        _liveLocationButtonState.value = state
    }

    /**
     * Checks if the app has foreground location permissions.
     * @return True if foreground location permissions are granted, false otherwise.
     */
    private fun hasForegroundLocationPermissions(): Boolean {
        return FOREGROUND_LOCATION_PERMISSIONS.all {
            ContextCompat.checkSelfPermission(getApplication(), it) == PackageManager.PERMISSION_GRANTED
        }
    }

    /**
     * Checks if the app has background location permission.
     * @return True if background location permission is granted or not required, false otherwise.
     */
    private fun hasBackgroundLocationPermission(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            ContextCompat.checkSelfPermission(
                getApplication(),
                PERMISSION_BACKGROUND_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        } else {
            true
        }
    }

    /**
     * Checks if the app has all required permissions (foreground and background).
     * @return True if all permissions are granted, false otherwise.
     */
    private fun hasAllPermissions(): Boolean {
        return hasForegroundLocationPermissions() && hasBackgroundLocationPermission()
    }
}
