package com.salbox.driverapp.ui.view

import android.Manifest
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Observer
import com.salbox.driverapp.R
import com.salbox.driverapp.ui.viewmodel.MainViewModel
import com.salbox.driverapp.ui.viewmodel.PermissionState

/**
 * MainActivity is the entry point of the app.
 * Handles permission requests and location sharing functionality.
 */
class MainActivity : AppCompatActivity() {
    // ViewModel instance to interact with the business logic and UI data
    private val viewModel: MainViewModel by viewModels()

    /**
     * onCreate is called when the activity is first created.
     * Initializes the UI components and sets up observers and click listeners.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen() // Display the splash screen
        super.onCreate(savedInstanceState)

        enableEdgeToEdge() // Enables edge-to-edge display
        setContentView(R.layout.activity_main)

        setupWindowInsets() // Adjusts the UI layout based on system window insets
        setupObservers() // Observes ViewModel state and handles permission logic
        setupClickListeners() // Set click listeners for buttons

        // Check for permissions when the activity starts
        viewModel.checkAndRequestPermissions()
    }

    /**
     * Sets up window insets for adjusting the padding of the main layout based on system bars (status and navigation bars).
     */
    private fun setupWindowInsets() {
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }

    /**
     * Sets up LiveData observers for the ViewModel's permission state and location updates.
     */
    private fun setupObservers() {
        // Observing changes in permission state
        viewModel.permissionState.observe(this, Observer { state ->
            when (state) {
                is PermissionState.ShowForegroundRationale -> showForegroundPermissionRationale()
                is PermissionState.RequestForegroundPermissions -> requestForegroundPermissions()
                is PermissionState.RequestBackgroundPermission -> showBackgroundPermissionRationale()
                is PermissionState.AllPermissionsGranted -> startLocationSharing()
                is PermissionState.ShowToast -> showToast(state.message)
            }
        })
    }

    /**
     * Sets up click listeners for UI components, e.g., buttons.
     */
    private fun setupClickListeners() {
        findViewById<Button>(R.id.share_live_location_button).setOnClickListener {
            viewModel.checkAndRequestPermissions() // Re-check permissions when button is clicked
        }
    }

    /**
     * Shows a dialog explaining why foreground location permission is required.
     */
    private fun showForegroundPermissionRationale() {
        AlertDialog.Builder(this)
            .setTitle("Location Permission Required")
            .setMessage("This app needs location permission to share your live location. Please grant the permission in the next dialog.")
            .setPositiveButton("OK") { dialog, _ ->
                requestForegroundPermissions()
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
            .show()
    }

    /**
     * Shows a dialog explaining why background location permission is required.
     */
    private fun showBackgroundPermissionRationale() {
        AlertDialog.Builder(this)
            .setTitle("Background Location Permission Required")
            .setMessage("To continue sharing your location while the app is in background, please grant 'Allow all the time' permission in the next dialog.")
            .setPositiveButton("OK") { dialog, _ ->
                requestBackgroundPermission()
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
            .show()
    }

    /**
     * Requests foreground location permissions from the user.
     */
    private fun requestForegroundPermissions() {
        ActivityCompat.requestPermissions(
            this,
            FOREGROUND_LOCATION_PERMISSIONS,
            LOCATION_PERMISSION_CODE
        )
    }

    /**
     * Requests background location permission from the user (only required for Android 10 and above).
     */
    private fun requestBackgroundPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(PERMISSION_BACKGROUND_LOCATION),
            BACKGROUND_LOCATION_PERMISSION_CODE
        )
    }

    /**
     * Handles the result of the permission request dialog.
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        viewModel.handlePermissionResult(requestCode, grantResults) // Passes the results to ViewModel
    }

    /**
     * Displays a Toast message to the user.
     * @param message The message to display
     */
    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }

    /**
     * Starts the location sharing process by invoking the ViewModel to start location updates.
     */
    private fun startLocationSharing() {
        showToast("Starting location sharing...")
        viewModel.startLocationUpdates()
    }

    // Companion object for storing permission-related constants
    companion object {
        const val PERMISSION_BACKGROUND_LOCATION = Manifest.permission.ACCESS_BACKGROUND_LOCATION
        private const val PERMISSION_COARSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION
        private const val PERMISSION_FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION
        const val LOCATION_PERMISSION_CODE = 1902
        const val BACKGROUND_LOCATION_PERMISSION_CODE = 1903

        // Array of foreground location permissions
        val FOREGROUND_LOCATION_PERMISSIONS = arrayOf(
            PERMISSION_FINE_LOCATION,
            PERMISSION_COARSE_LOCATION
        )
    }
}