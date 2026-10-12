package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun OwnerScreen(
    onPostJob: () -> Unit = {},
    onViewJobs: () -> Unit = {}
) {
    Column(
        Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Business Owner", style = MaterialTheme.typography.headlineSmall)
        ElevatedCard(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp)) {
                Text("Active jobs", style = MaterialTheme.typography.labelMedium)
                Text("0", style = MaterialTheme.typography.headlineSmall)
            }
        }
        ElevatedCard(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp)) {
                Text("Earnings", style = MaterialTheme.typography.labelMedium)
                Text("₹0", style = MaterialTheme.typography.headlineSmall)
            }
        }
        Button(onClick = onPostJob, modifier = Modifier.fillMaxWidth()) {
            Text("Post a job")
        }
        OutlinedButton(onClick = onViewJobs, modifier = Modifier.fillMaxWidth()) {
            Text("Manage jobs")
        }
    }
}
