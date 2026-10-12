package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp

@Composable
fun PostJobScreen(onPost: (String, String, String, String) -> Unit = { _, _, _, _ -> }) {
    var title by remember { mutableStateOf("") }
    var desc by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("") }
    var budget by remember { mutableStateOf("") }

    Column(
        Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Post a job", style = MaterialTheme.typography.headlineSmall)

        OutlinedTextField(
            value = title, onValueChange = { title = it },
            label = { Text("Title") }, modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = desc, onValueChange = { desc = it },
            label = { Text("Description") }, minLines = 3,
            modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = category, onValueChange = { category = it },
            label = { Text("Category") }, modifier = Modifier.fillMaxWidth()
        )
        OutlinedTextField(
            value = budget, onValueChange = { budget = it },
            label = { Text("Budget (₹)") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth()
        )
        Button(
            onClick = { onPost(title, desc, category, budget) },
            modifier = Modifier.fillMaxWidth(),
            enabled = title.isNotBlank() && desc.isNotBlank() && category.isNotBlank()
        ) { Text("Publish") }
    }
}
