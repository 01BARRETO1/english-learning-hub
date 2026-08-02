/* ============================================================
   APP.JS - Lógica Principal de la Aplicación
   ============================================================
   Este archivo es el "cerebro" de la app. Controla:
   - Cambio de niveles (A1, A2, B1, B2, C1)
   - Renderizado del menú lateral
   - Renderizado de lecciones
   - Navegación entre lecciones
   - Inicio de quizzes desde las lecciones
   ============================================================ */

// Estado actual de la aplicación
let currentLevel = 'A1';     // Nivel seleccionado (A1 por defecto)
let currentSection = '';     // Sección activa (Grammar, Vocab, etc.)
let currentLessonIndex = 0;  // Índice de la lección actual

// Iconos para cada sección (de FontAwesome)
const sectionIcons = {
    'Grammar': 'fa-spell-check',
    'Vocabulary': 'fa-book',
    'Listening': 'fa-headphones',
    'Reading': 'fa-book-open',
    'Writing': 'fa-pen-fancy',
    'Exam': 'fa-clipboard-check'
};

// Nombres en español para las secciones
const sectionNames = {
    'Grammar': 'Gramática',
    'Vocabulary': 'Vocabulario',
    'Listening': 'Listening',
    'Reading': 'Reading',
    'Writing': 'Writing',
    'Exam': 'Examen'
};

// Colores para cada nivel
const levelColors = {
    'A1': 'var(--level-a1)',
    'A2': 'var(--level-a2)',
    'B1': 'var(--level-b1)',
    'B2': 'var(--level-b2)',
    'C1': 'var(--level-c1)'
};

/* ============================================================
   1. INICIALIZACIÓN
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Configuramos el selector de nivel
    const levelSelect = document.getElementById('level-select');
    levelSelect?.addEventListener('change', (e) => {
        changeLevel(e.target.value);
    });
    
    // Botón "Empezar a Aprender" en la pantalla de bienvenida
    document.getElementById('btn-start-learning')?.addEventListener('click', () => {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('lesson-container').style.display = 'block';
        renderSidebar();
        // Cargamos la primera lección disponible
        loadFirstAvailableLesson();
    });
    
    // Botones rápidos de nivel en la bienvenida
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            levelSelect.value = level;
            changeLevel(level);
            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('lesson-container').style.display = 'block';
            renderSidebar();
            loadFirstAvailableLesson();
        });
    });
    
    // Inicializamos estadísticas
    if (typeof courseData !== 'undefined') {
        updateStatsPanel(courseData);
        updateGlobalProgress(currentLevel, courseData);
    }
});

/* ============================================================
   2. CAMBIO DE NIVEL
   ============================================================ */

/**
 * Cambia el nivel actual y actualiza la interfaz.
 * @param {string} level - Nuevo nivel (A1, A2, B1, B2, C1)
 */
function changeLevel(level) {
    currentLevel = level;
    currentSection = '';
    currentLessonIndex = 0;
    
    // Actualizamos la barra de progreso global
    if (typeof courseData !== 'undefined') {
        updateGlobalProgress(level, courseData);
        updateStatsPanel(courseData);
    }
    
    // Si no estamos en la pantalla de bienvenida, recargamos el sidebar
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen && welcomeScreen.style.display === 'none') {
        renderSidebar();
        loadFirstAvailableLesson();
    }
    
    showToast(`Nivel cambiado a ${level}`, 'info');
}

/* ============================================================
   3. RENDERIZADO DEL MENÚ LATERAL (SIDEBAR)
   ============================================================ */

/**
 * Genera el menú lateral con todas las secciones y lecciones del nivel actual.
 */
function renderSidebar() {
    const list = document.getElementById('section-list');
    if (!list || typeof courseData === 'undefined') return;
    
    list.innerHTML = '';
    const levelData = courseData[currentLevel];
    if (!levelData) return;
    
    // Recorremos cada sección (Grammar, Vocabulary, etc.)
    for (const sectionName in levelData) {
        const lessons = levelData[sectionName];
        if (!Array.isArray(lessons) || lessons.length === 0) continue;
        
        // Contamos lecciones completadas en esta sección
        const progress = loadProgress();
        let completed = 0;
        lessons.forEach((_, idx) => {
            const lid = `${currentLevel}-${sectionName}-${idx}`;
            if (progress.completedLessons[lid]) completed++;
        });
        
        // Creamos el botón de la sección
        const li = document.createElement('li');
        li.className = 'section-item';
        
        const btn = document.createElement('button');
        btn.className = 'section-btn' + (sectionName === currentSection ? ' active' : '');
        btn.innerHTML = `
            <i class="fas ${sectionIcons[sectionName] || 'fa-circle'}"></i>
            <span>${sectionNames[sectionName] || sectionName}</span>
            <span class="section-progress">${completed}/${lessons.length}</span>
        `;
        
        btn.addEventListener('click', () => {
            // Desactivamos todos los botones
            document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSection = sectionName;
            currentLessonIndex = 0;
            renderLesson();
        });
        
        li.appendChild(btn);
        list.appendChild(li);
    }
}

/* ============================================================
   4. RENDERIZADO DE LECCIONES
   ============================================================ */

/**
 * Carga la primera lección disponible del nivel actual.
 */
function loadFirstAvailableLesson() {
    const levelData = courseData[currentLevel];
    if (!levelData) return;
    
    // Buscamos la primera sección que tenga lecciones
    for (const sectionName in levelData) {
        const lessons = levelData[sectionName];
        if (Array.isArray(lessons) && lessons.length > 0) {
            currentSection = sectionName;
            currentLessonIndex = 0;
            renderSidebar();  // Para marcar la sección activa
            renderLesson();
            return;
        }
    }
}

/**
 * Renderiza la lección actual en el área principal de contenido.
 */
function renderLesson() {
    const container = document.getElementById('lesson-container');
    if (!container || !currentSection) return;
    
    const levelData = courseData[currentLevel];
    const lessons = levelData[currentSection];
    const lesson = lessons[currentLessonIndex];
    if (!lesson) return;
    
    const lessonId = `${currentLevel}-${currentSection}-${currentLessonIndex}`;
    const isComplete = isLessonComplete(lessonId);
    const quizScore = getQuizScore(lessonId);
    
    // Construimos el HTML de la lección
    let html = `
        <div class="lesson-header">
            <h2>
                <span class="lesson-level-badge badge-${currentLevel.toLowerCase()}">${currentLevel}</span>
                ${escapeHtml(lesson.title)}
            </h2>
            <p class="lesson-description">${sectionNames[currentSection] || currentSection} - Lección ${currentLessonIndex + 1} de ${lessons.length}</p>
        </div>
    `;
    
    // Si tiene explicación, la mostramos
    if (lesson.explanation) {
        html += `<div class="lesson-card">${lesson.explanation}</div>`;
    }
    
    // Si tiene ejemplos, los listamos
    if (lesson.examples && lesson.examples.length > 0) {
        html += `
            <div class="lesson-card">
                <h3><i class="fas fa-lightbulb"></i> Ejemplos</h3>
                <ul class="examples-list">
                    ${lesson.examples.map(ex => `<li>${escapeHtml(ex)}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Si es Vocabulary, mostramos la tabla
    if (lesson.vocabList && lesson.vocabList.length > 0) {
        html += `
            <div class="lesson-card">
                <h3><i class="fas fa-book"></i> Vocabulario</h3>
                <table class="vocab-table">
                    <thead>
                        <tr><th>Palabra</th><th>Tipo</th><th>Significado</th><th>Ejemplo</th></tr>
                    </thead>
                    <tbody>
                        ${lesson.vocabList.map(v => `
                            <tr>
                                <td class="word-en">${escapeHtml(v.word)} <span class="word-type">(${v.type})</span></td>
                                <td>${escapeHtml(v.meaning)}</td>
                                <td>${escapeHtml(v.example)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Si es Listening/Reading, mostramos el texto
    if (lesson.listeningText) {
        html += `<div class="lesson-card"><h3><i class="fas fa-headphones"></i> Audio / Texto</h3>${lesson.listeningText}</div>`;
    }
    if (lesson.readingText) {
        html += `<div class="lesson-card"><h3><i class="fas fa-book-open"></i> Texto</h3>${lesson.readingText}</div>`;
    }
    
    // Si es Writing, mostramos el prompt
    if (lesson.writingPrompt) {
        html += `
            <div class="lesson-card">
                <h3><i class="fas fa-pen-fancy"></i> Ejercicio de Escritura</h3>
                <div class="writing-prompt">${lesson.writingPrompt}</div>
                <textarea class="writing-textarea" id="writing-area" placeholder="Escribe tu respuesta aquí..."></textarea>
                <div class="writing-word-count" id="word-count">0 palabras (mínimo: ${lesson.wordCount || 50})</div>
                <button class="btn-primary mt-20" onclick="checkWriting()">
                    <i class="fas fa-check"></i> Comprobar
                </button>
            </div>
        `;
        
        // Añadimos listener para contar palabras
        setTimeout(() => {
            const textarea = document.getElementById('writing-area');
            const counter = document.getElementById('word-count');
            if (textarea && counter) {
                textarea.addEventListener('input', () => {
                    const words = textarea.value.trim().split(/\s+/).filter(w => w.length > 0).length;
                    counter.textContent = `${words} palabras (mínimo: ${lesson.wordCount || 50})`;
                    counter.style.color = words >= (lesson.wordCount || 50) ? 'var(--success)' : 'var(--text-muted)';
                });
            }
        }, 0);
    }
    
    // Botones de acción (Practicar, Examen, Marcar completada)
    html += `<div class="lesson-actions">`;
    
    if (lesson.exercises && lesson.exercises.length > 0) {
        html += `
            <button class="btn-primary" onclick="startQuiz(${JSON.stringify(lesson.exercises).replace(/"/g, '&quot;')}, 'Práctica: ${escapeHtml(lesson.title)}', '${lessonId}', false)">
                <i class="fas fa-play"></i> Practicar (${lesson.exercises.length} preguntas)
            </button>
        `;
    }
    
    if (lesson.exam && lesson.exam.length > 0) {
        html += `
            <button class="btn-success" onclick="startQuiz(${JSON.stringify(lesson.exam).replace(/"/g, '&quot;')}, 'Examen: ${escapeHtml(lesson.title)}', '${lessonId}', true)">
                <i class="fas fa-clipboard-check"></i> Hacer Examen (${lesson.exam.length} preguntas)
            </button>
        `;
    }
    
    if (!isComplete) {
        html += `
            <button class="btn-secondary" onclick="markLessonComplete('${lessonId}'); renderLesson();">
                <i class="fas fa-check-circle"></i> Marcar como completada
            </button>
        `;
    } else {
        html += `<span style="color:var(--success); font-weight:600;"><i class="fas fa-check-circle"></i> Completada</span>`;
    }
    
    if (quizScore > 0) {
        html += `<span style="color:var(--primary); font-weight:600;">🏆 Mejor puntuación: ${quizScore}%</span>`;
    }
    
    html += `</div>`;
    
    // Navegación entre lecciones
    html += `
        <div class="lesson-navigation">
            <button class="nav-prev" ${currentLessonIndex === 0 ? 'disabled' : ''} onclick="prevLesson()">
                <i class="fas fa-arrow-left"></i> Anterior
            </button>
            <span class="lesson-counter">${currentLessonIndex + 1} / ${lessons.length}</span>
            <button class="nav-next" ${currentLessonIndex === lessons.length - 1 ? 'disabled' : ''} onclick="nextLesson()">
                Siguiente <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    
    container.innerHTML = html;
    container.scrollTop = 0;
}

/**
 * Comprueba el ejercicio de escritura.
 */
function checkWriting() {
    const textarea = document.getElementById('writing-area');
    if (!textarea) return;
    
    const text = textarea.value.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const minWords = parseInt(document.getElementById('word-count')?.dataset.min || 50);
    
    if (words < minWords) {
        showToast(`Necesitas al menos ${minWords} palabras. Tienes ${words}.`, 'error');
        return;
    }
    
    showToast('¡Buen trabajo! Has escrito ' + words + ' palabras. Revisa tu gramática con un profesor.', 'success');
    const lessonId = `${currentLevel}-${currentSection}-${currentLessonIndex}`;
    markLessonComplete(lessonId);
}

/**
 * Pasa a la lección anterior.
 */
function prevLesson() {
    if (currentLessonIndex > 0) {
        currentLessonIndex--;
        renderLesson();
    }
}

/**
 * Pasa a la siguiente lección.
 */
function nextLesson() {
    const lessons = courseData[currentLevel][currentSection];
    if (currentLessonIndex < lessons.length - 1) {
        currentLessonIndex++;
        renderLesson();
    }
}





