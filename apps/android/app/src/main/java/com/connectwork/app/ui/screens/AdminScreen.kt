package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AdminScreen() {
    val stats = listOf(
        "Users" to "0",
        "Workers" to "0",
        "Owners" to "0",
        "Jobs" to "0",
        "Applications" to "0",
        "Revenue" to "₹0"
    )
    LazyColumn(
        Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item { Text("Admin Panel", style = MaterialTheme.typography.headlineSmall) }
        items(stats) { (k, v) ->
            ElevatedCard(Modifier.fillMaxWidth()) {
                Row(
                    Modifier.padding(16.dp).fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(k)
                    Text(v, style = MaterialTheme.typography.titleMedium)
                }
            }
        }
        item {
            Spacer(Modifier.height(8.dp))
            Text("Pending approvals", style = MaterialTheme.typography.titleMedium)
        }
        item { Text("No pending items.") }
    }
}
