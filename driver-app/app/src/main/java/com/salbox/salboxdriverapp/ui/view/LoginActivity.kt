package com.salbox.salboxdriverapp.ui.view

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import com.google.android.material.button.MaterialButton
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.salbox.salboxdriverapp.BuildConfig
import com.salbox.salboxdriverapp.R
import com.salbox.salboxdriverapp.data.repository.UserRepository
import kotlinx.coroutines.launch

/**
 * Activity for user login functionality, including Google Sign-In integration.
 *
 * This activity manages user authentication through Google Sign-In and verifies user roles
 * before proceeding to the main application interface. It also handles the display of
 * splash screens and error messages for user feedback.
 */
class LoginActivity : AppCompatActivity() {
    private val userRepository = UserRepository()

    private lateinit var auth: FirebaseAuth
    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var googleSignInButton: MaterialButton

    private var googleWebClientId = BuildConfig.GOOGLE_CLIENT_ID

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen()
        setContentView(R.layout.activity_login)

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        initializeGoogleSignInClient()
        initializeViews()
        initializeClickListeners()
        checkGooglePlayServices()
    }

    /**
     * Initializes the UI components for the activity.
     */
    private fun initializeViews() {
        googleSignInButton = findViewById(R.id.googleSignInButton)
    }

    /**
     * Sets up click listeners for UI components.
     */
    private fun initializeClickListeners() {
        googleSignInButton.setOnClickListener { signInWithGoogle() }
    }

    /**
     * Checks if Google Play Services are available on the device.
     * If not, shows an error dialog or a toast message to the user.
     */
    private fun checkGooglePlayServices() {
        val googleApiAvailability = GoogleApiAvailability.getInstance()
        val status = googleApiAvailability.isGooglePlayServicesAvailable(this)

        if (status != ConnectionResult.SUCCESS) {
            showToast(getString(R.string.google_sigin_error))
            if (googleApiAvailability.isUserResolvableError(status)) {
                googleApiAvailability.getErrorDialog(this, status, 2404)?.show()
            }
        }
    }

    /**
     * Initializes the Google Sign-In client with appropriate options.
     */
    private fun initializeGoogleSignInClient() {
        try {
            val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(googleWebClientId)
                .requestEmail()
                .build()

            googleSignInClient = GoogleSignIn.getClient(this, gso)
        } catch (e: Exception) {
            showToast(getString(R.string.unauthorized))
        }
    }

    /**
     * Initiates Google Sign-In process.
     * Signs out any previously signed-in user before launching the sign-in intent.
     */
    private fun signInWithGoogle() {
        try {
            googleSignInClient.signOut().addOnCompleteListener {
                val signInIntent = googleSignInClient.signInIntent
                googleSignInLauncher.launch(signInIntent)
            }.addOnFailureListener { e ->
                showToast(getString(R.string.unauthorized))
            }
        } catch (e: Exception) {
            showToast(getString(R.string.unauthorized))
        }
    }

    // Activity Result Launcher for Google Sign-In
    private val googleSignInLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            if (task.isSuccessful) {
                val account = task.result
                account?.let { firebaseAuthWithGoogle(it) }
            } else {
                showToast(getString(R.string.google_sigin_error))
            }
        } else {
            showToast(getString(R.string.unauthorized))
        }
    }

    /**
     * Authenticates the user with Firebase using the Google account credentials.
     *
     * If authentication is successful, retrieves the user's role and navigates to the main activity
     * if the user is an admin; otherwise, signs out the user and shows an unauthorized error.
     *
     * @param account The signed-in Google account containing user information.
     */
    private fun firebaseAuthWithGoogle(account: GoogleSignInAccount) {
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser
                    if(user != null) {
                        lifecycleScope.launch {
                            try {
                                val userEmail = user.email.toString()
                                val userRole = userRepository.getUserRoleByEmail(userEmail)
                                if (userRole == "admin") {
                                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                    finish()
                                } else {
                                    auth.signOut()
                                    showToast(getString(R.string.unauthorized))
                                }
                            } catch (e: Exception) {
                                auth.signOut()
                                showToast(getString(R.string.google_sigin_error))
                            }
                        }

                    } else {
                        showToast(getString(R.string.sigin_error))
                    }

                } else {
                    showToast(getString(R.string.sigin_error))
                }
            }
    }
    /**
     * Displays a toast message to the user.
     *
     * @param message The message to display in the toast.
     */

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}