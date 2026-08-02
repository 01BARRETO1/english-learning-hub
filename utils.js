
const STORAGE_KEY = 'englishHubProgress';

/* ═══════════════════════════════════════════════════════════ */
/* 1. PROGRESO EN LOCALSTORAGE                                 */
/* ═══════════════════════════════════════════════════════════ */

function loadProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (e) { console.warn('Error loading progress:', e); }
    return { completedLessons: {}, quizScores: {} };
}

function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) { console.warn('Error saving progress:', e); }
}

function markLessonComplete(lessonId) {
    const progress = loadProgress();
    progress.completedLessons[lessonId] = true;
    saveProgress(progress);
    showToast('Lección marcada como completada', 'success');
    updateStatsPanel(typeof courseData !== 'undefined' ? courseData : {});
}

function isLessonComplete(lessonId) {
    const progress = loadProgress();
    return !!progress.completedLessons[lessonId];
}

function saveQuizScore(lessonId, score) {
    const progress = loadProgress();
    const current = progress.quizScores[lessonId] || 0;
    if (score > current) {
        progress.quizScores[lessonId] = score;
        saveProgress(progress);
    }
}

function getQuizScore(lessonId) {
    const progress = loadProgress();
    return progress.quizScores[lessonId] || 0;
}

function updateStatsPanel(courseData) {
    const progress = loadProgress();
    let totalLessons = 0, completed = 0, totalQuizzes = 0, totalScore = 0, quizCount = 0;
    
    for (const level in courseData) {
        for (const section in courseData[level]) {
            const lessons = courseData[level][section];
            if (!Array.isArray(lessons)) continue;
            lessons.forEach((_, idx) => {
                totalLessons++;
                const lid = `${level}-${section}-${idx}`;
                if (progress.completedLessons[lid]) completed++;
                if (progress.quizScores[lid]) {
                    totalQuizzes++;
                    totalScore += progress.quizScores[lid];
                }
            });
        }
    }
    
    const avgScore = quizCount > 0 ? Math.round(totalScore / quizCount) : 0;
    
    const elLessons = document.getElementById('stat-lessons');
    const elQuizzes = document.getElementById('stat-quizzes');
    const elScore = document.getElementById('stat-score');
    
    if (elLessons) elLessons.textContent = `${completed}/${totalLessons}`;
    if (elQuizzes) elQuizzes.textContent = totalQuizzes;
    if (elScore) elScore.textContent = `${avgScore}%`;
}

function updateGlobalProgress(level, courseData) {
    const progress = loadProgress();
    let total = 0, completed = 0;
    const levelData = courseData[level];
    if (!levelData) return;
    
    for (const section in levelData) {
        const lessons = levelData[section];
        if (!Array.isArray(lessons)) continue;
        lessons.forEach((_, idx) => {
            total++;
            if (progress.completedLessons[`${level}-${section}-${idx}`]) completed++;
        });
    }
    
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const ring = document.getElementById('global-progress-ring');
    const text = document.getElementById('global-progress-text');
    if (ring) ring.setAttribute('stroke-dasharray', `${pct}, 100`);
    if (text) text.textContent = `${pct}%`;
}

/* ═══════════════════════════════════════════════════════════ */
/* 2. NOTIFICACIONES TOAST                                     */
/* ═══════════════════════════════════════════════════════════ */

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${escapeHtml(message)}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3000);
}

/* ═══════════════════════════════════════════════════════════ */
/* 3. TEMPORIZADOR                                             */
/* ═══════════════════════════════════════════════════════════ */

class Timer {
    constructor(displayEl, seconds, onComplete) {
        this.displayEl = displayEl;
        this.totalSeconds = seconds;
        this.remaining = seconds;
        this.onComplete = onComplete;
        this.interval = null;
        this.elapsed = 0;
    }
    
    start() {
        this.updateDisplay();
        this.interval = setInterval(() => {
            this.remaining--;
            this.elapsed++;
            this.updateDisplay();
            if (this.remaining <= 0) {
                this.stop();
                if (this.onComplete) this.onComplete();
            }
        }, 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    updateDisplay() {
        if (!this.displayEl) return;
        this.displayEl.textContent = '⏱️ ' + formatTime(this.remaining);
        if (this.remaining <= 30) {
            this.displayEl.style.color = 'var(--danger)';
        }
    }
    
    getElapsed() {
        return this.elapsed;
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

/* ═══════════════════════════════════════════════════════════ */
/* 4. UTILIDADES GENERALES                                     */
/* ═══════════════════════════════════════════════════════════ */

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getOptionLetter(index) {
    return String.fromCharCode(65 + index); // A, B, C, D...
}

/* Toggle modo oscuro */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    // Cargar preferencia guardada
    if (localStorage.getItem('englishHubDarkMode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('englishHubDarkMode', 'false');
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('englishHubDarkMode', 'true');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
});

