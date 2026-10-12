package com.connectwork.app.data.repo

import com.connectwork.app.data.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

/**
 * In-memory repository. Swap the body with Firebase Firestore calls later.
 * Kept framework-free so it compiles without Firebase deps.
 */
object JobRepository {
    private val _jobs = MutableStateFlow<List<Job>>(emptyList())
    val jobs: StateFlow<List<Job>> = _jobs

    fun add(job: Job) {
        _jobs.value = _jobs.value + job
    }

    fun remove(id: String) {
        _jobs.value = _jobs.value.filterNot { it.id == id }
    }

    fun seedDemo() {
        if (_jobs.value.isNotEmpty()) return
        _jobs.value = listOf(
            Job("1", "Fix kitchen sink", "Leaking pipe under sink", "Plumbing", 500, "Mumbai"),
            Job("2", "Wire a new room", "Add 3 sockets and 1 fan point", "Electrical", 1500, "Delhi"),
            Job("3", "Paint 2BHK", "Full interior, white", "Painting", 12000, "Bengaluru"),
            Job("4", "Math tutor for class 10", "Twice a week", "Tutoring", 800, "Pune")
        )
    }
}
