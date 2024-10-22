package com.salbox.driverapp.ui.view

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.auth.FirebaseAuth
import com.salbox.driverapp.BuildConfig
import com.salbox.driverapp.R
import com.salbox.driverapp.ui.viewmodel.LoginViewModel

class LoginActivity : AppCompatActivity() {
    private lateinit var loginViewModel: LoginViewModel
    private lateinit var auth: FirebaseAuth

    private lateinit var verifyCodeInput: TextInputLayout
    private lateinit var verifyButton: Button


    private var accessCode = BuildConfig.ACCESS_C0DE

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen() // Display the splash screen
        setContentView(R.layout.activity_login)

        loginViewModel = ViewModelProvider(this)[LoginViewModel::class.java]

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        initializeViews()
        initializeClickListeners()
    }


    private fun signIn() {
        val code = verifyCodeInput.editText?.text.toString().trim()
        if (code.isNotEmpty() && code == accessCode) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        } else
            showToast(getString(R.string.invalid_verification_code))

    }
    private fun initializeViews() {
        verifyCodeInput = findViewById(R.id.verifyCodeInput)
        verifyButton = findViewById(R.id.verifyButton)
    }

    private fun initializeClickListeners() {
        verifyButton.setOnClickListener { signIn() }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    companion object {
        private const val TAG = "LoginActivity"
    }
}
