import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)

    id("com.google.gms.google-services")
}

android {
    namespace = "com.salbox.driverapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.salbox.driverapp"
        minSdk = 29
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        val keyStoreFile = project.rootProject.file("keys.properties")
        val properties = Properties()
        properties.load(keyStoreFile.inputStream())

        val googleClientId = properties.getProperty("GOOGLE_CLIENT_ID") ?: ""
        val accessCode = properties.getProperty("ACCESS_CODE")

        buildConfigField("String", "GOOGLE_CLIENT_ID", "\"$googleClientId\"")
        buildConfigField("String", "ACCESS_C0DE", "\"$accessCode\"")
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }

    buildFeatures {
        viewBinding = true
        buildConfig = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    // Import the Firebase BoM
    implementation(platform(libs.firebase.bom.v3270))
    implementation(libs.firebase.analytics)
    implementation(libs.firebase.analytics.ktx)
    implementation (libs.firebase.database)
    // Firebase Auth KTX
    implementation(libs.play.services.auth)
    implementation(libs.firebase.auth.ktx)

    // Location
    implementation(libs.play.services.location)

    //Retrofit - APIs and https
    implementation(libs.retrofit)
    implementation(libs.converter.gson)

    // Splash Screen
    implementation(libs.androidx.core.splashscreen)

    // Coroutines - Asynchronous Code
    implementation(libs.kotlinx.coroutines.android)
    //Fragment
    implementation(libs.androidx.fragment.ktx)
    //Activity
    implementation(libs.androidx.activity.ktx)
    // Data binding
    implementation(libs.androidx.databinding.runtime)
    // ViewModel
    implementation(libs.androidx.lifecycle.viewmodel.ktx)
    // LiveData
    implementation(libs.androidx.lifecycle.livedata.ktx)
}
