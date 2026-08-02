/* ============================================================
   QUIZ.JS - Motor de Quizzes y Exámenes
   ============================================================
   Este archivo maneja TODA la lógica de los quizzes:
   - Iniciar un quiz/examen
   - Mostrar preguntas una por una
   - Validar respuestas
   - Calcular puntuación
   - Mostrar resultados finales
   - Guardar progreso en localStorage
   ============================================================ */

// Variables globales del quiz actual
let currentQuiz = null;      // Datos del quiz en curso
let currentQuestion = 0;     // Índice de la pregunta actual
let userAnswers = [];        // Respuestas del usuario
let quizTimer = null;        // Objeto Timer (de utils.js)
let isExam = false;          // true si es examen, false si es práctica

/**
 * Inicia un nuevo quiz o examen.
 * @param {Array} questions - Array de preguntas
 * @param {string} title - Título del quiz
 * @param {string} lessonId - ID único para guardar progreso
 * @param {boolean} examMode - true si es examen tipo test
 */
function startQuiz(questions, title, lessonId, examMode = false) {
    if (!questions || questions.length === 0) {
        showToast('No hay preguntas disponibles', 'error');
        return;
    }
    
    isExam = examMode;
    currentQuiz = {
        questions: questions,
        title: title,
        lessonId: lessonId,
        total: questions.length
    };
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    
    // Mostramos el modal del quiz
    const modal = document.getElementById('quiz-modal');
    const quizTitle = document.getElementById('quiz-title');
    const timerDisplay = document.getElementById('timer-display');
    
    quizTitle.textContent = isExam ? '📝 ' + title : '✏️ ' + title;
    modal.classList.add('active');
    
    // Configuramos el temporizador (3 minutos por cada 5 preguntas)
    const timeLimit = Math.max(60, Math.ceil(questions.length / 5) * 180);
    quizTimer = new Timer(timerDisplay, timeLimit, () => {
        showToast('¡Se acabó el tiempo!', 'warning');
        finishQuiz();
    });
    quizTimer.start();
    
    // Renderizamos la primera pregunta
    renderQuestion();
    updateQuizProgress();
    updateNavButtons();
}

/**
 * Renderiza la pregunta actual en el modal.
 */
function renderQuestion() {
    const q = currentQuiz.questions[currentQuestion];
    const qNumEl = document.getElementById('question-number');
    const qTextEl = document.getElementById('question-text');
    const optionsEl = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback-area');
    
    // Actualizamos el número de pregunta
    qNumEl.textContent = `Pregunta ${currentQuestion + 1} de ${currentQuiz.total}`;
    
    // Mostramos el texto de la pregunta (escapado por seguridad)
    qTextEl.textContent = q.question;
    
    // Limpiamos opciones y feedback anteriores
    optionsEl.innerHTML = '';
    feedbackEl.innerHTML = '';
    feedbackEl.classList.remove('show', 'feedback-correct', 'feedback-incorrect');
    
    // Barajamos las opciones para que no siempre estén en el mismo orden
    // PERO guardamos el índice original para saber cuál es la correcta
    const shuffled = shuffleArray(q.options.map((opt, idx) => ({ text: opt, originalIdx: idx })));
    
    // Creamos botón para cada opción
    shuffled.forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-letter">${getOptionLetter(idx)}</span>
            <span class="option-text">${escapeHtml(item.text)}</span>
        `;
        
        // Si ya respondió esta pregunta, mostramos el estado
        if (userAnswers[currentQuestion] !== null) {
            btn.disabled = true;
            if (item.text === q.correct) {
                btn.classList.add('correct');
            } else if (item.text === userAnswers[currentQuestion] && item.text !== q.correct) {
                btn.classList.add('incorrect');
            }
        } else {
            // Si no ha respondido, añadimos el evento de clic
            btn.addEventListener('click', () => handleAnswer(item.text, q, btn));
        }
        
        optionsEl.appendChild(btn);
    });
    
    // Si ya respondió, mostramos la explicación
    if (userAnswers[currentQuestion] !== null) {
        showFeedback(userAnswers[currentQuestion] === q.correct, q.explanation);
    }
}

/**
 * Maneja cuando el usuario selecciona una respuesta.
 * @param {string} selected - Opción elegida
 * @param {Object} question - Objeto de la pregunta
 * @param {HTMLElement} btnElement - Botón clickeado
 */
function handleAnswer(selected, question, btnElement) {
    // Guardamos la respuesta del usuario
    userAnswers[currentQuestion] = selected;
    
    // Deshabilitamos TODOS los botones de opción
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => {
        btn.disabled = true;
        const btnText = btn.querySelector('.option-text').textContent;
        if (btnText === question.correct) {
            btn.classList.add('correct');
        } else if (btn === btnElement && selected !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Mostramos retroalimentación
    const isCorrect = selected === question.correct;
    showFeedback(isCorrect, question.explanation);
    
    // Si es correcta, sonido/visual de éxito (opcional)
    if (isCorrect) {
        // Pequeña animación de celebración
        btnElement.style.animation = 'pulse 0.5s ease';
    }
}

/**
 * Muestra el mensaje de retroalimentación (correcto/incorrecto).
 */
function showFeedback(isCorrect, explanation) {
    const feedbackEl = document.getElementById('feedback-area');
    feedbackEl.className = 'feedback-area show ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    feedbackEl.innerHTML = `
        <strong>${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</strong><br>
        ${escapeHtml(explanation)}
    `;
}

/**
 * Actualiza la barra de progreso del quiz.
 */
function updateQuizProgress() {
    const fill = document.getElementById('quiz-progress-fill');
    const pct = ((currentQuestion + 1) / currentQuiz.total) * 100;
    fill.style.width = pct + '%';
}

/**
 * Actualiza los botones de navegación (Anterior/Siguiente/Finalizar).
 */
function updateNavButtons() {
    const prevBtn = document.getElementById('btn-prev-question');
    const nextBtn = document.getElementById('btn-next-question');
    const finishBtn = document.getElementById('btn-finish-quiz');
    
    // Botón Anterior: solo habilitado si no estamos en la primera pregunta
    prevBtn.disabled = currentQuestion === 0;
    
    // Si estamos en la última pregunta, mostramos "Finalizar" en vez de "Siguiente"
    if (currentQuestion === currentQuiz.total - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        finishBtn.style.display = 'none';
    }
}

/**
 * Pasa a la siguiente pregunta.
 */
function nextQuestion() {
    if (currentQuestion < currentQuiz.total - 1) {
        currentQuestion++;
        renderQuestion();
        updateQuizProgress();
        updateNavButtons();
    }
}

/**
 * Vuelve a la pregunta anterior.
 */
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
        updateQuizProgress();
        updateNavButtons();
    }
}

/**
 * Finaliza el quiz y muestra los resultados.
 */
function finishQuiz() {
    // Detenemos el temporizador
    if (quizTimer) {
        quizTimer.stop();
    }
    
    // Calculamos resultados
    let correctCount = 0;
    userAnswers.forEach((ans, idx) => {
        if (ans === currentQuiz.questions[idx].correct) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / currentQuiz.total) * 100);
    const passed = percentage >= 60;  // 60% para aprobar
    
    // Guardamos la puntuación si es un examen
    if (isExam && currentQuiz.lessonId) {
        saveQuizScore(currentQuiz.lessonId, percentage);
        if (passed) {
            markLessonComplete(currentQuiz.lessonId);
        }
    }
    
    // Cerramos el modal del quiz
    document.getElementById('quiz-modal').classList.remove('active');
    
    // Mostramos el modal de resultados
    showResults(percentage, correctCount, passed);
}

/**
 * Muestra el modal de resultados con puntuación y revisión.
 */
function showResults(percentage, correctCount, passed) {
    const modal = document.getElementById('results-modal');
    const body = document.getElementById('results-body');
    
    const statusClass = passed ? 'pass' : 'fail';
    const statusMsg = passed ? '¡Felicidades! Has aprobado 🎉' : 'Necesitas practicar más 💪';
    const statusColor = passed ? 'var(--success)' : 'var(--danger)';
    
    body.innerHTML = `
        <div class="results-summary">
            <div class="results-score-circle ${statusClass}">${percentage}%</div>
            <div class="results-message ${statusClass}">${statusMsg}</div>
            <div class="results-details">
                Respondiste ${correctCount} de ${currentQuiz.total} preguntas correctamente.<br>
                Tiempo usado: ${quizTimer ? formatTime(quizTimer.getElapsed()) : 'N/A'}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // Configuramos el botón de revisar respuestas
    const reviewBtn = document.getElementById('btn-review-answers');
    reviewBtn.onclick = () => showReview();
}

/**
 * Muestra la revisión detallada de cada respuesta.
 */
function showReview() {
    const body = document.getElementById('results-body');
    let html = '<div class="review-list">';
    
    currentQuiz.questions.forEach((q, idx) => {
        const userAns = userAnswers[idx] || 'Sin respuesta';
        const isCorrect = userAns === q.correct;
        const itemClass = isCorrect ? 'correct' : 'incorrect';
        const icon = isCorrect ? '✅' : '❌';
        
        html += `
            <div class="review-item ${itemClass}">
                <div class="review-item-header">${icon} Pregunta ${idx + 1}</div>
                <div class="review-question">${escapeHtml(q.question)}</div>
                <div class="review-answer">
                    Tu respuesta: <strong>${escapeHtml(userAns)}</strong> | 
                    Correcta: <strong>${escapeHtml(q.correct)}</strong>
                </div>
                <div class="review-explanation">${escapeHtml(q.explanation)}</div>
            </div>
        `;
    });
    
    html += '</div>';
    body.innerHTML = html;
}

// ═══════════════════════════════════════════════════════════════
// EVENT LISTENERS DE LOS BOTONES DEL QUIZ
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Botón Siguiente
    document.getElementById('btn-next-question')?.addEventListener('click', nextQuestion);
    
    // Botón Anterior
    document.getElementById('btn-prev-question')?.addEventListener('click', prevQuestion);
    
    // Botón Finalizar
    document.getElementById('btn-finish-quiz')?.addEventListener('click', finishQuiz);
    
    // Cerrar quiz (X)
    document.getElementById('close-quiz')?.addEventListener('click', () => {
        if (confirm('¿Seguro que quieres salir? Se perderá tu progreso en este quiz.')) {
            if (quizTimer) quizTimer.stop();
            document.getElementById('quiz-modal').classList.remove('active');
        }
    });
    
    // Cerrar resultados
    document.getElementById('close-results')?.addEventListener('click', () => {
        document.getElementById('results-modal').classList.remove('active');
    });
    
    document.getElementById('btn-close-results')?.addEventListener('click', () => {
        document.getElementById('results-modal').classList.remove('active');
    });
});
