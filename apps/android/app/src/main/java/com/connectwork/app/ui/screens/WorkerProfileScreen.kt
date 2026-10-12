package com.connectwork.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun WorkerProfileScreen(onSave: () -> Unit = {}) {
    var name by remember { mutableStateOf("") }
    var bio by remember { mutableStateOf("") }
    var city by remember { mutableStateOf("") }
    var rate by remember { mutableStateOf("") }
    var skills by remember { mutableStateOf(listOf<String>()) }
    val allSkills = listOf("Plumbing","Electrical","Carpentry","Painting","Cleaning","Tutoring","Driving","Cooking")

    LazyColumn(
        Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item { Text("Get hired — your profile", style = MaterialTheme.typography.headlineSmall) }
        item {
            OutlinedTextField(
                value = name, onValueChange = { name = it },
                label = { Text("Full name") }, modifier = Modifier.fillMaxWidth()
            )
        }
        item {
            OutlinedTextField(
                value = bio, onValueChange = { bio = it },
                label = { Text("Short bio") }, minLines = 3,
                modifier = Modifier.fillMaxWidth()
            )
        }
        item {
            OutlinedTextField(
                value = city, onValueChange = { city = it },
                label = { Text("City") }, modifier = Modifier.fillMaxWidth()
            )
        }
        item {
            OutlinedTextField(
                value = rate, onValueChange = { rate = it },
                label = { Text("Hourly rate (₹)") }, modifier = Modifier.fillMaxWidth()
            )
        }
        item { Text("Skills", style = MaterialTheme.typography.titleMedium) }
        items(allSkills) { skill ->
            val checked = skills.contains(skill)
            Row(Modifier.fillMaxWidth()) {
                Checkbox(
                    checked = checked,
                    onCheckedChange = {
                        skills = if (checked) skills - skill else skills + skill
                    }
                )
                Text(skill)
            }
        }
        item {
            Button(onClick = onSave, modifier = Modifier.fillMaxWidth()) {
                Text("Save profile")
            }
        }
    }
}
