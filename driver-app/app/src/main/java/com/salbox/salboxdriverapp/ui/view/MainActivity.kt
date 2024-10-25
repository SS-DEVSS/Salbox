    package com.salbox.salboxdriverapp.ui.view

    import android.Manifest
    import android.content.Intent
    import android.content.pm.PackageManager
    import android.os.Build
    import android.os.Bundle
    import android.util.Log
    import android.view.View
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
    import com.google.android.material.chip.ChipGroup
    import com.salbox.salboxdriverapp.R
    import com.salbox.salboxdriverapp.data.services.LocationService
    import com.salbox.salboxdriverapp.databinding.ActivityMainBinding
    import com.salbox.salboxdriverapp.ui.viewmodel.LiveLocationButtonState
    import com.salbox.salboxdriverapp.ui.viewmodel.MainViewModel
    import com.salbox.salboxdriverapp.ui.viewmodel.PermissionState

     /**
     * MainActivity is the entry point of the app.
     * Handles permission requests and location sharing functionality.
     */
    class MainActivity : AppCompatActivity() {
        private lateinit var binding: ActivityMainBinding
        private val mainViewModel: MainViewModel by viewModels()

        private lateinit var shareLiveLocationButton: Button
        private lateinit var stopLiveLocationButton: Button

        private lateinit var activeLocationStatusChip: ChipGroup
        private lateinit var inactiveLocationStatusChip: ChipGroup

        /**
         * onCreate is called when the activity is first created.
         * Initializes the UI components and sets up observers and click listeners.
         */
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityMainBinding.inflate(layoutInflater)

            enableEdgeToEdge()
            setContentView(binding.root)

            setupWindowInsets()

            shareLiveLocationButton = findViewById(R.id.share_live_location_button)
            stopLiveLocationButton = findViewById(R.id.stop_live_location_button)
            activeLocationStatusChip = findViewById(R.id.active_location_status_chip)
            inactiveLocationStatusChip = findViewById(R.id.inactive_location_status_chip)


            setupObservers()
            setupClickListeners()

            mainViewModel.checkAndRequestPermissions()

            mainViewModel.setLiveLocationButtonState(LiveLocationButtonState.STOP)
            /*mainViewModel.liveLocationButtonState.observe(this, Observer { state ->
                when(state) {
                    LiveLocationButtonState.STOP -> binding.shareLiveLocationButton.text = getString(R.string.stop_share_live_location)
                    LiveLocationButtonState.SHARE -> binding.shareLiveLocationButton.text = getString(R.string.share_live_location)
                }
            })*/
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
            shareLiveLocationButton.setOnClickListener {
                toggleButtons(true)

                when (mainViewModel.liveLocationButtonState.value) {
                    LiveLocationButtonState.STOP -> {
                        Log.d("LIVE", mainViewModel.liveLocationButtonState.value.toString())
                        mainViewModel.setLiveLocationButtonState(LiveLocationButtonState.SHARE)
                    }
                    LiveLocationButtonState.SHARE -> {
                        Log.d("LIVE", mainViewModel.liveLocationButtonState.value.toString())
                        mainViewModel.setLiveLocationButtonState(LiveLocationButtonState.STOP)
                    }
                    null -> {
                        // Puedes mostrar un mensaje o simplemente salir de la función
                        Log.d("LIVE", "Estado del botón es nulo.")
                        // O puedes establecer un estado por defecto aquí, si es necesario
                    }
                }
                mainViewModel.checkAndRequestPermissions()
            }

            stopLiveLocationButton.setOnClickListener {
                toggleButtons(false)
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
                showToast(getString(R.string.starting_live_location))
            } else {
                requestForegroundServiceLocationPermission()
            }
        }

         private fun toggleButtons(isSharing: Boolean) {
             if(!isSharing) {
                 shareLiveLocationButton.visibility = View.VISIBLE
                 inactiveLocationStatusChip.visibility = View.VISIBLE

                 stopLiveLocationButton.visibility = View.INVISIBLE
                 activeLocationStatusChip.visibility = View.INVISIBLE
             } else {
                 shareLiveLocationButton.visibility = View.INVISIBLE
                 inactiveLocationStatusChip.visibility = View.INVISIBLE

                 stopLiveLocationButton.visibility = View.VISIBLE
                 activeLocationStatusChip.visibility = View.VISIBLE
             }
         }

        /**
         * Displays a Toast message to the user.
         * @param message The message to display
         */
        private fun showToast(message: String) {
            Toast.makeText(this, message, Toast.LENGTH_LONG).show()
        }


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
