package com.salbox.driverapp.ui.view

import android.content.Intent
import android.os.Bundle
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
import com.google.android.gms.common.SignInButton
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.salbox.driverapp.R
import com.salbox.driverapp.data.repository.UserRepository
import com.salbox.driverapp.ui.viewmodel.LoginViewModel
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    private lateinit var loginViewModel: LoginViewModel
    val userRepository = UserRepository()

    private lateinit var auth: FirebaseAuth
    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var googleSignInButton: SignInButton

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen() // Display the splash screen
        setContentView(R.layout.activity_login)

        loginViewModel = ViewModelProvider(this)[(LoginViewModel::class.java)]

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        initializeGoogleSignInClient()
        initializeViews()
        initializeClickListeners()
    }

    private fun initializeGoogleSignInClient() {
        // Configure Google Sign-In
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id)) // Your web client ID from Firebase
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)
    }

    private fun initializeViews() {
        googleSignInButton = findViewById(R.id.googleSignInButton)
    }

    private fun initializeClickListeners() {
        googleSignInButton.setOnClickListener { signInWithGoogle() }
    }

    private fun signInWithGoogle() {
        val signInIntent = googleSignInClient.signInIntent
        googleSignInLauncher.launch(signInIntent)
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
        }
    }

    private fun firebaseAuthWithGoogle(account: GoogleSignInAccount) {
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = FirebaseAuth.getInstance().currentUser
                    if(user != null) {
                        lifecycleScope.launch {
                            val userEmail = user.email.toString()
                            val userRole = userRepository.getUserRoleByEmail(userEmail)
                            if (userRole == "admin") {
                                startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                                finish()
                            } else {
                                FirebaseAuth.getInstance().signOut()
                                showToast(getString(R.string.unauthorized))
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