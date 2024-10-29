package com.salbox.salboxdriverapp.ui.viewmodel

import android.app.Activity
import android.app.Application
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.content.ContextCompat
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.BACKGROUND_LOCATION_PERMISSION_CODE
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.FOREGROUND_LOCATION_PERMISSIONS
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.LOCATION_PERMISSION_CODE
import com.salbox.salboxdriverapp.ui.view.MainActivity.Companion.PERMISSION_BACKGROUND_LOCATION
import com.salbox.salboxdriverapp.data.services.LocationService

/**
 * Represents the different states of location permission that the app can handle.
 */
sealed class PermissionState {
    data object ShowForegroundRationale : PermissionState()   // Show rationale for foreground permission
    data object RequestForegroundPermissions : PermissionState()   // Request foreground location permission
    data object RequestBackgroundPermission : PermissionState()    // Request background location permission
    data object AllPermissionsGranted : PermissionState()  // All necessary permissions granted
    data object PermissionsDenied : PermissionState()  // Show toast with message
}

/**
 * Represents the different states of sharing location button.
 */
sealed class LiveLocationButtonState {
    data object STOP : LiveLocationButtonState()
    data object SHARE : LiveLocationButtonState()
}

/**
 * ViewModel for managing location updates and permission requests in the application.
 * This ViewModel interacts with the LocationRepository and controls location data handling
 * and permissions for accessing the user's location.
 * @param application The Application instance required to access context-dependent services.
 */
class MainViewModel(application: Application) : AndroidViewModel(application) {
    private val _permissionState = MutableLiveData<PermissionState>()
    val permissionState: LiveData<PermissionState> = _permissionState

    private val _liveLocationButtonState = MutableLiveData<LiveLocationButtonState>()
    val liveLocationButtonState: LiveData<LiveLocationButtonState> = _liveLocationButtonState

    /**
     * Verifies the necessary permissions and sets the appropriate [PermissionState] based on
     * the app's current permissions for location access.
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
     * Processes the result of a permission request and updates the [PermissionState] accordingly.
     * @param requestCode The code identifying which permission was requested.
     * @param grantResults The results of the permission request.
     */
    fun handlePermissionResult(requestCode: Int, grantResults: IntArray) {
        when (requestCode) {
            LOCATION_PERMISSION_CODE -> {
                if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                    checkAndRequestPermissions()
                } else {
                    _permissionState.value = PermissionState.PermissionsDenied
                }
            }
            BACKGROUND_LOCATION_PERMISSION_CODE -> {
                if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    _permissionState.value = PermissionState.AllPermissionsGranted
                } else {
                    _permissionState.value = PermissionState.PermissionsDenied
                }
            }
        }
    }

    /**
     * Checks if the app has foreground location permissions granted.
     * @return True if all required foreground permissions are granted, false otherwise.
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

    /**
     * Initiates the location service if all required permissions are granted.
     * @param activity The activity context from which the service is started.
     */
    fun startLocationServiceIfPermitted(activity: Activity) {
        if (hasAllPermissions()) {
            val intent = Intent(activity, LocationService::class.java)
            activity.startService(intent)
        }
    }

    /**
     * Stops the ongoing location service if running.
     * @param activity The activity context from which the service is stopped.
     */
    fun stopLocationService(activity: Activity) {
        val intent = Intent(activity, LocationService::class.java)
        activity.stopService(intent)
    }

    /**
     * Updates the state of the live location button.
     * @param state The new state for the live location button.
     */
    fun setLiveLocationButtonState(state: LiveLocationButtonState) {
        _liveLocationButtonState.value = state
    }
}
