package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp

@Composable
fun LoginScreen(
    onSignIn: (String) -> Unit = {},
    onGoogleSignIn: () -> Unit = {}
) {
    var phone by remember { mutableStateOf("") }
    var otp by remember { mutableStateOf("") }
    var sent by remember { mutableStateOf(false) }

    Column(
        Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center
    ) {
        Text("Sign in", style = MaterialTheme.typography.headlineMedium)
        Spacer(Modifier.height(20.dp))

        Button(onClick = onGoogleSignIn, modifier = Modifier.fillMaxWidth()) {
            Text("Continue with Google")
        }
        Spacer(Modifier.height(24.dp))
        Text("— or with phone —", style = MaterialTheme.typography.labelMedium)
        Spacer(Modifier.height(12.dp))

        OutlinedTextField(
            value = phone,
            onValueChange = { phone = it },
            label = { Text("Phone (+91...)") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(8.dp))

        if (!sent) {
            Button(
                onClick = { if (phone.length > 6) sent = true },
                modifier = Modifier.fillMaxWidth()
            ) { Text("Send OTP") }
        } else {
            OutlinedTextField(
                value = otp,
                onValueChange = { otp = it },
                label = { Text("OTP") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(Modifier.height(8.dp))
            Button(
                onClick = { if (otp.length >= 6) onSignIn(phone) },
                modifier = Modifier.fillMaxWidth()
            ) { Text("Verify") }
        }
    }
}
