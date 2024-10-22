package com.salbox.driverapp.ui.view

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.ViewModelProvider
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.PhoneAuthOptions
import com.google.firebase.auth.PhoneAuthProvider
import com.google.firebase.auth.PhoneAuthCredential
import com.salbox.driverapp.R
import com.salbox.driverapp.ui.viewmodel.LoginViewModel
import java.util.concurrent.TimeUnit

class LoginActivity : AppCompatActivity() {
    private lateinit var loginViewModel: LoginViewModel
    private lateinit var auth: FirebaseAuth

    private lateinit var phoneNumberInput: TextInputLayout
    private lateinit var verifyCodeInput: TextInputLayout
    private lateinit var sendCodeButton: Button
    private lateinit var verifyButton: Button

    private var verificationId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        installSplashScreen() // Display the splash screen
        setContentView(R.layout.activity_login)

        loginViewModel = ViewModelProvider(this).get(LoginViewModel::class.java)

        // Initialize Firebase Auth
        auth = FirebaseAuth.getInstance()

        initializeViews()
        initializeClickListeners()
    }

    private fun sendVerificationCode() {
        val phoneNumber = phoneNumberInput.editText?.text.toString().trim()

        if (phoneNumber.isEmpty()) {
            showToast(R.string.input_phone_number.toString())
            return
        }

        val options = PhoneAuthOptions.newBuilder(auth)
            .setPhoneNumber(phoneNumber) // Phone number to verify
            .setTimeout(60L, TimeUnit.SECONDS) // Timeout duration
            .setActivity(this) // Activity for callback
            .setCallbacks(verificationCallbacks) // OnVerificationStateChangedCallbacks
            .build()

        PhoneAuthProvider.verifyPhoneNumber(options)
    }

    private val verificationCallbacks = object : PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
        override fun onVerificationCompleted(credential: PhoneAuthCredential) {
            signInWithPhoneAuthCredential(credential)
        }

        override fun onVerificationFailed(e: FirebaseException) {
            showToast(getString(R.string.verification_failed))

            if (e is FirebaseAuthInvalidCredentialsException)
                showToast(getString(R.string.invalid_phone_number))
        }

        override fun onCodeSent(verificationId: String, token: PhoneAuthProvider.ForceResendingToken) {
            super.onCodeSent(verificationId, token)
            this@LoginActivity.verificationId = verificationId
            showToast(getString(R.string.code_sent))
        }
    }

    private fun verifyCode() {
        val code = verifyCodeInput.editText?.text.toString().trim()
        if (verificationId != null && code.isNotEmpty()) {
            val credential = PhoneAuthProvider.getCredential(verificationId!!, code)
            signInWithPhoneAuthCredential(credential)
        } else
            showToast(getString(R.string.input_verification_code))

    }

    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                try {
                    if (task.isSuccessful) {
                        startActivity(Intent(this, MainActivity::class.java))
                        finish()
                    } else {
                        if (task.exception is FirebaseAuthInvalidCredentialsException)
                            showToast(getString(R.string.invalid_verification_code))

                    }
                } catch (e: Exception) {
                    showToast(getString(R.string.sigin_error))
                    startActivity(Intent(this, ErrorActivity::class.java))
                    finish()
                }
            }
    }

    private fun initializeViews() {
        phoneNumberInput = findViewById(R.id.phoneNumberInput)
        verifyCodeInput = findViewById(R.id.verifyCodeInput)
        sendCodeButton = findViewById(R.id.sendCodeButton)
        verifyButton = findViewById(R.id.verifyButton)
    }

    private fun initializeClickListeners() {
        sendCodeButton.setOnClickListener { sendVerificationCode() }
        verifyButton.setOnClickListener { verifyCode() }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    companion object {
        private const val TAG = "LoginActivity"
    }
}
