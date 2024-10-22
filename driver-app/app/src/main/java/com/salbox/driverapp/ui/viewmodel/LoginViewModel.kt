package com.salbox.driverapp.ui.viewmodel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.firebase.auth.FirebaseAuth

class LoginViewModel : ViewModel() {
    private val _user = MutableLiveData<GoogleSignInAccount?>()
    val user: LiveData<GoogleSignInAccount?> = _user

    private val _idToken = MutableLiveData<String?>()
    val idToken: LiveData<String?> = _idToken

    fun setUser(account: GoogleSignInAccount) {
        _user.value = account
        fetchIdToken()
    }

    private fun fetchIdToken() {
        val firebaseUser = FirebaseAuth.getInstance().currentUser
        firebaseUser?.getIdToken(true)?.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                _idToken.value = task.result?.token // Update LiveData with the token
            } else {
                Log.e("LoginViewModel", "Failed to get ID token", task.exception)
            }
        }
    }
}

