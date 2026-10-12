package com.connectwork.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme { AppRoot() }
        }
    }
}

@Composable
fun AppRoot() {
    var screen by remember { mutableStateOf("home") }

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("CONNECT WORK") })
        }
    ) { pad ->
        Column(
            Modifier
                .padding(pad)
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            when (screen) {
                "home" -> {
                    Text("Welcome", style = MaterialTheme.typography.headlineMedium)
                    Spacer(Modifier.height(24.dp))
                    Button(onClick = { screen = "customer" }, Modifier.fillMaxWidth()) {
                        Text("I need to hire")
                    }
                    Spacer(Modifier.height(8.dp))
                    Button(onClick = { screen = "worker" }, Modifier.fillMaxWidth()) {
                        Text("I want work")
                    }
                    Spacer(Modifier.height(8.dp))
                    OutlinedButton(onClick = { screen = "admin" }, Modifier.fillMaxWidth()) {
                        Text("Admin")
                    }
                }
                "customer" -> SimpleScreen("Customer panel", onBack = { screen = "home" })
                "worker" -> SimpleScreen("Worker panel", onBack = { screen = "home" })
                "admin" -> SimpleScreen("Admin panel", onBack = { screen = "home" })
            }
        }
    }
}

@Composable
private fun SimpleScreen(title: String, onBack: () -> Unit) {
    Text(title, style = MaterialTheme.typography.headlineSmall)
    Spacer(Modifier.height(16.dp))
    Button(onClick = onBack) { Text("Back") }
}
