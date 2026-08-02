

const SECTIONS = [
    { id: 'grammar', name: 'Grammar', icon: '⚙️', desc: 'Gramática completa desde A1 hasta C1. Explicaciones claras con ejercicios interactivos.' },
    { id: 'vocabulary', name: 'Vocabulary', icon: '📖', desc: 'Vocabulario temático por niveles. Palabras clave, definiciones y quizzes con feedback.' },
    { id: 'listening', name: 'Listening', icon: '🎧', desc: 'Practica comprensión auditiva con textos narrativos y preguntas de comprensión.' },
    { id: 'reading', name: 'Reading', icon: '📄', desc: 'Textos variados con preguntas de comprensión. Mejora tu velocidad de lectura.' },
    { id: 'useofenglish', name: 'Use of English', icon: '✅', desc: 'Ejercicios de gramática mixta por nivel. 15 preguntas tipo examen con feedback.' },
    { id: 'writing', name: 'Writing', icon: '✍️', desc: 'Aprende a escribir emails, ensayos, cartas y más. Guías paso a paso por nivel.' }
];

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

// Contar lecciones totales por sección y nivel
const LESSON_COUNTS = {
    grammar: { A1: 5, A2: 5, B1: 5, B2: 5, C1: 5 },
    vocabulary: { A1: 5, A2: 5, B1: 5, B2: 5, C1: 5 },
    listening: { A1: 3, A2: 3, B1: 3, B2: 3, C1: 3 },
    reading: { A1: 3, A2: 3, B1: 3, B2: 3, C1: 3 },
    useofenglish: { A1: 3, A2: 3, B1: 3, B2: 3, C1: 3 },
    writing: { A1: 3, A2: 3, B1: 3, B2: 3, C1: 3 }
};

// Títulos de lecciones
const LESSON_TITLES = {
    grammar: {
        A1: ['Verb TO BE', 'Present Simple', 'Articles A/AN/THE', 'Possessive Adjectives', 'There is / There are'],
        A2: ['Past Simple', 'Present Continuous', 'Going to Future', 'Comparatives & Superlatives', 'Countable & Uncountable Nouns'],
        B1: ['Present Perfect', 'Past Continuous', 'Will Future', 'First Conditional', 'Relative Clauses'],
        B2: ['Present Perfect Continuous', 'Past Perfect', 'Second Conditional', 'Passive Voice', 'Reported Speech'],
        C1: ['Third Conditional', 'Mixed Conditionals', 'Inversion', 'Subjunctive', 'Advanced Passive']
    },
    vocabulary: {
        A1: ['Daily Routines', 'Family Members', 'Food & Drink', 'Numbers & Time', 'Colors & Clothes'],
        A2: ['Transport & Travel', 'Weather & Seasons', 'Jobs & Work', 'Hobbies & Free Time', 'Body & Health'],
        B1: ['Education & Learning', 'Technology', 'Environment', 'Media & News', 'Shopping & Money'],
        B2: ['Personality & Character', 'Relationships', 'Crime & Law', 'Science & Research', 'Art & Culture'],
        C1: ['Abstract Concepts', 'Idioms & Expressions', 'Formal vs Informal', 'Collocations', 'Word Formation']
    },
    listening: {
        A1: ['Introductions & Greetings', 'Shopping Dialogues', 'Asking for Directions'],
        A2: ['Restaurant Conversations', 'Travel Plans', 'Describing People'],
        B1: ['Job Interviews', 'News Reports', 'Phone Conversations'],
        B2: ['Podcasts & Opinions', 'Lectures & Talks', 'Debates & Discussions'],
        C1: ['Academic Lectures', 'Complex Narratives', 'Accents & Dialects']
    },
    reading: {
        A1: ['Short Messages', 'Simple Notices', 'Basic Emails'],
        A2: ['Short Articles', 'Hotel Descriptions', 'Event Posters'],
        B1: ['Blog Posts', 'Product Reviews', 'Travel Guides'],
        B2: ['News Articles', 'Opinion Pieces', 'Short Stories'],
        C1: ['Literary Texts', 'Academic Papers', 'Critical Essays']
    },
    useofenglish: {
        A1: ['Basic Grammar Mix 1', 'Basic Grammar Mix 2', 'Basic Grammar Mix 3'],
        A2: ['Elementary Grammar Mix 1', 'Elementary Grammar Mix 2', 'Elementary Grammar Mix 3'],
        B1: ['Intermediate Grammar Mix 1', 'Intermediate Grammar Mix 2', 'Intermediate Grammar Mix 3'],
        B2: ['Upper-Intermediate Mix 1', 'Upper-Intermediate Mix 2', 'Upper-Intermediate Mix 3'],
        C1: ['Advanced Grammar Mix 1', 'Advanced Grammar Mix 2', 'Advanced Grammar Mix 3']
    },
    writing: {
        A1: ['Writing Simple Sentences', 'Filling Forms', 'Short Messages'],
        A2: ['Writing Emails', 'Describing Places', 'Writing a Postcard'],
        B1: ['Writing an Essay', 'Formal Letters', 'Writing Reviews'],
        B2: ['Argumentative Essays', 'Reports', 'Articles for Publication'],
        C1: ['Academic Writing', 'Proposals', 'Critical Reviews']
    }
};



//themes_part2 
// ============================================
// FUNCIONES DE ACCESO
// ============================================

function getSection(sectionId) {
    return SECTIONS.find(s => s.id === sectionId);
}

function getAllSections() {
    return SECTIONS;
}

function getLessonTitles(sectionId, level) {
    return LESSON_TITLES[sectionId]?.[level] || [];
}

function getLessonCount(sectionId, level) {
    return LESSON_COUNTS[sectionId]?.[level] || 0;
}

function getTotalLessons() {
    let total = 0;
    Object.values(LESSON_COUNTS).forEach(levels => {
        Object.values(levels).forEach(c => total += c);
    });
    return total;
}

function generateLessonId(sectionId, level, index) {
    return `${sectionId}_${level}_${index}`;
}

// ============================================
// CONTENIDO DE LECCIONES - GRAMMAR
// ============================================

const GRAMMAR_LESSONS = {
    A1: [
        {
            title: 'Verb TO BE',
            explanation: `
                <h4>El Verbo TO BE (Ser / Estar)</h4>
                <p>El verbo <strong>TO BE</strong> es el verbo más importante en inglés. Significa <em>ser</em> o <em>estar</em>.</p>
                
                <div class="highlight-box">
                    <strong>Formas del verbo TO BE:</strong>
                    <table>
                        <tr><th>Pronombre</th><th>Forma</th><th>Contracción</th></tr>
                        <tr><td>I (Yo)</td><td>am</td><td>I'm</td></tr>
                        <tr><td>You (Tú/Ustedes)</td><td>are</td><td>You're</td></tr>
                        <tr><td>He (Él)</td><td>is</td><td>He's</td></tr>
                        <tr><td>She (Ella)</td><td>is</td><td>She's</td></tr>
                        <tr><td>It (Eso)</td><td>is</td><td>It's</td></tr>
                        <tr><td>We (Nosotros)</td><td>are</td><td>We're</td></tr>
                        <tr><td>They (Ellos)</td><td>are</td><td>They're</td></tr>
                    </table>
                </div>
                
                <h4>Usos de TO BE</h4>
                <ul>
                    <li><strong>Identidad:</strong> I am a student. (Soy estudiante.)</li>
                    <li><strong>Edad:</strong> She is 25 years old. (Ella tiene 25 años.)</li>
                    <li><strong>Nacionalidad:</strong> They are Spanish. (Son españoles.)</li>
                    <li><strong>Profesión:</strong> He is a doctor. (Él es médico.)</li>
                    <li><strong>Estado/Condición:</strong> I am tired. (Estoy cansado.)</li>
                    <li><strong>Ubicación:</strong> We are in London. (Estamos en Londres.)</li>
                </ul>
                
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Recuerda que en inglés NO usamos "to be" para la edad con "have". Decimos "I am 20" NO "I have 20 years".
                </div>
                
                <h4>Formas Negativas</h4>
                <p>Para hacer negaciones, añadimos <strong>NOT</strong> después del verbo TO BE:</p>
                <ul>
                    <li>I am not = I'm not</li>
                    <li>You are not = You aren't / You're not</li>
                    <li>He is not = He isn't / He's not</li>
                </ul>
                
                <h4>Preguntas con TO BE</h4>
                <p>Para hacer preguntas, invertimos el sujeto y el verbo:</p>
                <ul>
                    <li>Are you happy? (¿Estás feliz?)</li>
                    <li>Is she a teacher? (¿Ella es profesora?)</li>
                    <li>Where are they? (¿Dónde están ellos?)</li>
                </ul>
            `,
            examples: [
                {
                    label: 'Oraciones Afirmativas',
                    examples: ['I am from Spain.', 'You are my friend.', 'He is tall.', 'She is a nurse.', 'It is cold today.', 'We are students.', 'They are at home.'],
                    translations: ['Soy de España.', 'Eres mi amigo.', 'Él es alto.', 'Ella es enfermera.', 'Hace frío hoy.', 'Somos estudiantes.', 'Están en casa.']
                },
                {
                    label: 'Oraciones Negativas',
                    examples: ["I'm not hungry.", "You aren't late.", "He isn't happy.", "She isn't here.", "It isn't expensive.", "We aren't tired.", "They aren't doctors."],
                    translations: ['No tengo hambre.', 'No llegas tarde.', 'Él no está feliz.', 'Ella no está aquí.', 'No es caro.', 'No estamos cansados.', 'No son médicos.']
                },
                {
                    label: 'Preguntas y Respuestas',
                    examples: [
                        'Are you ready? Yes, I am.',
                        'Is he your brother? No, he isn\'t.',
                        'Where are you from? I am from Mexico.',
                        'How old is she? She is 30.',
                        'What is your name? My name is Ana.'
                    ],
                    translations: [
                        '¿Estás listo? Sí, lo estoy.',
                        '¿Él es tu hermano? No, no lo es.',
                        '¿De dónde eres? Soy de México.',
                        '¿Cuántos años tiene? Tiene 30.',
                        '¿Cómo te llamas? Me llamo Ana.'
                    ]
                }
            ],
            exercises: [
                { question: 'Complete: "I ___ a student."', options: ['am', 'is', 'are', 'be'], correct: 'am', explanation: 'Con "I" usamos "am".' },
                { question: 'Complete: "She ___ from Italy."', options: ['am', 'is', 'are', 'be'], correct: 'is', explanation: 'Con "she" (tercera persona singular) usamos "is".' },
                { question: 'Complete: "They ___ very happy."', options: ['am', 'is', 'are', 'be'], correct: 'are', explanation: 'Con "they" (plural) usamos "are".' },
                { question: 'Choose the negative: "He ___ a doctor."', options: ["isn't", "aren't", "am not", "not is"], correct: "isn't", explanation: 'La negación de "he is" es "he isn\'t".' },
                { question: 'Make a question: "___ you from Brazil?"', options: ['Are', 'Is', 'Am', 'Do'], correct: 'Are', explanation: 'Con "you" usamos "are" al inicio de la pregunta.' },
                { question: '"I am not" se contrae como:', options: ["I'm not", "I aren't", "I isn't", "I amn't"], correct: "I'm not", explanation: 'La contracción correcta de "I am not" es "I\'m not".' }
            ],
            review: [
                { question: 'We ___ in the classroom.', options: ['am', 'is', 'are', 'be'], correct: 'are', explanation: 'Con "we" usamos "are".' },
                { question: 'It ___ a beautiful day.', options: ['am', 'is', 'are', 'be'], correct: 'is', explanation: 'Con "it" usamos "is".' },
                { question: '___ she your sister?', options: ['Are', 'Is', 'Am', 'Do'], correct: 'Is', explanation: 'Con "she" usamos "is" al inicio.' },
                { question: 'I ___ tired today.', options: ['am', 'is', 'are', 'be'], correct: 'am', explanation: 'Con "I" usamos "am".' }
            ],
            exam: [
                { question: 'Complete: "My parents ___ very kind."', options: ['am', 'is', 'are', 'be'], correct: 'are', explanation: '"Parents" es plural, por tanto usamos "are".' },
                { question: '"___ your brother a doctor?"', options: ['Are', 'Is', 'Am', 'Do'], correct: 'Is', explanation: '"Your brother" es tercera persona singular, usamos "is".' },
                { question: 'Choose the correct sentence:', options: ['She are happy.', 'She is happy.', 'She am happy.', 'She be happy.'], correct: 'She is happy.', explanation: 'Con "she" siempre usamos "is".' },
                { question: '"They ___ at school now." (negative)', options: ["aren't", "isn't", "am not", "don't"], correct: "aren't", explanation: 'Negación de "they are" = "they aren\'t".' },
                { question: '"___ you and Maria friends?"', options: ['Are', 'Is', 'Am', 'Do'], correct: 'Are', explanation: '"You and Maria" es plural, usamos "are".' },
                { question: 'Complete: "The book ___ on the table."', options: ['am', 'is', 'are', 'be'], correct: 'is', explanation: '"The book" es tercera persona singular (it), usamos "is".' }
            ]
        },
        {
            title: 'Present Simple',
            explanation: `
                <h4>Present Simple (Presente Simple)</h4>
                <p>Usamos el <strong>Present Simple</strong> para hablar de:</p>
                <ul>
                    <li>Hábitos y rutinas diarias</li>
                    <li>Hechos generales y verdades universales</li>
                    <li>Preferencias y estados permanentes</li>
                </ul>
                
                <div class="highlight-box">
                    <strong>Estructura:</strong>
                    <p><strong>(+) Sujeto + Verbo + Complemento</strong></p>
                    <p><strong>(-) Sujeto + DO/DOES + NOT + Verbo base</strong></p>
                    <p><strong>(?) DO/DOES + Sujeto + Verbo base?</strong></p>
                </div>
                
                <h4>Regla de la Tercera Persona</h4>
                <p>Con <strong>he, she, it</strong> añadimos <strong>-s</strong> o <strong>-es</strong> al verbo:</p>
                <table>
                    <tr><th>Regla</th><th>Ejemplo</th></tr>
                    <tr><td>General: + s</td><td>work → works, play → plays</td></tr>
                    <tr><td>Termina en -s, -sh, -ch, -x, -z, -o: + es</td><td>watch → watches, go → goes</td></tr>
                    <tr><td>Termina en consonante + y: y → ies</td><td>study → studies, fly → flies</td></tr>
                    <tr><td>Termina en vocal + y: + s</td><td>play → plays, enjoy → enjoys</td></tr>
                </table>
                
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Los verbos "have" y "be" son irregulares. "Have" → "has" (he/she/it). "Be" → "is" (he/she/it).
                </div>
                
                <h4>Adverbios de Frecuencia</h4>
                <p>Indican con qué frecuencia hacemos algo:</p>
                <ul>
                    <li><strong>Always</strong> (100%) - Siempre</li>
                    <li><strong>Usually</strong> (80%) - Normalmente</li>
                    <li><strong>Often</strong> (60%) - A menudo</li>
                    <li><strong>Sometimes</strong> (40%) - A veces</li>
                    <li><strong>Rarely</strong> (20%) - Raramente</li>
                    <li><strong>Never</strong> (0%) - Nunca</li>
                </ul>
                <p>Se colocan <strong>antes del verbo principal</strong> y <strong>después de TO BE</strong>:</p>
                <ul>
                    <li>I <strong>always</strong> drink coffee. (Siempre bebo café.)</li>
                    <li>She <strong>is never</strong> late. (Ella nunca llega tarde.)</li>
                </ul>
            `,
            examples: [
                {
                    label: 'Rutinas Diarias',
                    examples: ['I wake up at 7:00.', 'She takes the bus to work.', 'They eat lunch at noon.', 'He watches TV in the evening.', 'We study English every day.'],
                    translations: ['Me despierto a las 7:00.', 'Ella coge el autobús al trabajo.', 'Comen a mediodía.', 'Él ve la tele por la tarde.', 'Estudiamos inglés todos los días.']
                },
                {
                    label: 'Verdades Generales',
                    examples: ['The sun rises in the east.', 'Water boils at 100°C.', 'Cats love sleeping.', 'Plants need sunlight.'],
                    translations: ['El sol sale por el este.', 'El agua hierve a 100°C.', 'A los gatos les encanta dormir.', 'Las plantas necesitan luz solar.']
                },
                {
                    label: 'Preguntas con DO/DOES',
                    examples: ['Do you like pizza?', 'Does he play football?', 'What do they do?', 'Where does she live?', 'How often do you exercise?'],
                    translations: ['¿Te gusta la pizza?', '¿Él juega al fútbol?', '¿Qué hacen ellos?', '¿Dónde vive ella?', '¿Con qué frecuencia haces ejercicio?']
                }
            ],
            exercises: [
                { question: 'She ___ (work) in a hospital.', options: ['work', 'works', 'working', 'workes'], correct: 'works', explanation: 'Con "she" añadimos -s al verbo.' },
                { question: 'They ___ (not/like) spinach.', options: ["don't like", "doesn't like", "not like", "no like"], correct: "don't like", explanation: 'Con "they" (plural) usamos "don\'t" + verbo base.' },
                { question: '___ he ___ (speak) French?', options: ['Do / speak', 'Does / speaks', 'Does / speak', 'Do / speaks'], correct: 'Does / speak', explanation: 'Con "he" usamos "does" y el verbo en base.' },
                { question: 'I always ___ (drink) coffee in the morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correct: 'drink', explanation: 'Con "I" el verbo va en base. "Always" va antes del verbo principal.' },
                { question: 'The train ___ (leave) at 9:00 every day.', options: ['leave', 'leaves', 'leaving', 'leaved'], correct: 'leaves', explanation: '"The train" es tercera persona singular (it). Añadimos -s.' },
                { question: '___ you usually ___ (eat) breakfast at home?', options: ['Do / eat', 'Does / eat', 'Do / eats', 'Does / eats'], correct: 'Do / eat', explanation: 'Con "you" usamos "do" y el verbo en base.' }
            ],
            review: [
                { question: 'My sister ___ (study) medicine.', options: ['study', 'studies', 'studying', 'studys'], correct: 'studies', explanation: 'Con "my sister" (she) añadimos -ies porque termina en consonante + y.' },
                { question: 'We ___ (not/go) to the gym on Sundays.', options: ["don't go", "doesn't go", "not go", "no go"], correct: "don't go", explanation: 'Con "we" usamos "don\'t" + verbo base.' },
                { question: '___ your parents ___ (live) here?', options: ['Do / live', 'Does / live', 'Do / lives', 'Does / lives'], correct: 'Do / live', explanation: '"Your parents" es plural, usamos "do" + verbo base.' },
                { question: 'He ___ (watch) TV every night.', options: ['watch', 'watchs', 'watches', 'watching'], correct: 'watches', explanation: '"Watch" termina en -ch, añadimos -es.' }
            ],
            exam: [
                { question: 'The shop ___ (open) at 9:00 and ___ (close) at 6:00.', options: ['open / close', 'opens / closes', 'opening / closing', 'opened / closed'], correct: 'opens / closes', explanation: '"The shop" es tercera persona singular. Añadimos -s a ambos verbos.' },
                { question: 'She ___ (not/understand) German.', options: ["don't understand", "doesn't understand", "not understands", "no understand"], correct: "doesn't understand", explanation: 'Con "she" usamos "doesn\'t" + verbo base.' },
                { question: '___ your dog ___ (bark) at strangers?', options: ['Do / bark', 'Does / bark', 'Do / barks', 'Does / barks'], correct: 'Does / bark', explanation: '"Your dog" es tercera persona singular (it). Usamos "does" + verbo base.' },
                { question: 'I never ___ (eat) meat.', options: ['eat', 'eats', 'eating', 'ate'], correct: 'eat', explanation: '"Never" va antes del verbo principal. Con "I" usamos el verbo en base.' },
                { question: 'My brother usually ___ (get) up early.', options: ['get', 'gets', 'getting', 'getted'], correct: 'gets', explanation: '"Usually" va antes del verbo principal. Con "my brother" (he) añadimos -s.' },
                { question: '___ the children ___ (play) in the park after school?', options: ['Do / play', 'Does / play', 'Do / plays', 'Are / playing'], correct: 'Do / play', explanation: '"The children" es plural. Usamos "do" + verbo base.' }
            ]
        },
        {
            title: 'Articles A / AN / THE',
            explanation: `
                <h4>Artículos en Inglés</h4>
                <p>En inglés tenemos dos tipos de artículos: <strong>indefinidos</strong> (a/an) y <strong>definido</strong> (the).</p>
                
                <div class="highlight-box">
                    <strong>Artículo Indefinido: A / AN</strong>
                    <p>Usamos <strong>A</strong> antes de palabras que empiezan con <strong>sonido consonante</strong>.</p>
                    <p>Usamos <strong>AN</strong> antes de palabras que empiezan con <strong>sonido vocal</strong>.</p>
                </div>
                
                <h4>¿Cuándo usar A / AN?</h4>
                <ul>
                    <li>Cuando hablamos de algo por <strong>primera vez</strong></li>
                    <li>Cuando nos referimos a <strong>cualquier</strong> elemento de un grupo</li>
                    <li>Con <strong>profesiones</strong></li>
                </ul>
                
                <table>
                    <tr><th>A (consonante)</th><th>AN (vocal)</th></tr>
                    <tr><td>a book, a car, a dog</td><td>an apple, an egg, an orange</td></tr>
                    <tr><td>a university (suena "yu")</td><td>an hour (suena "au")</td></tr>
                    <tr><td>a European (suena "yu")</td><td>an honest man (suena "o")</td></tr>
                </table>
                
                <h4>Artículo Definido: THE</h4>
                <p>Usamos <strong>THE</strong> cuando:</p>
                <ul>
                    <li>Hablamos de algo <strong>específico</strong> o ya mencionado</li>
                    <li>Es <strong>único</strong> en el mundo: the sun, the moon, the sky</li>
                    <li>Hay solo <strong>uno</strong> en ese contexto: the door, the ceiling</li>
                    <li>Con <strong>superlativos</strong>: the best, the most beautiful</li>
                    <li>Con <strong>ríos, océanos, montañas</strong>: the Amazon, the Pacific</li>
                    <li>Con <strong>instrumentos musicales</strong>: play the guitar</li>
                </ul>
                
                <div class="warning-box">
                    <strong>⚠️ No usamos artículo con:</strong>
                    <ul>
                        <li>Nombres propios: Maria, London, Spain</li>
                        <li>Lenguajes: I speak Spanish (NO the Spanish)</li>
                        <li>Deportes: I play tennis (NO the tennis)</li>
                        <li>Comidas generales: I eat breakfast (NO the breakfast)</li>
                    </ul>
                </div>
            `,
            examples: [
                {
                    label: 'A / AN',
                    examples: ['I have a car.', 'She is an engineer.', 'He ate an apple.', 'We live in a small house.', 'It is an interesting book.'],
                    translations: ['Tengo un coche.', 'Ella es ingeniera.', 'Él comió una manzana.', 'Vivimos en una casa pequeña.', 'Es un libro interesante.']
                },
                {
                    label: 'THE',
                    examples: ['The sun is hot today.', 'I love the book you gave me.', 'The Eiffel Tower is in Paris.', 'She plays the piano.', 'The Amazon is a long river.'],
                    translations: ['El sol hace calor hoy.', 'Me encanta el libro que me diste.', 'La Torre Eiffel está en París.', 'Ella toca el piano.', 'El Amazonas es un río largo.']
                },
                {
                    label: 'Sin Artículo',
                    examples: ['I speak English.', 'Maria lives in Madrid.', 'He plays football.', 'We eat dinner at 8.', 'I love music.'],
                    translations: ['Hablo inglés.', 'Maria vive en Madrid.', 'Él juega al fútbol.', 'Cenamos a las 8.', 'Me encanta la música.']
                }
            ],
            exercises: [
                { question: 'She is ___ doctor.', options: ['a', 'an', 'the', '-'], correct: 'a', explanation: '"Doctor" empieza con sonido consonante. Usamos "a".' },
                { question: 'I ate ___ orange for breakfast.', options: ['a', 'an', 'the', '-'], correct: 'an', explanation: '"Orange" empieza con sonido vocal. Usamos "an".' },
                { question: '___ moon is beautiful tonight.', options: ['A', 'An', 'The', '-'], correct: 'The', explanation: 'La luna es única en el mundo. Usamos "the".' },
                { question: 'He plays ___ basketball every day.', options: ['a', 'an', 'the', '-'], correct: '-', explanation: 'No usamos artículo con deportes.' },
                { question: 'I bought ___ book and ___ umbrella.', options: ['a / a', 'a / an', 'an / a', 'the / the'], correct: 'a / an', explanation: '"Book" empieza con consonante (a), "umbrella" con vocal (an).' },
                { question: '___ Amazon is the longest river in South America.', options: ['A', 'An', 'The', '-'], correct: 'The', explanation: 'Los ríos llevan artículo "the".' }
            ],
            review: [
                { question: 'She is ___ honest person.', options: ['a', 'an', 'the', '-'], correct: 'an', explanation: '"Honest" empieza con sonido vocal (la h no se pronuncia).' },
                { question: 'I love ___ music.', options: ['a', 'an', 'the', '-'], correct: '-', explanation: 'No usamos artículo con "music" en general.' },
                { question: '___ Pacific Ocean is very deep.', options: ['A', 'An', 'The', '-'], correct: 'The', explanation: 'Los océanos llevan artículo "the".' },
                { question: 'He is ___ university student.', options: ['a', 'an', 'the', '-'], correct: 'a', explanation: '"University" empieza con sonido "yu" (consonante).' }
            ],
            exam: [
                { question: 'I have ___ cat. ___ cat is black.', options: ['a / A', 'a / The', 'the / A', 'an / The'], correct: 'a / The', explanation: 'Primera vez: "a cat". Segunda vez (específico): "the cat".' },
                { question: 'She plays ___ violin very well.', options: ['a', 'an', 'the', '-'], correct: 'the', explanation: 'Los instrumentos musicales llevan "the".' },
                { question: '___ Mount Everest is the highest mountain.', options: ['A', 'An', 'The', '-'], correct: '-', explanation: 'Los nombres de montañas individuales no llevan artículo.' },
                { question: 'I need ___ hour to finish this.', options: ['a', 'an', 'the', '-'], correct: 'an', explanation: '"Hour" empieza con sonido vocal (la h no se pronuncia).' },
                { question: '___ English is spoken in many countries.', options: ['A', 'An', 'The', '-'], correct: '-', explanation: 'Los idiomas no llevan artículo.' },
                { question: 'She gave me ___ useful advice.', options: ['a', 'an', 'the', '-'], correct: '-', explanation: '"Advice" es incontable y no lleva artículo en este contexto general.' }
            ]
        },
        {
            title: 'Possessive Adjectives',
            explanation: `
                <h4>Adjetivos Posesivos</h4>
                <p>Los adjetivos posesivos indican <strong>a quién pertenece</strong> algo. Van <strong>antes del sustantivo</strong>.</p>
                
                <div class="highlight-box">
                    <table>
                        <tr><th>Pronombre</th><th>Adjetivo Posesivo</th><th>Ejemplo</th></tr>
                        <tr><td>I</td><td>my</td><td>my book</td></tr>
                        <tr><td>You</td><td>your</td><td>your car</td></tr>
                        <tr><td>He</td><td>his</td><td>his house</td></tr>
                        <tr><td>She</td><td>her</td><td>her phone</td></tr>
                        <tr><td>It</td><td>its</td><td>its tail</td></tr>
                        <tr><td>We</td><td>our</td><td>our school</td></tr>
                        <tr><td>They</td><td>their</td><td>their dog</td></tr>
                    </table>
                </div>
                
                <h4>Adjetivos Posesivos vs. Pronombres Posesivos</h4>
                <table>
                    <tr><th>Adjetivo (va antes del sustantivo)</th><th>Pronombre (reemplaza al sustantivo)</th></tr>
                    <tr><td>This is <strong>my</strong> book.</td><td>This book is <strong>mine</strong>.</td></tr>
                    <tr><td>That is <strong>her</strong> car.</td><td>That car is <strong>hers</strong>.</td></tr>
                    <tr><td>These are <strong>our</strong> keys.</td><td>These keys are <strong>ours</strong>.</td></tr>
                </table>
                
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "Its" (posesivo) NO lleva apóstrofo. "It's" = It is (contracción).
                </div>
            `,
            examples: [
                {
                    label: 'Adjetivos Posesivos',
                    examples: ['This is my brother.', 'What is your name?', 'His car is red.', 'Her eyes are blue.', 'The dog wagged its tail.', 'Our house is big.', 'Their children are polite.'],
                    translations: ['Este es mi hermano.', '¿Cómo te llamas?', 'Su coche es rojo.', 'Sus ojos son azules.', 'El perro movió su cola.', 'Nuestra casa es grande.', 'Sus hijos son educados.']
                }
            ],
            exercises: [
                { question: 'I love ___ mother very much.', options: ['my', 'mine', 'me', 'I'], correct: 'my', explanation: '"My" es el adjetivo posesivo de "I".' },
                { question: 'What is ___ phone number?', options: ['you', 'your', 'yours', 'yours\''], correct: 'your', explanation: '"Your" es el adjetivo posesivo de "you".' },
                { question: 'The cat licked ___ paw.', options: ["it's", 'its', 'it', 'it is'], correct: 'its', explanation: '"Its" (sin apóstrofo) es el posesivo de "it".' },
                { question: 'We love ___ new apartment.', options: ['us', 'our', 'ours', 'we'], correct: 'our', explanation: '"Our" es el adjetivo posesivo de "we".' },
                { question: 'They invited ___ friends to the party.', options: ['them', 'their', 'theirs', 'they'], correct: 'their', explanation: '"Their" es el adjetivo posesivo de "they".' },
                { question: 'Is this pen ___ or ___?', options: ['your / mine', 'yours / my', 'your / my', 'yours / mine'], correct: 'yours / mine', explanation: 'Necesitamos pronombres posesivos (sin sustantivo después).' }
            ],
            review: [
                { question: 'She forgot ___ keys at home.', options: ['she', 'her', 'hers', 'herself'], correct: 'her', explanation: '"Her" es el adjetivo posesivo de "she".' },
                { question: 'The company changed ___ logo.', options: ["it's", 'its', 'it', 'their'], correct: 'its', explanation: '"Its" es el posesivo de "it" (la empresa).' },
                { question: 'Is this bag ___?', options: ['you', 'your', 'yours', 'yours\''], correct: 'yours', explanation: 'Necesitamos un pronombre posesivo (sin sustantivo).' },
                { question: '___ parents live in Brazil.', options: ['He', 'His', 'Him', 'Himself'], correct: 'His', explanation: '"His" es el adjetivo posesivo de "he".' }
            ],
            exam: [
                { question: 'This is not ___ fault. It is ___.', options: ['my / yours', 'mine / your', 'my / your', 'mine / yours'], correct: 'my / yours', explanation: 'Primero adjetivo posesivo (con sustantivo "fault"), luego pronombre posesivo.' },
                { question: 'The bird built ___ nest in the tree.', options: ["it's", 'its', 'it', 'their'], correct: 'its', explanation: '"Its" (sin apóstrofo) es el posesivo de "it".' },
                { question: '___ house is bigger than ___.', options: ['Our / their', 'Ours / theirs', 'Our / theirs', 'Ours / their'], correct: 'Our / theirs', explanation: 'Primero adjetivo (con sustantivo), luego pronombre (sin sustantivo).' },
                { question: 'I met ___ teacher yesterday.', options: ['mine', 'my', 'me', 'I'], correct: 'my', explanation: '"My" es el adjetivo posesivo de "I".' },
                { question: 'Is this jacket ___ or ___?', options: ['your / her', 'yours / hers', 'your / hers', 'yours / her'], correct: 'yours / hers', explanation: 'Ambos necesitan ser pronombres posesivos.' },
                { question: 'The dog lost ___ toy in the park.', options: ["it's", 'its', 'it', 'his'], correct: 'its', explanation: 'Para animales usamos "its" como posesivo.' }
            ]
        },
        {
            title: 'There is / There are',
            explanation: `
                <h4>There is / There are (Hay)</h4>
                <p>Usamos <strong>There is / There are</strong> para indicar que algo <strong>existe</strong> o <strong>está presente</strong> en un lugar.</p>
                
                <div class="highlight-box">
                    <p><strong>There is</strong> + sustantivo singular / incontable</p>
                    <p><strong>There are</strong> + sustantivo plural</p>
                </div>
                
                <h4>Estructura</h4>
                <table>
                    <tr><th>Tipo</th><th>Estructura</th><th>Ejemplo</th></tr>
                    <tr><td>Afirmativo</td><td>There is / There are</td><td>There is a book. / There are two books.</td></tr>
                    <tr><td>Negativo</td><td>There isn't / There aren't</td><td>There isn't milk. / There aren't chairs.</td></tr>
                    <tr><td>Pregunta</td><td>Is there...? / Are there...?</td><td>Is there a shop? / Are there students?</td></tr>
                    <tr><td>Resp. corta</td><td>Yes, there is. / No, there aren't.</td><td>Yes, there is. / No, there aren't.</td></tr>
                </table>
                
                <h4>Some / Any con There is/are</h4>
                <ul>
                    <li><strong>Some</strong> en oraciones afirmativas: There are <strong>some</strong> books.</li>
                    <li><strong>Any</strong> en negativas y preguntas: There aren't <strong>any</strong> books. / Are there <strong>any</strong> books?</li>
                </ul>
                
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "There is" se contrae como "There's" pero "There are" NO se contrae.
                </div>
            `,
            examples: [
                {
                    label: 'There is / There are',
                    examples: ['There is a cat in the garden.', 'There are three bedrooms in the house.', 'There is some milk in the fridge.', 'There are many people at the party.', "There's a problem with the computer."],
                    translations: ['Hay un gato en el jardín.', 'Hay tres dormitorios en la casa.', 'Hay algo de leche en la nevera.', 'Hay mucha gente en la fiesta.', 'Hay un problema con el ordenador.']
                },
                {
                    label: 'Negativas y Preguntas',
                    examples: ['There isn\'t any coffee.', 'There aren\'t any buses on Sundays.', 'Is there a bank near here?', 'Are there any restaurants open?', 'How many students are there in the class?'],
                    translations: ['No hay café.', 'No hay autobuses los domingos.', '¿Hay un banco cerca de aquí?', '¿Hay restaurantes abiertos?', '¿Cuántos estudiantes hay en la clase?']
                }
            ],
            exercises: [
                { question: '___ a book on the table.', options: ['There is', 'There are', 'It is', 'They are'], correct: 'There is', explanation: '"A book" es singular. Usamos "There is".' },
                { question: '___ any apples in the basket?', options: ['Is there', 'Are there', 'There is', 'There are'], correct: 'Are there', explanation: '"Apples" es plural y es una pregunta. Usamos "Are there".' },
                { question: 'There ___ any water in the bottle.', options: ['is', 'are', "isn't", "aren't"], correct: "isn't", explanation: '"Water" es incontable (singular). Negación = "isn\'t".' },
                { question: '___ two pens and a pencil in my bag.', options: ['There is', 'There are', 'It is', 'They are'], correct: 'There are', explanation: 'Cuando hay varios sustantivos, el verbo concuerda con el primero: "two pens" (plural).' },
                { question: '___ there any questions?', options: ['Is', 'Are', 'Do', 'Does'], correct: 'Are', explanation: '"Questions" es plural. Usamos "Are there".' },
                { question: 'There ___ some students in the library.', options: ['is', 'are', 'be', 'am'], correct: 'are', explanation: '"Students" es plural. Usamos "There are".' }
            ],
            review: [
                { question: '___ a beautiful park near my house.', options: ['There is', 'There are', 'It is', 'They are'], correct: 'There is', explanation: '"A park" es singular. Usamos "There is".' },
                { question: 'There ___ any sugar left.', options: ['is', 'are', "isn't", "aren't"], correct: "isn't", explanation: '"Sugar" es incontable. Negación = "isn\'t".' },
                { question: '___ there a supermarket around here?', options: ['Is', 'Are', 'Do', 'Does'], correct: 'Is', explanation: '"A supermarket" es singular. Usamos "Is there".' },
                { question: 'There ___ many flowers in the garden.', options: ['is', 'are', 'be', 'am'], correct: 'are', explanation: '"Flowers" es plural. Usamos "There are".' }
            ],
            exam: [
                { question: '___ a lot of traffic in the city center.', options: ['There is', 'There are', 'It is', 'They are'], correct: 'There is', explanation: '"Traffic" es incontable (singular). Usamos "There is".' },
                { question: 'There ___ any problems with the software.', options: ['is', 'are', "isn't", "aren't"], correct: "aren't", explanation: '"Problems" es plural. Negación = "aren\'t".' },
                { question: '___ there enough chairs for everyone?', options: ['Is', 'Are', 'Do', 'Does'], correct: 'Are', explanation: '"Chairs" es plural. Usamos "Are there".' },
                { question: 'There ___ some milk and two eggs in the fridge.', options: ['is', 'are', 'be', 'am'], correct: 'is', explanation: 'El primer sustantivo "milk" es incontable (singular). El verbo concuerda con él.' },
                { question: '___ any good movies on TV tonight?', options: ['Is there', 'Are there', 'There is', 'There are'], correct: 'Are there', explanation: '"Movies" es plural y es pregunta. Usamos "Are there".' },
                { question: 'There ___ a doctor and two nurses in the hospital.', options: ['is', 'are', 'be', 'am'], correct: 'is', explanation: 'El primer sustantivo "a doctor" es singular. El verbo concuerda con él.' }
            ]
        }
    ],



    //themes_part3 
    A2: [
        {
            title: 'Past Simple',
            explanation: `
                <h4>Past Simple (Pasado Simple)</h4>
                <p>Usamos el <strong>Past Simple</strong> para acciones <strong>terminadas</strong> en el pasado con un tiempo específico.</p>
                <div class="highlight-box">
                    <strong>Verbos Regulares:</strong> Añadimos <strong>-ed</strong> al infinitivo.
                    <p>I work → I worked | She play → She played</p>
                    <p><strong>Verbos Irregulares:</strong> Cambian de forma completamente.</p>
                    <p>go → went | eat → ate | see → saw</p>
                </div>
                <h4>Estructura</h4>
                <table>
                    <tr><th>Tipo</th><th>Estructura</th></tr>
                    <tr><td>Afirmativo</td><td>Sujeto + VERBO (pasado)</td></tr>
                    <tr><td>Negativo</td><td>Sujeto + DID + NOT + verbo base</td></tr>
                    <tr><td>Pregunta</td><td>DID + sujeto + verbo base?</td></tr>
                </table>
                <h4>Verbos Irregulares Comunes</h4>
                <table>
                    <tr><th>Infinitivo</th><th>Pasado</th><th>Participio</th></tr>
                    <tr><td>be</td><td>was/were</td><td>been</td></tr>
                    <tr><td>begin</td><td>began</td><td>begun</td></tr>
                    <tr><td>break</td><td>broke</td><td>broken</td></tr>
                    <tr><td>bring</td><td>brought</td><td>brought</td></tr>
                    <tr><td>buy</td><td>bought</td><td>bought</td></tr>
                    <tr><td>come</td><td>came</td><td>come</td></tr>
                    <tr><td>do</td><td>did</td><td>done</td></tr>
                    <tr><td>drink</td><td>drank</td><td>drunk</td></tr>
                    <tr><td>drive</td><td>drove</td><td>driven</td></tr>
                    <tr><td>eat</td><td>ate</td><td>eaten</td></tr>
                    <tr><td>find</td><td>found</td><td>found</td></tr>
                    <tr><td>fly</td><td>flew</td><td>flown</td></tr>
                    <tr><td>forget</td><td>forgot</td><td>forgotten</td></tr>
                    <tr><td>get</td><td>got</td><td>got/gotten</td></tr>
                    <tr><td>give</td><td>gave</td><td>given</td></tr>
                    <tr><td>go</td><td>went</td><td>gone</td></tr>
                    <tr><td>have</td><td>had</td><td>had</td></tr>
                    <tr><td>know</td><td>knew</td><td>known</td></tr>
                    <tr><td>leave</td><td>left</td><td>left</td></tr>
                    <tr><td>make</td><td>made</td><td>made</td></tr>
                    <tr><td>meet</td><td>met</td><td>met</td></tr>
                    <tr><td>read</td><td>read</td><td>read</td></tr>
                    <tr><td>run</td><td>ran</td><td>run</td></tr>
                    <tr><td>say</td><td>said</td><td>said</td></tr>
                    <tr><td>see</td><td>saw</td><td>seen</td></tr>
                    <tr><td>sing</td><td>sang</td><td>sung</td></tr>
                    <tr><td>sleep</td><td>slept</td><td>slept</td></tr>
                    <tr><td>speak</td><td>spoke</td><td>spoken</td></tr>
                    <tr><td>swim</td><td>swam</td><td>swum</td></tr>
                    <tr><td>take</td><td>took</td><td>taken</td></tr>
                    <tr><td>teach</td><td>taught</td><td>taught</td></tr>
                    <tr><td>tell</td><td>told</td><td>told</td></tr>
                    <tr><td>think</td><td>thought</td><td>thought</td></tr>
                    <tr><td>understand</td><td>understood</td><td>understood</td></tr>
                    <tr><td>wake</td><td>woke</td><td>woken</td></tr>
                    <tr><td>wear</td><td>wore</td><td>worn</td></tr>
                    <tr><td>win</td><td>won</td><td>won</td></tr>
                    <tr><td>write</td><td>wrote</td><td>written</td></tr>
                </table>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> En negativas y preguntas del Past Simple, SIEMPRE usamos el verbo en forma base después de DID.
                </div>
            `,
            examples: [
                {
                    label: 'Verbos Regulares',
                    examples: ['I watched a movie yesterday.', 'She played tennis last weekend.', 'They studied for the exam.', 'We visited Paris in 2019.'],
                    translations: ['Vi una película ayer.', 'Ella jugó al tenis el fin de semana pasado.', 'Estudiaron para el examen.', 'Visitamos París en 2019.']
                },
                {
                    label: 'Verbos Irregulares',
                    examples: ['He went to the gym.', 'I ate breakfast at 8.', 'She bought a new dress.', 'They saw a beautiful sunset.'],
                    translations: ['Él fue al gimnasio.', 'Desayuné a las 8.', 'Ella compró un vestido nuevo.', 'Vieron una puesta de sol hermosa.']
                },
                {
                    label: 'Negativas y Preguntas',
                    examples: ["I didn't go to work.", 'Did you finish your homework?', "She didn't see the message.", 'What did they say?', 'Where did he go?'],
                    translations: ['No fui al trabajo.', '¿Terminaste tus deberes?', 'Ella no vio el mensaje.', '¿Qué dijeron?', '¿Adónde fue?']
                }
            ],
            exercises: [
                { question: 'I ___ (go) to the cinema last night.', options: ['go', 'goed', 'went', 'gone'], correct: 'went', explanation: '"Go" es irregular. Pasado = went.' },
                { question: 'She ___ (not/eat) anything for breakfast.', options: ["didn't ate", "didn't eat", "doesn't eat", "not ate"], correct: "didn't eat", explanation: 'Después de "didn\'t" el verbo va en base.' },
                { question: '___ they ___ (watch) the match?', options: ['Did / watched', 'Did / watch', 'Do / watch', 'Are / watching'], correct: 'Did / watch', explanation: 'En preguntas pasado: Did + sujeto + verbo base.' },
                { question: 'He ___ (buy) a new car last month.', options: ['buy', 'buyed', 'bought', 'buying'], correct: 'bought', explanation: '"Buy" es irregular. Pasado = bought.' },
                { question: "We ___ (not/see) him at the party.", options: ["didn't saw", "didn't see", "don't see", "not saw"], correct: "didn't see", explanation: 'Después de "didn\'t" el verbo va en base: see.' },
                { question: '___ you ___ (have) a good time?', options: ['Did / had', 'Did / have', 'Do / have', 'Are / having'], correct: 'Did / have', explanation: 'En preguntas pasado: Did + sujeto + verbo base.' }
            ],
            review: [
                { question: 'They ___ (arrive) late yesterday.', options: ['arrive', 'arrived', 'arrives', 'arriving'], correct: 'arrived', explanation: '"Arrive" es regular. Pasado = arrived.' },
                { question: 'I ___ (meet) her at the conference.', options: ['meet', 'meeted', 'met', 'meeting'], correct: 'met', explanation: '"Meet" es irregular. Pasado = met.' },
                { question: '___ he ___ (take) the bus?', options: ['Did / took', 'Did / take', 'Do / take', 'Is / taking'], correct: 'Did / take', explanation: 'Did + sujeto + verbo base.' },
                { question: "She ___ (not/understand) the question.", options: ["didn't understood", "didn't understand", "doesn't understand", "not understand"], correct: "didn't understand", explanation: 'Después de "didn\'t" el verbo va en base.' }
            ],
            exam: [
                { question: 'My parents ___ (get) married in 1995.', options: ['get', 'getted', 'got', 'getting'], correct: 'got', explanation: '"Get" es irregular. Pasado = got.' },
                { question: '___ she ___ (write) the email herself?', options: ['Did / wrote', 'Did / write', 'Do / write', 'Is / writing'], correct: 'Did / write', explanation: 'Did + sujeto + verbo base.' },
                { question: "We ___ (not/find) the restaurant.", options: ["didn't found", "didn't find", "don't find", "not found"], correct: "didn't find", explanation: 'Después de "didn\'t" el verbo va en base.' },
                { question: 'He ___ (drive) to work every day, but yesterday he ___ (take) the bus.', options: ['drove / took', 'drove / taked', 'drived / took', 'drive / take'], correct: 'drove / took', explanation: '"Drive" → drove, "take" → took. Ambos son irregulares.' },
                { question: '___ you ___ (sleep) well last night?', options: ['Did / slept', 'Did / sleep', 'Do / sleep', 'Are / sleeping'], correct: 'Did / sleep', explanation: 'Did + sujeto + verbo base.' },
                { question: 'The concert ___ (begin) at 8:00 and ___ (finish) at 11:00.', options: ['began / finished', 'begin / finish', 'begun / finished', 'began / finish'], correct: 'began / finished', explanation: '"Begin" → began (irregular), "finish" → finished (regular).' }
            ]
        },
        {
            title: 'Present Continuous',
            explanation: `
                <h4>Present Continuous (Presente Continuo)</h4>
                <p>Usamos el <strong>Present Continuous</strong> para:</p>
                <ul>
                    <li>Acciones que están ocurriendo <strong>ahora mismo</strong></li>
                    <li>Acciones <strong>temporales</strong> en el presente</li>
                    <li>Planes <strong>futuros confirmados</strong></li>
                    <li>Situaciones que están <strong>cambiando</strong></li>
                </ul>
                <div class="highlight-box">
                    <strong>Estructura:</strong> Sujeto + <strong>TO BE</strong> + Verbo + <strong>-ing</strong>
                    <p>I am working | She is studying | They are playing</p>
                </div>
                <h4>Reglas para añadir -ing</h4>
                <table>
                    <tr><th>Regla</th><th>Ejemplo</th></tr>
                    <tr><td>General: + ing</td><td>work → working, read → reading</td></tr>
                    <tr><td>Termina en -e: quitar e + ing</td><td>make → making, write → writing</td></tr>
                    <tr><td>Consonante + vocal + consonante (sílaba tónica): doble consonante + ing</td><td>run → running, swim → swimming, stop → stopping</td></tr>
                    <tr><td>-ie → y + ing</td><td>lie → lying, die → dying</td></tr>
                </table>
                <h4>Present Simple vs. Present Continuous</h4>
                <table>
                    <tr><th>Present Simple</th><th>Present Continuous</th></tr>
                    <tr><td>Hábitos: I drink coffee.</td><td>Ahora: I am drinking coffee now.</td></tr>
                    <tr><td>Verdades: The sun rises.</td><td>Temporal: I am working late this week.</td></tr>
                    <tr><td>Horarios: The train leaves at 9.</td><td>Futuro: I am meeting her tomorrow.</td></tr>
                </table>
                <div class="warning-box">
                    <strong>⚠️ Verbos que NO usamos en continuo:</strong>
                    <p>love, like, hate, want, need, know, think (opinión), believe, understand, remember, forget, belong, own, seem, appear</p>
                    <p>I <strong>love</strong> chocolate. (NO I am loving)</p>
                </div>
            `,
            examples: [
                {
                    label: 'Acciones Ahora Mismo',
                    examples: ['I am reading a book right now.', 'She is talking on the phone.', 'They are watching TV.', 'It is raining outside.', 'We are having lunch.'],
                    translations: ['Estoy leyendo un libro ahora mismo.', 'Ella está hablando por teléfono.', 'Están viendo la tele.', 'Está lloviendo fuera.', 'Estamos almorzando.']
                },
                {
                    label: 'Situaciones Temporales y Futuro',
                    examples: ['I am learning Italian this year.', 'She is staying with her parents for a month.', 'They are getting married next summer.', 'We are flying to Paris on Friday.'],
                    translations: ['Estoy aprendiendo italiano este año.', 'Ella se está quedando con sus padres durante un mes.', 'Se casan el próximo verano.', 'Vamos a volar a París el viernes.']
                }
            ],
            exercises: [
                { question: 'Listen! The baby ___ (cry).', options: ['cry', 'cries', 'is crying', 'are crying'], correct: 'is crying', explanation: '"Listen!" indica que está pasando ahora. "The baby" = is crying.' },
                { question: "She ___ (not/work) today. It's her day off.", options: ["isn't work", "isn't working", "doesn't working", "not working"], correct: "isn't working", explanation: '"Today" indica temporalidad. Negación de continuo: isn\'t + verb-ing.' },
                { question: '___ they ___ (play) football at the moment?', options: ['Do / play', 'Are / playing', 'Is / playing', 'Do / playing'], correct: 'Are / playing', explanation: '"At the moment" = ahora. Pregunta en continuo: Are + sujeto + verb-ing.' },
                { question: 'I ___ (meet) my boss tomorrow at 10.', options: ['meet', 'am meeting', 'meeting', 'met'], correct: 'am meeting', explanation: 'Planes futuros confirmados usamos Present Continuous.' },
                { question: 'Be quiet! The students ___ (take) an exam.', options: ['take', 'takes', 'are taking', 'is taking'], correct: 'are taking', explanation: '"Be quiet!" indica que está pasando ahora. "Students" = are taking.' },
                { question: 'He usually drives, but today he ___ (walk) to work.', options: ['walk', 'walks', 'is walking', 'walking'], correct: 'is walking', explanation: '"Today" indica situación temporal. Usamos Present Continuous.' }
            ],
            review: [
                { question: 'Look! The dog ___ (run) in the park.', options: ['run', 'runs', 'is running', 'are running'], correct: 'is running', explanation: '"Look!" indica acción en progreso. "The dog" = is running.' },
                { question: 'They ___ (have) a party next Saturday.', options: ['have', 'are having', 'having', 'has'], correct: 'are having', explanation: 'Plan futuro confirmado. Present Continuous.' },
                { question: '___ you ___ (listen) to me?', options: ['Do / listen', 'Are / listening', 'Is / listening', 'Do / listening'], correct: 'Are / listening', explanation: 'Pregunta sobre acción en progreso: Are + you + verb-ing.' },
                { question: "I ___ (not/watch) TV now. I'm studying.", options: ["don't watch", "am not watching", "not watching", "isn't watching"], correct: "am not watching", explanation: '"Now" indica presente. Negación: am not + verb-ing.' }
            ],
            exam: [
                { question: 'The population of the city ___ (grow) rapidly.', options: ['grow', 'grows', 'is growing', 'are growing'], correct: 'is growing', explanation: 'Situación cambiante. Present Continuous.' },
                { question: "Why ___ you ___ (wear) a coat? It's hot!", options: ['do / wear', 'are / wearing', 'is / wearing', 'do / wearing'], correct: 'are / wearing', explanation: 'Pregunta sobre acción actual: Are + you + verb-ing.' },
                { question: "I can't talk now. I ___ (drive).", options: ['drive', 'am driving', 'driving', 'drives'], correct: 'am driving', explanation: '"Now" = acción en progreso. I am driving.' },
                { question: 'She ___ (work) in London this month, but she usually works in Madrid.', options: ['work', 'works', 'is working', 'working'], correct: 'is working', explanation: 'Situación temporal (this month). Present Continuous.' },
                { question: '___ it ___ (snow) outside?', options: ['Does / snow', 'Is / snowing', 'Do / snow', 'Is / snow'], correct: 'Is / snowing', explanation: 'Pregunta sobre estado actual: Is + it + verb-ing.' },
                { question: 'We ___ (go) to the cinema tonight. The tickets are booked.', options: ['go', 'are going', 'going', 'goes'], correct: 'are going', explanation: 'Plan futuro confirmado (tickets booked). Present Continuous.' }
            ]
        },
        {
            title: 'Going to Future',
            explanation: `
                <h4>Going to Future (Futuro con Going to)</h4>
                <p>Usamos <strong>be going to</strong> para:</p>
                <ul>
                    <li><strong>Planes e intenciones</strong>: I am going to study medicine.</li>
                    <li><strong>Predicciones basadas en evidencia</strong>: Look at those clouds! It is going to rain.</li>
                </ul>
                <div class="highlight-box">
                    <strong>Estructura:</strong> Sujeto + <strong>TO BE + going to + verbo base</strong>
                    <p>I am going to buy | She is going to call | They are going to visit</p>
                </div>
                <h4>Going to vs. Will</h4>
                <table>
                    <tr><th>Going to</th><th>Will</th></tr>
                    <tr><td>Planes decididos: I am going to travel.</td><td>Decisiones espontáneas: I will help you.</td></tr>
                    <tr><td>Predicciones con evidencia: Look! It is going to crash.</td><td>Predicciones generales: I think it will rain.</td></tr>
                    <tr><td>Intenciones: We are going to move.</td><td>Promesas: I will always love you.</td></tr>
                </table>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "Going to" se contrae como "gonna" en inglés informal hablado, pero NO lo escribas en exámenes formales.
                </div>
            `,
            examples: [
                {
                    label: 'Planes e Intenciones',
                    examples: ['I am going to buy a new phone.', 'She is going to study in London.', 'They are going to have a baby.', 'We are going to paint the house.'],
                    translations: ['Voy a comprar un móvil nuevo.', 'Ella va a estudiar en Londres.', 'Van a tener un bebé.', 'Vamos a pintar la casa.']
                },
                {
                    label: 'Predicciones con Evidencia',
                    examples: ['Look at that car! It is going to crash.', 'He is going to fall!', 'The sky is dark. It is going to rain.', 'She looks tired. She is going to sleep.'],
                    translations: ['¡Mira ese coche! Va a chocar.', '¡Va a caerse!', 'El cielo está oscuro. Va a llover.', 'Parece cansada. Va a dormirse.']
                }
            ],
            exercises: [
                { question: 'I ___ (buy) a new laptop next week.', options: ['will buy', 'am going to buy', 'buy', 'bought'], correct: 'am going to buy', explanation: 'Plan decidido de antemano. Usamos "going to".' },
                { question: 'Look at that dog! It ___ (jump) into the water.', options: ['will jump', 'is going to jump', 'jumps', 'jumped'], correct: 'is going to jump', explanation: '"Look!" indica evidencia visual. Predicción con evidencia = going to.' },
                { question: "They ___ (not/move) to Paris. They changed their minds.", options: ["won't move", "aren't going to move", "don't move", "not going to move"], correct: "aren't going to move", explanation: 'Plan que ya no va a suceder. Negación de going to.' },
                { question: '___ you ___ (visit) your grandmother this weekend?', options: ['Will / visit', 'Are / going to visit', 'Do / visit', 'Are / visit'], correct: 'Are / going to visit', explanation: 'Plan decidido. Pregunta con going to.' },
                { question: 'She has a ticket. She ___ (fly) to New York tomorrow.', options: ['will fly', 'is going to fly', 'flies', 'flew'], correct: 'is going to fly', explanation: 'Tiene evidencia (ticket). Plan confirmado = going to.' },
                { question: 'I think it ___ (be) a great party.', options: ['will be', 'is going to be', 'is being', 'be'], correct: 'will be', explanation: '"I think" = opinión/predicción general. Usamos "will".' }
            ],
            review: [
                { question: 'We ___ (have) dinner at 8. I already made a reservation.', options: ['will have', 'are going to have', 'have', 'had'], correct: 'are going to have', explanation: 'Plan confirmado (reservation). Going to.' },
                { question: 'Watch out! That glass ___ (fall).', options: ['will fall', 'is going to fall', 'falls', 'fell'], correct: 'is going to fall', explanation: '"Watch out!" = evidencia inmediata. Going to.' },
                { question: "I ___ (not/see) him again. I decided.", options: ["won't see", "am not going to see", "don't see", "not see"], correct: "am not going to see", explanation: 'Decisión tomada. Negación de going to.' },
                { question: '___ they ___ (get) married next year?', options: ['Will / get', 'Are / going to get', 'Do / get', 'Are / get'], correct: 'Are / going to get', explanation: 'Plan decidido. Pregunta con going to.' }
            ],
            exam: [
                { question: 'I just decided: I ___ (quit) my job!', options: ['will quit', 'am going to quit', 'quit', 'quitted'], correct: 'will quit', explanation: 'Decisión espontánea (just decided). Usamos "will".' },
                { question: 'The road is icy. There ___ (be) many accidents today.', options: ['will be', 'is going to be', 'are going to be', 'be'], correct: 'are going to be', explanation: 'Predicción basada en evidencia (icy road). Going to.' },
                { question: 'She has been saving money. She ___ (buy) a car.', options: ['will buy', 'is going to buy', 'buys', 'bought'], correct: 'is going to buy', explanation: 'Evidencia de plan (saving money). Going to.' },
                { question: '"I ___ (help) you with your bags." "Oh, thank you!"', options: ['will help', 'am going to help', 'help', 'helped'], correct: 'will help', explanation: 'Oferta espontánea. Usamos "will".' },
                { question: 'They already booked the hotel. They ___ (travel) to Japan in March.', options: ['will travel', 'are going to travel', 'travel', 'traveled'], correct: 'are going to travel', explanation: 'Plan confirmado (booked hotel). Going to.' },
                { question: 'Look at the time! We ___ (miss) the train.', options: ['will miss', 'are going to miss', 'miss', 'missed'], correct: 'are going to miss', explanation: 'Evidencia (look at the time). Predicción = going to.' }
            ]
        },
        {
            title: 'Comparatives & Superlatives',
            explanation: `
                <h4>Comparativos y Superlativos</h4>
                <p>Usamos los <strong>comparativos</strong> para comparar dos cosas y los <strong>superlativos</strong> para destacar una entre muchas.</p>
                <div class="highlight-box">
                    <strong>Adjetivos Cortos (1 sílaba):</strong>
                    <table>
                        <tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
                        <tr><td>tall</td><td>taller</td><td>the tallest</td></tr>
                        <tr><td>fast</td><td>faster</td><td>the fastest</td></tr>
                        <tr><td>big</td><td>bigger</td><td>the biggest</td></tr>
                        <tr><td>hot</td><td>hotter</td><td>the hottest</td></tr>
                        <tr><td>easy</td><td>easier</td><td>the easiest</td></tr>
                    </table>
                </div>
                <h4>Adjetivos Largos (2+ sílabas)</h4>
                <table>
                    <tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
                    <tr><td>beautiful</td><td>more beautiful</td><td>the most beautiful</td></tr>
                    <tr><td>expensive</td><td>more expensive</td><td>the most expensive</td></tr>
                    <tr><td>interesting</td><td>more interesting</td><td>the most interesting</td></tr>
                    <tr><td>comfortable</td><td>more comfortable</td><td>the most comfortable</td></tr>
                </table>
                <h4>Irregulares</h4>
                <table>
                    <tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
                    <tr><td>good</td><td>better</td><td>the best</td></tr>
                    <tr><td>bad</td><td>worse</td><td>the worst</td></tr>
                    <tr><td>far</td><td>farther/further</td><td>the farthest/furthest</td></tr>
                    <tr><td>little</td><td>less</td><td>the least</td></tr>
                    <tr><td>much/many</td><td>more</td><td>the most</td></tr>
                </table>
                <h4>Estructuras</h4>
                <ul>
                    <li><strong>Comparativo + than:</strong> She is taller than me.</li>
                    <li><strong>Superlativo + in/of:</strong> He is the best student in the class.</li>
                    <li><strong>as + adjetivo + as:</strong> I am as tall as my brother.</li>
                    <li><strong>not as + adjetivo + as:</strong> This book is not as interesting as that one.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "Than" va después del comparativo. "The" va antes del superlativo.
                </div>
            `,
            examples: [
                {
                    label: 'Comparativos',
                    examples: ['My car is faster than yours.', 'This exercise is easier than the last one.', 'She is more intelligent than her sister.', 'Today is hotter than yesterday.'],
                    translations: ['Mi coche es más rápido que el tuyo.', 'Este ejercicio es más fácil que el anterior.', 'Ella es más inteligente que su hermana.', 'Hoy hace más calor que ayer.']
                },
                {
                    label: 'Superlativos',
                    examples: ['Mount Everest is the highest mountain.', 'This is the most expensive restaurant in town.', 'She is the best player on the team.', 'It was the worst day of my life.'],
                    translations: ['El Everest es la montaña más alta.', 'Este es el restaurante más caro del pueblo.', 'Ella es la mejor jugadora del equipo.', 'Fue el peor día de mi vida.']
                }
            ],
            exercises: [
                { question: 'This test is ___ (easy) than the last one.', options: ['easyer', 'more easy', 'easier', 'most easy'], correct: 'easier', explanation: '"Easy" termina en consonante + y → y → ier.' },
                { question: 'She is the ___ (good) student in the class.', options: ['better', 'best', 'goodest', 'more good'], correct: 'best', explanation: '"Good" es irregular. Superlativo = the best.' },
                { question: 'My house is ___ (big) than yours.', options: ['biger', 'more big', 'bigger', 'most big'], correct: 'bigger', explanation: '"Big" termina en consonante + vocal + consonante → doble g + er.' },
                { question: 'This is the ___ (beautiful) city I have ever seen.', options: ['beautifuler', 'more beautiful', 'most beautiful', 'beautifulest'], correct: 'most beautiful', explanation: 'Adjetivo largo (3 sílabas). Superlativo = the most + adjetivo.' },
                { question: 'The weather today is ___ (bad) than yesterday.', options: ['badder', 'more bad', 'worse', 'worst'], correct: 'worse', explanation: '"Bad" es irregular. Comparativo = worse.' },
                { question: 'He runs ___ (fast) than anyone in the team.', options: ['fast', 'faster', 'more fast', 'fastest'], correct: 'faster', explanation: '"Fast" es corto. Comparativo = faster + than.' }
            ],
            review: [
                { question: 'This book is ___ (interesting) than that one.', options: ['interestinger', 'more interesting', 'most interesting', 'interestingest'], correct: 'more interesting', explanation: 'Adjetivo largo. Comparativo = more + adjetivo.' },
                { question: 'She is ___ (tall) than her mother.', options: ['tall', 'taller', 'more tall', 'tallest'], correct: 'taller', explanation: 'Adjetivo corto. Comparativo = taller + than.' },
                { question: 'That was the ___ (bad) movie I have ever watched.', options: ['badder', 'worse', 'worst', 'more bad'], correct: 'worst', explanation: '"Bad" es irregular. Superlativo = the worst.' },
                { question: 'This hotel is ___ (comfortable) than the other one.', options: ['comfortabler', 'more comfortable', 'most comfortable', 'comfortablest'], correct: 'more comfortable', explanation: 'Adjetivo largo. Comparativo = more + adjetivo.' }
            ],
            exam: [
                { question: 'London is ___ (expensive) than Madrid.', options: ['expensiver', 'more expensive', 'most expensive', 'expensivest'], correct: 'more expensive', explanation: 'Adjetivo largo. Comparativo = more + adjetivo.' },
                { question: 'He is the ___ (young) person in the office.', options: ['younger', 'more young', 'youngest', 'most young'], correct: 'youngest', explanation: 'Superlativo de adjetivo corto: the + adjetivo + est.' },
                { question: 'This exercise is not ___ (difficult) as I thought.', options: ['difficult', 'more difficult', 'most difficult', 'as difficult'], correct: 'as difficult', explanation: 'Estructura "not as + adjetivo + as".' },
                { question: 'She speaks English ___ (well) than her brother.', options: ['well', 'better', 'more well', 'best'], correct: 'better', explanation: '"Well" es irregular. Comparativo = better.' },
                { question: 'This is the ___ (far) I have ever run.', options: ['farther', 'further', 'more far', 'farthest'], correct: 'farthest', explanation: 'Superlativo de "far". Ambas formas son correctas, pero "farthest" es más común para distancia física.' },
                { question: 'The blue car is ___ (cheap) than the red one, but the green one is the ___ (cheap).', options: ['cheaper / cheapest', 'more cheap / most cheap', 'cheap / cheapest', 'cheaper / most cheap'], correct: 'cheaper / cheapest', explanation: 'Comparativo de corto = cheaper. Superlativo = the cheapest.' }
            ]
        },
        {
            title: 'Countable & Uncountable Nouns',
            explanation: `
                <h4>Sustantivos Contables e Incontables</h4>
                <div class="highlight-box">
                    <strong>Contables:</strong> Se pueden contar. Tienen plural.
                    <p>a book → two books | an apple → five apples</p>
                    <p><strong>Incontables:</strong> No se pueden contar directamente. NO tienen plural.</p>
                    <p>water, milk, rice, information, advice, furniture, money</p>
                </div>
                <h4>Contables: A / AN / SOME / MANY</h4>
                <ul>
                    <li>I have <strong>a</strong> pen. / I have <strong>some</strong> pens.</li>
                    <li>How <strong>many</strong> books do you have?</li>
                    <li>I don't have <strong>many</strong> friends.</li>
                </ul>
                <h4>Incontables: SOME / MUCH / A LITTLE</h4>
                <ul>
                    <li>I need <strong>some</strong> water.</li>
                    <li>How <strong>much</strong> money do you have?</li>
                    <li>I don't have <strong>much</strong> time.</li>
                    <li>I have <strong>a little</strong> milk left.</li>
                </ul>
                <h4>Medidas para Incontables</h4>
                <p>Para contar incontables usamos medidas:</p>
                <ul>
                    <li>a <strong>glass of</strong> water | two <strong>cups of</strong> coffee</li>
                    <li>a <strong>piece of</strong> advice | three <strong>slices of</strong> bread</li>
                    <li>a <strong>bowl of</strong> rice | a <strong>bag of</strong> sugar</li>
                </ul>
                <div class="warning-box">
                    <strong>⚠️ Sustantivos incontables comunes:</strong>
                    <p>information, advice, furniture, luggage, equipment, money, bread, rice, pasta, water, milk, coffee, tea, sugar, salt, butter, cheese, meat, fish, fruit, research, knowledge, progress, homework, news, weather, traffic</p>
                </div>
            `,
            examples: [
                {
                    label: 'Contables vs. Incontables',
                    examples: ['I bought two apples.', 'I bought some fruit.', 'How many chairs are there?', 'How much furniture is there?', 'She has three dogs.', 'She has a lot of love.'],
                    translations: ['Compré dos manzanas.', 'Compré algo de fruta.', '¿Cuántas sillas hay?', '¿Cuánto mobiliario hay?', 'Ella tiene tres perros.', 'Ella tiene mucho amor.']
                }
            ],
            exercises: [
                { question: 'I need ___ advice.', options: ['a', 'an', 'some', 'many'], correct: 'some', explanation: '"Advice" es incontable. Usamos "some".' },
                { question: 'How ___ (many/much) water do you drink?', options: ['many', 'much', 'a lot', 'some'], correct: 'much', explanation: '"Water" es incontable. Usamos "how much".' },
                { question: 'She has ___ (a few / a little) friends.', options: ['a few', 'a little', 'few', 'little'], correct: 'a few', explanation: '"Friends" es contable plural. "A few" = algunos (contable).' },
                { question: "There isn't ___ (much / many) milk in the fridge.", options: ['much', 'many', 'a lot', 'some'], correct: 'much', explanation: '"Milk" es incontable. En negativa usamos "much".' },
                { question: 'I have ___ (a few / a little) time before the meeting.', options: ['a few', 'a little', 'few', 'little'], correct: 'a little', explanation: '"Time" es incontable. "A little" = un poco (incontable).' },
                { question: 'Can you give me ___ (an / some) information?', options: ['an', 'a', 'some', 'many'], correct: 'some', explanation: '"Information" es incontable. Usamos "some".' }
            ],
            review: [
                { question: 'How ___ (many/much) sugar do you want?', options: ['many', 'much', 'a lot', 'some'], correct: 'much', explanation: '"Sugar" es incontable. "How much".' },
                { question: 'I have ___ (a few / a little) books to read.', options: ['a few', 'a little', 'few', 'little'], correct: 'a few', explanation: '"Books" es contable. "A few" = algunos.' },
                { question: 'There are too ___ (many / much) people here.', options: ['many', 'much', 'a lot', 'some'], correct: 'many', explanation: '"People" es contable plural. "Too many".' },
                { question: 'I need to buy ___ (a / some) bread.', options: ['a', 'an', 'some', 'many'], correct: 'some', explanation: '"Bread" es incontable. Usamos "some".' }
            ],
            exam: [
                { question: 'She gave me two useful ___ (advice / pieces of advice).', options: ['advice', 'pieces of advice', 'advices', 'piece of advices'], correct: 'pieces of advice', explanation: '"Advice" es incontable. Para plural usamos "pieces of advice".' },
                { question: 'How ___ (many/much) luggage did you bring?', options: ['many', 'much', 'a lot', 'some'], correct: 'much', explanation: '"Luggage" es incontable. "How much".' },
                { question: 'I only have ___ (a few / a little) money left.', options: ['a few', 'a little', 'few', 'little'], correct: 'a little', explanation: '"Money" es incontable. "A little" = un poco.' },
                { question: 'There are ___ (a few / a little) students in the classroom.', options: ['a few', 'a little', 'few', 'little'], correct: 'a few', explanation: '"Students" es contable plural. "A few" = algunos.' },
                { question: "I don't have ___ (many / much) experience in this field.", options: ['many', 'much', 'a lot', 'some'], correct: 'much', explanation: '"Experience" es incontable en este contexto. "Much" en negativa.' },
                { question: 'Could I have ___ (a / some) water, please?', options: ['a', 'an', 'some', 'many'], correct: 'some', explanation: '"Water" es incontable. Pedimos "some water".' }
            ]
        }
    ],

    //themes_part4
    B1: [
        {
            title: 'Present Perfect',
            explanation: `
                <h4>Present Perfect (Presente Perfecto)</h4>
                <p>Usamos el <strong>Present Perfect</strong> para:</p>
                <ul>
                    <li>Acciones del pasado con <strong>resultado en el presente</strong></li>
                    <li>Experiencias <strong>en algún momento</strong> de la vida</li>
                    <li>Acciones que <strong>empezaron en el pasado y continúan</strong></li>
                    <li>Acciones <strong>recientes</strong> (just, already, yet)</li>
                </ul>
                <div class="highlight-box">
                    <strong>Estructura:</strong> Sujeto + <strong>HAVE/HAS + Participio (Pasado)</strong>
                    <p>I have worked | She has eaten | They have gone</p>
                </div>
                <h4>Participios Regulares e Irregulares</h4>
                <p>Los participios regulares terminan en <strong>-ed</strong> (worked, played).</p>
                <p>Los irregulares cambian de forma: go → gone, eat → eaten, see → seen.</p>
                <h4>Marcadores de Tiempo Comunes</h4>
                <ul>
                    <li><strong>Ever / Never:</strong> Have you <strong>ever</strong> been to Paris? I have <strong>never</strong> eaten sushi.</li>
                    <li><strong>Just:</strong> I have <strong>just</strong> finished my homework. (acabo de)</li>
                    <li><strong>Already:</strong> She has <strong>already</strong> left. (ya)</li>
                    <li><strong>Yet:</strong> Have you eaten <strong>yet</strong>? (en preguntas y negativas)</li>
                    <li><strong>Since / For:</strong> I have lived here <strong>since</strong> 2010 / <strong>for</strong> 10 years.</li>
                    <li><strong>So far / Up to now:</strong> I have read 5 books <strong>so far</strong>.</li>
                </ul>
                <div class="warning-box">
                    <strong>⚠️ Present Perfect vs. Past Simple:</strong>
                    <p>NO usamos Present Perfect con tiempos específicos del pasado (yesterday, last week, in 2019).</p>
                    <p>✅ I have seen that film. / ❌ I have seen that film yesterday.</p>
                </div>
            `,
            examples: [
                {
                    label: 'Experiencias de Vida',
                    examples: ['I have visited London three times.', 'She has never eaten sushi.', 'Have you ever been to Japan?', 'They have lived in Paris for five years.'],
                    translations: ['He visitado Londres tres veces.', 'Ella nunca ha comido sushi.', '¿Has estado alguna vez en Japón?', 'Han vivido en París durante cinco años.']
                },
                {
                    label: 'Acciones Recientes y Resultados',
                    examples: ['I have just finished my lunch.', 'She has already called the doctor.', 'Have you seen my keys? I have lost them.', 'The taxi has not arrived yet.'],
                    translations: ['Acabo de terminar mi almuerzo.', 'Ella ya ha llamado al médico.', '¿Has visto mis llaves? Las he perdido.', 'El taxi aún no ha llegado.']
                }
            ],
            exercises: [
                { question: 'I ___ (never/be) to Australia.', options: ['never was', 'have never been', 'had never been', 'am never'], correct: 'have never been', explanation: '"Never" + Present Perfect para experiencias de vida.' },
                { question: 'She ___ (just/leave) the office.', options: ['just left', 'has just left', 'had just left', 'is just leaving'], correct: 'has just left', explanation: '"Just" va con Present Perfect: has + just + participio.' },
                { question: '___ you ___ (finish) your homework yet?', options: ['Did / finish', 'Have / finished', 'Has / finished', 'Do / finish'], correct: 'Have / finished', explanation: '"Yet" en preguntas va con Present Perfect.' },
                { question: 'They ___ (live) here since 2015.', options: ['lived', 'have lived', 'had lived', 'are living'], correct: 'have lived', explanation: '"Since" indica inicio en el pasado que continúa. Present Perfect.' },
                { question: 'I ___ (not/see) him for a long time.', options: ["didn't see", "haven't seen", "hadn't seen", "don't see"], correct: "haven't seen", explanation: '"For a long time" indica duración hasta el presente. Present Perfect.' },
                { question: '___ she ___ (already/eat) lunch?', options: ['Did / already eat', 'Has / already eaten', 'Has / already eat', 'Did / already eaten'], correct: 'Has / already eaten', explanation: '"Already" va con Present Perfect: Has + already + participio.' }
            ],
            review: [
                { question: 'We ___ (know) each other for ten years.', options: ['knew', 'have known', 'had known', 'know'], correct: 'have known', explanation: '"For ten years" = duración hasta el presente. Present Perfect.' },
                { question: 'I ___ (just/see) a great movie!', options: ['just saw', 'have just seen', 'had just seen', 'am just seeing'], correct: 'have just seen', explanation: '"Just" + Present Perfect para acción reciente.' },
                { question: '___ you ever ___ (try) Thai food?', options: ['Did / try', 'Have / tried', 'Has / tried', 'Do / try'], correct: 'Have / tried', explanation: '"Ever" en preguntas va con Present Perfect.' },
                { question: 'The train ___ (not/arrive) yet.', options: ["didn't arrive", "hasn't arrived", "hadn't arrived", "doesn't arrive"], correct: "hasn't arrived", explanation: '"Yet" en negativas va con Present Perfect.' }
            ],
            exam: [
                { question: 'I ___ (work) at this company since I graduated.', options: ['worked', 'have worked', 'had worked', 'am working'], correct: 'have worked', explanation: '"Since I graduated" = desde un punto en el pasado hasta ahora. Present Perfect.' },
                { question: '___ you ___ (read) any good books lately?', options: ['Did / read', 'Have / read', 'Has / read', 'Do / read'], correct: 'Have / read', explanation: '"Lately" (últimamente) va con Present Perfect.' },
                { question: 'She ___ (not/visit) her grandparents for months.', options: ["didn't visit", "hasn't visited", "hadn't visited", "doesn't visit"], correct: "hasn't visited", explanation: '"For months" = duración. Present Perfect.' },
                { question: 'I can\'t find my phone. I ___ (lose) it.', options: ['lost', 'have lost', 'had lost', 'am losing'], correct: 'have lost', explanation: 'Resultado en el presente (can\'t find). Present Perfect.' },
                { question: '___ he ___ (already/leave) for work?', options: ['Did / already leave', 'Has / already left', 'Has / already leave', 'Is / already leaving'], correct: 'Has / already left', explanation: '"Already" + Present Perfect en preguntas.' },
                { question: 'This is the best pizza I ___ (ever/eat).', options: ['ever ate', 'have ever eaten', 'had ever eaten', 'ever eat'], correct: 'have ever eaten', explanation: '"Ever" + superlativo va con Present Perfect.' }
            ]
        },
        {
            title: 'Past Continuous',
            explanation: `
                <h4>Past Continuous (Pasado Continuo)</h4>
                <p>Usamos el <strong>Past Continuous</strong> para:</p>
                <ul>
                    <li>Acciones <strong>en progreso</strong> en un momento específico del pasado</li>
                    <li>Acciones <strong>interrumpidas</strong> por otra acción (Past Simple)</li>
                    <li>Dos acciones <strong>simultáneas</strong> en el pasado</li>
                    <li>Describir el <strong>contexto/ambiente</strong> de una historia</li>
                </ul>
                <div class="highlight-box">
                    <strong>Estructura:</strong> Sujeto + <strong>WAS/WERE + Verbo -ing</strong>
                    <p>I was working | She was studying | They were playing</p>
                </div>
                <h4>Past Continuous vs. Past Simple</h4>
                <table>
                    <tr><th>Past Continuous (fondo)</th><th>Past Simple (acción)</th></tr>
                    <tr><td>I <strong>was walking</strong> home</td><td>when I <strong>saw</strong> an accident.</td></tr>
                    <tr><td>She <strong>was cooking</strong></td><td>when the phone <strong>rang</strong>.</td></tr>
                    <tr><td>They <strong>were watching</strong> TV</td><td>while I <strong>was reading</strong>.</td></tr>
                </table>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "While" suele ir con Past Continuous. "When" suele ir con Past Simple.
                </div>
            `,
            examples: [
                {
                    label: 'Acciones Interrumpidas',
                    examples: ['I was sleeping when the alarm went off.', 'She was having a shower when someone knocked on the door.', 'They were playing football when it started to rain.'],
                    translations: ['Estaba durmiendo cuando sonó la alarma.', 'Estaba duchándose cuando alguien llamó a la puerta.', 'Estaban jugando al fútbol cuando empezó a llover.']
                },
                {
                    label: 'Acciones Simultáneas',
                    examples: ['While I was cooking, my husband was setting the table.', 'They were talking while we were listening.', 'She was driving while he was navigating.'],
                    translations: ['Mientras yo cocinaba, mi marido ponía la mesa.', 'Ellos hablaban mientras nosotros escuchábamos.', 'Ella conducía mientras él navegaba.']
                }
            ],
            exercises: [
                { question: 'I ___ (watch) TV when you called.', options: ['watched', 'was watching', 'were watching', 'am watching'], correct: 'was watching', explanation: 'Acción en progreso interrumpida. I was watching.' },
                { question: 'What ___ you ___ (do) at 8:00 last night?', options: ['did / do', 'were / doing', 'was / doing', 'are / doing'], correct: 'were / doing', explanation: 'Momento específico del pasado. Past Continuous: Were + doing.' },
                { question: 'While she ___ (read), he ___ (cook).', options: ['read / cooked', 'was reading / was cooking', 'were reading / was cooking', 'readed / cooked'], correct: 'was reading / was cooking', explanation: 'Dos acciones simultáneas. Ambas en Past Continuous.' },
                { question: 'They ___ (not/sleep) when the earthquake happened.', options: ["didn't sleep", "weren't sleeping", "wasn't sleeping", "not sleeping"], correct: "weren't sleeping", explanation: 'Negación de acción en progreso. "They" = weren\'t sleeping.' },
                { question: 'The phone rang while I ___ (have) a bath.', options: ['had', 'was having', 'were having', 'am having'], correct: 'was having', explanation: 'While + acción en progreso. "I" = was having.' },
                { question: '___ it ___ (rain) when you left?', options: ['Did / rain', 'Was / raining', 'Were / raining', 'Is / raining'], correct: 'Was / raining', explanation: 'Pregunta sobre estado en el pasado. "It" = Was it raining?' }
            ],
            review: [
                { question: 'He ___ (drive) too fast when the police stopped him.', options: ['drove', 'was driving', 'were driving', 'driven'], correct: 'was driving', explanation: 'Acción en progreso interrumpida. "He" = was driving.' },
                { question: 'While we ___ (walk) in the park, we saw a fox.', options: ['walked', 'were walking', 'was walking', 'walking'], correct: 'were walking', explanation: 'While + acción en progreso. "We" = were walking.' },
                { question: 'She ___ (not/pay) attention when the teacher explained.', options: ["didn't pay", "wasn't paying", "weren't paying", "not paying"], correct: "wasn't paying", explanation: 'Negación de acción en progreso. "She" = wasn\'t paying.' },
                { question: 'What ___ they ___ (talk) about?', options: ['did / talk', 'were / talking', 'was / talking', 'do / talk'], correct: 'were / talking', explanation: 'Pregunta sobre acción en progreso. "They" = were talking.' }
            ],
            exam: [
                { question: 'I ___ (have) breakfast when the postman ___ (arrive).', options: ['had / arrived', 'was having / arrived', 'were having / arrived', 'had / was arriving'], correct: 'was having / arrived', explanation: 'Past Continuous (acción en progreso) + Past Simple (interrupción).' },
                { question: 'The children ___ (play) in the garden while their mother ___ (work).', options: ['played / worked', 'were playing / was working', 'was playing / were working', 'played / was working'], correct: 'were playing / was working', explanation: 'Dos acciones simultáneas. Ambas en Past Continuous.' },
                { question: '___ you ___ (sleep) when I called?', options: ['Did / sleep', 'Were / sleeping', 'Was / sleeping', 'Are / sleeping'], correct: 'Were / sleeping', explanation: 'Pregunta sobre estado en el pasado. "You" = were sleeping.' },
                { question: 'She broke her leg while she ___ (ski).', options: ['skied', 'was skiing', 'were skiing', 'skiing'], correct: 'was skiing', explanation: 'While + acción en progreso. "She" = was skiing.' },
                { question: 'We ___ (not/do) anything special when you called.', options: ["didn't do", "weren't doing", "wasn't doing", "not doing"], correct: "weren't doing", explanation: 'Negación de acción en progreso. "We" = weren\'t doing.' },
                { question: 'The lights went out while we ___ (have) dinner.', options: ['had', 'were having', 'was having', 'having'], correct: 'were having', explanation: 'While + acción en progreso. "We" = were having.' }
            ]
        },
        {
            title: 'Will Future',
            explanation: `
                <h4>Will Future (Futuro con Will)</h4>
                <p>Usamos <strong>will</strong> para:</p>
                <ul>
                    <li><strong>Decisiones espontáneas</strong>: I'll help you!</li>
                    <li><strong>Predicciones generales</strong>: I think it will rain.</li>
                    <li><strong>Promesas</strong>: I will always love you.</li>
                    <li><strong>Ofertas</strong>: Will you have some coffee?</li>
                    <li><strong>Amenazas/Advertencias</strong>: You will regret this!</li>
                    <li><strong>Requests</strong>: Will you close the door?</li>
                </ul>
                <div class="highlight-box">
                    <strong>Estructura:</strong> Sujeto + <strong>WILL + verbo base</strong>
                    <p>I will go | She will call | They will arrive</p>
                    <p>Contracciones: I'll / You'll / He'll / She'll / We'll / They'll</p>
                    <p>Negativo: won't (= will not)</p>
                </div>
                <h4>Will vs. Going to</h4>
                <table>
                    <tr><th>Will</th><th>Going to</th></tr>
                    <tr><td>Decisión en el momento: "The phone is ringing." "I'll answer it."</td><td>Plan decidido: "I'm going to visit my grandmother."</td></tr>
                    <tr><td>Predicción basada en opinión: "I think she will pass."</td><td>Predicción basada en evidencia: "Look! It's going to rain."</td></tr>
                </table>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> En la primera conditional usamos "will": If it rains, I will stay home.
                </div>
            `,
            examples: [
                {
                    label: 'Decisiones Espontáneas y Ofertas',
                    examples: ['I\'ll get it! (the phone)', 'I think I\'ll have the salad.', 'Will you help me with this?', 'Don\'t worry, I\'ll drive you home.'],
                    translations: ['¡Yo contesto! (el teléfono)', 'Creo que voy a pedir la ensalada.', '¿Me ayudas con esto?', 'No te preocupes, te llevo a casa.'
                    ]
                },
                {
                    label: 'Predicciones y Promesas',
                    examples: ['I think the economy will improve next year.', 'I promise I will call you tomorrow.', 'You will feel better soon.', 'This won\'t take long.'],
                    translations: ['Creo que la economía mejorará el año que viene.', 'Prometo que te llamaré mañana.', 'Te sentirás mejor pronto.', 'Esto no tardará mucho.']
                }
            ],
            exercises: [
                { question: '"I\'m thirsty." "I ___ (get) you some water."', options: ['get', 'will get', 'am going to get', 'getting'], correct: 'will get', explanation: 'Decisión espontánea. Usamos "will".' },
                { question: 'I think she ___ (pass) the exam.', options: ['pass', 'will pass', 'is going to pass', 'passes'], correct: 'will pass', explanation: '"I think" = predicción basada en opinión. Usamos "will".' },
                { question: '___ you ___ (marry) me?', options: ['Do / marry', 'Will / marry', 'Are / going to marry', 'Did / marry'], correct: 'Will / marry', explanation: 'Propuesta/promesa. Usamos "will".' },
                { question: 'If it rains, we ___ (stay) at home.', options: ['stay', 'will stay', 'are going to stay', 'staying'], correct: 'will stay', explanation: 'Primera conditional: If + Present Simple, will + verbo base.' },
                { question: '"I can\'t open this jar." "I ___ (help) you."', options: ['help', 'will help', 'am going to help', 'helping'], correct: 'will help', explanation: 'Oferta espontánea. Usamos "will".' },
                { question: 'I promise I ___ (not/tell) anyone.', options: ["won't tell", "don't tell", "am not going to tell", "not tell"], correct: "won't tell", explanation: 'Promesa. Negación de will = won\'t.' }
            ],
            review: [
                { question: 'I think it ___ (be) a great concert.', options: ['is', 'will be', 'is going to be', 'be'], correct: 'will be', explanation: 'Predicción basada en opinión. Will.' },
                { question: '"The doorbell is ringing." "I ___ (open) it."', options: ['open', 'will open', 'am going to open', 'opening'], correct: 'will open', explanation: 'Decisión espontánea. Will.' },
                { question: 'If you study hard, you ___ (pass).', options: ['pass', 'will pass', 'are going to pass', 'passing'], correct: 'will pass', explanation: 'Primera conditional: will + verbo base.' },
                { question: '___ you ___ (have) another coffee?', options: ['Do / have', 'Will / have', 'Are / going to have', 'Did / have'], correct: 'Will / have', explanation: 'Oferta. Will + verbo base.' }
            ],
            exam: [
                { question: 'I\'m sure they ___ (love) this gift.', options: ['love', 'will love', 'are going to love', 'loving'], correct: 'will love', explanation: 'Predicción basada en opinión (I\'m sure). Will.' },
                { question: 'If she ___ (not/hurry), she ___ (miss) the train.', options: ["doesn't hurry / will miss", "won't hurry / misses", "doesn't hurry / misses", "not hurry / will miss"], correct: "doesn't hurry / will miss", explanation: 'Primera conditional: If + Present Simple, will + verbo.' },
                { question: '"I\'ve lost my keys!" "Don\'t worry, I ___ (lend) you mine."', options: ['lend', 'will lend', 'am going to lend', 'lending'], correct: 'will lend', explanation: 'Oferta espontánea. Will.' },
                { question: 'I ___ (probably / go) to the party, but I\'m not sure.', options: ['probably go', 'will probably go', 'am probably going to go', 'probably going'], correct: 'will probably go', explanation: '"Probably" va entre will y el verbo. Predicción incierta = will.' },
                { question: 'Unless you apologize, she ___ (not/forgive) you.', options: ["won't forgive", "doesn't forgive", "isn't going to forgive", "not forgive"], correct: "won't forgive", explanation: '"Unless" = if not. Primera conditional con will.' },
                { question: '"I\'m cold." "I ___ (close) the window."', options: ['close', 'will close', 'am going to close', 'closing'], correct: 'will close', explanation: 'Decisión espontánea. Will.' }
            ]
        },
        {
            title: 'First Conditional',
            explanation: `
                <h4>First Conditional (Primera Condicional)</h4>
                <p>Usamos la <strong>Primera Condicional</strong> para situaciones <strong>reales o posibles</strong> en el futuro.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong>
                    <p><strong>If + Present Simple, will + verbo base</strong></p>
                    <p>If it rains, I will stay at home.</p>
                    <p>También podemos invertir: I will stay at home if it rains.</p>
                </div>
                <h4>Usos</h4>
                <ul>
                    <li><strong>Amenazas:</strong> If you don't study, you will fail.</li>
                    <li><strong>Promesas:</strong> If you help me, I will help you.</li>
                    <li><strong>Advertencias:</strong> If you touch that, you will get burned.</li>
                    <li><strong>Planes contingentes:</strong> If I have time, I will call you.</li>
                </ul>
                <h4>Unless (= if not)</h4>
                <p>Podemos usar <strong>unless</strong> en lugar de "if not":</p>
                <ul>
                    <li>If you don't hurry, you will be late. = Unless you hurry, you will be late.</li>
                </ul>
                <h4>Provided that / As long as</h4>
                <p>También podemos usar <strong>provided that</strong> o <strong>as long as</strong>:</p>
                <ul>
                    <li>I will lend you the money <strong>provided that</strong> you pay me back.</li>
                    <li>You can go out <strong>as long as</strong> you finish your homework.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Nunca uses "will" en la parte de "if". ❌ If it will rain... ✅ If it rains...
                </div>
            `,
            examples: [
                {
                    label: 'First Conditional',
                    examples: ['If I win the lottery, I will buy a house.', 'She will be angry if you are late.', 'If you eat too much, you will feel sick.', 'I will call you if I have time.'],
                    translations: ['Si gano la lotería, compraré una casa.', 'Ella se enfadará si llegas tarde.', 'Si comes demasiado, te sentirás mal.', 'Te llamaré si tengo tiempo.']
                },
                {
                    label: 'Unless / Provided that',
                    examples: ['Unless you study, you will fail.', 'I will go to the party as long as you come with me.', 'Provided that it doesn\'t rain, we will have the picnic.'],
                    translations: ['Si no estudias, suspenderás.', 'Iré a la fiesta siempre que vengas conmigo.', 'Siempre que no llueva, haremos el picnic.']
                }
            ],
            exercises: [
                { question: 'If it ___ (rain) tomorrow, I ___ (stay) at home.', options: ['rains / will stay', 'will rain / stay', 'rains / stay', 'will rain / will stay'], correct: 'rains / will stay', explanation: 'Primera conditional: If + Present Simple, will + verbo.' },
                { question: 'She ___ (be) happy if you ___ (call) her.', options: ['will be / call', 'is / will call', 'will be / will call', 'is / call'], correct: 'will be / call', explanation: 'Primera conditional: will + verbo, if + Present Simple.' },
                { question: 'Unless you ___ (hurry), you ___ (miss) the bus.', options: ['hurry / will miss', 'will hurry / miss', 'hurry / miss', 'will hurry / will miss'], correct: 'hurry / will miss', explanation: '"Unless" = if not. If + Present Simple, will + verbo.' },
                { question: 'If I ___ (see) him, I ___ (tell) him the news.', options: ['see / will tell', 'will see / tell', 'see / tell', 'will see / will tell'], correct: 'see / will tell', explanation: 'Primera conditional: If + Present Simple, will + verbo.' },
                { question: '___ you ___ (help) me if I need it?', options: ['Do / help', 'Will / help', 'Are / helping', 'Did / help'], correct: 'Will / help', explanation: 'Pregunta en primera conditional: Will + sujeto + verbo?' },
                { question: 'I will go to the concert ___ you come with me.', options: ['if', 'unless', 'provided that', 'as long as'], correct: 'provided that', explanation: '"Provided that" introduce una condición positiva.' }
            ],
            review: [
                { question: 'If he ___ (not/study), he ___ (fail) the exam.', options: ["doesn't study / will fail", "won't study / fails", "doesn't study / fails", "not study / will fail"], correct: "doesn't study / will fail", explanation: 'Primera conditional: If + Present Simple (neg), will + verbo.' },
                { question: 'You ___ (get) wet if you ___ (not/take) an umbrella.', options: ['will get / don\'t take', 'get / won\'t take', 'will get / not take', 'get / don\'t take'], correct: 'will get / don\'t take', explanation: 'Primera conditional: will + verbo, if + Present Simple (neg).' },
                { question: '___ she ___ (come) if we invite her?', options: ['Does / come', 'Will / come', 'Is / coming', 'Did / come'], correct: 'Will / come', explanation: 'Pregunta sobre posibilidad futura. Will + sujeto + verbo?' },
                { question: 'I will help you ___ you promise to try your best.', options: ['if', 'unless', 'provided that', 'as long as'], correct: 'as long as', explanation: '"As long as" introduce una condición.' }
            ],
            exam: [
                { question: 'If I ___ (have) enough money next year, I ___ (travel) to Japan.', options: ['have / will travel', 'will have / travel', 'have / travel', 'will have / will travel'], correct: 'have / will travel', explanation: 'Primera conditional: If + Present Simple, will + verbo.' },
                { question: '___ you ___ (lend) me your car if I promise to drive carefully?', options: ['Do / lend', 'Will / lend', 'Are / lending', 'Did / lend'], correct: 'Will / lend', explanation: 'Pregunta sobre oferta condicional. Will + sujeto + verbo?' },
                { question: 'Unless she ___ (apologize), I ___ (not/speak) to her again.', options: ["apologizes / won't speak", "will apologize / don't speak", "apologizes / don't speak", "apologize / won't speak"], correct: "apologizes / won't speak", explanation: 'Unless + Present Simple, will + not + verbo.' },
                { question: 'If the weather ___ (be) good, we ___ (have) the barbecue in the garden.', options: ['is / will have', 'will be / have', 'is / have', 'will be / will have'], correct: 'is / will have', explanation: 'Primera conditional: If + Present Simple, will + verbo.' },
                { question: 'You can borrow my book ___ you return it by Friday.', options: ['if', 'unless', 'provided that', 'as long as'], correct: 'as long as', explanation: '"As long as" = siempre que. Condición positiva.' },
                { question: 'If he ___ (not/arrive) soon, we ___ (start) without him.', options: ["doesn't arrive / will start", "won't arrive / start", "doesn't arrive / start", "not arrive / will start"], correct: "doesn't arrive / will start", explanation: 'Primera conditional: If + Present Simple (neg), will + verbo.' }
            ]
        },
        {
            title: 'Relative Clauses',
            explanation: `
                <h4>Relative Clauses (Oraciones de Relativo)</h4>
                <p>Las <strong>oraciones de relativo</strong> añaden información sobre un sustantivo. Comienzan con <strong>who, which, that, whose, where, when</strong>.</p>
                <div class="highlight-box">
                    <strong>Pronombres Relativos:</strong>
                    <ul>
                        <li><strong>Who</strong> → personas (sujeto)</li>
                        <li><strong>Which</strong> → cosas/animales</li>
                        <li><strong>That</strong> → personas o cosas (informal)</li>
                        <li><strong>Whose</strong> → posesión</li>
                        <li><strong>Where</strong> → lugares</li>
                        <li><strong>When</strong> → tiempos</li>
                    </ul>
                </div>
                <h4>Defining vs. Non-Defining Relative Clauses</h4>
                <table>
                    <tr><th>Defining (esencial)</th><th>Non-Defining (extra)</th></tr>
                    <tr><td>The man <strong>who</strong> lives next door is a doctor.</td><td>My brother, <strong>who</strong> lives in London, is visiting.</td></tr>
                    <tr><td>No usamos comas.</td><td>Siempre usamos comas.</td></tr>
                    <tr><td>No podemos omitir "that".</td><td>No podemos usar "that".</td></tr>
                </table>
                <h4>Omisión del Pronombre Relativo</h4>
                <p>Podemos omitir <strong>who/which/that</strong> cuando son <strong>objeto</strong> de la oración relativa:</p>
                <ul>
                    <li>The book <strong>that</strong> I bought is great. = The book I bought is great.</li>
                    <li>The man <strong>who</strong> I met is kind. = The man I met is kind.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Si el pronombre relativo va seguido de un verbo (sujeto), NO se puede omitir.
                </div>
            `,
            examples: [
                {
                    label: 'Who / Which / That',
                    examples: ['The woman who lives next door is a teacher.', 'This is the book which I told you about.', 'The dog that barks at night belongs to them.', 'I met a man whose wife is a famous singer.'],
                    translations: ['La mujer que vive al lado es profesora.', 'Este es el libro del que te hablé.', 'El perro que ladra por la noche es de ellos.', 'Conocí a un hombre cuya esposa es una cantante famosa.']
                },
                {
                    label: 'Where / When',
                    examples: ['This is the restaurant where we had dinner.', 'I remember the day when we first met.', 'The house whose roof is red is mine.', 'The city where I was born is beautiful.'],
                    translations: ['Este es el restaurante donde cenamos.', 'Recuerdo el día en que nos conocimos.', 'La casa cuyo tejado es roja es mía.', 'La ciudad donde nací es hermosa.']
                }
            ],
            exercises: [
                { question: 'The man ___ lives next door is very friendly.', options: ['who', 'which', 'whose', 'where'], correct: 'who', explanation: 'Nos referimos a una persona como sujeto. Usamos "who".' },
                { question: 'This is the house ___ I was born.', options: ['who', 'which', 'whose', 'where'], correct: 'where', explanation: 'Nos referimos a un lugar. Usamos "where".' },
                { question: 'The book ___ she is reading is very interesting.', options: ['who', 'which', 'whose', 'where'], correct: 'which', explanation: 'Nos referimos a una cosa. Usamos "which".' },
                { question: 'I have a friend ___ brother is a pilot.', options: ['who', 'which', 'whose', 'where'], correct: 'whose', explanation: 'Indica posesión. "Whose brother" = cuyo hermano.' },
                { question: 'The car ___ he bought is red.', options: ['who', 'which', 'whose', 'where'], correct: 'which', explanation: 'Nos referimos a una cosa (objeto). "Which" o "that".' },
                { question: 'Do you remember the day ___ we first met?', options: ['who', 'which', 'when', 'where'], correct: 'when', explanation: 'Nos referimos a un tiempo. Usamos "when".' }
            ],
            review: [
                { question: 'The students ___ study hard usually get good grades.', options: ['who', 'which', 'whose', 'where'], correct: 'who', explanation: 'Personas como sujeto. "Who".' },
                { question: 'This is the restaurant ___ serves the best pizza.', options: ['who', 'which', 'whose', 'where'], correct: 'which', explanation: 'Cosa como sujeto (restaurant serves). "Which" o "that".' },
                { question: 'I met a woman ___ son is my classmate.', options: ['who', 'which', 'whose', 'where'], correct: 'whose', explanation: 'Posesión. "Whose son" = cuyo hijo.' },
                { question: 'The year ___ I graduated was 2015.', options: ['who', 'which', 'when', 'where'], correct: 'when', explanation: 'Tiempo. "When".' }
            ],
            exam: [
                { question: 'The doctor ___ treated my mother is very experienced.', options: ['who', 'which', 'whose', 'where'], correct: 'who', explanation: 'Persona como sujeto. "Who".' },
                { question: 'This is the school ___ I studied for six years.', options: ['who', 'which', 'whose', 'where'], correct: 'where', explanation: 'Lugar. "Where".' },
                { question: 'The film ___ we watched last night was boring.', options: ['who', 'which', 'whose', 'where'], correct: 'which', explanation: 'Cosa como objeto. "Which" o "that" (se puede omitir).' },
                { question: 'I have a neighbor ___ dog barks all night.', options: ['who', 'which', 'whose', 'where'], correct: 'whose', explanation: 'Posesión. "Whose dog" = cuyo perro.' },
                { question: 'The reason ___ I left early is personal.', options: ['who', 'which', 'why', 'where'], correct: 'why', explanation: 'Razón. "Why" (o "that").' },
                { question: 'My brother, ___ lives in New York, is visiting us.', options: ['who', 'which', 'that', 'where'], correct: 'who', explanation: 'Non-defining relative clause (comas). Persona. Usamos "who", no "that".' }
            ]
        }
    ],

    //themes_part5
    B2: [
        {
            title: 'Present Perfect Continuous',
            explanation: `
                <h4>Present Perfect Continuous</h4>
                <p>Usamos el <strong>Present Perfect Continuous</strong> para acciones que <strong>empezaron en el pasado, continúan en el presente</strong> y enfatizamos la <strong>duración</strong>.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong> HAVE/HAS + BEEN + Verbo -ing
                    <p>I have been working | She has been studying</p>
                </div>
                <h4>Present Perfect Simple vs. Continuous</h4>
                <table>
                    <tr><th>Simple (resultado)</th><th>Continuous (duración/proceso)</th></tr>
                    <tr><td>I have written three emails.</td><td>I have been writing emails all morning.</td></tr>
                    <tr><td>She has painted the room.</td><td>She has been painting the room.</td></tr>
                </table>
                <div class="warning-box">
                    <strong>⚠️ No usamos continuo con verbos de estado:</strong> know, believe, understand, love, hate, want, need.
                </div>
            `,
            examples: [
                {
                    label: 'Duración y Proceso',
                    examples: ['I have been waiting for two hours.', 'She has been learning Spanish for five years.', 'They have been living here since 2010.', 'He has been working all day.'],
                    translations: ['Llevo esperando dos horas.', 'Lleva cinco años aprendiendo español.', 'Llevan viviendo aquí desde 2010.', 'Ha estado trabajando todo el día.']
                }
            ],
            exercises: [
                { question: 'I ___ (wait) here for over an hour.', options: ['have waited', 'have been waiting', 'waited', 'am waiting'], correct: 'have been waiting', explanation: 'Énfasis en la duración. Present Perfect Continuous.' },
                { question: 'She looks tired because she ___ (work) all night.', options: ['has worked', 'has been working', 'worked', 'is working'], correct: 'has been working', explanation: 'Acción que continúa y causa efecto presente (tired).' },
                { question: 'How long ___ you ___ (live) here?', options: ['have / lived', 'have / been living', 'did / live', 'are / living'], correct: 'have / been living', explanation: 'Pregunta sobre duración. Present Perfect Continuous.' },
                { question: 'They ___ (play) tennis since 9 o\'clock.', options: ['have played', 'have been playing', 'played', 'are playing'], correct: 'have been playing', explanation: '"Since" + énfasis en duración. Present Perfect Continuous.' },
                { question: 'It ___ (rain) all day.', options: ['has rained', 'has been raining', 'rained', 'is raining'], correct: 'has been raining', explanation: 'Acción continua durante todo el día. Énfasis en duración.' },
                { question: 'I ___ (not/see) him for ages, but I ___ (hear) he got married.', options: ["haven't seen / have heard", "haven't been seeing / have been hearing", "didn't see / heard", "don't see / hear"], correct: "haven't seen / have heard", explanation: 'Primero resultado (see = estado, no continuo). Segundo resultado (hear = estado).' }
            ],
            review: [
                { question: 'He ___ (drive) for six hours and he needs a break.', options: ['has driven', 'has been driving', 'drove', 'is driving'], correct: 'has been driving', explanation: 'Duración + necesidad presente. Present Perfect Continuous.' },
                { question: 'How long ___ she ___ (study) English?', options: ['has / studied', 'has / been studying', 'did / study', 'is / studying'], correct: 'has / been studying', explanation: 'Pregunta sobre duración. Present Perfect Continuous.' },
                { question: 'My hands are dirty because I ___ (garden).', options: ['have gardened', 'have been gardening', 'gardened', 'am gardening'], correct: 'have been gardening', explanation: 'Acción reciente con resultado visible (dirty hands).' },
                { question: 'We ___ (talk) about this problem for hours.', options: ['have talked', 'have been talking', 'talked', 'are talking'], correct: 'have been talking', explanation: 'Énfasis en duración (for hours). Present Perfect Continuous.' }
            ],
            exam: [
                { question: 'She ___ (cook) all afternoon. That\'s why the kitchen is a mess.', options: ['has cooked', 'has been cooking', 'cooked', 'is cooking'], correct: 'has been cooking', explanation: 'Duración + resultado presente (mess). Present Perfect Continuous.' },
                { question: 'I ___ (read) this book for two weeks and I still haven\'t finished it.', options: ['have read', 'have been reading', 'read', 'am reading'], correct: 'have been reading', explanation: 'Acción inacabada con duración. Present Perfect Continuous.' },
                { question: 'They ___ (argue) about money again.', options: ['have argued', 'have been arguing', 'argued', 'are arguing'], correct: 'have been arguing', explanation: 'Acción reciente repetida o continua. Present Perfect Continuous.' },
                { question: 'How long ___ it ___ (snow)?', options: ['has / snowed', 'has / been snowing', 'did / snow', 'is / snowing'], correct: 'has / been snowing', explanation: 'Pregunta sobre duración. Present Perfect Continuous.' },
                { question: 'I feel dizzy because I ___ (run).', options: ['have run', 'have been running', 'ran', 'am running'], correct: 'have been running', explanation: 'Acción reciente con efecto físico presente. Present Perfect Continuous.' },
                { question: 'The children ___ (watch) TV since they got home from school.', options: ['have watched', 'have been watching', 'watched', 'are watching'], correct: 'have been watching', explanation: '"Since" + duración continua. Present Perfect Continuous.' }
            ]
        },
        {
            title: 'Past Perfect',
            explanation: `
                <h4>Past Perfect (Pasado Perfecto)</h4>
                <p>Usamos el <strong>Past Perfect</strong> para una acción que ocurrió <strong>antes de otra acción en el pasado</strong>.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong> HAD + Participio
                    <p>I had finished | She had left | They had gone</p>
                </div>
                <h4>Usos</h4>
                <ul>
                    <li>Acción anterior a otra en el pasado: When I arrived, she <strong>had already left</strong>.</li>
                    <li>Con "before", "after", "by the time": By the time we got there, the film <strong>had started</strong>.</li>
                    <li>Con "wish" en pasado: I wish I <strong>had studied</strong> harder.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> El Past Perfect es el "antes del antes". Primero ocurrió la acción en Past Perfect, luego la del Past Simple.
                </div>
            `,
            examples: [
                {
                    label: 'Acción Anterior en el Pasado',
                    examples: ['When I arrived, they had already left.', 'She had finished her homework before dinner.', 'By the time we got to the station, the train had departed.', 'I realized I had lost my keys.'],
                    translations: ['Cuando llegué, ellos ya se habían ido.', 'Ella había terminado sus deberes antes de cenar.', 'Para cuando llegamos a la estación, el tren había partido.', 'Me di cuenta de que había perdido mis llaves.']
                }
            ],
            exercises: [
                { question: 'When I got to the cinema, the film ___ (already/start).', options: ['already started', 'had already started', 'has already started', 'was already starting'], correct: 'had already started', explanation: 'La película empezó ANTES de llegar. Past Perfect.' },
                { question: 'She ___ (never/see) snow before she visited Norway.', options: ['never saw', 'had never seen', 'has never seen', 'never seen'], correct: 'had never seen', explanation: 'Experiencia anterior a otra acción pasada. Past Perfect.' },
                { question: 'By the time we arrived, they ___ (eat) all the food.', options: ['ate', 'had eaten', 'have eaten', 'were eating'], correct: 'had eaten', explanation: '"By the time" indica acción completada antes de otra. Past Perfect.' },
                { question: 'I ___ (not/meet) him before the conference.', options: ["didn't meet", "hadn't met", "haven't met", "not met"], correct: "hadn't met", explanation: 'No conocerlo fue ANTES de la conferencia. Past Perfect.' },
                { question: 'After she ___ (finish) her degree, she moved to London.', options: ['finished', 'had finished', 'has finished', 'was finishing'], correct: 'had finished', explanation: 'Terminar la carrera fue ANTES de mudarse. Past Perfect.' },
                { question: 'They were tired because they ___ (work) all day.', options: ['worked', 'had been working', 'have worked', 'were working'], correct: 'had been working', explanation: 'Acción continua anterior con resultado. Past Perfect Continuous.' }
            ],
            review: [
                { question: 'I wish I ___ (study) harder for the exam.', options: ['studied', 'had studied', 'have studied', 'study'], correct: 'had studied', explanation: '"Wish" + Past Perfect = arrepentimiento del pasado.' },
                { question: 'When I saw her, I realized I ___ (see) her before.', options: ['saw', 'had seen', 'have seen', 'see'], correct: 'had seen', explanation: 'Verla antes fue ANTES de darme cuenta. Past Perfect.' },
                { question: 'By 2010, he ___ (live) in Paris for ten years.', options: ['lived', 'had lived', 'has lived', 'was living'], correct: 'had lived', explanation: '"By 2010" = antes de 2010. Past Perfect.' },
                { question: 'The house was empty because the owners ___ (move) out.', options: ['moved', 'had moved', 'have moved', 'were moving'], correct: 'had moved', explanation: 'Mudarse fue ANTES de que la casa estuviera vacía. Past Perfect.' }
            ],
            exam: [
                { question: 'When the police arrived, the thieves ___ (escape).', options: ['escaped', 'had escaped', 'have escaped', 'were escaping'], correct: 'had escaped', explanation: 'Escapar fue ANTES de que llegara la policía. Past Perfect.' },
                { question: 'She was nervous because she ___ (never/fly) before.', options: ['never flew', 'had never flown', 'has never flown', 'never flown'], correct: 'had never flown', explanation: 'No volar antes fue ANTES de estar nerviosa. Past Perfect.' },
                { question: 'If I ___ (know) about the problem, I would have helped.', options: ['knew', 'had known', 'have known', 'know'], correct: 'had known', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'By the time I got home, my parents ___ (go) to bed.', options: ['went', 'had gone', 'have gone', 'were going'], correct: 'had gone', explanation: '"By the time" + acción anterior. Past Perfect.' },
                { question: 'I ___ (just/leave) when the phone rang.', options: ['just left', 'had just left', 'have just left', 'was just leaving'], correct: 'had just left', explanation: '"Just" + Past Perfect para acción inmediatamente anterior.' },
                { question: 'They were hungry because they ___ (not/eat) all day.', options: ["didn't eat", "hadn't eaten", "haven't eaten", "not eaten"], correct: "hadn't eaten", explanation: 'No comer fue ANTES de tener hambre. Past Perfect.' }
            ]
        },
        {
            title: 'Second Conditional',
            explanation: `
                <h4>Second Conditional (Segunda Condicional)</h4>
                <p>Usamos la <strong>Segunda Condicional</strong> para situaciones <strong>hipotéticas o irreales</strong> en el presente o futuro.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong>
                    <p><strong>If + Past Simple, would + verbo base</strong></p>
                    <p>If I were rich, I would travel the world.</p>
                </div>
                <h4>Usos</h4>
                <ul>
                    <li>Sueños e imposibilidades: If I <strong>had</strong> a million dollars, I <strong>would buy</strong> a yacht.</li>
                    <li>Consejos hipotéticos: If I <strong>were</strong> you, I <strong>would</strong> apologize.</li>
                    <li>Situaciones improbables: If she <strong>knew</strong> the truth, she <strong>would be</strong> angry.</li>
                </ul>
                <h4>Were en lugar de Was</h4>
                <p>En inglés formal, usamos <strong>were</strong> para todos los pronombres en la segunda conditional:</p>
                <ul>
                    <li>If I <strong>were</strong> you... (NO If I was you)</li>
                    <li>If he <strong>were</strong> here... (formal)</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "Would" y "could" se pueden usar: If I had time, I <strong>could</strong> help you.
                </div>
            `,
            examples: [
                {
                    label: 'Segunda Condicional',
                    examples: ['If I won the lottery, I would buy a house.', 'She would travel more if she had more money.', 'If they lived closer, we would visit them often.', 'I would help you if I knew how.'],
                    translations: ['Si ganara la lotería, compraría una casa.', 'Ella viajaría más si tuviera más dinero.', 'Si vivieran más cerca, los visitaríamos a menudo.', 'Te ayudaría si supiera cómo.']
                }
            ],
            exercises: [
                { question: 'If I ___ (be) you, I ___ (accept) the offer.', options: ['am / will accept', 'were / would accept', 'was / would accept', 'were / will accept'], correct: 'were / would accept', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: 'She ___ (buy) a car if she ___ (have) enough money.', options: ['will buy / has', 'would buy / had', 'buys / had', 'would buy / has'], correct: 'would buy / had', explanation: 'Segunda conditional: would + verbo, if + Past Simple.' },
                { question: 'If he ___ (speak) French, he ___ (get) the job.', options: ['speaks / will get', 'spoke / would get', 'speak / would get', 'spoke / will get'], correct: 'spoke / would get', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: 'I ___ (not/do) that if I ___ (be) you.', options: ["won't do / am", "wouldn't do / were", "don't do / was", "wouldn't do / was"], correct: "wouldn't do / were", explanation: 'Segunda conditional negativa: wouldn\'t + verbo, if + were.' },
                { question: 'If we ___ (live) by the sea, we ___ (go) swimming every day.', options: ['live / will go', 'lived / would go', 'lived / will go', 'live / would go'], correct: 'lived / would go', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: '___ you ___ (travel) around the world if you ___ (can)?', options: ['Will / travel / can', 'Would / travel / could', 'Do / travel / can', 'Would / travel / can'], correct: 'Would / travel / could', explanation: 'Segunda conditional con "could": Would + verbo, if + could.' }
            ],
            review: [
                { question: 'If I ___ (know) her number, I ___ (call) her.', options: ['know / will call', 'knew / would call', 'know / would call', 'knew / will call'], correct: 'knew / would call', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: 'They ___ (be) happier if they ___ (not/work) so much.', options: ['will be / don\'t work', 'would be / didn\'t work', 'are / don\'t work', 'would be / not work'], correct: 'would be / didn\'t work', explanation: 'Segunda conditional negativa: would + verbo, if + didn\'t + verbo.' },
                { question: 'If she ___ (have) more time, she ___ (learn) to play the piano.', options: ['has / will learn', 'had / would learn', 'have / would learn', 'had / will learn'], correct: 'had / would learn', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: 'I wish I ___ (can) speak Japanese.', options: ['can', 'could', 'would can', 'will can'], correct: 'could', explanation: '"Wish" + could para deseos imposibles en presente.' }
            ],
            exam: [
                { question: 'If I ___ (find) a wallet in the street, I ___ (take) it to the police.', options: ['find / will take', 'found / would take', 'found / will take', 'find / would take'], correct: 'found / would take', explanation: 'Segunda conditional: If + Past Simple, would + verbo.' },
                { question: 'What ___ you ___ (do) if you ___ (win) the lottery?', options: ['will / do / win', 'would / do / won', 'do / do / win', 'would / do / win'], correct: 'would / do / won', explanation: 'Segunda conditional en pregunta: Would + sujeto + verbo, if + Past Simple.' },
                { question: 'If he ___ (not/be) so lazy, he ___ (pass) all his exams.', options: ["isn't / will pass", "wasn't / would pass", "weren't / would pass", "not be / would pass"], correct: "wasn't / would pass", explanation: 'Segunda conditional negativa: If + wasn\'t, would + verbo.' },
                { question: 'I would visit you more often if you ___ (live) closer.', options: ['live', 'lived', 'will live', 'living'], correct: 'lived', explanation: 'Segunda conditional: If + Past Simple.' },
                { question: 'If we ___ (have) a bigger house, we ___ (can) adopt a dog.', options: ['have / can', 'had / could', 'had / can', 'have / could'], correct: 'had / could', explanation: 'Segunda conditional con could: If + Past Simple, could + verbo.' },
                { question: 'She ___ (not/marry) him if she ___ (know) the truth.', options: ["won't marry / knows", "wouldn't marry / knew", "doesn't marry / knows", "wouldn't marry / knows"], correct: "wouldn't marry / knew", explanation: 'Segunda conditional negativa: wouldn\'t + verbo, if + Past Simple.' }
            ]
        },
        {
            title: 'Passive Voice',
            explanation: `
                <h4>Passive Voice (Voz Pasiva)</h4>
                <p>Usamos la <strong>voz pasiva</strong> cuando el <strong>objeto</strong> de la acción es más importante que el sujeto, o cuando el sujeto es desconocido o irrelevante.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong> SUJETO + TO BE + PARTICIPIO
                    <p>The house <strong>was built</strong> in 1990.</p>
                    <p>English <strong>is spoken</strong> all over the world.</p>
                </div>
                <h4>Voz Pasiva en Diferentes Tiempos</h4>
                <table>
                    <tr><th>Tiempo</th><th>Activa</th><th>Pasiva</th></tr>
                    <tr><td>Present Simple</td><td>They make cars.</td><td>Cars <strong>are made</strong>.</td></tr>
                    <tr><td>Past Simple</td><td>They built the house.</td><td>The house <strong>was built</strong>.</td></tr>
                    <tr><td>Present Perfect</td><td>They have finished it.</td><td>It <strong>has been finished</strong>.</td></tr>
                    <tr><td>Will</td><td>They will announce it.</td><td>It <strong>will be announced</strong>.</td></tr>
                    <tr><td>Going to</td><td>They are going to fire him.</td><td>He <strong>is going to be fired</strong>.</td></tr>
                </table>
                <h4>Agente (by + sujeto)</h4>
                <p>Añadimos <strong>by + agente</strong> solo si es importante saber quién hizo la acción:</p>
                <ul>
                    <li>The book <strong>was written by</strong> J.K. Rowling.</li>
                    <li>The window <strong>was broken</strong>. (no importa quién)</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Los verbos intransitivos (no tienen objeto) NO pueden usarse en pasiva: arrive, happen, exist, die.
                </div>
            `,
            examples: [
                {
                    label: 'Voz Pasiva',
                    examples: ['The letter was delivered this morning.', 'English is spoken in many countries.', 'The project has been completed.', 'The thief was arrested by the police.', 'Dinner will be served at 8.'],
                    translations: ['La carta fue entregada esta mañana.', 'El inglés se habla en muchos países.', 'El proyecto ha sido completado.', 'El ladrón fue arrestado por la policía.', 'La cena será servida a las 8.']
                }
            ],
            exercises: [
                { question: 'The book ___ (write) by Shakespeare.', options: ['is written', 'was written', 'has written', 'wrote'], correct: 'was written', explanation: 'Pasado simple pasivo: was/were + participio.' },
                { question: 'Coffee ___ (grow) in Brazil.', options: ['is grown', 'was grown', 'grows', 'grown'], correct: 'is grown', explanation: 'Verdad general. Present Simple pasivo: is/are + participio.' },
                { question: 'The window ___ (break) yesterday.', options: ['is broken', 'was broken', 'has broken', 'broke'], correct: 'was broken', explanation: 'Pasado simple pasivo: was/were + participio.' },
                { question: 'The meeting ___ (cancel).', options: ['is cancelled', 'was cancelled', 'has been cancelled', 'cancelled'], correct: 'has been cancelled', explanation: 'Acción reciente con resultado. Present Perfect pasivo.' },
                { question: 'The report ___ (finish) by tomorrow.', options: ['is finished', 'was finished', 'will be finished', 'has been finished'], correct: 'will be finished', explanation: 'Futuro pasivo: will be + participio.' },
                { question: 'The students ___ (give) a test next week.', options: ['are given', 'were given', 'will be given', 'have been given'], correct: 'will be given', explanation: '"Next week" = futuro. Will be + participio.' }
            ],
            review: [
                { question: 'This song ___ (sing) by Adele.', options: ['is sung', 'was sung', 'has sung', 'sang'], correct: 'is sung', explanation: 'Present Simple pasivo: is/are + participio.' },
                { question: 'The house ___ (build) in the 18th century.', options: ['is built', 'was built', 'has built', 'built'], correct: 'was built', explanation: 'Pasado simple pasivo: was/were + participio.' },
                { question: 'The problem ___ (solve) already.', options: ['is solved', 'was solved', 'has been solved', 'solved'], correct: 'has been solved', explanation: '"Already" + Present Perfect pasivo.' },
                { question: 'The letter ___ (send) yesterday.', options: ['is sent', 'was sent', 'has sent', 'sent'], correct: 'was sent', explanation: 'Pasado simple pasivo: was/were + participio.' }
            ],
            exam: [
                { question: 'The new hospital ___ (open) next month by the mayor.', options: ['is opened', 'was opened', 'will be opened', 'has been opened'], correct: 'will be opened', explanation: '"Next month" = futuro. Will be + participio.' },
                { question: 'The bridge ___ (design) by a famous architect.', options: ['is designed', 'was designed', 'has designed', 'designed'], correct: 'was designed', explanation: 'Acción completada en el pasado. Past Simple pasivo.' },
                { question: 'These computers ___ (make) in China.', options: ['are made', 'were made', 'have made', 'made'], correct: 'are made', explanation: 'Verdad general. Present Simple pasivo.' },
                { question: 'The documents ___ (sign) by the manager before the meeting.', options: ['are signed', 'were signed', 'had been signed', 'have been signed'], correct: 'had been signed', explanation: 'Acción anterior a otra en el pasado. Past Perfect pasivo.' },
                { question: 'The car ___ (repair) at the moment.', options: ['is repaired', 'is being repaired', 'was repaired', 'has been repaired'], correct: 'is being repaired', explanation: '"At the moment" = ahora. Present Continuous pasivo: is being + participio.' },
                { question: 'The thief ___ (catch) by the police yesterday.', options: ['is caught', 'was caught', 'has caught', 'caught'], correct: 'was caught', explanation: 'Pasado simple pasivo: was/were + participio.' }
            ]
        },
        {
            title: 'Reported Speech',
            explanation: `
                <h4>Reported Speech (Estilo Indirecto)</h4>
                <p>Usamos el <strong>Reported Speech</strong> para contar lo que alguien dijo, sin citar sus palabras exactas.</p>
                <div class="highlight-box">
                    <strong>Cambios en los Tiempos Verbales:</strong>
                    <table>
                        <tr><th>Directo</th><th>Indirecto</th></tr>
                        <tr><td>Present Simple</td><td>Past Simple</td></tr>
                        <tr><td>Present Continuous</td><td>Past Continuous</td></tr>
                        <tr><td>Past Simple</td><td>Past Perfect</td></tr>
                        <tr><td>Present Perfect</td><td>Past Perfect</td></tr>
                        <tr><td>Will</td><td>Would</td></tr>
                        <tr><td>Can</td><td>Could</td></tr>
                        <tr><td>May</td><td>Might</td></tr>
                        <tr><td>Must</td><td>Had to</td></tr>
                    </table>
                </div>
                <h4>Cambios en Pronombres y Adverbios</h4>
                <table>
                    <tr><th>Directo</th><th>Indirecto</th></tr>
                    <tr><td>I, me, my</td><td>he/she, him/her, his/her</td></tr>
                    <tr><td>this, these</td><td>that, those</td></tr>
                    <tr><td>now</td><td>then / at that moment</td></tr>
                    <tr><td>today</td><td>that day</td></tr>
                    <tr><td>yesterday</td><td>the day before</td></tr>
                    <tr><td>tomorrow</td><td>the next day</td></tr>
                    <tr><td>here</td><td>there</td></tr>
                </table>
                <h4>Verbos de Reporte Comunes</h4>
                <p>said, told, explained, mentioned, admitted, denied, suggested, promised, warned, advised, asked, wondered</p>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Con "say" no necesitamos objeto indirecto. Con "tell" SÍ necesitamos objeto: He said (that) he was tired. / He told me (that) he was tired.
                </div>
            `,
            examples: [
                {
                    label: 'Reported Speech',
                    examples: ['"I am tired." → She said (that) she was tired.', '"I will call you tomorrow." → He said he would call me the next day.', '"Can you help me?" → She asked if I could help her.', '"I have finished my work." → He said he had finished his work.'],
                    translations: ['"Estoy cansada." → Ella dijo que estaba cansada.', '"Te llamaré mañana." → Él dijo que me llamaría al día siguiente.', '"¿Puedes ayudarme?" → Ella preguntó si podía ayudarla.', '"He terminado mi trabajo." → Él dijo que había terminado su trabajo.']
                }
            ],
            exercises: [
                { question: '"I am happy." → She said she ___ happy.', options: ['is', 'was', 'were', 'be'], correct: 'was', explanation: 'Present Simple → Past Simple. "I am" → "she was".' },
                { question: '"I will go." → He said he ___ go.', options: ['will', 'would', 'can', 'might'], correct: 'would', explanation: 'Will → Would en reported speech.' },
                { question: '"Can you swim?" → She asked if I ___ swim.', options: ['can', 'could', 'may', 'might'], correct: 'could', explanation: 'Can → Could en reported speech.' },
                { question: '"I have seen that film." → He said he ___ seen that film.', options: ['has', 'had', 'have', 'would'], correct: 'had', explanation: 'Present Perfect → Past Perfect.' },
                { question: '"I bought a car yesterday." → She said she ___ bought a car the day before.', options: ['has', 'had', 'have', 'would'], correct: 'had', explanation: 'Past Simple → Past Perfect. "Yesterday" → "the day before".' },
                { question: '"Are you coming?" → He asked if I ___ coming.', options: ['am', 'was', 'were', 'be'], correct: 'was', explanation: 'Present Continuous → Past Continuous. "Are you" → "I was".' }
            ],
            review: [
                { question: '"I can\'t help you." → She said she ___ help me.', options: ['can\'t', 'couldn\'t', 'won\'t', 'wouldn\'t'], correct: 'couldn\'t', explanation: 'Can\'t → Couldn\'t en reported speech.' },
                { question: '"I may be late." → He said he ___ be late.', options: ['may', 'might', 'can', 'could'], correct: 'might', explanation: 'May → Might en reported speech.' },
                { question: '"I must leave now." → She said she ___ leave then.', options: ['must', 'had to', 'have to', 'would'], correct: 'had to', explanation: 'Must → Had to en reported speech.' },
                { question: '"Do you like pizza?" → He asked if I ___ pizza.', options: ['like', 'liked', 'likes', 'liking'], correct: 'liked', explanation: 'Present Simple → Past Simple en reported questions.' }
            ],
            exam: [
                { question: '"I am going to the gym." → She said she ___ going to the gym.', options: ['is', 'was', 'were', 'be'], correct: 'was', explanation: 'Present Continuous → Past Continuous.' },
                { question: '"I have never been to Paris." → He said he ___ never been to Paris.', options: ['has', 'had', 'have', 'would'], correct: 'had', explanation: 'Present Perfect → Past Perfect.' },
                { question: '"Will you marry me?" → He asked if she ___ marry him.', options: ['will', 'would', 'can', 'could'], correct: 'would', explanation: 'Will → Would en reported speech.' },
                { question: '"I saw him yesterday." → She said she ___ seen him the day before.', options: ['has', 'had', 'have', 'would'], correct: 'had', explanation: 'Past Simple → Past Perfect. "Yesterday" → "the day before".' },
                { question: '"I must finish this today." → He said he ___ finish that that day.', options: ['must', 'had to', 'have to', 'would'], correct: 'had to', explanation: 'Must → Had to. "This" → "that", "today" → "that day".' },
                { question: '"Where do you live?" → She asked me where I ___.', options: ['live', 'lived', 'living', 'lives'], correct: 'lived', explanation: 'Pregunta con wh- → reported con wh- + Past Simple.' }
            ]
        }
    ],

    //themes_part6
    C1: [
        {
            title: 'Third Conditional',
            explanation: `
                <h4>Third Conditional (Tercera Condicional)</h4>
                <p>Usamos la <strong>Tercera Condicional</strong> para situaciones <strong>hipotéticas en el pasado</strong> que ya no se pueden cambiar. Expresa arrepentimiento o especulación sobre el pasado.</p>
                <div class="highlight-box">
                    <strong>Estructura:</strong>
                    <p><strong>If + Past Perfect, would have + participio</strong></p>
                    <p>If I had studied harder, I would have passed the exam.</p>
                </div>
                <h4>Usos</h4>
                <ul>
                    <li><strong>Arrepentimiento:</strong> If I had known, I would have told you.</li>
                    <li><strong>Culpa:</strong> If I hadn't been late, the accident wouldn't have happened.</li>
                    <li><strong>Especulación:</strong> If she had taken the job, she would have been promoted.</li>
                </ul>
                <h4>Variaciones con Could/Might</h4>
                <ul>
                    <li>If I had practiced more, I <strong>could have won</strong>.</li>
                    <li>If he had left earlier, he <strong>might have caught</strong> the train.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> La tercera conditional siempre habla de imposibilidades. El pasado ya no se puede cambiar.
                </div>
            `,
            examples: [
                {
                    label: 'Tercera Condicional',
                    examples: ['If I had known you were coming, I would have baked a cake.', 'She would have been on time if she had left earlier.', 'If they had listened to me, they wouldn\'t have lost money.', 'I wouldn\'t have said that if I had known the truth.'],
                    translations: ['Si hubiera sabido que venías, habría hecho un pastel.', 'Ella habría llegado a tiempo si hubiera salido antes.', 'Si me hubieran escuchado, no habrían perdido dinero.', 'No habría dicho eso si hubiera sabido la verdad.']
                }
            ],
            exercises: [
                { question: 'If I ___ (study) harder, I ___ (pass) the exam.', options: ['studied / would pass', 'had studied / would have passed', 'have studied / would have passed', 'had studied / would pass'], correct: 'had studied / would have passed', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'She ___ (not/be) late if she ___ (take) a taxi.', options: ["wouldn't be / took", "wouldn't have been / had taken", "isn't / takes", "wasn't / took"], correct: "wouldn't have been / had taken", explanation: 'Tercera conditional negativa: wouldn\'t have been, if + had taken.' },
                { question: 'If he ___ (not/drink) so much, he ___ (not/forget) my birthday.', options: ["didn't drink / wouldn't forget", "hadn't drunk / wouldn't have forgotten", "doesn't drink / won't forget", "not drunk / not forgotten"], correct: "hadn't drunk / wouldn't have forgotten", explanation: 'Tercera conditional: If + Past Perfect (neg), would have + participio (neg).' },
                { question: '___ you ___ (go) to the party if you ___ (know) about it?', options: ['Would / go / knew', 'Would / have gone / had known', 'Will / go / know', 'Do / go / know'], correct: 'Would / have gone / had known', explanation: 'Tercera conditional en pregunta: Would + have + participio, if + Past Perfect.' },
                { question: 'If we ___ (leave) earlier, we ___ (catch) the train.', options: ['left / would catch', 'had left / would have caught', 'leave / will catch', 'had left / would catch'], correct: 'had left / would have caught', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'I ___ (buy) the house if I ___ (have) enough money at the time.', options: ['would buy / had', 'would have bought / had had', 'bought / had', 'would have bought / have'], correct: 'would have bought / had had', explanation: 'Tercera conditional: would have + participio, if + Past Perfect. "Had had" = haber tenido.' }
            ],
            review: [
                { question: 'If she ___ (listen) to me, she ___ (not/make) that mistake.', options: ['listened / wouldn\'t make', 'had listened / wouldn\'t have made', 'listens / won\'t make', 'had listened / wouldn\'t make'], correct: 'had listened / wouldn\'t have made', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'We ___ (win) if our best player ___ (not/get) injured.', options: ['would win / didn\'t get', 'would have won / hadn\'t got', 'win / don\'t get', 'had won / didn\'t get'], correct: 'would have won / hadn\'t got', explanation: 'Tercera conditional: would have + participio, if + Past Perfect (neg).' },
                { question: 'If I ___ (be) you, I ___ (apologize) to her yesterday.', options: ['were / would apologize', 'had been / would have apologized', 'was / would apologize', 'were / would have apologized'], correct: 'had been / would have apologized', explanation: 'Tercera conditional con "If I had been you": If + Past Perfect, would have + participio.' },
                { question: '___ they ___ (come) if we ___ (invite) them?', options: ['Would / come / invited', 'Would / have come / had invited', 'Will / come / invite', 'Did / come / invite'], correct: 'Would / have come / had invited', explanation: 'Tercera conditional en pregunta: Would + have + participio, if + Past Perfect.' }
            ],
            exam: [
                { question: 'If the weather ___ (be) better, we ___ (have) the picnic outside.', options: ['was / would have', 'had been / would have had', 'were / would have', 'had been / would had'], correct: 'had been / would have had', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'I wish I ___ (take) that job offer last year.', options: ['took', 'had taken', 'have taken', 'would take'], correct: 'had taken', explanation: '"Wish" + Past Perfect = arrepentimiento del pasado.' },
                { question: 'If he ___ (not/be) so arrogant, people ___ (like) him more.', options: ["isn't / would like", "hadn't been / would have liked", "wasn't / would like", "hadn't been / would liked"], correct: "hadn't been / would have liked", explanation: 'Tercera conditional: If + Past Perfect (neg), would have + participio.' },
                { question: 'She ___ (be) promoted if she ___ (accept) the transfer.', options: ['would be / accepted', 'would have been / had accepted', 'was / accepted', 'had been / accepted'], correct: 'would have been / had accepted', explanation: 'Tercera conditional: would have been, if + had accepted.' },
                { question: 'If I ___ (know) then what I know now, things ___ (be) different.', options: ['knew / would be', 'had known / would have been', 'know / will be', 'had known / would be'], correct: 'had known / would have been', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: '___ you ___ (do) anything differently if you ___ (have) the chance?', options: ['Would / do / had', 'Would / have done / had had', 'Will / do / have', 'Did / do / had'], correct: 'Would / have done / had had', explanation: 'Tercera conditional en pregunta: Would + have + participio, if + had had.' }
            ]
        },
        {
            title: 'Mixed Conditionals',
            explanation: `
                <h4>Mixed Conditionals (Condicionales Mixtas)</h4>
                <p>Las <strong>condicionales mixtas</strong> combinan diferentes tiempos para expresar situaciones donde el pasado afecta el presente, o el presente afecta el pasado.</p>
                <div class="highlight-box">
                    <strong>Tipo 1: Pasado → Presente</strong>
                    <p>If + Past Perfect, would + verbo base</p>
                    <p>If I had studied medicine, I would be a doctor now.</p>
                    <p>(No estudié medicina en el pasado → No soy médico ahora)</p>
                </div>
                <div class="highlight-box">
                    <strong>Tipo 2: Presente → Pasado</strong>
                    <p>If + Past Simple, would have + participio</p>
                    <p>If I were more organized, I wouldn't have missed the deadline.</p>
                    <p>(No estoy organizado ahora → Perdí el plazo en el pasado)</p>
                </div>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> Las mixed conditionals son comunes en situaciones de arrepentimiento donde una causa pasada tiene efectos presentes.
                </div>
            `,
            examples: [
                {
                    label: 'Mixed Conditionals',
                    examples: ['If I had taken that job, I would be rich now.', 'If she had studied harder, she would have a better job.', 'If I were taller, I would have been a basketball player.', 'If he hadn\'t broken his leg, he would be playing today.'],
                    translations: ['Si hubiera aceptado ese trabajo, ahora sería rico.', 'Si hubiera estudiado más, tendría un mejor trabajo.', 'Si fuera más alto, habría sido jugador de baloncesto.', 'Si no se hubiera roto la pierna, estaría jugando hoy.']
                }
            ],
            exercises: [
                { question: 'If I ___ (not/quit) university, I ___ (have) a better job now.', options: ["didn't quit / would have", "hadn't quit / would have", "hadn't quit / had had", "don't quit / will have"], correct: "hadn't quit / would have", explanation: 'Mixed: If + Past Perfect (pasado), would + verbo base (presente).' },
                { question: 'If she ___ (speak) English, she ___ (get) the job she applied for.', options: ['spoke / would have got', 'speaks / would get', 'had spoken / would have got', 'spoke / will get'], correct: 'spoke / would have got', explanation: 'Mixed: If + Past Simple (presente), would have + participio (pasado).' },
                { question: 'If we ___ (meet) earlier, we ___ (be) married by now.', options: ['met / would be', 'had met / would be', 'meet / will be', 'had met / had been'], correct: 'had met / would be', explanation: 'Mixed: If + Past Perfect (pasado), would + verbo base (presente).' },
                { question: 'I ___ (not/be) so tired if I ___ (go) to bed earlier last night.', options: ["wouldn't be / went", "wouldn't be / had gone", "wasn't / went", "wouldn't have been / had gone"], correct: "wouldn't be / had gone", explanation: 'Mixed: wouldn\'t + verbo base (presente), if + Past Perfect (pasado).' },
                { question: 'If he ___ (be) more careful, he ___ (not/have) the accident.', options: ['was / wouldn\'t have', 'were / wouldn\'t have had', 'had been / wouldn\'t have had', 'is / won\'t have'], correct: 'were / wouldn\'t have had', explanation: 'Mixed: If + Past Simple (presente), would have + participio (pasado).' },
                { question: 'If they ___ (invest) in Bitcoin, they ___ (be) millionaires now.', options: ['invest / would be', 'had invested / would be', 'invested / would have been', 'had invested / had been'], correct: 'had invested / would be', explanation: 'Mixed: If + Past Perfect (pasado), would + verbo base (presente).' }
            ],
            review: [
                { question: 'If I ___ (listen) to my parents, I ___ (not/be) in this situation.', options: ['listened / wouldn\'t be', 'had listened / wouldn\'t be', 'listen / won\'t be', 'had listened / hadn\'t been'], correct: 'had listened / wouldn\'t be', explanation: 'Mixed: If + Past Perfect, would + verbo base.' },
                { question: 'She ___ (be) happier now if she ___ (make) different choices.', options: ['would be / made', 'would be / had made', 'is / made', 'had been / had made'], correct: 'would be / had made', explanation: 'Mixed: would + verbo base, if + Past Perfect.' },
                { question: 'If he ___ (not/be) so stubborn, he ___ (accept) the offer.', options: ["wasn't / would have accepted", "weren't / would have accepted", "hadn't been / would have accepted", "isn't / will accept"], correct: "weren't / would have accepted", explanation: 'Mixed: If + Past Simple, would have + participio.' },
                { question: 'If we ___ (leave) on time, we ___ (not/miss) the flight.', options: ['left / wouldn\'t miss', 'had left / wouldn\'t have missed', 'leave / won\'t miss', 'had left / wouldn\'t miss'], correct: 'had left / wouldn\'t have missed', explanation: 'Tercera conditional (no mixed): If + Past Perfect, would have + participio.' }
            ],
            exam: [
                { question: 'If I ___ (take) better care of myself, I ___ (not/have) these health problems.', options: ['took / wouldn\'t have', 'had taken / wouldn\'t have', 'take / won\'t have', 'had taken / hadn\'t have'], correct: 'had taken / wouldn\'t have', explanation: 'Mixed: If + Past Perfect, would + verbo base.' },
                { question: 'She ___ (feel) better now if she ___ (see) a doctor when I told her to.', options: ['would feel / saw', 'would feel / had seen', 'feels / saw', 'had felt / had seen'], correct: 'would feel / had seen', explanation: 'Mixed: would + verbo base, if + Past Perfect.' },
                { question: 'If he ___ (be) more confident, he ___ (ask) her out last week.', options: ['was / would ask', 'were / would have asked', 'had been / would have asked', 'is / will ask'], correct: 'were / would have asked', explanation: 'Mixed: If + Past Simple, would have + participio.' },
                { question: 'I ___ (not/need) glasses if I ___ (not/spend) so much time in front of screens.', options: ["wouldn't need / didn't spend", "wouldn't need / hadn't spent", "don't need / didn't spend", "hadn't needed / hadn't spent"], correct: "wouldn't need / hadn't spent", explanation: 'Mixed: wouldn\'t + verbo base, if + Past Perfect.' },
                { question: 'If they ___ (arrive) on time, they ___ (not/miss) the beginning of the show.', options: ['arrived / wouldn\'t miss', 'had arrived / wouldn\'t have missed', 'arrive / won\'t miss', 'had arrived / wouldn\'t miss'], correct: 'had arrived / wouldn\'t have missed', explanation: 'Tercera conditional: If + Past Perfect, would have + participio.' },
                { question: 'If I ___ (win) the lottery last year, I ___ (travel) the world now.', options: ['won / would travel', 'had won / would be traveling', 'had won / would travel', 'win / will travel'], correct: 'had won / would be traveling', explanation: 'Mixed: If + Past Perfect, would be + verb-ing (continuo presente).' }
            ]
        },
        {
            title: 'Inversion',
            explanation: `
                <h4>Inversion (Inversión)</h4>
                <p>La <strong>inversión</strong> consiste en invertir el sujeto y el verbo auxiliar para dar <strong>énfasis</strong> o crear un tono más <strong>formal/literario</strong>.</p>
                <div class="highlight-box">
                    <strong>Inversion con negativas:</strong>
                    <p><strong>Never / Rarely / Seldom / Hardly / Scarcely / No sooner / Little / Under no circumstances</strong></p>
                    <p>Normal: I have <strong>never</strong> seen such beauty.</p>
                    <p>Inversión: <strong>Never have I</strong> seen such beauty.</p>
                </div>
                <h4>Tipos de Inversión</h4>
                <table>
                    <tr><th>Expresión</th><th>Estructura</th><th>Ejemplo</th></tr>
                    <tr><td>Never, Rarely, Seldom</td><td>Negativa + auxiliar + sujeto</td><td>Rarely <strong>have I</strong> met such kindness.</td></tr>
                    <tr><td>Hardly/Scarcely... when</td><td>Hardly + had + sujeto + participio</td><td>Hardly <strong>had I arrived</strong> when it started raining.</td></tr>
                    <tr><td>No sooner... than</td><td>No sooner + had + sujeto + participio</td><td>No sooner <strong>had she left</strong> than the phone rang.</td></tr>
                    <tr><td>Not only... but also</td><td>Not only + auxiliar + sujeto</td><td>Not only <strong>is he</strong> smart, but also kind.</td></tr>
                    <tr><td>Under no circumstances</td><td>Under no circumstances + auxiliar + sujeto</td><td>Under no circumstances <strong>will I</strong> agree.</td></tr>
                    <tr><td>Only after/when/if</td><td>Only + expresión + auxiliar + sujeto</td><td>Only then <strong>did I</strong> understand.</td></tr>
                </table>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> En inversión con "hardly" y "no sooner", SIEMPRE usamos Past Perfect.
                </div>
            `,
            examples: [
                {
                    label: 'Inversion',
                    examples: ['Never have I been so embarrassed.', 'Rarely does she complain about anything.', 'Hardly had we arrived when the concert started.', 'Not only did he forget my birthday, but he also forgot my name.', 'Under no circumstances should you open that door.'],
                    translations: ['Nunca había estado tan avergonzado.', 'Raramente se queja de algo.', 'Apenas habíamos llegado cuando empezó el concierto.', 'No solo olvidó mi cumpleaños, sino que también olvidó mi nombre.', 'Bajo ninguna circunstancia deberías abrir esa puerta.']
                }
            ],
            exercises: [
                { question: 'Never ___ (I/see) such a beautiful sunset.', options: ['I saw', 'I have seen', 'have I seen', 'did I see'], correct: 'have I seen', explanation: 'Inversión con "Never": Never + have + sujeto + participio.' },
                { question: 'Hardly ___ (she/arrive) when the meeting started.', options: ['she arrived', 'she had arrived', 'had she arrived', 'did she arrive'], correct: 'had she arrived', explanation: 'Inversión con "Hardly": Hardly + had + sujeto + participio.' },
                { question: 'Not only ___ (he/forget) my name, but he also forgot my face.', options: ['he forgot', 'he had forgotten', 'did he forget', 'had he forgotten'], correct: 'did he forget', explanation: 'Inversión con "Not only": Not only + did + sujeto + verbo base.' },
                { question: 'Under no circumstances ___ (I/accept) such behavior.', options: ['I accept', 'I will accept', 'will I accept', 'would I accept'], correct: 'will I accept', explanation: 'Inversión con "Under no circumstances": auxiliar + sujeto + verbo.' },
                { question: 'Rarely ___ (we/get) the chance to travel abroad.', options: ['we get', 'we got', 'do we get', 'did we get'], correct: 'do we get', explanation: 'Inversión con "Rarely": Rarely + do + sujeto + verbo base.' },
                { question: 'Only after I left ___ (I/realize) my mistake.', options: ['I realized', 'I had realized', 'did I realize', 'had I realized'], correct: 'did I realize', explanation: 'Inversión con "Only after": Only + expresión + did + sujeto + verbo.' }
            ],
            review: [
                { question: 'No sooner ___ (they/sit) down than the waiter arrived.', options: ['they sat', 'they had sat', 'had they sat', 'did they sit'], correct: 'had they sat', explanation: 'Inversión con "No sooner": No sooner + had + sujeto + participio.' },
                { question: 'Seldom ___ (I/hear) such nonsense.', options: ['I hear', 'I heard', 'do I hear', 'did I hear'], correct: 'do I hear', explanation: 'Inversión con "Seldom": Seldom + do + sujeto + verbo.' },
                { question: 'Little ___ (she/know) what awaited her.', options: ['she knew', 'she had known', 'did she know', 'had she known'], correct: 'did she know', explanation: 'Inversión con "Little": Little + did + sujeto + verbo.' },
                { question: 'Not until yesterday ___ (I/find) out the truth.', options: ['I found', 'I had found', 'did I find', 'had I found'], correct: 'did I find', explanation: 'Inversión con "Not until": Not until + did + sujeto + verbo.' }
            ],
            exam: [
                { question: 'Never before ___ (I/witness) such a dramatic event.', options: ['I witnessed', 'I had witnessed', 'had I witnessed', 'did I witness'], correct: 'had I witnessed', explanation: 'Inversión con "Never before": Never before + had + sujeto + participio.' },
                { question: 'Scarcely ___ (we/start) when it began to rain.', options: ['we started', 'we had started', 'had we started', 'did we start'], correct: 'had we started', explanation: 'Inversión con "Scarcely": Scarcely + had + sujeto + participio.' },
                { question: 'Only by working hard ___ (you/achieve) your goals.', options: ['you achieve', 'you will achieve', 'will you achieve', 'would you achieve'], correct: 'will you achieve', explanation: 'Inversión con "Only by": Only + expresión + will + sujeto + verbo.' },
                { question: 'Not only ___ (he/win) the race, but he also broke the record.', options: ['he won', 'he had won', 'did he win', 'had he won'], correct: 'did he win', explanation: 'Inversión con "Not only": Not only + did + sujeto + verbo.' },
                { question: 'On no account ___ (you/touch) these documents.', options: ['you touch', 'you should touch', 'should you touch', 'would you touch'], correct: 'should you touch', explanation: 'Inversión con "On no account": On no account + should + sujeto + verbo.' },
                { question: 'So beautiful ___ (be/she) that everyone stared.', options: ['she was', 'she had been', 'was she', 'had she been'], correct: 'was she', explanation: 'Inversión con "So + adjetivo": So + adjetivo + be + sujeto.' }
            ]
        },
        {
            title: 'Subjunctive',
            explanation: `
                <h4>Subjunctive (Subjuntivo)</h4>
                <p>El <strong>subjuntivo</strong> se usa para expresar deseos, sugerencias, demandas, importancia, y situaciones hipotéticas o irreales.</p>
                <div class="highlight-box">
                    <strong>Forma del Subjuntivo:</strong>
                    <p>Usamos la <strong>forma base del verbo</strong> para todas las personas (sin -s en tercera persona).</p>
                    <p>I suggest that he <strong>go</strong> home. (NO goes)</p>
                    <p>It is important that she <strong>be</strong> on time. (NO is)</p>
                </div>
                <h4>Usos del Subjuntivo</h4>
                <table>
                    <tr><th>Situación</th><th>Ejemplo</th></tr>
                    <tr><td>Sugerencias</td><td>I suggest that he <strong>arrive</strong> early.</td></tr>
                    <tr><td>Demandas/Órdenes</td><td>The doctor insisted that she <strong>take</strong> the medicine.</td></tr>
                    <tr><td>Deseos</td><td>I wish I <strong>were</strong> rich. / If only he <strong>knew</strong> the truth.</td></tr>
                    <tr><td>Importancia/Necesidad</td><td>It is essential that everyone <strong>be</strong> present.</td></tr>
                    <tr><td>Propósito</td><td>He left early so that he <strong>not miss</strong> the train. (formal)</td></tr>
                </table>
                <h4>Were en lugar de Was</h4>
                <p>En subjuntivo formal, usamos <strong>were</strong> para todos los pronombres:</p>
                <ul>
                    <li>If I <strong>were</strong> you... (NO If I was you)</li>
                    <li>I wish she <strong>were</strong> here.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> En inglés americano y formal británico, el subjuntivo es más común. En inglés británico informal, a veces se usa "should": I suggest that he <strong>should go</strong>.
                </div>
            `,
            examples: [
                {
                    label: 'Subjunctive',
                    examples: ['I suggest that he see a doctor.', 'It is crucial that she be informed immediately.', 'The judge ordered that the prisoner be released.', 'I wish I were taller.', 'If only he were here to see this.'],
                    translations: ['Sugiero que vea a un médico.', 'Es crucial que se le informe inmediatamente.', 'El juez ordenó que el prisionero fuera liberado.', 'Ojalá fuera más alto.', 'Si tan solo estuviera aquí para ver esto.']
                }
            ],
            exercises: [
                { question: 'I suggest that he ___ (go) to bed early.', options: ['go', 'goes', 'went', 'should go'], correct: 'go', explanation: 'Subjuntivo: forma base del verbo para todas las personas.' },
                { question: 'It is important that she ___ (be) on time.', options: ['is', 'be', 'was', 'were'], correct: 'be', explanation: 'Subjuntivo después de "It is important that": forma base "be".' },
                { question: 'The teacher demanded that the students ___ (not/use) phones in class.', options: ['not use', 'do not use', 'not used', 'not using'], correct: 'not use', explanation: 'Subjuntivo negativo: not + forma base.' },
                { question: 'I wish I ___ (be) more confident.', options: ['am', 'be', 'was', 'were'], correct: 'were', explanation: '"Wish" + subjuntivo: "were" para todos los pronombres.' },
                { question: 'It is essential that the report ___ (submit) by Friday.', options: ['is submitted', 'be submitted', 'was submitted', 'were submitted'], correct: 'be submitted', explanation: 'Subjuntivo pasivo: be + participio.' },
                { question: 'The doctor recommended that she ___ (take) a week off.', options: ['takes', 'take', 'took', 'should take'], correct: 'take', explanation: 'Subjuntivo después de "recommended": forma base.' }
            ],
            review: [
                { question: 'I propose that the meeting ___ (postpone) until next week.', options: ['is postponed', 'be postponed', 'was postponed', 'were postponed'], correct: 'be postponed', explanation: 'Subjuntivo pasivo: be + participio.' },
                { question: 'If I ___ (be) in your position, I would resign.', options: ['am', 'be', 'was', 'were'], correct: 'were', explanation: 'Subjuntivo en segunda conditional: "were" para todos.' },
                { question: 'It is vital that he ___ (not/tell) anyone about this.', options: ['not tell', 'does not tell', 'not told', 'not telling'], correct: 'not tell', explanation: 'Subjuntivo negativo: not + forma base.' },
                { question: 'The manager insisted that all employees ___ (attend) the training.', options: ['attend', 'attends', 'attended', 'should attend'], correct: 'attend', explanation: 'Subjuntivo después de "insisted": forma base.' }
            ],
            exam: [
                { question: 'It is imperative that the data ___ (verify) before publication.', options: ['is verified', 'be verified', 'was verified', 'were verified'], correct: 'be verified', explanation: 'Subjuntivo pasivo: be + participio.' },
                { question: 'I would rather he ___ (not/come) to the party.', options: ['not come', 'does not come', 'did not come', 'not came'], correct: 'not come', explanation: '"Would rather" + subjuntivo: not + forma base.' },
                { question: 'The committee recommended that the proposal ___ (accept).', options: ['is accepted', 'be accepted', 'was accepted', 'were accepted'], correct: 'be accepted', explanation: 'Subjuntivo pasivo: be + participio.' },
                { question: 'If only she ___ (listen) to my advice!', options: ['listens', 'listen', 'listened', 'had listened'], correct: 'listened', explanation: '"If only" + subjuntivo (Pasado Simple) = deseo presente imposible.' },
                { question: 'It is necessary that every applicant ___ (submit) two references.', options: ['submits', 'submit', 'submitted', 'should submit'], correct: 'submit', explanation: 'Subjuntivo después de "It is necessary": forma base.' },
                { question: 'I demand that he ___ (apologize) immediately.', options: ['apologizes', 'apologize', 'apologized', 'should apologize'], correct: 'apologize', explanation: 'Subjuntivo después de "demand": forma base.' }
            ]
        },
        {
            title: 'Advanced Passive',
            explanation: `
                <h4>Advanced Passive (Voz Pasiva Avanzada)</h4>
                <p>Formas avanzadas de la voz pasiva incluyen <strong>causative have/get</strong>, pasiva con verbos de reporte, y estructuras complejas.</p>
                <div class="highlight-box">
                    <strong>Causative Have/Get:</strong>
                    <p>Have/Get + something + done (por alguien más)</p>
                    <p>I <strong>had my hair cut</strong>. (Me corté el pelo = alguien me lo cortó)</p>
                    <p>She <strong>got the car repaired</strong>.</p>
                </div>
                <h4>Passive Reporting Verbs</h4>
                <table>
                    <tr><th>Activa</th><th>Pasiva</th></tr>
                    <tr><td>People say that he is rich.</td><td>He <strong>is said to be</strong> rich.</td></tr>
                    <tr><td>They believe that she left.</td><td>She <strong>is believed to have left</strong>.</td></tr>
                    <tr><td>Everyone knows that he lied.</td><td>He <strong>is known to have lied</strong>.</td></tr>
                </table>
                <h4>Verbos con dos objetos</h4>
                <ul>
                    <li>They gave <strong>me</strong> a prize. → I <strong>was given</strong> a prize. / A prize <strong>was given to</strong> me.</li>
                    <li>They sent <strong>her</strong> a letter. → She <strong>was sent</strong> a letter.</li>
                </ul>
                <div class="tip-box">
                    <strong>💡 Tip:</strong> "Be supposed to" = se supone que: I am supposed to arrive at 9.
                </div>
            `,
            examples: [
                {
                    label: 'Advanced Passive',
                    examples: ['I had my passport stolen in Barcelona.', 'She is said to be the best surgeon in the country.', 'The painting is believed to have been stolen during the war.', 'We got the house painted last summer.', 'He is known to have worked for the CIA.'],
                    translations: ['Me robaron el pasaporte en Barcelona.', 'Se dice que es la mejor cirujana del país.', 'Se cree que el cuadro fue robado durante la guerra.', 'Pintamos la casa el verano pasado (contratamos a alguien).', 'Se sabe que trabajó para la CIA.']
                }
            ],
            exercises: [
                { question: 'I ___ (have) my car ___ (repair) yesterday.', options: ['had / repaired', 'have / repaired', 'got / repair', 'had / repair'], correct: 'had / repaired', explanation: 'Causative: have + objeto + participio.' },
                { question: 'He ___ (say) to be a genius.', options: ['is said', 'is saying', 'said', 'says'], correct: 'is said', explanation: 'Passive reporting: is said to be.' },
                { question: 'The suspect ___ (believe) to ___ (leave) the country.', options: ['is believed / leave', 'is believed / have left', 'believes / have left', 'is believing / leave'], correct: 'is believed / have left', explanation: 'Passive reporting + acción pasada: is believed to have + participio.' },
                { question: 'She ___ (get) her teeth ___ (whiten).', options: ['got / whitened', 'got / whiten', 'had / whiten', 'has / whitened'], correct: 'got / whitened', explanation: 'Causative con get: get + objeto + participio.' },
                { question: 'The report ___ (expect) to ___ (publish) next month.', options: ['is expected / publish', 'is expected / be published', 'expects / be published', 'is expecting / publish'], correct: 'is expected / be published', explanation: 'Passive reporting + pasiva: is expected to be published.' },
                { question: 'I ___ (suppose) to finish this by Friday.', options: ['am supposed', 'am supposing', 'suppose', 'supposed'], correct: 'am supposed', explanation: '"Be supposed to" = se supone que.' }
            ],
            review: [
                { question: 'We need to ___ (get) the roof ___ (fix).', options: ['get / fixed', 'get / fix', 'have / fix', 'got / fixed'], correct: 'get / fixed', explanation: 'Causative: get + objeto + participio.' },
                { question: 'The company ___ (rumor) to ___ (sell) next year.', options: ['is rumored / sell', 'is rumored / be sold', 'rumors / be sold', 'is rumoring / sell'], correct: 'is rumored / be sold', explanation: 'Passive reporting + pasiva: is rumored to be sold.' },
                { question: 'I ___ (have) my wallet ___ (steal) on the train.', options: ['had / stolen', 'have / stolen', 'got / steal', 'had / steal'], correct: 'had / stolen', explanation: 'Causative con experiencia negativa: have + objeto + participio.' },
                { question: 'The artist ___ (know) to ___ (paint) over 500 works.', options: ['is known / paint', 'is known / have painted', 'knows / have painted', 'is knowing / paint'], correct: 'is known / have painted', explanation: 'Passive reporting + acción completada: is known to have painted.' }
            ],
            exam: [
                { question: 'The Prime Minister ___ (report) to ___ (consider) resignation.', options: ['is reported / consider', 'is reported / be considering', 'reports / consider', 'is reporting / be considering'], correct: 'is reported / be considering', explanation: 'Passive reporting + continuo: is reported to be considering.' },
                { question: 'I need to ___ (get) my eyes ___ (test).', options: ['get / tested', 'get / test', 'have / test', 'got / tested'], correct: 'get / tested', explanation: 'Causative: get + objeto + participio.' },
                { question: 'The ancient city ___ (think) to ___ (destroy) by an earthquake.', options: ['is thought / destroy', 'is thought / have been destroyed', 'thinks / have been destroyed', 'is thinking / be destroyed'], correct: 'is thought / have been destroyed', explanation: 'Passive reporting + pasiva perfecta: is thought to have been destroyed.' },
                { question: 'She ___ (give) a medal for her bravery.', options: ['was given', 'gave', 'is given', 'had given'], correct: 'was given', explanation: 'Pasiva con doble objeto: She was given a medal.' },
                { question: 'The contract ___ (say) to ___ (sign) next week.', options: ['is said / sign', 'is said / be signed', 'says / be signed', 'is saying / sign'], correct: 'is said / be signed', explanation: 'Passive reporting + pasiva: is said to be signed.' },
                { question: 'I ___ (have) my blood pressure ___ (check) last week.', options: ['had / checked', 'have / checked', 'got / check', 'had / check'], correct: 'had / checked', explanation: 'Causative: have + objeto + participio.' }
            ]
        }
    ]
};





/* ============================================================
   THEMES.JS - Base de datos educativa completa A1-C1
   ============================================================ */

const courseData = {
    /* ═══════════════════════════════════════════════════════════ */
    /* NIVEL A1 - PRINCIPIANTE                                    */
    /* ═══════════════════════════════════════════════════════════ */
    A1: {
        Grammar: [
            {
                title: "Verbo To Be (Ser/Estar)",
                explanation: `<p>El verbo <strong>to be</strong> es el más importante en inglés. Tiene tres formas en presente:</p>
          <ul><li><strong>I am</strong> (Yo soy/estoy)</li><li><strong>You/We/They are</strong> (Tú/nosotros/ellos sois/estáis)</li><li><strong>He/She/It is</strong> (Él/ella/eso es/está)</li></ul>
          <p>Se usa para describir personas, lugares, sentimientos y profesiones.</p>`,
                examples: ["I am a student. (Soy estudiante)", "She is happy. (Ella está feliz)", "They are from Spain. (Ellos son de España)"],
                exercises: [
                    { question: "Complete: She ___ a doctor.", options: ["am", "is", "are", "be"], correct: "is", explanation: "Con 'she' usamos 'is'." },
                    { question: "Complete: We ___ friends.", options: ["am", "is", "are", "be"], correct: "are", explanation: "Con 'we' usamos 'are'." },
                    { question: "Complete: I ___ tired.", options: ["am", "is", "are", "be"], correct: "am", explanation: "Con 'I' usamos 'am'." },
                    { question: "Complete: It ___ a cat.", options: ["am", "is", "are", "be"], correct: "is", explanation: "Con 'it' usamos 'is'." },
                    { question: "Complete: You ___ late.", options: ["am", "is", "are", "be"], correct: "are", explanation: "Con 'you' usamos 'are'." }
                ],
                exam: [
                    { question: "My brother ___ 20 years old.", options: ["am", "is", "are", "be"], correct: "is", explanation: "'Brother' = he → is" },
                    { question: "The books ___ on the table.", options: ["am", "is", "are", "be"], correct: "are", explanation: "'Books' = they → are" },
                    { question: "___ she your sister?", options: ["Am", "Is", "Are", "Be"], correct: "Is", explanation: "Con 'she' usamos 'Is' al inicio." },
                    { question: "I ___ not hungry.", options: ["am", "is", "are", "be"], correct: "am", explanation: "Negación con 'I am not'." },
                    { question: "Where ___ they from?", options: ["am", "is", "are", "be"], correct: "are", explanation: "Con 'they' usamos 'are'." }
                ]
            },
            {
                title: "Artículos A / An",
                explanation: `<p>Usamos <strong>a</strong> antes de palabras que empiezan con sonido consonante, y <strong>an</strong> antes de sonido vocal.</p>
          <p>Ejemplos: <em>a book</em>, <em>an apple</em>, <em>a university</em> (suena 'iu'), <em>an hour</em> (la 'h' no suena).</p>`,
                examples: ["I have a dog. (Tengo un perro)", "She eats an orange. (Ella come una naranja)", "He is a teacher. (Él es profesor)"],
                exercises: [
                    { question: "Choose: ___ elephant", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Elephant' empieza con vocal → an" },
                    { question: "Choose: ___ book", options: ["a", "an", "the", "-"], correct: "a", explanation: "'Book' empieza con consonante → a" },
                    { question: "Choose: ___ honest man", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Honest' suena con 'o' (la h no se pronuncia) → an" },
                    { question: "Choose: ___ university", options: ["a", "an", "the", "-"], correct: "a", explanation: "'University' suena 'iu' (consonante) → a" },
                    { question: "Choose: ___ apple", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Apple' empieza con vocal → an" }
                ],
                exam: [
                    { question: "I need ___ umbrella.", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Umbrella' empieza con vocal → an" },
                    { question: "She is ___ doctor.", options: ["a", "an", "the", "-"], correct: "a", explanation: "'Doctor' empieza con consonante → a" },
                    { question: "He has ___ idea.", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Idea' empieza con vocal → an" },
                    { question: "My father drives ___ car.", options: ["a", "an", "the", "-"], correct: "a", explanation: "'Car' empieza con consonante → a" },
                    { question: "It is ___ interesting book.", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Interesting' empieza con vocal → an" }
                ]
            },
            {
                title: "Plurales Sencillos",
                explanation: `<p>Para formar el plural en inglés, generalmente añadimos <strong>-s</strong> o <strong>-es</strong>.</p>
          <ul><li>La mayoría: +s (cat → cats)</li><li>Terminados en s, x, ch, sh, o: +es (box → boxes, watch → watches)</li><li>Terminados en consonante + y: -y +ies (baby → babies)</li></ul>`,
                examples: ["One dog, two dogs", "One box, two boxes", "One baby, two babies"],
                exercises: [
                    { question: "Plural de 'book'", options: ["books", "bookes", "bookies", "booke"], correct: "books", explanation: "Generalmente solo añadimos -s" },
                    { question: "Plural de 'watch'", options: ["watchs", "watches", "watchies", "watche"], correct: "watches", explanation: "Termina en ch → añadimos -es" },
                    { question: "Plural de 'city'", options: ["citys", "cityes", "cities", "citie"], correct: "cities", explanation: "Consonante + y → -y + ies" },
                    { question: "Plural de 'box'", options: ["boxs", "boxes", "boxies", "boxe"], correct: "boxes", explanation: "Termina en x → añadimos -es" },
                    { question: "Plural de 'bus'", options: ["buss", "buses", "busies", "buse"], correct: "buses", explanation: "Termina en s → añadimos -es" }
                ],
                exam: [
                    { question: "Two ___ (baby) are sleeping.", options: ["babys", "babies", "babyes", "babie"], correct: "babies", explanation: "Consonante + y → ies" },
                    { question: "I have three ___ (box).", options: ["boxs", "boxes", "boxies", "boxe"], correct: "boxes", explanation: "Termina en x → es" },
                    { question: "The ___ (dish) are dirty.", options: ["dishs", "dishes", "dishies", "dishe"], correct: "dishes", explanation: "Termina en sh → es" },
                    { question: "Many ___ (student) study here.", options: ["students", "studentes", "studies", "studente"], correct: "students", explanation: "Solo añadimos -s" },
                    { question: "Two ___ (tomato) please.", options: ["tomatos", "tomatoes", "tomatoies", "tomatoe"], correct: "tomatoes", explanation: "Termina en o → es" }
                ]
            }
        ],

        Vocabulary: [
            {
                title: "Saludos y Presentaciones",
                explanation: `<p>Aprende las frases básicas para presentarte y saludar en inglés.</p>`,
                examples: ["Hello! My name is John.", "Nice to meet you!", "How are you? I'm fine, thanks."],
                vocabList: [
                    { word: "Hello", type: "interj", meaning: "Hola", example: "Hello, how are you?" },
                    { word: "Good morning", type: "frase", meaning: "Buenos días", example: "Good morning, teacher!" },
                    { word: "Goodbye", type: "interj", meaning: "Adiós", example: "Goodbye, see you tomorrow!" },
                    { word: "Please", type: "adv", meaning: "Por favor", example: "A coffee, please." },
                    { word: "Thank you", type: "frase", meaning: "Gracias", example: "Thank you very much!" },
                    { word: "Sorry", type: "interj", meaning: "Lo siento / Perdón", example: "Sorry, I don't understand." },
                    { word: "Name", type: "n", meaning: "Nombre", example: "What is your name?" },
                    { word: "Friend", type: "n", meaning: "Amigo/a", example: "She is my friend." }
                ],
                exercises: [
                    { question: "¿Cómo se dice 'Buenos días'?", options: ["Good night", "Good morning", "Good afternoon", "Hello"], correct: "Good morning", explanation: "'Good morning' = Buenos días" },
                    { question: "¿Cómo se dice 'Gracias'?", options: ["Please", "Sorry", "Thank you", "Hello"], correct: "Thank you", explanation: "'Thank you' = Gracias" },
                    { question: "¿Cómo se dice 'Por favor'?", options: ["Sorry", "Please", "Thanks", "Hello"], correct: "Please", explanation: "'Please' = Por favor" },
                    { question: "Complete: ___ to meet you.", options: ["Good", "Nice", "Happy", "Fine"], correct: "Nice", explanation: "'Nice to meet you' = Encantado de conocerte" },
                    { question: "¿Cómo se dice 'Adiós'?", options: ["Hello", "Hi", "Goodbye", "Please"], correct: "Goodbye", explanation: "'Goodbye' = Adiós" }
                ],
                exam: [
                    { question: "___ you! (¡Gracias!)", options: ["Please", "Sorry", "Thank", "Hello"], correct: "Thank", explanation: "'Thank you' = Gracias" },
                    { question: "What is your ___?", options: ["age", "name", "job", "city"], correct: "name", explanation: "'What is your name?' = ¿Cómo te llamas?" },
                    { question: "___ morning! (¡Buenos días!)", options: ["Good", "Nice", "Hello", "Fine"], correct: "Good", explanation: "'Good morning' = Buenos días" },
                    { question: "She is my ___.", options: ["name", "job", "friend", "house"], correct: "friend", explanation: "'Friend' = amigo/a" },
                    { question: "A coffee, ___.", options: ["sorry", "thanks", "please", "hello"], correct: "please", explanation: "'Please' = por favor" }
                ]
            },
            {
                title: "Números y el Alfabeto",
                explanation: `<p>Los números del 1 al 20 y el alfabeto son fundamentales.</p>`,
                vocabList: [
                    { word: "One", type: "num", meaning: "Uno", example: "I have one brother." },
                    { word: "Ten", type: "num", meaning: "Diez", example: "She is ten years old." },
                    { word: "Twenty", type: "num", meaning: "Veinte", example: "I have twenty euros." },
                    { word: "First", type: "adj", meaning: "Primero", example: "January is the first month." },
                    { word: "Letter", type: "n", meaning: "Letra", example: "A is the first letter." },
                    { word: "Number", type: "n", meaning: "Número", example: "What is your phone number?" }
                ],
                exercises: [
                    { question: "¿Cómo se dice '15'?", options: ["Fiveteen", "Fifteen", "Fifty", "Five"], correct: "Fifteen", explanation: "15 = Fifteen" },
                    { question: "¿Cómo se dice '20'?", options: ["Twelve", "Twenty", "Two", "Twice"], correct: "Twenty", explanation: "20 = Twenty" },
                    { question: "¿Cómo se dice '3'?", options: ["Tree", "Three", "Thirteen", "Thirty"], correct: "Three", explanation: "3 = Three" },
                    { question: "¿Cómo se dice '12'?", options: ["Two", "Twenty", "Twelve", "Tenth"], correct: "Twelve", explanation: "12 = Twelve" },
                    { question: "¿Cómo se escribe 'B' en inglés?", options: ["Be", "Bee", "Bi", "Bay"], correct: "Bee", explanation: "La letra B se pronuncia /biː/" }
                ],
                exam: [
                    { question: "10 + 5 = ___", options: ["Fourteen", "Fifteen", "Fiveteen", "Fifty"], correct: "Fifteen", explanation: "10+5=15 → Fifteen" },
                    { question: "The ___ month is January.", options: ["one", "first", "once", "oneth"], correct: "first", explanation: "'First' = primero (ordinal)" },
                    { question: "I have ___ sisters. (2)", options: ["one", "two", "too", "to"], correct: "two", explanation: "2 = Two" },
                    { question: "She is ___ years old. (16)", options: ["sixty", "sixteen", "sixth", "six"], correct: "sixteen", explanation: "16 = Sixteen" },
                    { question: "What is your phone ___?", options: ["letter", "number", "name", "age"], correct: "number", explanation: "'Phone number' = número de teléfono" }
                ]
            }
        ],

        Listening: [
            {
                title: "Compras Básicas",
                explanation: `<p>Escucha y practica situaciones de compra. Lee el diálogo y responde las preguntas.</p>`,
                listeningText: `<div style="background:#f1f5f9;padding:20px;border-radius:8px;font-family:monospace;line-height:2;">
          <strong>Shop Assistant:</strong> Good morning! Can I help you?<br>
          <strong>Customer:</strong> Yes, please. How much is this shirt?<br>
          <strong>Shop Assistant:</strong> It's twenty-five pounds.<br>
          <strong>Customer:</strong> And these shoes?<br>
          <strong>Shop Assistant:</strong> The shoes are forty pounds.<br>
          <strong>Customer:</strong> OK. I'll take the shirt, please.<br>
          <strong>Shop Assistant:</strong> Here you are. That's twenty-five pounds, please.<br>
          <strong>Customer:</strong> Thank you. Goodbye!<br>
          <strong>Shop Assistant:</strong> Goodbye!
        </div>`,
                exercises: [
                    { question: "¿Cuánto cuesta la camisa?", options: ["15 pounds", "25 pounds", "40 pounds", "50 pounds"], correct: "25 pounds", explanation: "El diálogo dice: 'It's twenty-five pounds.'" },
                    { question: "¿Qué compra el cliente?", options: ["Shoes", "Shirt", "Hat", "Nothing"], correct: "Shirt", explanation: "Dice: 'I'll take the shirt, please.'" },
                    { question: "¿Cuánto cuestan los zapatos?", options: ["20 pounds", "25 pounds", "40 pounds", "45 pounds"], correct: "40 pounds", explanation: "Dice: 'The shoes are forty pounds.'" }
                ],
                exam: [
                    { question: "What does the customer buy?", options: ["Shoes", "A shirt", "A hat", "Nothing"], correct: "A shirt", explanation: "El cliente compra la camisa (shirt)." },
                    { question: "How much are the shoes?", options: ["£20", "£25", "£40", "£50"], correct: "£40", explanation: "Los zapatos cuestan 40 libras." },
                    { question: "The shirt costs ___ pounds.", options: ["fifteen", "twenty", "twenty-five", "forty"], correct: "twenty-five", explanation: "La camisa cuesta 25 libras." }
                ]
            },
            {
                title: "En el Restaurante",
                listeningText: `<div style="background:#f1f5f9;padding:20px;border-radius:8px;font-family:monospace;line-height:2;">
          <strong>Waiter:</strong> Good evening. A table for two?<br>
          <strong>Man:</strong> Yes, please.<br>
          <strong>Waiter:</strong> Here is the menu. What would you like to drink?<br>
          <strong>Woman:</strong> I'd like a glass of water, please.<br>
          <strong>Man:</strong> And I'll have a Coke.<br>
          <strong>Waiter:</strong> Are you ready to order?<br>
          <strong>Woman:</strong> Yes. I'll have the chicken salad.<br>
          <strong>Man:</strong> And I'll have the burger with fries.<br>
          <strong>Waiter:</strong> Great choice!
        </div>`,
                exercises: [
                    { question: "¿Qué bebe la mujer?", options: ["Coke", "Water", "Juice", "Coffee"], correct: "Water", explanation: "Ella pide 'a glass of water'" },
                    { question: "¿Qué pide el hombre de comer?", options: ["Chicken salad", "Burger with fries", "Pizza", "Soup"], correct: "Burger with fries", explanation: "Él pide 'the burger with fries'" },
                    { question: "¿Para cuántas personas es la mesa?", options: ["One", "Two", "Three", "Four"], correct: "Two", explanation: "Dice 'A table for two?'" }
                ],
                exam: [
                    { question: "The woman drinks ___.", options: ["Coke", "water", "juice", "wine"], correct: "water", explanation: "Ella bebe agua." },
                    { question: "The man orders a ___ with fries.", options: ["salad", "burger", "pizza", "soup"], correct: "burger", explanation: "Él pide una hamburguesa con papas fritas." },
                    { question: "They are a table for ___.", options: ["one", "two", "three", "four"], correct: "two", explanation: "Mesa para dos personas." }
                ]
            }
        ],

        Reading: [
            {
                title: "Mi Familia",
                readingText: `<p>Hello! My name is María. I am 25 years old. I live in Madrid with my family. My mother is a teacher and my father is a doctor. I have one brother. His name is Carlos. He is 20 years old and he is a student. We have a small dog. His name is Max. I love my family very much.</p>`,
                exercises: [
                    { question: "¿Cuántos años tiene María?", options: ["20", "22", "25", "30"], correct: "25", explanation: "El texto dice 'I am 25 years old.'" },
                    { question: "¿Dónde vive María?", options: ["Barcelona", "Madrid", "Lisbon", "Paris"], correct: "Madrid", explanation: "Dice 'I live in Madrid'" },
                    { question: "¿Qué es el padre de María?", options: ["Teacher", "Doctor", "Student", "Engineer"], correct: "Doctor", explanation: "Dice 'my father is a doctor'" },
                    { question: "¿Cómo se llama el hermano?", options: ["Max", "Carlos", "Juan", "Luis"], correct: "Carlos", explanation: "Dice 'His name is Carlos'" }
                ],
                exam: [
                    { question: "María is ___ years old.", options: ["20", "22", "25", "30"], correct: "25", explanation: "María tiene 25 años." },
                    { question: "María's mother is a ___.", options: ["doctor", "teacher", "student", "nurse"], correct: "teacher", explanation: "Su madre es profesora." },
                    { question: "Carlos is Maria's ___.", options: ["father", "brother", "friend", "cousin"], correct: "brother", explanation: "Carlos es su hermano." },
                    { question: "The dog's name is ___.", options: ["Carlos", "María", "Max", "Madrid"], correct: "Max", explanation: "El perro se llama Max." }
                ]
            },
            {
                title: "Mi Rutina Diaria",
                readingText: `<p>I wake up at 7:00 every morning. I have breakfast at 7:30. I usually eat toast and drink coffee. Then I go to work at 8:30. I work in an office. I have lunch at 1:00. In the afternoon, I finish work at 5:00. I go home and I cook dinner. After dinner, I watch TV or read a book. I go to bed at 11:00.</p>`,
                exercises: [
                    { question: "¿A qué hora se despierta?", options: ["6:00", "7:00", "8:00", "9:00"], correct: "7:00", explanation: "Dice 'I wake up at 7:00'" },
                    { question: "¿Qué desayuna?", options: ["Fruit", "Toast and coffee", "Cereal", "Nothing"], correct: "Toast and coffee", explanation: "Dice 'I usually eat toast and drink coffee'" },
                    { question: "¿A qué hora termina de trabajar?", options: ["3:00", "4:00", "5:00", "6:00"], correct: "5:00", explanation: "Dice 'I finish work at 5:00'" }
                ],
                exam: [
                    { question: "He wakes up at ___.", options: ["6:00", "7:00", "8:00", "9:00"], correct: "7:00", explanation: "Se despierta a las 7." },
                    { question: "He works in ___.", options: ["a hospital", "an office", "a school", "a shop"], correct: "an office", explanation: "Trabaja en una oficina." },
                    { question: "He has lunch at ___.", options: ["12:00", "1:00", "2:00", "3:00"], correct: "1:00", explanation: "Almuerza a la 1:00." },
                    { question: "After dinner, he ___ TV.", options: ["watches", "cooks", "reads", "plays"], correct: "watches", explanation: "Ve televisión después de cenar." }
                ]
            }
        ],

        Writing: [
            {
                title: "Descríbete a ti mismo",
                writingPrompt: "Escribe un párrafo de al menos 50 palabras sobre ti. Incluye: tu nombre, edad, dónde vives, tu familia y qué te gusta hacer.",
                wordCount: 50,
                exercises: [
                    { question: "¿Qué información DEBES incluir?", options: ["Solo tu nombre", "Nombre, edad, ciudad, familia y hobbies", "Solo tu edad", "Solo tu ciudad"], correct: "Nombre, edad, ciudad, familia y hobbies", explanation: "El prompt pide toda esa información." }
                ],
                exam: [
                    { question: "¿Cuál es el mínimo de palabras?", options: ["10", "25", "50", "100"], correct: "50", explanation: "El ejercicio pide al menos 50 palabras." }
                ]
            },
            {
                title: "Una Carta a un Amigo",
                writingPrompt: "Escribe una carta corta a un amigo inglés. Cuéntale sobre tu último fin de semana. ¿Qué hiciste? ¿Dónde fuiste? ¿Con quién estuviste?",
                wordCount: 60,
                exercises: [
                    { question: "¿A quién escribes?", options: ["A un profesor", "A un amigo", "A tu jefe", "A un desconocido"], correct: "A un amigo", explanation: "El prompt dice 'a un amigo inglés'" }
                ],
                exam: [
                    { question: "¿De qué hablas en la carta?", options: ["Tu trabajo", "Tu último fin de semana", "Tu familia", "Tu casa"], correct: "Tu último fin de semana", explanation: "Debes contar sobre tu último fin de semana." }
                ]
            },
            {
                title: "Mi Ciudad Favorita",
                writingPrompt: "Describe tu ciudad o pueblo favorito. Menciona: el nombre, cómo es, qué lugares hay, y por qué te gusta.",
                wordCount: 50,
                exercises: [
                    { question: "¿Qué debes describir?", options: ["Tu casa", "Tu ciudad favorita", "Tu escuela", "Tu trabajo"], correct: "Tu ciudad favorita", explanation: "El prompt pide describir tu ciudad favorita." }
                ],
                exam: [
                    { question: "¿Qué NO necesitas mencionar?", options: ["El nombre", "Cómo es", "Tu comida favorita", "Por qué te gusta"], correct: "Tu comida favorita", explanation: "No se pide mencionar comida." }
                ]
            }
        ],

        Exam: [
            {
                title: "Examen Final A1",
                explanation: `<p>Este examen evalúa todo lo aprendido en el nivel A1. Necesitas el 60% para aprobar.</p>`,
                exam: [
                    { question: "She ___ my sister.", options: ["am", "is", "are", "be"], correct: "is", explanation: "Con 'she' usamos 'is'" },
                    { question: "I have ___ apple.", options: ["a", "an", "the", "-"], correct: "an", explanation: "'Apple' empieza con vocal → an" },
                    { question: "Two ___ (child) are playing.", options: ["childs", "children", "childes", "child"], correct: "children", explanation: "'Child' es irregular → children" },
                    { question: "Good ___! (por la mañana)", options: ["night", "morning", "evening", "bye"], correct: "morning", explanation: "'Good morning' = Buenos días" },
                    { question: "I am ___ years old. (25)", options: ["twenty", "twenty-five", "twenty-fifth", "fifty"], correct: "twenty-five", explanation: "25 = twenty-five" },
                    { question: "The plural of 'box' is ___.", options: ["boxs", "boxes", "boxies", "boxe"], correct: "boxes", explanation: "Termina en x → es" },
                    { question: "___ to meet you!", options: ["Good", "Nice", "Happy", "Fine"], correct: "Nice", explanation: "'Nice to meet you' = Encantado" },
                    { question: "A table for ___?", options: ["one", "two", "three", "four"], correct: "two", explanation: "En el diálogo del restaurante: 'A table for two?'" },
                    { question: "She drinks ___.", options: ["a burger", "water", "a salad", "fries"], correct: "water", explanation: "En el diálogo: 'I'd like a glass of water'" },
                    { question: "I wake up at ___.", options: ["6:00", "7:00", "8:00", "9:00"], correct: "7:00", explanation: "En la lectura: 'I wake up at 7:00'" }
                ]
            }
        ]
    },

    /* ═══════════════════════════════════════════════════════════ */
    /* NIVEL A2 - BÁSICO                                          */
    /* ═══════════════════════════════════════════════════════════ */
    A2: {
        Grammar: [
            {
                title: "Pasado Simple (Regular)",
                explanation: `<p>El Pasado Simple describe acciones terminadas en el pasado. Para verbos regulares, añadimos <strong>-ed</strong>.</p>
          <ul><li>Trabajar → worked</li><li>Jugar → played</li><li>Estudiar → studied (y → ied)</li></ul>
          <p>Negación: didn't + infinitivo | Pregunta: Did + sujeto + infinitivo?</p>`,
                examples: ["I worked yesterday. (Trabajé ayer)", "She didn't play tennis. (Ella no jugó tenis)", "Did you study? (¿Estudiaste?)"],
                exercises: [
                    { question: "Pasado de 'walk'", options: ["walked", "walks", "walking", "walk"], correct: "walked", explanation: "Añadimos -ed → walked" },
                    { question: "Pasado de 'study'", options: ["studied", "studys", "studyed", "studying"], correct: "studied", explanation: "y → ied → studied" },
                    { question: "Complete: She ___ TV yesterday.", options: ["watch", "watched", "watchs", "watching"], correct: "watched", explanation: "Añadimos -ed → watched" },
                    { question: "Negación: I ___ like the movie.", options: ["don't", "didn't", "not", "doesn't"], correct: "didn't", explanation: "Pasado simple → didn't + infinitivo" },
                    { question: "Pregunta: ___ you visit Paris?", options: ["Do", "Did", "Does", "Are"], correct: "Did", explanation: "Pasado simple → Did al inicio" }
                ],
                exam: [
                    { question: "They ___ football last Sunday.", options: ["play", "played", "playing", "plays"], correct: "played", explanation: "Pasado simple regular → +ed" },
                    { question: "I ___ (not/go) to the party.", options: ["don't go", "didn't go", "not went", "doesn't go"], correct: "didn't go", explanation: "Negación en pasado: didn't + infinitivo" },
                    { question: "___ she call you?", options: ["Do", "Did", "Does", "Is"], correct: "Did", explanation: "Pregunta en pasado → Did" },
                    { question: "He ___ (watch) a film.", options: ["watch", "watched", "watchs", "watching"], correct: "watched", explanation: "Pasado regular → watched" },
                    { question: "We ___ (not/study) for the exam.", options: ["don't study", "didn't study", "not studied", "studied not"], correct: "didn't study", explanation: "Negación: didn't + infinitivo" }
                ]
            },
            {
                title: "Pasado Simple (Irregular)",
                explanation: `<p>Algunos verbos no siguen la regla de -ed. Debes memorizarlos:</p>
          <ul><li>go → went | eat → ate | see → saw | have → had | do → did</li><li>buy → bought | think → thought | bring → brought</li></ul>`,
                examples: ["I went to Rome. (Fui a Roma)", "She ate pizza. (Ella comió pizza)", "We saw a film. (Vimos una película)"],
                exercises: [
                    { question: "Pasado de 'go'", options: ["goed", "went", "gone", "going"], correct: "went", explanation: "Go → went (irregular)" },
                    { question: "Pasado de 'eat'", options: ["eated", "ate", "eaten", "eating"], correct: "ate", explanation: "Eat → ate (irregular)" },
                    { question: "Pasado de 'see'", options: ["seed", "saw", "seen", "seeing"], correct: "saw", explanation: "See → saw (irregular)" },
                    { question: "Complete: I ___ a new car.", options: ["buy", "bought", "buyed", "buying"], correct: "bought", explanation: "Buy → bought (irregular)" },
                    { question: "Complete: She ___ the book to class.", options: ["bring", "brought", "bringed", "bringing"], correct: "brought", explanation: "Bring → brought (irregular)" }
                ],
                exam: [
                    { question: "He ___ (go) to London.", options: ["goed", "went", "gone", "going"], correct: "went", explanation: "Go → went" },
                    { question: "We ___ (have) breakfast at 8.", options: ["haved", "had", "have", "having"], correct: "had", explanation: "Have → had" },
                    { question: "They ___ (see) the Eiffel Tower.", options: ["seed", "saw", "seen", "seeing"], correct: "saw", explanation: "See → saw" },
                    { question: "I ___ (do) my homework.", options: ["doed", "did", "done", "doing"], correct: "did", explanation: "Do → did" },
                    { question: "She ___ (think) it was easy.", options: ["thinked", "thought", "thinks", "thinking"], correct: "thought", explanation: "Think → thought" }
                ]
            },
            {
                title: "Comparativos y Superlativos",
                explanation: `<p><strong>Comparativo:</strong> más/menos... que</p>
          <ul><li>Cortos: +er (tall → taller)</li><li>Largos: more/less + adjetivo (more expensive)</li></ul>
          <p><strong>Superlativo:</strong> el/la más/menos...</p>
          <ul><li>Cortos: +est (tall → tallest)</li><li>Largos: most/least + adjetivo (most beautiful)</li></ul>`,
                examples: ["John is taller than Mike. (John es más alto que Mike)", "This is the most expensive car. (Este es el coche más caro)", "She is less happy than before."],
                exercises: [
                    { question: "Comparativo de 'big'", options: ["biger", "bigger", "more big", "biggest"], correct: "bigger", explanation: "CVC → doble consonante + er → bigger" },
                    { question: "Superlativo de 'happy'", options: ["happier", "happiest", "more happy", "most happy"], correct: "happiest", explanation: "y → i + est → happiest" },
                    { question: "Comparativo de 'expensive'", options: ["expensiver", "more expensive", "expensivest", "most expensive"], correct: "more expensive", explanation: "Largo → more + adjetivo" },
                    { question: "Complete: She is ___ than her sister.", options: ["tall", "taller", "tallest", "more tall"], correct: "taller", explanation: "Comparativo → taller" },
                    { question: "Complete: This is the ___ book.", options: ["good", "better", "best", "more good"], correct: "best", explanation: "Good → best (superlativo irregular)" }
                ],
                exam: [
                    { question: "Tokyo is ___ than Madrid.", options: ["big", "bigger", "biggest", "more big"], correct: "bigger", explanation: "Comparativo de big → bigger" },
                    { question: "Mount Everest is the ___ mountain.", options: ["high", "higher", "highest", "most high"], correct: "highest", explanation: "Superlativo de high → highest" },
                    { question: "This exam is ___ than the last one.", options: ["difficult", "more difficult", "difficulter", "most difficult"], correct: "more difficult", explanation: "Largo → more + adjetivo" },
                    { question: "She is the ___ student.", options: ["good", "better", "best", "most good"], correct: "best", explanation: "Good → best" },
                    { question: "My house is ___ (small) than yours.", options: ["small", "smaller", "smallest", "more small"], correct: "smaller", explanation: "Comparativo → smaller" }
                ]
            }
        ],

        Vocabulary: [
            {
                title: "Viajes y Transporte",
                vocabList: [
                    { word: "Airport", type: "n", meaning: "Aeropuerto", example: "We arrived at the airport early." },
                    { word: "Ticket", type: "n", meaning: "Billete", example: "I bought a train ticket." },
                    { word: "Passport", type: "n", meaning: "Pasaporte", example: "Don't forget your passport!" },
                    { word: "Luggage", type: "n", meaning: "Equipaje", example: "My luggage is very heavy." },
                    { word: "Flight", type: "n", meaning: "Vuelo", example: "Our flight leaves at 9 AM." },
                    { word: "Platform", type: "n", meaning: "Andén", example: "The train leaves from platform 3." },
                    { word: "Reservation", type: "n", meaning: "Reserva", example: "I have a reservation for tonight." },
                    { word: "Customs", type: "n", meaning: "Aduana", example: "We went through customs quickly." }
                ],
                exercises: [
                    { question: "¿Dónde compras un billete?", options: ["At the airport", "At the restaurant", "At the hospital", "At school"], correct: "At the airport", explanation: "Los billetes de avión se compran en el aeropuerto" },
                    { question: "¿Qué necesitas para viajar al extranjero?", options: ["A book", "A passport", "A pen", "A phone"], correct: "A passport", explanation: "Necesitas pasaporte para viajar internacionalmente" },
                    { question: "¿Dónde dejas tu equipaje?", options: ["In the kitchen", "In the hotel", "At the airport", "In the car"], correct: "At the airport", explanation: "El equipaje se factura en el aeropuerto" }
                ],
                exam: [
                    { question: "You need a ___ to fly internationally.", options: ["ticket", "passport", "pen", "map"], correct: "passport", explanation: "Necesitas pasaporte para volar internacionalmente." },
                    { question: "The ___ leaves at 9 AM.", options: ["bus", "flight", "car", "bike"], correct: "flight", explanation: "El vuelo sale a las 9." },
                    { question: "I made a ___ at the hotel.", options: ["flight", "ticket", "reservation", "passport"], correct: "reservation", explanation: "Haces una reserva en el hotel." },
                    { question: "My ___ is very heavy.", options: ["passport", "ticket", "luggage", "flight"], correct: "luggage", explanation: "El equipaje puede ser pesado." },
                    { question: "The train leaves from ___ 3.", options: ["gate", "platform", "door", "window"], correct: "platform", explanation: "El tren sale del andén 3." }
                ]
            },
            {
                title: "Comida y Restaurantes",
                vocabList: [
                    { word: "Starter", type: "n", meaning: "Entrante", example: "I'll have the soup as a starter." },
                    { word: "Main course", type: "n", meaning: "Plato principal", example: "The steak is the main course." },
                    { word: "Dessert", type: "n", meaning: "Postre", example: "For dessert, I'll have ice cream." },
                    { word: "Bill", type: "n", meaning: "Cuenta", example: "Can I have the bill, please?" },
                    { word: "Tip", type: "n", meaning: "Propina", example: "I left a 10% tip." },
                    { word: "Spicy", type: "adj", meaning: "Picante", example: "This curry is very spicy." },
                    { word: "Delicious", type: "adj", meaning: "Delicioso", example: "The cake was delicious!" },
                    { word: "Vegetarian", type: "adj/n", meaning: "Vegetariano", example: "Do you have vegetarian options?" }
                ],
                exercises: [
                    { question: "¿Qué pides antes del plato principal?", options: ["Dessert", "Starter", "Bill", "Tip"], correct: "Starter", explanation: "El entrante (starter) va antes del plato principal" },
                    { question: "¿Cómo pides la cuenta?", options: ["The menu, please", "The bill, please", "The food, please", "The water, please"], correct: "The bill, please", explanation: "'The bill, please' = La cuenta, por favor" },
                    { question: "¿Qué es 'spicy'?", options: ["Dulce", "Picante", "Salado", "Amargo"], correct: "Picante", explanation: "Spicy = picante" }
                ],
                exam: [
                    { question: "I'll have the soup as a ___.", options: ["main course", "dessert", "starter", "bill"], correct: "starter", explanation: "La sopa como entrante." },
                    { question: "Can I have the ___, please?", options: ["menu", "bill", "tip", "plate"], correct: "bill", explanation: "Pides la cuenta con 'bill'." },
                    { question: "The chocolate cake was ___!", options: ["spicy", "delicious", "vegetarian", "expensive"], correct: "delicious", explanation: "Delicioso = delicious." },
                    { question: "I left a 15% ___.", options: ["bill", "menu", "tip", "starter"], correct: "tip", explanation: "Dejas una propina (tip)." },
                    { question: "Do you have ___ options?", options: ["spicy", "delicious", "vegetarian", "expensive"], correct: "vegetarian", explanation: "Opciones vegetarianas." }
                ]
            }
        ],

        Listening: [
            {
                title: "Reservando un Hotel",
                listeningText: `<div style="background:#f1f5f9;padding:20px;border-radius:8px;font-family:monospace;line-height:2;">
          <strong>Receptionist:</strong> Good afternoon. Sunset Hotel. How can I help you?<br>
          <strong>Caller:</strong> Hi. I'd like to book a room, please.<br>
          <strong>Receptionist:</strong> Certainly. For how many nights?<br>
          <strong>Caller:</strong> Three nights, from Friday to Monday.<br>
          <strong>Receptionist:</strong> And how many guests?<br>
          <strong>Caller:</strong> Two adults.<br>
          <strong>Receptionist:</strong> We have a double room with sea view for £120 per night.<br>
          <strong>Caller:</strong> That sounds perfect. I'll take it.<br>
          <strong>Receptionist:</strong> Great. Can I have your name, please?
        </div>`,
                exercises: [
                    { question: "¿Cuántas noches quiere quedarse?", options: ["One", "Two", "Three", "Four"], correct: "Three", explanation: "Dice 'Three nights'" },
                    { question: "¿Cuántos huéspedes hay?", options: ["One", "Two", "Three", "Four"], correct: "Two", explanation: "Dice 'Two adults'" },
                    { question: "¿Cuánto cuesta la habitación por noche?", options: ["£100", "£110", "£120", "£130"], correct: "£120", explanation: "Dice '£120 per night'" }
                ],
                exam: [
                    { question: "The caller wants to stay for ___ nights.", options: ["two", "three", "four", "five"], correct: "three", explanation: "Quiere quedarse 3 noches." },
                    { question: "There are ___ guests.", options: ["one", "two", "three", "four"], correct: "two", explanation: "Dos adultos." },
                    { question: "The room costs ___ per night.", options: ["£100", "£110", "£120", "£130"], correct: "£120", explanation: "120 libras por noche." },
                    { question: "The room has a view of the ___.", options: ["mountain", "city", "sea", "garden"], correct: "sea", explanation: "Vista al mar (sea view)." },
                    { question: "The stay is from Friday to ___.", options: ["Saturday", "Sunday", "Monday", "Tuesday"], correct: "Monday", explanation: "De viernes a lunes." }
                ]
            }
        ],

        Reading: [
            {
                title: "Un Día en Londres",
                readingText: `<p>Last summer, I visited London with my best friend. We stayed there for five days. On the first day, we went to the British Museum. It was amazing! We saw old Egyptian mummies and Greek statues. On the second day, we visited Buckingham Palace. We watched the Changing of the Guard. It was very colorful and interesting.</p>
          <p>On the third day, we took a boat on the River Thames. We saw the Tower Bridge and the London Eye. The weather was sunny but a little windy. On the fourth day, we went shopping in Oxford Street. I bought some souvenirs for my family. On the last day, we visited a traditional pub and tried fish and chips. It was a fantastic trip!</p>`,
                exercises: [
                    { question: "¿Cuánto tiempo estuvieron en Londres?", options: ["Three days", "Four days", "Five days", "Six days"], correct: "Five days", explanation: "Dice 'We stayed there for five days'" },
                    { question: "¿Qué visitaron el primer día?", options: ["Buckingham Palace", "The British Museum", "Tower Bridge", "Oxford Street"], correct: "The British Museum", explanation: "Dice 'On the first day, we went to the British Museum'" },
                    { question: "¿Qué compraron en Oxford Street?", options: ["Food", "Souvenirs", "Clothes", "Books"], correct: "Souvenirs", explanation: "Dice 'I bought some souvenirs'" },
                    { question: "¿Qué comieron en el pub?", options: ["Pizza", "Fish and chips", "Burger", "Pasta"], correct: "Fish and chips", explanation: "Dice 'tried fish and chips'" }
                ],
                exam: [
                    { question: "They visited London with a ___.", options: ["family", "best friend", "group", "alone"], correct: "best friend", explanation: "Fue con su mejor amigo." },
                    { question: "The Changing of the Guard is at ___.", options: ["the museum", "Buckingham Palace", "Tower Bridge", "Oxford Street"], correct: "Buckingham Palace", explanation: "Vieron el cambio de guardia en Buckingham Palace." },
                    { question: "They took a boat on the ___.", options: ["sea", "lake", "River Thames", "canal"], correct: "River Thames", explanation: "Navegaron por el Támesis." },
                    { question: "The weather was ___ but windy.", options: ["rainy", "cloudy", "sunny", "snowy"], correct: "sunny", explanation: "Hacía sol pero ventoso." },
                    { question: "They tried ___ in a pub.", options: ["pizza", "fish and chips", "sushi", "tacos"], correct: "fish and chips", explanation: "Probaron fish and chips." }
                ]
            }
        ],

        Writing: [
            {
                title: "Mi Último Viaje",
                writingPrompt: "Escribe sobre tu último viaje. Incluye: dónde fuiste, con quién, qué hiciste, dónde te alojaste, y si te gustó.",
                wordCount: 60,
                exercises: [
                    { question: "¿Qué tiempo verbal debes usar principalmente?", options: ["Presente", "Pasado", "Futuro", "Condicional"], correct: "Pasado", explanation: "Hablas de un viaje pasado → pasado simple" }
                ],
                exam: [
                    { question: "¿Cuántas palabras mínimo?", options: ["30", "40", "60", "100"], correct: "60", explanation: "Mínimo 60 palabras." }
                ]
            },
            {
                title: "Una Reseña de Restaurante",
                writingPrompt: "Escribe una reseña corta de un restaurante que visitaste. Describe: la comida, el servicio, el ambiente, y si lo recomendarías.",
                wordCount: 60,
                exercises: [
                    { question: "¿Qué NO debes describir?", options: ["La comida", "El servicio", "Tu casa", "El ambiente"], correct: "Tu casa", explanation: "No describes tu casa, describes el restaurante." }
                ],
                exam: [
                    { question: "¿Debes dar tu opinión?", options: ["No", "Sí", "Solo los hechos", "Solo el menú"], correct: "Sí", explanation: "Una reseña incluye tu opinión personal." }
                ]
            }
        ],

        Exam: [
            {
                title: "Examen Final A2",
                exam: [
                    { question: "She ___ (work) yesterday.", options: ["work", "worked", "working", "works"], correct: "worked", explanation: "Pasado simple regular → +ed" },
                    { question: "I ___ (go) to Paris last year.", options: ["goed", "went", "gone", "going"], correct: "went", explanation: "Go → went (irregular)" },
                    { question: "Tokyo is ___ than my city.", options: ["big", "bigger", "biggest", "more big"], correct: "bigger", explanation: "Comparativo → bigger" },
                    { question: "This is the ___ mountain in Spain.", options: ["high", "higher", "highest", "most high"], correct: "highest", explanation: "Superlativo → highest" },
                    { question: "___ you visit the museum?", options: ["Do", "Did", "Does", "Are"], correct: "Did", explanation: "Pregunta en pasado → Did" },
                    { question: "I need my ___ to travel.", options: ["ticket", "passport", "menu", "bill"], correct: "passport", explanation: "Necesitas pasaporte para viajar." },
                    { question: "Can I have the ___, please?", options: ["starter", "main course", "bill", "dessert"], correct: "bill", explanation: "Pides la cuenta con 'bill'." },
                    { question: "They stayed in London for ___ days.", options: ["three", "four", "five", "six"], correct: "five", explanation: "En la lectura: five days." },
                    { question: "The room has a view of the ___.", options: ["mountain", "sea", "city", "garden"], correct: "sea", explanation: "Vista al mar." },
                    { question: "This curry is very ___.", options: ["sweet", "spicy", "sour", "bitter"], correct: "spicy", explanation: "Picante = spicy." }
                ]
            }
        ]
    },

    /* ═══════════════════════════════════════════════════════════ */
    /* NIVEL B1 - INTERMEDIO                                      */
    /* ═══════════════════════════════════════════════════════════ */
    /* ═══════════════════════════════════════════════════════════ */
    B1: {
        Grammar: [
            {
                title: "Present Perfect",
                explanation: `<p>El Present Perfect conecta el pasado con el presente. Se forma con <strong>have/has + participio pasado</strong>.</p>
        <p>Usos principales:</p>
        <ul>
          <li>Experiencias de vida (I have visited Paris)</li>
          <li>Acciones que empezaron en el pasado y continúan (I have lived here for 5 years)</li>
          <li>Resultados presentes de acciones pasadas (I have lost my keys)</li>
        </ul>
        <p>Palabras clave: ever, never, already, yet, just, for, since</p>`,
                examples: [
                    "I have never eaten sushi. (Nunca he comido sushi)",
                    "She has just arrived. (Acaba de llegar)",
                    "We have lived here since 2010."
                ],
                exercises: [
                    { question: "Complete: I ___ (never/be) to Japan.", options: ["have never been", "never was", "have never being", "am never"], correct: "have never been", explanation: "Present Perfect: have + never + participio" },
                    { question: "Complete: She ___ (just/finish) her homework.", options: ["just finished", "has just finished", "have just finished", "is just finishing"], correct: "has just finished", explanation: "Just → Present Perfect: has + just + participio" },
                    { question: "Complete: They ___ (live) here for 10 years.", options: ["live", "lived", "have lived", "are living"], correct: "have lived", explanation: "For + período → Present Perfect" },
                    { question: "Complete: ___ you ever ___ (try) paella?", options: ["Did...try", "Have...tried", "Do...try", "Are...trying"], correct: "Have...tried", explanation: "Ever → Present Perfect: Have + sujeto + participio" },
                    { question: "Complete: I haven't finished ___ .", options: ["already", "yet", "just", "ever"], correct: "yet", explanation: "Yet se usa en negaciones y preguntas con Present Perfect" }
                ],
                exam: [
                    { question: "I ___ (never/see) that film.", options: ["never saw", "have never seen", "have never see", "did never see"], correct: "have never seen", explanation: "Never + Present Perfect → have never seen" },
                    { question: "She has ___ (live) here since 2015.", options: ["live", "lived", "living", "lives"], correct: "lived", explanation: "Since + momento → Present Perfect" },
                    { question: "Have you finished your homework ___?", options: ["already", "yet", "just", "ever"], correct: "yet", explanation: "Yet en preguntas con Present Perfect" },
                    { question: "They have ___ (be) married for 20 years.", options: ["be", "been", "being", "was"], correct: "been", explanation: "Been es el participio de be" },
                    { question: "I have ___ (lose) my keys!", options: ["lose", "lost", "losed", "losing"], correct: "lost", explanation: "Lose → lost (participio)" }
                ]
            },
            {
                title: "Futuro: Will vs Going to",
                explanation: `<p><strong>Will:</strong> decisiones espontáneas, promesas, predicciones generales</p>`
            }
        ]

    }
}