package com.salbox.driverapp.ui.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.android.gms.auth.api.signin.GoogleSignInAccount

class LoginViewModel : ViewModel() {
    private val _user = MutableLiveData<GoogleSignInAccount?>()
    val user: LiveData<GoogleSignInAccount?> = _user

    fun setUser(account: GoogleSignInAccount) {
        _user.value = account
    }
}
