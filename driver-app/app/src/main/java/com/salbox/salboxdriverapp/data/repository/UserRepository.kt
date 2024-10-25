package com.salbox.salboxdriverapp.data.repository

import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.tasks.await

class UserRepository {
    private val firestore = FirebaseFirestore.getInstance()

    suspend fun getUserRoleByEmail(email: String): String? {
        return try {
            val document = firestore.collection("users").whereEqualTo("email", email).get().await()
            if (document.isEmpty) {
                null
            } else {
                document.documents.firstOrNull()?.getString("role")
            }
        } catch (e: Exception) {
            null
        }
    }
}
