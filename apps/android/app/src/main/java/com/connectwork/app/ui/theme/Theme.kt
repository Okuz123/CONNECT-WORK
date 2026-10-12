package com.connectwork.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val Light = lightColorScheme(
    primary = Color(0xFF0F52BA),
    onPrimary = Color.White,
    secondary = Color(0xFFD97706),
    tertiary = Color(0xFF0D9488),
    background = Color(0xFFF8FAFC),
    surface = Color.White,
    onSurface = Color(0xFF0F172A),
    error = Color(0xFFEF4444)
)

private val Dark = darkColorScheme(
    primary = Color(0xFF60A5FA),
    secondary = Color(0xFFFBBF24),
    tertiary = Color(0xFF2DD4BF),
    background = Color(0xFF0B1120),
    surface = Color(0xFF131D33),
    onSurface = Color(0xFFF8FAFC)
)

@Composable
fun ConnectWorkTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) Dark else Light,
        content = content
    )
}
