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
import com.connectwork.app.ui.screens.*
import com.connectwork.app.ui.theme.ConnectWorkTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ConnectWorkTheme {
                Surface { AppRoot() }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppRoot() {
    var screen by remember { mutableStateOf("home") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("CONNECT WORK") },
                navigationIcon = {
                    if (screen != "home") {
                        TextButton(onClick = { screen = "home" }) { Text("← Back") }
                    }
                }
            )
        }
    ) { pad ->
        Box(Modifier.padding(pad).fillMaxSize()) {
            when (screen) {
                "home" -> HomeScreen(
                    onCustomer = { screen = "customer" },
                    onWorker = { screen = "worker" },
                    onOwner = { screen = "owner" },
                    onAdmin = { screen = "admin" },
                    onLogin = { screen = "login" }
                )
                "login" -> LoginScreen(onSignIn = { screen = "home" })
                "customer" -> JobListScreen()
                "worker" -> WorkerProfileScreen(onSave = { screen = "home" })
                "owner" -> OwnerScreen(
                    onPostJob = { screen = "post" },
                    onViewJobs = { screen = "jobs" }
                )
                "post" -> PostJobScreen(onPosted = { screen = "jobs" })
                "jobs" -> JobListScreen()
                "admin" -> AdminScreen()
            }
        }
    }
}

@Composable
private fun HomeScreen(
    onCustomer: () -> Unit,
    onWorker: () -> Unit,
    onOwner: () -> Unit,
    onAdmin: () -> Unit,
    onLogin: () -> Unit
) {
    Column(
        Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Welcome", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(8.dp))
        Text("Hire skilled workers. Get hired.", style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(24.dp))
        Button(onClick = onCustomer, Modifier.fillMaxWidth()) { Text("I need to hire") }
        Spacer(Modifier.height(8.dp))
        Button(onClick = onWorker, Modifier.fillMaxWidth()) { Text("I want work") }
        Spacer(Modifier.height(8.dp))
        OutlinedButton(onClick = onOwner, Modifier.fillMaxWidth()) { Text("Business owner") }
        Spacer(Modifier.height(8.dp))
        OutlinedButton(onClick = onAdmin, Modifier.fillMaxWidth()) { Text("Admin") }
        Spacer(Modifier.height(16.dp))
        TextButton(onClick = onLogin) { Text("Sign in") }
    }
}
