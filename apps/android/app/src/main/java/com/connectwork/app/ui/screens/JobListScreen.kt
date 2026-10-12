package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.connectwork.app.data.Job

@Composable
fun JobListScreen(
    jobs: List<Job>,
    onOpen: (Job) -> Unit = {}
) {
    LazyColumn(
        Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item { Text("Open jobs", style = MaterialTheme.typography.headlineSmall) }
        if (jobs.isEmpty()) {
            item { Text("No jobs yet.") }
        }
        items(jobs) { j ->
            ElevatedCard(
                onClick = { onOpen(j) },
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(Modifier.padding(16.dp)) {
                    Text(j.title, style = MaterialTheme.typography.titleMedium)
                    Text(j.category, style = MaterialTheme.typography.labelMedium)
                    if (j.city != null) Text(j.city)
                    if (j.budget != null) Text("₹${j.budget}")
                }
            }
        }
    }
}
