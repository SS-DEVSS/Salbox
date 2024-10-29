package com.salbox.salboxdriverapp.ui.view

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import com.salbox.salboxdriverapp.databinding.ActivityPermissionsDeniedBinding

class PermissionsDeniedActivity: Activity() {
    private lateinit var binding: ActivityPermissionsDeniedBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initializeBinding()
        restartApp()
    }

    private fun restartApp() {
        val restartButton = findViewById<Button>(binding.restartAppButton.id)
        restartButton.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }

    private fun initializeBinding() {
        binding = ActivityPermissionsDeniedBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}