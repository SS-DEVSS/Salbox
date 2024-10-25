    package com.salbox.salboxdriverapp.ui.view

    import android.Manifest
    import android.content.Intent
    import android.content.pm.PackageManager
    import android.os.Build
    import android.os.Bundle
    import android.widget.Button
    import android.widget.Toast
    import androidx.activity.enableEdgeToEdge
    import androidx.activity.viewModels
    import androidx.annotation.RequiresApi
    import androidx.appcompat.app.AlertDialog
    import androidx.appcompat.app.AppCompatActivity
    import androidx.core.app.ActivityCompat
    import androidx.core.content.ContextCompat
    import androidx.core.view.ViewCompat
    import androidx.core.view.WindowInsetsCompat
    import androidx.lifecycle.Observer
    import androidx.lifecycle.ViewModelProvider
    import com.salbox.salboxdriverapp.R
    import com.salbox.salboxdriverapp.data.services.LocationService
    import com.salbox.salboxdriverapp.ui.viewmodel.LoginViewModel
    import com.salbox.salboxdriverapp.ui.viewmodel.MainViewModel
    import com.salbox.salboxdriverapp.ui.viewmodel.PermissionState

    /**
     * MainActivity is the entry point of the app.
     * Handles permission requests and location sharing functionality.
     */
    class MainActivity : AppCompatActivity() {
        // ViewModel instance to interact with the business logic and UI data
        private val mainViewModel: MainViewModel by viewModels()
        private lateinit var loginViewModel: LoginViewModel


        /**
         * onCreate is called when the activity is first created.
         * Initializes the UI components and sets up observers and click listeners.
         */
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)

            enableEdgeToEdge() // Enables edge-to-edge display
            setContentView(R.layout.activity_main)

            setupWindowInsets() // Adjusts the UI layout based on system window insets
            setupObservers() // Observes ViewModel state and handles permission logic
            setupClickListeners() // Set click listeners for buttons

            // Check for permissions when the activity starts
            mainViewModel.checkAndRequestPermissions()

            // Initialize Login ViewModel
            loginViewModel = ViewModelProvider(this)[LoginViewModel::class.java]
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
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        private fun setupObservers() {
            // Observing changes in permission state
            mainViewModel.permissionState.observe(this, Observer { state ->
                when (state) {
                    is PermissionState.ShowForegroundRationale -> showForegroundPermissionRationale()
                    is PermissionState.RequestForegroundPermissions -> requestForegroundPermissions()
                    is PermissionState.RequestBackgroundPermission -> showBackgroundPermissionRationale()
                    is PermissionState.AllPermissionsGranted -> startLocationService()
                    is PermissionState.ShowToast -> showToast(state.message)
                }
            })
        }

        /**
         * Sets up click listeners for UI components, e.g., buttons.
         */
        private fun setupClickListeners() {
            findViewById<Button>(R.id.share_live_location_button).setOnClickListener {
                mainViewModel.checkAndRequestPermissions() // Re-check permissions when button is clicked
            }
        }

        /**
         * Shows a dialog explaining why foreground location permission is required.
         */
        private fun showForegroundPermissionRationale() {
            AlertDialog.Builder(this)
                .setTitle(getString(R.string.required_location_permission_title))
                .setMessage(getString(R.string.required_location_permission_desc))
                .setPositiveButton(getString(R.string.ok)) { dialog, _ ->
                    requestForegroundPermissions()
                    dialog.dismiss()
                }
                .setNegativeButton(getString(R.string.cancel)) { dialog, _ ->
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
                .setTitle(getString(R.string.required_location_bglocation_title))
                .setMessage(getString(R.string.required_location_bglocation_desc))
                .setPositiveButton(getString(R.string.ok)) { dialog, _ ->
                    requestBackgroundPermission()
                    dialog.dismiss()
                }
                .setNegativeButton(getString(R.string.cancel)) { dialog, _ ->
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
         * Requests foreground location service permission from the user.
         */
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        private fun requestForegroundServiceLocationPermission() {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(FOREGROUND_SERVICE_LOCATION),
                FOREGROUND_SERVICE_LOCATION_PERMISSION_CODE
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
            mainViewModel.handlePermissionResult(requestCode, grantResults) // Passes the results to ViewModel
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
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        private fun startLocationService() {
            // Ensure the foreground service location permission is granted
            if (ContextCompat.checkSelfPermission(
                    this,
                    PERMISSION_FINE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(
                    this,
                    FOREGROUND_SERVICE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                val serviceIntent = Intent(this, LocationService::class.java)
                ContextCompat.startForegroundService(this, serviceIntent)
            } else {
                // If foreground service location permission is not granted, request it
                requestForegroundServiceLocationPermission()
            }
        }


        // Companion object for storing permission-related constants
        companion object {
            const val PERMISSION_BACKGROUND_LOCATION = Manifest.permission.ACCESS_BACKGROUND_LOCATION
            private const val PERMISSION_COARSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION
            private const val PERMISSION_FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION
            @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
            private const val FOREGROUND_SERVICE_LOCATION = Manifest.permission.FOREGROUND_SERVICE_LOCATION
            const val LOCATION_PERMISSION_CODE = 1902
            const val BACKGROUND_LOCATION_PERMISSION_CODE = 1903
            const val FOREGROUND_SERVICE_LOCATION_PERMISSION_CODE = 1903

            val FOREGROUND_LOCATION_PERMISSIONS = arrayOf(
                PERMISSION_FINE_LOCATION,
                PERMISSION_COARSE_LOCATION
            )
        }
    }
