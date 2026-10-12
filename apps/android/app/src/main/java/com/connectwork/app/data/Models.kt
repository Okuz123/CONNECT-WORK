package com.connectwork.app.data

data class User(
    val id: String,
    val name: String,
    val phone: String? = null,
    val email: String? = null,
    val role: String = "customer",
    val skills: List<String> = emptyList(),
    val city: String? = null,
    val hourlyRate: Int? = null,
    val verified: Boolean = false,
    val rating: Double = 0.0,
    val reviewCount: Int = 0
)

data class Job(
    val id: String,
    val title: String,
    val description: String,
    val category: String,
    val budget: Int? = null,
    val city: String? = null,
    val status: String = "open",
    val postedBy: String = ""
)

data class Application(
    val id: String,
    val jobId: String,
    val workerId: String,
    val message: String,
    val status: String = "pending"
)
