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
import com.salbox.salboxdriverapp.ui.viewmodel.LoginViewModel
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    private lateinit var loginViewModel: LoginViewModel
    private val userRepository = UserRepository()

    private lateinit var auth: FirebaseAuth
    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var googleSignInButton: MaterialButton

    private var googleWebClientId = BuildConfig.GOOGLE_CLIENT_ID

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen()
        setContentView(R.layout.activity_login)

        loginViewModel = ViewModelProvider(this)[(LoginViewModel::class.java)]

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        try {
            initializeGoogleSignInClient()
            initializeViews()
            initializeClickListeners()
            checkGooglePlayServices()
        } catch (e: Exception) {
            Log.e(TAG, "Error during initialization", e)
            showToast("Error initializing sign-in. Please try again.")
        }
    }

    private fun checkGooglePlayServices() {
        val googleApiAvailability = GoogleApiAvailability.getInstance()
        val status = googleApiAvailability.isGooglePlayServicesAvailable(this)

        if (status != ConnectionResult.SUCCESS) {
            Log.e(TAG, "Google Play Services not available: $status")
            if (googleApiAvailability.isUserResolvableError(status)) {
                googleApiAvailability.getErrorDialog(this, status, 2404)?.show()
            }
        } else {
            Log.d(TAG, "Google Play Services is available")
        }
    }

    private fun initializeGoogleSignInClient() {
        try {
            val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(googleWebClientId)
                .requestEmail()
                .build()

            googleSignInClient = GoogleSignIn.getClient(this, gso)

            // Verify configuration
            Log.d(TAG, "Package name: ${applicationContext.packageName}")
            Log.d(TAG, "Google Web Client ID: $googleWebClientId")
        } catch (e: Exception) {
            Log.e(TAG, "Error initializing Google Sign-In client", e)
            throw e
        }
    }

    private fun initializeViews() {
        googleSignInButton = findViewById(R.id.googleSignInButton)
    }

    private fun initializeClickListeners() {
        googleSignInButton.setOnClickListener { signInWithGoogle() }
    }

    private fun signInWithGoogle() {
        try {
            googleSignInClient.signOut().addOnCompleteListener {
                val signInIntent = googleSignInClient.signInIntent
                googleSignInLauncher.launch(signInIntent)
            }.addOnFailureListener { e ->
                Log.e(TAG, "Error signing out previous session", e)
                showToast("Error preparing sign-in. Please try again.")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error during sign in process", e)
            showToast("Sign-in error. Please try again.")
        }
    }

    // Launcher for handling Google Sign-In result
    private val googleSignInLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            if (task.isSuccessful) {
                val account = task.result
                account?.let { firebaseAuthWithGoogle(it) }
                loginViewModel.setUser(account)
            } else {
                showToast(getString(R.string.google_sigin_error))
            }
        } else {
            Log.d("AUTH", result.toString())

        }
    }

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
                                Log.d(TAG, "Checking role for user: $userEmail")
                                val userRole = userRepository.getUserRoleByEmail(userEmail)

                                if (userRole == "admin") {
                                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                    finish()
                                } else {
                                    Log.d(TAG, "Unauthorized role: $userRole")
                                    auth.signOut()
                                    showToast(getString(R.string.unauthorized))
                                }
                            } catch (e: Exception) {
                                Log.e(TAG, "Error checking user role", e)
                                auth.signOut()
                                showToast("Error verifying permissions. Please try again.")
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

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    companion object {
        private const val TAG = "LoginActivity"
    }
}