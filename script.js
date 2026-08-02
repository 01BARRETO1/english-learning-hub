
//js_part1 // ============================================
// ENGLISH LEARNING HUB - MAIN SCRIPT
// Complete interactive learning platform
// ============================================

const app = {
    currentSection: 'dashboard',
    currentLevel: 'A1',
    currentGame: 'flashcards',
    points: 0,
    streak: 0,
    lessonsCompleted: 0,
    achievements: [],
    progress: { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 },
    
    // Game state
    flashcardIndex: 0,
    flashcardsData: [],
    matchingCards: [],
    matchingFlipped: [],
    matchingMatched: [],
    matchingMoves: 0,
    matchingTimer: null,
    matchingSeconds: 0,
    scrambleData: [],
    scrambleIndex: 0,
    scrambleScore: 0,
    scrambleStreak: 0,
    quizData: [],
    quizIndex: 0,
    quizScore: 0,
    quizTimer: null,
    quizTimeLeft: 15,
    
    // Level test state
    testQuestions: [],
    testIndex: 0,
    testScore: 0,
    
    // Settings
    soundEnabled: true,
    animationsEnabled: true,
    darkMode: false,
};

// ============================================
// DATA: Lessons organized by section and level
// ============================================

const lessonData = {
    grammar: {
        A1: [
            { id: 'g-a1-1', title: 'Present Simple', desc: 'El presente simple para hábitos y verdades generales.', icon: '📅', exercises: 5, time: '15 min' },
            { id: 'g-a1-2', title: 'To Be', desc: 'El verbo "to be" en presente: am, is, are.', icon: '👤', exercises: 4, time: '12 min' },
            { id: 'g-a1-3', title: 'Articles A/An', desc: 'Artículos indefinidos y su uso correcto.', icon: '📝', exercises: 3, time: '10 min' },
            { id: 'g-a1-4', title: 'Plural Nouns', desc: 'Formación del plural en inglés.', icon: '📦', exercises: 4, time: '10 min' },
            { id: 'g-a1-5', title: 'Possessive Adjectives', desc: 'Adjetivos posesivos: my, your, his, her.', icon: '🔑', exercises: 3, time: '8 min' },
        ],
        A2: [
            { id: 'g-a2-1', title: 'Past Simple', desc: 'El pasado simple para acciones terminadas.', icon: '⏮️', exercises: 5, time: '18 min' },
            { id: 'g-a2-2', title: 'Present Continuous', desc: 'Acciones que están sucediendo ahora.', icon: '▶️', exercises: 4, time: '12 min' },
            { id: 'g-a2-3', title: 'Comparatives', desc: 'Adjetivos comparativos: -er, more.', icon: '⚖️', exercises: 4, time: '14 min' },
            { id: 'g-a2-4', title: 'Going to Future', desc: 'Planes e intenciones futuras.', icon: '🚀', exercises: 3, time: '10 min' },
            { id: 'g-a2-5', title: 'Prepositions of Place', desc: 'In, on, at, under, behind, next to.', icon: '📍', exercises: 4, time: '12 min' },
        ],
        B1: [
            { id: 'g-b1-1', title: 'Present Perfect', desc: 'Experiencias y acciones con resultado presente.', icon: '✨', exercises: 5, time: '20 min' },
            { id: 'g-b1-2', title: 'Past Continuous', desc: 'Acciones en progreso en el pasado.', icon: '⏪', exercises: 4, time: '15 min' },
            { id: 'g-b1-3', title: 'Conditionals Type 1', desc: 'Primera condicional: posibles situaciones.', icon: '🎲', exercises: 4, time: '16 min' },
            { id: 'g-b1-4', title: 'Passive Voice', desc: 'La voz pasiva en presente y pasado.', icon: '🔁', exercises: 5, time: '18 min' },
            { id: 'g-b1-5', title: 'Reported Speech', desc: 'Estilo indirecto básico.', icon: '💬', exercises: 4, time: '18 min' },
        ],
        B2: [
            { id: 'g-b2-1', title: 'Conditionals Type 2 & 3', desc: 'Segunda y tercera condicional.', icon: '🎭', exercises: 5, time: '22 min' },
            { id: 'g-b2-2', title: 'Modal Verbs Advanced', desc: 'Must, should, ought to, needn\'t.', icon: '🎯', exercises: 4, time: '18 min' },
            { id: 'g-b2-3', title: 'Relative Clauses', desc: 'Defining y non-defining relative clauses.', icon: '🔗', exercises: 5, time: '20 min' },
            { id: 'g-b2-4', title: 'Gerunds & Infinitives', desc: 'Cuándo usar -ing o to + verb.', icon: '🔄', exercises: 4, time: '16 min' },
            { id: 'g-b2-5', title: 'Inversion', desc: 'Inversión después de negative adverbials.', icon: '🔃', exercises: 3, time: '15 min' },
        ],
        C1: [
            { id: 'g-c1-1', title: 'Mixed Conditionals', desc: 'Condicionales mixtos.', icon: '🧩', exercises: 4, time: '20 min' },
            { id: 'g-c1-2', title: 'Advanced Passive', desc: 'Voz pasiva con verbos modales y causativos.', icon: '⚙️', exercises: 4, time: '18 min' },
            { id: 'g-c1-3', title: 'Subjunctive', desc: 'El subjuntivo en inglés.', icon: '🎓', exercises: 3, time: '16 min' },
            { id: 'g-c1-4', title: 'Ellipsis & Substitution', desc: 'Elipsis y sustitución para evitar repetición.', icon: '✂️', exercises: 3, time: '14 min' },
            { id: 'g-c1-5', title: 'Emphasis Structures', desc: 'Cleft sentences y emphasis con do/does/did.', icon: '❗', exercises: 3, time: '16 min' },
        ],
    },
    vocabulary: {
        A1: [
            { id: 'v-a1-1', title: 'Family Members', desc: 'Padre, madre, hermano, hermana, etc.', icon: '👨‍👩‍👧‍👦', exercises: 4, time: '10 min' },
            { id: 'v-a1-2', title: 'Colors & Numbers', desc: 'Colores básicos y números del 1 al 100.', icon: '🌈', exercises: 3, time: '8 min' },
            { id: 'v-a1-3', title: 'Food & Drink', desc: 'Comidas y bebidas comunes.', icon: '🍕', exercises: 4, time: '12 min' },
            { id: 'v-a1-4', title: 'Daily Routine', desc: 'Actividades diarias y horas.', icon: '⏰', exercises: 3, time: '10 min' },
            { id: 'v-a1-5', title: 'Places in Town', desc: 'Lugares de la ciudad.', icon: '🏙️', exercises: 3, time: '8 min' },
        ],
        A2: [
            { id: 'v-a2-1', title: 'Hobbies & Free Time', desc: 'Actividades de ocio y pasatiempos.', icon: '🎨', exercises: 4, time: '12 min' },
            { id: 'v-a2-2', title: 'Transport', desc: 'Medios de transporte y viajes.', icon: '🚗', exercises: 3, time: '10 min' },
            { id: 'v-a2-3', title: 'Weather', desc: 'Vocabulario del clima y estaciones.', icon: '🌤️', exercises: 3, time: '8 min' },
            { id: 'v-a2-4', title: 'Shopping', desc: 'En la tienda: ropa, precios, tallas.', icon: '🛍️', exercises: 4, time: '12 min' },
            { id: 'v-a2-5', title: 'Body & Health', desc: 'Partes del cuerpo y salud.', icon: '💪', exercises: 4, time: '14 min' },
        ],
        B1: [
            { id: 'v-b1-1', title: 'Work & Jobs', desc: 'Profesiones y entorno laboral.', icon: '💼', exercises: 4, time: '14 min' },
            { id: 'v-b1-2', title: 'Environment', desc: 'Medio ambiente y naturaleza.', icon: '🌍', exercises: 4, time: '12 min' },
            { id: 'v-b1-3', title: 'Education', desc: 'Sistema educativo y estudios.', icon: '🎓', exercises: 3, time: '12 min' },
            { id: 'v-b1-4', title: 'Technology', desc: 'Tecnología e internet.', icon: '💻', exercises: 4, time: '12 min' },
            { id: 'v-b1-5', title: 'Emotions', desc: 'Sentimientos y estados de ánimo.', icon: '😊', exercises: 3, time: '10 min' },
        ],
        B2: [
            { id: 'v-b2-1', title: 'Media & News', desc: 'Medios de comunicación y periodismo.', icon: '📰', exercises: 4, time: '14 min' },
            { id: 'v-b2-2', title: 'Politics & Society', desc: 'Política, gobierno y sociedad.', icon: '🏛️', exercises: 4, time: '16 min' },
            { id: 'v-b2-3', title: 'Science', desc: 'Vocabulario científico y descubrimientos.', icon: '🔬', exercises: 3, time: '14 min' },
            { id: 'v-b2-4', title: 'Arts & Culture', desc: 'Arte, música, literatura y cine.', icon: '🎭', exercises: 4, time: '14 min' },
            { id: 'v-b2-5', title: 'Business', desc: 'Negocios, finanzas y economía.', icon: '📈', exercises: 4, time: '16 min' },
        ],
        C1: [
            { id: 'v-c1-1', title: 'Idioms', desc: 'Expresiones idiomáticas comunes.', icon: '🗣️', exercises: 4, time: '16 min' },
            { id: 'v-c1-2', title: 'Phrasal Verbs', desc: 'Verbos frasales avanzados.', icon: '🔗', exercises: 5, time: '20 min' },
            { id: 'v-c1-3', title: 'Collocations', desc: 'Colocaciones y combinaciones de palabras.', icon: '🧩', exercises: 4, time: '16 min' },
            { id: 'v-c1-4', title: 'Formal Register', desc: 'Vocabulario formal y académico.', icon: '📜', exercises: 3, time: '14 min' },
            { id: 'v-c1-5', title: 'Word Formation', desc: 'Formación de palabras: prefijos y sufijos.', icon: '🏗️', exercises: 4, time: '16 min' },
        ],
    },
    listening: {
        A1: [
            { id: 'l-a1-1', title: 'Introducing Yourself', desc: 'Escucha y practica presentaciones personales.', icon: '🎙️', exercises: 3, time: '10 min' },
            { id: 'l-a1-2', title: 'Ordering Food', desc: 'Diálogos en restaurantes.', icon: '🍽️', exercises: 3, time: '10 min' },
            { id: 'l-a1-3', title: 'Asking for Directions', desc: 'Cómo pedir y dar direcciones.', icon: '🗺️', exercises: 3, time: '12 min' },
        ],
        A2: [
            { id: 'l-a2-1', title: 'Making Plans', desc: 'Conversaciones sobre planes futuros.', icon: '📅', exercises: 3, time: '12 min' },
            { id: 'l-a2-2', title: 'Describing People', desc: 'Descripciones físicas y de personalidad.', icon: '👥', exercises: 3, time: '12 min' },
            { id: 'l-a2-3', title: 'Shopping Dialogues', desc: 'Conversaciones en tiendas.', icon: '🛒', exercises: 3, time: '10 min' },
        ],
        B1: [
            { id: 'l-b1-1', title: 'Job Interviews', desc: 'Entrevistas de trabajo simuladas.', icon: '💼', exercises: 4, time: '16 min' },
            { id: 'l-b1-2', title: 'News Reports', desc: 'Reportajes de noticias simplificados.', icon: '📻', exercises: 3, time: '14 min' },
            { id: 'l-b1-3', title: 'Travel Stories', desc: 'Historias y experiencias de viaje.', icon: '✈️', exercises: 3, time: '14 min' },
        ],
        B2: [
            { id: 'l-b2-1', title: 'Podcast Discussions', desc: 'Discusiones y debates de podcasts.', icon: '🎧', exercises: 4, time: '18 min' },
            { id: 'l-b2-2', title: 'Lectures & Talks', desc: 'Fragmentos de conferencias.', icon: '🎤', exercises: 3, time: '16 min' },
            { id: 'l-b2-3', title: 'Movie Scenes', desc: 'Escenas de películas con diálogos.', icon: '🎬', exercises: 3, time: '16 min' },
        ],
        C1: [
            { id: 'l-c1-1', title: 'Academic Lectures', desc: 'Conferencias académicas completas.', icon: '🏫', exercises: 3, time: '20 min' },
            { id: 'l-c1-2', title: 'Debate Recordings', desc: 'Debates políticos y sociales.', icon: '⚖️', exercises: 3, time: '18 min' },
            { id: 'l-c1-3', title: 'Radio Documentaries', desc: 'Documentales radiofónicos.', icon: '📡', exercises: 3, time: '20 min' },
        ],
    },
    reading: {
        A1: [
            { id: 'r-a1-1', title: 'My Family', desc: 'Texto corto sobre una familia.', icon: '👨‍👩‍👧', exercises: 3, time: '8 min' },
            { id: 'r-a1-2', title: 'A Day at School', desc: 'La rutina diaria de un estudiante.', icon: '🏫', exercises: 3, time: '10 min' },
            { id: 'r-a1-3', title: 'My Favorite Animal', desc: 'Descripción de un animal favorito.', icon: '🐶', exercises: 3, time: '8 min' },
        ],
        A2: [
            { id: 'r-a2-1', title: 'A Trip to London', desc: 'Experiencia de viaje a Londres.', icon: '🇬🇧', exercises: 4, time: '12 min' },
            { id: 'r-a2-2', title: 'Healthy Eating', desc: 'Consejos sobre alimentación saludable.', icon: '🥗', exercises: 3, time: '10 min' },
            { id: 'r-a2-3', title: 'My Hobby', desc: 'Textos sobre diferentes pasatiempos.', icon: '🎸', exercises: 3, time: '10 min' },
        ],
        B1: [
            { id: 'r-b1-1', title: 'Social Media Impact', desc: 'El impacto de las redes sociales.', icon: '📱', exercises: 4, time: '14 min' },
            { id: 'r-b1-2', title: 'Climate Change', desc: 'Cambio climático y sus efectos.', icon: '🌡️', exercises: 4, time: '14 min' },
            { id: 'r-b1-3', title: 'Working from Home', desc: 'Ventajas y desventajas del teletrabajo.', icon: '🏠', exercises: 4, time: '14 min' },
        ],
        B2: [
            { id: 'r-b2-1', title: 'Artificial Intelligence', desc: 'La IA y el futuro del trabajo.', icon: '🤖', exercises: 5, time: '18 min' },
            { id: 'r-b2-2', title: 'Space Exploration', desc: 'La exploración espacial moderna.', icon: '🚀', exercises: 4, time: '16 min' },
            { id: 'r-b2-3', title: 'Cultural Differences', desc: 'Diferencias culturales en el mundo.', icon: '🌏', exercises: 4, time: '16 min' },
        ],
        C1: [
            { id: 'r-c1-1', title: 'Economic Globalization', desc: 'Globalización y sus efectos.', icon: '🌐', exercises: 4, time: '20 min' },
            { id: 'r-c1-2', title: 'Philosophy of Mind', desc: 'Filosofía de la mente.', icon: '🧠', exercises: 4, time: '18 min' },
            { id: 'r-c1-3', title: 'Modern Literature', desc: 'Análisis de literatura contemporánea.', icon: '📚', exercises: 4, time: '20 min' },
        ],
    },
    'use-of-english': {
        A1: [
            { id: 'u-a1-1', title: 'Mixed Grammar A1', desc: '15 preguntas de gramática A1.', icon: '📝', exercises: 15, time: '15 min' },
            { id: 'u-a1-2', title: 'Vocabulary Check A1', desc: '15 preguntas de vocabulario A1.', icon: '🔤', exercises: 15, time: '15 min' },
        ],
        A2: [
            { id: 'u-a2-1', title: 'Mixed Grammar A2', desc: '15 preguntas de gramática A2.', icon: '📝', exercises: 15, time: '18 min' },
            { id: 'u-a2-2', title: 'Vocabulary Check A2', desc: '15 preguntas de vocabulario A2.', icon: '🔤', exercises: 15, time: '18 min' },
        ],
        B1: [
            { id: 'u-b1-1', title: 'Mixed Grammar B1', desc: '15 preguntas de gramática B1.', icon: '📝', exercises: 15, time: '20 min' },
            { id: 'u-b1-2', title: 'Vocabulary Check B1', desc: '15 preguntas de vocabulario B1.', icon: '🔤', exercises: 15, time: '20 min' },
        ],
        B2: [
            { id: 'u-b2-1', title: 'Mixed Grammar B2', desc: '15 preguntas de gramática B2.', icon: '📝', exercises: 15, time: '22 min' },
            { id: 'u-b2-2', title: 'Vocabulary Check B2', desc: '15 preguntas de vocabulario B2.', icon: '🔤', exercises: 15, time: '22 min' },
        ],
        C1: [
            { id: 'u-c1-1', title: 'Mixed Grammar C1', desc: '15 preguntas de gramática C1.', icon: '📝', exercises: 15, time: '25 min' },
            { id: 'u-c1-2', title: 'Vocabulary Check C1', desc: '15 preguntas de vocabulario C1.', icon: '🔤', exercises: 15, time: '25 min' },
        ],
    },
    writing: {
        A1: [
            { id: 'w-a1-1', title: 'Write About Yourself', desc: 'Escribe una presentación personal.', icon: '👤', exercises: 2, time: '15 min' },
            { id: 'w-a1-2', title: 'Describe Your Day', desc: 'Describe tu día típico.', icon: '📅', exercises: 2, time: '15 min' },
        ],
        A2: [
            { id: 'w-a2-1', title: 'Write an Email', desc: 'Escribe un email informal.', icon: '📧', exercises: 2, time: '18 min' },
            { id: 'w-a2-2', title: 'Describe a Place', desc: 'Describe tu ciudad o pueblo.', icon: '🏙️', exercises: 2, time: '18 min' },
        ],
        B1: [
            { id: 'w-b1-1', title: 'Write an Essay', desc: 'Escribe un ensayo de opinión.', icon: '📄', exercises: 2, time: '25 min' },
            { id: 'w-b1-2', title: 'Write a Story', desc: 'Escribe una historia corta.', icon: '📖', exercises: 2, time: '25 min' },
        ],
        B2: [
            { id: 'w-b2-1', title: 'Formal Letter', desc: 'Escribe una carta formal.', icon: '📨', exercises: 2, time: '25 min' },
            { id: 'w-b2-2', title: 'Article Review', desc: 'Escribe una reseña de artículo.', icon: '📰', exercises: 2, time: '25 min' },
        ],
        C1: [
            { id: 'w-c1-1', title: 'Academic Essay', desc: 'Ensayo académico argumentativo.', icon: '🎓', exercises: 2, time: '35 min' },
            { id: 'w-c1-2', title: 'Proposal', desc: 'Escribe una propuesta formal.', icon: '📋', exercises: 2, time: '30 min' },
        ],
    },
};

// ============================================
// DATA: Vocabulary for games
// ============================================

const vocabData = {
    A1: [
        { word: 'apple', translation: 'manzana', example: 'I eat an apple every day.' },
        { word: 'house', translation: 'casa', example: 'My house is very big.' },
        { word: 'water', translation: 'agua', example: 'Please give me some water.' },
        { word: 'friend', translation: 'amigo', example: 'She is my best friend.' },
        { word: 'happy', translation: 'feliz', example: 'I am very happy today.' },
        { word: 'school', translation: 'escuela', example: 'I go to school by bus.' },
        { word: 'family', translation: 'familia', example: 'My family is very important.' },
        { word: 'book', translation: 'libro', example: 'I love reading this book.' },
        { word: 'dog', translation: 'perro', example: 'My dog is very playful.' },
        { word: 'red', translation: 'rojo', example: 'She is wearing a red dress.' },
        { word: 'car', translation: 'coche', example: 'He drives a blue car.' },
        { word: 'food', translation: 'comida', example: 'Italian food is delicious.' },
    ],
    A2: [
        { word: 'weather', translation: 'clima', example: 'The weather is nice today.' },
        { word: 'journey', translation: 'viaje', example: 'It was a long journey.' },
        { word: 'hobby', translation: 'pasatiempo', example: 'My hobby is painting.' },
        { word: 'neighbor', translation: 'vecino', example: 'My neighbor is very kind.' },
        { word: 'expensive', translation: 'caro', example: 'This restaurant is expensive.' },
        { word: 'arrive', translation: 'llegar', example: 'We will arrive at 9 PM.' },
        { word: 'decide', translation: 'decidir', example: 'I need to decide what to wear.' },
        { word: 'improve', translation: 'mejorar', example: 'I want to improve my English.' },
        { word: 'prepare', translation: 'preparar', example: 'She will prepare dinner.' },
        { word: 'remember', translation: 'recordar', example: 'Do you remember his name?' },
        { word: 'suggest', translation: 'sugerir', example: 'Can you suggest a good movie?' },
        { word: 'wonderful', translation: 'maravilloso', example: 'We had a wonderful time.' },
    ],
    B1: [
        { word: 'achievement', translation: 'logro', example: 'Getting the job was a great achievement.' },
        { word: 'environment', translation: 'medio ambiente', example: 'We must protect the environment.' },
        { word: 'opportunity', translation: 'oportunidad', example: 'This is a great opportunity.' },
        { word: 'responsibility', translation: 'responsabilidad', example: 'It is your responsibility.' },
        { word: 'experience', translation: 'experiencia', example: 'She has a lot of experience.' },
        { word: 'confidence', translation: 'confianza', example: 'He spoke with confidence.' },
        { word: 'determination', translation: 'determinación', example: 'Her determination is admirable.' },
        { word: 'contribution', translation: 'contribución', example: 'Your contribution is valuable.' },
        { word: 'circumstance', translation: 'circunstancia', example: 'Under no circumstance...' },
        { word: 'consequence', translation: 'consecuencia', example: 'There will be consequences.' },
        { word: 'appreciate', translation: 'apreciar', example: 'I really appreciate your help.' },
        { word: 'participate', translation: 'participar', example: 'Everyone can participate.' },
    ],
    B2: [
        { word: 'controversial', translation: 'controvertido', example: 'It is a controversial topic.' },
        { word: 'sophisticated', translation: 'sofisticado', example: 'The system is sophisticated.' },
        { word: 'spontaneous', translation: 'espontáneo', example: 'It was a spontaneous decision.' },
        { word: 'hypothetical', translation: 'hipotético', example: 'This is a hypothetical scenario.' },
        { word: 'indispensable', translation: 'indispensable', example: 'Water is indispensable.' },
        { word: 'manipulate', translation: 'manipular', example: 'They tried to manipulate the data.' },
        { word: 'perceive', translation: 'percibir', example: 'How do you perceive this issue?' },
        { word: 'reluctant', translation: 'reacio', example: 'He was reluctant to agree.' },
        { word: 'substantial', translation: 'sustancial', example: 'There was a substantial change.' },
        { word: 'vulnerable', translation: 'vulnerable', example: 'The system is vulnerable.' },
        { word: 'ambiguous', translation: 'ambíguo', example: 'The instructions were ambiguous.' },
        { word: 'comprehensive', translation: 'exhaustivo', example: 'We need a comprehensive plan.' },
    ],
    C1: [
        { word: 'paradigm', translation: 'paradigma', example: 'A new paradigm in science.' },
        { word: 'ephemeral', translation: 'efímero', example: 'Fame can be ephemeral.' },
        { word: 'ubiquitous', translation: 'ubicuo', example: 'Smartphones are ubiquitous.' },
        { word: 'pragmatic', translation: 'pragmático', example: 'We need a pragmatic approach.' },
        { word: 'empirical', translation: 'empírico', example: 'This is based on empirical evidence.' },
        { word: 'dichotomy', translation: 'dicotomía', example: 'There is a clear dichotomy.' },
        { word: 'nuance', translation: 'matiz', example: 'There is a subtle nuance here.' },
        { word: 'juxtapose', translation: 'yuxtaponer', example: 'To juxtapose two ideas.' },
        { word: 'undermine', translation: 'socavar', example: 'This could undermine our efforts.' },
        { word: 'scrutinize', translation: 'escudriñar', example: 'The media will scrutinize this.' },
        { word: 'reconcile', translation: 'reconciliar', example: 'We need to reconcile differences.' },
        { word: 'coherent', translation: 'coherente', example: 'Your argument is not coherent.' },
    ],
};

// ============================================
// DATA: Level Test Questions (60 total)
// ============================================

const levelTestData = [
    // A1 Questions (1-12)
    { level: 'A1', question: 'She ___ a student.', options: ['is', 'are', 'am', 'be'], correct: 0, feedback: '"Is" se usa con she/he/it.' },
    { level: 'A1', question: 'I ___ like coffee.', options: ['don\'t', 'doesn\'t', 'not', 'no'], correct: 0, feedback: 'Con I/usamos "don\'t" para negar.' },
    { level: 'A1', question: 'They ___ from Spain.', options: ['is', 'are', 'am', 'be'], correct: 1, feedback: '"Are" se usa con they/we/you.' },
    { level: 'A1', question: 'What time is it? It\'s ___ 3 o\'clock.', options: ['a', 'the', '-', 'an'], correct: 2, feedback: 'No usamos artículo con horas exactas.' },
    { level: 'A1', question: 'There ___ a book on the table.', options: ['is', 'are', 'am', 'be'], correct: 0, feedback: '"Is" para singular (a book).' },
    { level: 'A1', question: 'He ___ to the gym every day.', options: ['go', 'goes', 'going', 'gone'], correct: 1, feedback: 'En presente simple, he/she/it añade -es.' },
    { level: 'A1', question: '___ you like pizza?', options: ['Do', 'Does', 'Are', 'Is'], correct: 0, feedback: '"Do" para preguntas con you/we/they/I.' },
    { level: 'A1', question: 'My brother\'s son is my ___.', options: ['nephew', 'cousin', 'uncle', 'brother'], correct: 0, feedback: 'El hijo de tu hermano es tu sobrino (nephew).' },
    { level: 'A1', question: 'I have ___ apple.', options: ['a', 'an', 'the', '-'], correct: 1, feedback: '"An" antes de vocales (apple empieza con a).' },
    { level: 'A1', question: 'The opposite of "hot" is ___.', options: ['cold', 'warm', 'cool', 'wet'], correct: 0, feedback: '"Cold" es lo opuesto a "hot".' },
    { level: 'A1', question: '___ is your name?', options: ['What', 'Who', 'Where', 'How'], correct: 0, feedback: '"What is your name?" para preguntar el nombre.' },
    { level: 'A1', question: 'I ___ born in 2000.', options: ['was', 'were', 'am', 'is'], correct: 0, feedback: '"Was" para I/he/she/it en pasado.' },
    
    // A2 Questions (13-24)
    { level: 'A2', question: 'She ___ TV when I called.', options: ['watched', 'was watching', 'watches', 'is watching'], correct: 1, feedback: 'Past continuous para acción en progreso interrumpida.' },
    { level: 'A2', question: 'I ___ to Paris last summer.', options: ['go', 'went', 'gone', 'going'], correct: 1, feedback: '"Went" es el pasado simple de go.' },
    { level: 'A2', question: 'This book is ___ than that one.', options: ['more interesting', 'interestinger', 'most interesting', 'interesting'], correct: 0, feedback: 'Adjetivos largos usan "more" para comparar.' },
    { level: 'A2', question: 'They ___ a new car next month.', options: ['buy', 'are going to buy', 'bought', 'buying'], correct: 1, feedback: '"Going to" para planes futuros.' },
    { level: 'A2', question: 'I haven\'t seen him ___ Monday.', options: ['since', 'for', 'from', 'ago'], correct: 0, feedback: '"Since" + punto específico en el tiempo.' },
    { level: 'A2', question: 'If it rains, I ___ at home.', options: ['stay', 'will stay', 'stayed', 'staying'], correct: 1, feedback: 'Primera condicional: if + present, will + infinitive.' },
    { level: 'A2', question: 'The movie was ___ boring.', options: ['very', 'much', 'many', 'too much'], correct: 0, feedback: '"Very" para intensificar adjetivos.' },
    { level: 'A2', question: 'She speaks English ___.', options: ['good', 'well', 'better', 'best'], correct: 1, feedback: '"Well" es el adverbio (modifica el verbo speaks).' },
    { level: 'A2', question: 'I\'m looking forward ___ you.', options: ['see', 'to see', 'seeing', 'to seeing'], correct: 3, feedback: '"Look forward to + -ing".' },
    { level: 'A2', question: 'The cat is ___ the table.', options: ['in', 'on', 'at', 'to'], correct: 1, feedback: '"On" para superficies (encima de).' },
    { level: 'A2', question: 'How ___ money do you have?', options: ['many', 'much', 'lot', 'lots'], correct: 1, feedback: '"Much" para sustantivos incontables (money).' },
    { level: 'A2', question: 'She ___ her homework yet.', options: ['didn\'t finish', 'hasn\'t finished', 'don\'t finish', 'not finished'], correct: 1, feedback: 'Present perfect + yet = acción no completada.' },
    
    // B1 Questions (25-36)
    { level: 'B1', question: 'By the time we arrived, the movie ___.', options: ['started', 'has started', 'had started', 'was starting'], correct: 2, feedback: 'Past perfect para acción anterior a otra en el pasado.' },
    { level: 'B1', question: 'If I ___ you, I would accept the offer.', options: ['am', 'were', 'was', 'be'], correct: 1, feedback: 'Segunda condicional: if + past simple, would + inf.' },
    { level: 'B1', question: 'The book ___ by Shakespeare.', options: ['wrote', 'was written', 'written', 'is writing'], correct: 1, feedback: 'Passive voice: be + past participle.' },
    { level: 'B1', question: 'I wish I ___ more time.', options: ['have', 'had', 'would have', 'having'], correct: 1, feedback: '"I wish" + past simple = deseo presente.' },
    { level: 'B1', question: 'She suggested ___ to the cinema.', options: ['go', 'to go', 'going', 'gone'], correct: 2, feedback: '"Suggest + -ing".' },
    { level: 'B1', question: 'It\'s high time we ___.', options: ['leave', 'left', 'leaving', 'to leave'], correct: 1, feedback: '"It\'s high time" + past simple.' },
    { level: 'B1', question: '___ he studied harder, he would pass.', options: ['If', 'Unless', 'Provided', 'As long'], correct: 0, feedback: 'Segunda condicional con if.' },
    { level: 'B1', question: 'I\'d rather you ___ here.', options: ['don\'t smoke', 'didn\'t smoke', 'not smoke', 'not to smoke'], correct: 1, feedback: '"Would rather" + past simple.' },
    { level: 'B1', question: 'The house ___ built in 1990.', options: ['is', 'was', 'has been', 'had been'], correct: 1, feedback: 'Pasado simple pasivo para fecha específica.' },
    { level: 'B1', question: 'She denied ___ the money.', options: ['steal', 'to steal', 'stealing', 'stolen'], correct: 2, feedback: '"Deny + -ing".' },
    { level: 'B1', question: 'Not only ___ late, but he also forgot the document.', options: ['he was', 'was he', 'he is', 'is he'], correct: 1, feedback: 'Inversión después de "Not only" al inicio.' },
    { level: 'B1', question: 'You ___ have told me earlier!', options: ['should', 'must', 'can', 'may'], correct: 0, feedback: '"Should have" = lamentar no haber hecho algo.' },
    
    // B2 Questions (37-48)
    { level: 'B2', question: 'Had I known, I ___ have come.', options: ['would', 'will', 'wouldn\'t', 'won\'t'], correct: 2, feedback: 'Inversión en tercera condicional: Had I known = If I had known.' },
    { level: 'B2', question: 'The project, ___ by the team, was a success.', options: ['to be completed', 'having completed', 'having been completed', 'being completed'], correct: 2, feedback: 'Perfect participle pasivo para acción anterior.' },
    { level: 'B2', question: 'No sooner ___ the door than the phone rang.', options: ['I closed', 'did I close', 'had I closed', 'I had closed'], correct: 2, feedback: 'Inversión con "No sooner... than" + past perfect.' },
    { level: 'B2', question: 'She ___ have been delayed. She\'s always on time.', options: ['can\'t', 'mustn\'t', 'shouldn\'t', 'needn\'t'], correct: 0, feedback: '"Can\'t have" = deducción negativa en el pasado.' },
    { level: 'B2', question: 'It was ___ a difficult question that nobody answered.', options: ['so', 'such', 'very', 'too'], correct: 1, feedback: '"Such + a/an + adj + noun".' },
    { level: 'B2', question: '___ the rain, we went for a walk.', options: ['Despite', 'Although', 'However', 'Because'], correct: 0, feedback: '"Despite" + noun/gerundio (sin sujeto).' },
    { level: 'B2', question: 'I\'d sooner ___ home than go to that party.', options: ['stay', 'stayed', 'to stay', 'staying'], correct: 1, feedback: '"Would sooner" + past simple (igual que would rather).' },
    { level: 'B2', question: 'Not until ___ did I realize my mistake.', options: ['later', 'it was too late', 'too late', 'was too late'], correct: 1, feedback: '"Not until" + clause + inversión.' },
    { level: 'B2', question: 'The meeting ___ by the time I arrived.', options: ['finished', 'had finished', 'has finished', 'was finished'], correct: 1, feedback: 'Past perfect para acción completada antes de otra.' },
    { level: 'B2', question: 'He denied ___ anything about the incident.', options: ['know', 'to know', 'knowing', 'knew'], correct: 2, feedback: 'Verbos como deny van seguidos de -ing.' },
    { level: 'B2', question: 'Were I in your position, I ___ differently.', options: ['would act', 'will act', 'acted', 'act'], correct: 0, feedback: 'Inversión condicional: Were I = If I were.' },
    { level: 'B2', question: 'Seldom ___ such a beautiful sunset.', options: ['I saw', 'did I see', 'have I seen', 'I have seen'], correct: 2, feedback: 'Inversión con "Seldom" + present perfect.' },
    
    // C1 Questions (49-60)
    { level: 'C1', question: '___ for his help, we would have failed.', options: ['Had it not been', 'If it was not', 'Were it not', 'Should it not be'], correct: 0, feedback: 'Inversión condicional mixta con had.' },
    { level: 'C1', question: 'The novel is said ___ into 30 languages.', options: ['to translate', 'to have been translated', 'being translated', 'to be translating'], correct: 1, feedback: '"Be said to have been + pp" = rumor pasado.' },
    { level: 'C1', question: 'Under no circumstances ___ the building.', options: ['you should leave', 'should you leave', 'you leave', 'leave you'], correct: 1, feedback: 'Inversión con "Under no circumstances".' },
    { level: 'C1', question: 'I\'d just as soon you ___ mention it to anyone.', options: ['don\'t', 'didn\'t', 'not', 'wouldn\'t'], correct: 1, feedback: '"Would just as soon" + past simple.' },
    { level: 'C1', question: 'Only after ___ the report did she understand.', options: ['reading', 'read', 'having read', 'she read'], correct: 2, feedback: '"Only after + having + pp" + inversión.' },
    { level: 'C1', question: 'He was made ___ the entire essay again.', options: ['rewrite', 'to rewrite', 'rewriting', 'rewritten'], correct: 1, feedback: 'En pasiva, "make" recupera el "to": be made to do.' },
    { level: 'C1', question: 'But for your assistance, we ___ in trouble.', options: ['would be', 'would have been', 'will be', 'were'], correct: 1, feedback: '"But for" = "If it had not been for" (tercera condicional).' },
    { level: 'C1', question: 'Were it not for the rain, the match ___.', options: ['would continue', 'would have continued', 'will continue', 'continued'], correct: 0, feedback: '"Were it not for" = segunda condicional.' },
    { level: 'C1', question: 'The issue is ___ complex than it appears.', options: ['more', 'far more', 'much', 'very'], correct: 1, feedback: '"Far more" para intensificar comparativos.' },
    { level: 'C1', question: 'Not once ___ to complain about the service.', options: ['did he try', 'he tried', 'has he tried', 'tried he'], correct: 2, feedback: 'Inversión con "Not once" + present perfect.' },
    { level: 'C1', question: 'Much as I admire his work, I ___ agree with him.', options: ['can\'t', 'mustn\'t', 'shouldn\'t', 'needn\'t'], correct: 0, feedback: '"Much as" = aunque (concesión formal).' },
    { level: 'C1', question: 'So ___ that the audience was speechless.', options: ['moved was she', ['she was moved'], 'was she moved', 'she moved was'], correct: 2, feedback: 'Inversión con "So + adj" al inicio de la oración.' },
];


/////-------------


//js_part2 = '''
// ============================================
// EXERCISE DATA for lessons
// ============================================

const exerciseData = {
    'g-a1-1': {
        title: 'Present Simple',
        questions: [
            { q: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correct: 1, feedback: 'Con she/he/it añadimos -es.' },
            { q: 'They ___ football on Saturdays.', options: ['play', 'plays', 'playing', 'played'], correct: 0, feedback: 'Con they/usamos la forma base.' },
            { q: 'The sun ___ in the east.', options: ['rise', 'rises', 'rising', 'rose'], correct: 1, feedback: 'Verdades generales usan presente simple.' },
            { q: 'Water ___ at 100 degrees.', options: ['boil', 'boils', 'boiling', 'boiled'], correct: 1, feedback: 'Verdades científicas en presente simple.' },
            { q: 'I ___ coffee in the morning.', options: ['drink', 'drinks', 'drinking', 'drunk'], correct: 0, feedback: 'Con I/usamos la forma base.' },
        ]
    },
    'g-a1-2': {
        title: 'To Be',
        questions: [
            { q: 'I ___ a student.', options: ['am', 'is', 'are', 'be'], correct: 0, feedback: 'I + am.' },
            { q: 'She ___ from Italy.', options: ['am', 'is', 'are', 'be'], correct: 1, feedback: 'She + is.' },
            { q: 'They ___ happy.', options: ['am', 'is', 'are', 'be'], correct: 2, feedback: 'They + are.' },
            { q: 'We ___ in the classroom.', options: ['am', 'is', 'are', 'be'], correct: 2, feedback: 'We + are.' },
            { q: 'He ___ a doctor.', options: ['am', 'is', 'are', 'be'], correct: 1, feedback: 'He + is.' },
        ]
    },
    'v-a1-1': {
        title: 'Family Members',
        questions: [
            { q: 'Your father\'s father is your ___.', options: ['uncle', 'grandfather', 'brother', 'cousin'], correct: 1, feedback: 'El padre de tu padre es tu abuelo (grandfather).' },
            { q: 'Your mother\'s sister is your ___.', options: ['aunt', 'niece', 'daughter', 'sister'], correct: 0, feedback: 'La hermana de tu madre es tu tía (aunt).' },
            { q: 'Your brother\'s daughter is your ___.', options: ['sister', 'niece', 'aunt', 'mother'], correct: 1, feedback: 'La hija de tu hermano es tu sobrina (niece).' },
            { q: 'Your son\'s son is your ___.', options: ['brother', 'nephew', 'grandson', 'cousin'], correct: 2, feedback: 'El hijo de tu hijo es tu nieto (grandson).' },
            { q: 'Your uncle\'s children are your ___.', options: ['brothers', 'nephews', 'cousins', 'sisters'], correct: 2, feedback: 'Los hijos de tu tío son tus primos (cousins).' },
        ]
    },
    'r-a1-1': {
        title: 'My Family',
        text: 'My name is Sarah. I am 25 years old. I live with my family in a small house in London. My father is a doctor and my mother is a teacher. I have one brother, Tom. He is 22 years old and he studies at university. We have a dog named Max. Every Sunday, we have lunch together and talk about our week. I love my family very much.',
        questions: [
            { q: 'How old is Sarah?', options: ['22', '25', '30', '20'], correct: 1, feedback: 'El texto dice "I am 25 years old."' },
            { q: 'What does Sarah\'s father do?', options: ['Teacher', 'Doctor', 'Student', 'Driver'], correct: 1, feedback: '"My father is a doctor."' },
            { q: 'Where does Sarah live?', options: ['Paris', 'New York', 'London', 'Madrid'], correct: 2, feedback: '"I live... in London."' },
            { q: 'What is the name of their dog?', options: ['Tom', 'Max', 'Sarah', 'Buddy'], correct: 1, feedback: '"We have a dog named Max."' },
        ]
    },
    'l-a1-1': {
        title: 'Introducing Yourself',
        text: 'Listen to the dialogue and answer the questions. (En una aplicación real, aquí iría un audio)',
        questions: [
            { q: 'What is the man\'s name?', options: ['John', 'Mike', 'David', 'Paul'], correct: 0, feedback: 'El hombre se presenta como John.' },
            { q: 'Where is he from?', options: ['Canada', 'USA', 'UK', 'Australia'], correct: 1, feedback: 'John dice que es de Estados Unidos (USA).' },
            { q: 'What does he do?', options: ['Student', 'Teacher', 'Doctor', 'Engineer'], correct: 0, feedback: 'John dice que es estudiante.' },
        ]
    },
    'w-a1-1': {
        title: 'Write About Yourself',
        guide: [
            'Start with your name and age.',
            'Mention where you are from.',
            'Talk about your family.',
            'Describe your hobbies.',
            'Write at least 50 words.'
        ],
        prompt: 'Write a short paragraph about yourself. Include your name, age, where you live, your family, and your hobbies.'
    },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }

function loadData() {
    const data = localStorage.getItem('englishHubData');
    if (data) {
        const parsed = JSON.parse(data);
        app.points = parsed.points || 0;
        app.streak = parsed.streak || 0;
        app.lessonsCompleted = parsed.lessonsCompleted || 0;
        app.achievements = parsed.achievements || [];
        app.progress = parsed.progress || { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
        app.darkMode = parsed.darkMode || false;
    }
    if (app.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        $('#darkModeToggle').checked = true;
    }
}

function saveData() {
    localStorage.setItem('englishHubData', JSON.stringify({
        points: app.points,
        streak: app.streak,
        lessonsCompleted: app.lessonsCompleted,
        achievements: app.achievements,
        progress: app.progress,
        darkMode: app.darkMode,
    }));
}

function updateStats() {
    $('#totalPoints').textContent = app.points;
    $('#mobilePoints').textContent = app.points;
    $('#streakCount').textContent = app.streak;
    $('#lessonsCompleted').textContent = `${app.lessonsCompleted}/60`;
    $('#achievementsCount').textContent = app.achievements.length;
    
    // Update progress bars
    Object.keys(app.progress).forEach(level => {
        const bar = $(`#progress-${level}`);
        const percent = $(`#percent-${level}`);
        if (bar) bar.style.width = `${app.progress[level]}%`;
        if (percent) percent.textContent = `${app.progress[level]}%`;
    });
}

function addPoints(amount) {
    app.points += amount;
    app.streak++;
    updateStats();
    saveData();
    showToast(`+${amount} puntos! 🔥 Racha: ${app.streak}`, 'success');
    checkAchievements();
}

function showToast(message, type = 'info') {
    const container = $('#toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function checkAchievements() {
    const achievements = [
        { id: 'first-steps', name: 'Primeros Pasos', desc: 'Completa tu primera lección', icon: '🌱', condition: () => app.lessonsCompleted >= 1 },
        { id: 'grammar-master', name: 'Maestro de Gramática', desc: 'Completa 5 lecciones de grammar', icon: '📐', condition: () => app.lessonsCompleted >= 5 },
        { id: 'vocab-builder', name: 'Constructor de Vocabulario', desc: 'Completa 5 lecciones de vocabulary', icon: '📚', condition: () => app.lessonsCompleted >= 5 },
        { id: 'streak-7', name: 'Racha de 7', desc: 'Alcanza una racha de 7', icon: '🔥', condition: () => app.streak >= 7 },
        { id: 'point-collector', name: 'Coleccionista', desc: 'Acumula 500 puntos', icon: '💎', condition: () => app.points >= 500 },
        { id: 'level-tester', name: 'Evaluador', desc: 'Completa el test de nivel', icon: '🎯', condition: () => app.achievements.includes('level-tester') },
        { id: 'game-player', name: 'Jugador', desc: 'Juega todos los mini juegos', icon: '🎮', condition: () => app.achievements.includes('game-player') },
        { id: 'halfway', name: 'A Medias', desc: 'Completa 30 lecciones', icon: '📊', condition: () => app.lessonsCompleted >= 30 },
        { id: 'master', name: 'Maestro del Inglés', desc: 'Completa todas las lecciones', icon: '👑', condition: () => app.lessonsCompleted >= 60 },
    ];
    
    achievements.forEach(ach => {
        if (!app.achievements.includes(ach.id) && ach.condition()) {
            app.achievements.push(ach.id);
            showToast(`🏆 ¡Logro desbloqueado: ${ach.name}!`, 'success');
            saveData();
            updateStats();
        }
    });
}

function createConfetti() {
    const colors = ['#2563eb', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '100vh';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1500);
    }
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    // Sidebar nav items
    $$('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            navigate(section);
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                $('#sidebar').classList.remove('open');
            }
        });
    });
    
    // Level tabs
    $$('.level-tabs').forEach(tabsContainer => {
        tabsContainer.querySelectorAll('.level-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                tabsContainer.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                app.currentLevel = tab.dataset.level;
                const section = tabsContainer.closest('.section').id;
                renderLessons(section, app.currentLevel);
            });
        });
    });
    
    // Mobile menu
    $('#menuBtn').addEventListener('click', () => {
        $('#sidebar').classList.toggle('open');
    });
    
    // Sidebar toggle
    $('#sidebarToggle').addEventListener('click', () => {
        $('#sidebar').classList.toggle('collapsed');
    });
}

function navigate(section) {
    // Update nav active state
    $$('.nav-item').forEach(item => item.classList.remove('active'));
    const activeNav = $(`.nav-item[data-section="${section}"]`);
    if (activeNav) activeNav.classList.add('active');
    
    // Show section
    $$('.section').forEach(sec => sec.classList.remove('active'));
    const targetSection = $(`#${section}`);
    if (targetSection) {
        targetSection.classList.add('active');
        app.currentSection = section;
        window.scrollTo(0, 0);
    }
    
    // Render lessons if needed
    if (['grammar', 'vocabulary', 'listening', 'reading', 'use-of-english', 'writing'].includes(section)) {
        renderLessons(section, app.currentLevel);
    }
}

// ============================================
// LESSONS RENDERING
// ============================================

function renderLessons(section, level) {
    const containerMap = {
        'grammar': '#grammarLessons',
        'vocabulary': '#vocabularyLessons',
        'listening': '#listeningLessons',
        'reading': '#readingLessons',
        'use-of-english': '#useOfEnglishLessons',
        'writing': '#writingLessons',
    };
    
    const container = $(containerMap[section]);
    if (!container) return;
    
    const data = lessonData[section]?.[level] || [];
    
    container.innerHTML = data.map(lesson => {
        const isCompleted = localStorage.getItem(`lesson_${lesson.id}`) === 'completed';
        return `
            <div class="lesson-card ${isCompleted ? 'completed' : ''}" data-id="${lesson.id}">
                <div class="lesson-card-header">
                    <div class="lesson-card-icon" style="background: ${getLevelColor(level)}20; color: ${getLevelColor(level)};">${lesson.icon}</div>
                    <div class="lesson-card-title">${lesson.title}</div>
                </div>
                <div class="lesson-card-desc">${lesson.desc}</div>
                <div class="lesson-card-meta">
                    <span>📝 ${lesson.exercises} ejercicios</span>
                    <span>⏱️ ${lesson.time}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('.lesson-card').forEach(card => {
        card.addEventListener('click', () => openLesson(card.dataset.id));
    });
}

function getLevelColor(level) {
    const colors = { A1: '#22c55e', A2: '#3b82f6', B1: '#f59e0b', B2: '#ef4444', C1: '#8b5cf6' };
    return colors[level] || '#2563eb';
}

// ============================================
// LESSON MODAL
// ============================================

function openLesson(lessonId) {
    const exercise = exerciseData[lessonId];
    if (!exercise) {
        // Generic lesson modal
        showGenericLesson(lessonId);
        return;
    }
    
    $('#modalTitle').textContent = exercise.title;
    const body = $('#modalBody');
    const footer = $('#modalFooter');
    
    if (exercise.text) {
        // Reading/Listening style
        body.innerHTML = `
            <div class="exercise-container">
                <div class="reading-text">${exercise.text}</div>
                <div id="exerciseQuestions"></div>
                <div id="exerciseFeedback"></div>
            </div>
        `;
        renderExerciseQuestions(exercise.questions, 0, lessonId);
    } else if (exercise.guide) {
        // Writing style
        body.innerHTML = `
            <div class="exercise-container">
                <div class="writing-guide">
                    <h4>Guía de escritura:</h4>
                    <ul>${exercise.guide.map(g => `<li>${g}</li>`).join('')}</ul>
                </div>
                <p style="margin-bottom: 12px; font-weight: 600;">${exercise.prompt}</p>
                <textarea class="writing-textarea" placeholder="Escribe aquí..."></textarea>
            </div>
        `;
        footer.innerHTML = `
            <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
            <button class="btn-primary" onclick="submitWriting('${lessonId}')">Enviar</button>
        `;
    } else {
        // Grammar/Vocabulary/Use of English style
        body.innerHTML = `
            <div class="exercise-container">
                <div id="exerciseQuestions"></div>
                <div id="exerciseFeedback"></div>
            </div>
        `;
        renderExerciseQuestions(exercise.questions, 0, lessonId);
    }
    
    $('#lessonModal').classList.add('active');
}

function renderExerciseQuestions(questions, index, lessonId) {
    const container = $('#exerciseQuestions');
    if (index >= questions.length) {
        completeLesson(lessonId);
        return;
    }
    
    const q = questions[index];
    container.innerHTML = `
        <div class="exercise-question">${index + 1}. ${q.q}</div>
        <div class="exercise-options">
            ${q.options.map((opt, i) => `
                <button class="exercise-option" data-index="${i}">${opt}</button>
            `).join('')}
        </div>
        <div class="exercise-nav">
            <span class="exercise-progress">Pregunta ${index + 1} de ${questions.length}</span>
        </div>
    `;
    
    container.querySelectorAll('.exercise-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = parseInt(btn.dataset.index);
            const allBtns = container.querySelectorAll('.exercise-option');
            allBtns.forEach(b => b.classList.add('disabled'));
            
            if (selected === q.correct) {
                btn.classList.add('correct');
                $('#exerciseFeedback').innerHTML = `<div class="exercise-feedback correct">✓ ¡Correcto! ${q.feedback}</div>`;
                addPoints(10);
            } else {
                btn.classList.add('incorrect');
                allBtns[q.correct].classList.add('correct');
                $('#exerciseFeedback').innerHTML = `<div class="exercise-feedback incorrect">✗ Incorrecto. ${q.feedback}</div>`;
                app.streak = 0;
                updateStats();
                saveData();
            }
            
            setTimeout(() => {
                $('#exerciseFeedback').innerHTML = '';
                renderExerciseQuestions(questions, index + 1, lessonId);
            }, 2000);
        });
    });
}

function showGenericLesson(lessonId) {
    // Extract info from lessonData
    let lesson = null;
    for (const section of Object.values(lessonData)) {
        for (const level of Object.values(section)) {
            const found = level.find(l => l.id === lessonId);
            if (found) { lesson = found; break; }
        }
        if (lesson) break;
    }
    
    $('#modalTitle').textContent = lesson ? lesson.title : 'Lección';
    $('#modalBody').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">${lesson ? lesson.icon : '📖'}</div>
            <h3>${lesson ? lesson.title : 'Lección'}</h3>
            <p style="color: var(--text-secondary); margin: 16px 0;">${lesson ? lesson.desc : ''}</p>
            <p style="color: var(--text-tertiary);">Esta lección incluye ${lesson ? lesson.exercises : 0} ejercicios interactivos.</p>
            <button class="btn-primary btn-large" style="margin-top: 24px;" onclick="startGenericExercise('${lessonId}')">Comenzar Ejercicios</button>
        </div>
    `;
    $('#modalFooter').innerHTML = `<button class="btn-secondary" onclick="closeModal()">Cerrar</button>`;
    $('#lessonModal').classList.add('active');
}

function startGenericExercise(lessonId) {
    // Create generic questions based on lesson type
    const questions = generateGenericQuestions(lessonId);
    $('#modalBody').innerHTML = `
        <div class="exercise-container">
            <div id="exerciseQuestions"></div>
            <div id="exerciseFeedback"></div>
        </div>
    `;
    $('#modalFooter').innerHTML = '';
    renderExerciseQuestions(questions, 0, lessonId);
}

function generateGenericQuestions(lessonId) {
    // Generate some generic questions based on the lesson ID pattern
    const level = lessonId.split('-')[1].toUpperCase();
    const vocab = vocabData[level] || vocabData.A1;
    const questions = [];
    
    for (let i = 0; i < 5; i++) {
        const word = vocab[i % vocab.length];
        questions.push({
            q: `What is the meaning of "${word.word}"?`,
            options: [
                word.translation,
                vocab[(i + 1) % vocab.length].translation,
                vocab[(i + 2) % vocab.length].translation,
                vocab[(i + 3) % vocab.length].translation,
            ].sort(() => Math.random() - 0.5),
            correct: 0,
            feedback: `"${word.word}" means "${word.translation}".`
        });
    }
    
    // Fix correct index after shuffling
    questions.forEach(q => {
        q.correct = q.options.indexOf(q.options.find(o => o === vocab.find(v => v.word === q.q.split('"')[1])?.translation));
    });
    
    return questions;
}

function submitWriting(lessonId) {
    const textarea = $('.writing-textarea');
    if (textarea.value.trim().length < 20) {
        showToast('Escribe al menos 20 palabras.', 'error');
        return;
    }
    completeLesson(lessonId);
}

function completeLesson(lessonId) {
    if (localStorage.getItem(`lesson_${lessonId}`) !== 'completed') {
        localStorage.setItem(`lesson_${lessonId}`, 'completed');
        app.lessonsCompleted++;
        addPoints(50);
        
        // Update progress
        const level = lessonId.split('-')[1].toUpperCase();
        const totalLessons = Object.values(lessonData).reduce((acc, section) => {
            return acc + (section[level]?.length || 0);
        }, 0);
        const completedInLevel = Object.keys(localStorage).filter(k => k.startsWith('lesson_') && k.includes(level.toLowerCase())).length;
        app.progress[level] = Math.min(100, Math.round((completedInLevel / Math.max(totalLessons, 1)) * 100));
        
        saveData();
        updateStats();
        createConfetti();
        showToast('🎉 ¡Lección completada! +50 puntos', 'success');
    }
    
    closeModal();
    // Re-render lessons to show completion
    const section = app.currentSection;
    if (section !== 'dashboard') renderLessons(section, app.currentLevel);
}

function closeModal() {
    $('#lessonModal').classList.remove('active');
    $('#settingsModal').classList.remove('active');
}

// ============================================
// MINI GAMES
// ============================================

function initGames() {
    // Game selector
    $$('.game-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.game-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            app.currentGame = btn.dataset.game;
            $$('.game-container').forEach(c => c.classList.remove('active'));
            $(`#${app.currentGame}Game`).classList.add('active');
            initGame(app.currentGame);
        });
    });
    
    // Level selector for games
    $('#gameLevelSelect').addEventListener('change', (e) => {
        app.currentLevel = e.target.value;
        initGame(app.currentGame);
    });
    
    // Flashcard controls
    $('#flashcard').addEventListener('click', () => {
        $('#flashcard').classList.toggle('flipped');
    });
    $('#flashcardPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevFlashcard();
    });
    $('#flashcardNext').addEventListener('click', (e) => {
        e.stopPropagation();
        nextFlashcard();
    });
    $('#markKnown').addEventListener('click', () => {
        addPoints(5);
        nextFlashcard();
    });
    $('#markUnknown').addEventListener('click', nextFlashcard);
    
    // Matching controls
    $('#restartMatching').addEventListener('click', () => initMatchingGame());
    
    // Scramble controls
    $('#scrambleCheck').addEventListener('click', checkScramble);
    $('#scrambleSkip').addEventListener('click', nextScramble);
    $('#scrambleHintBtn').addEventListener('click', showScrambleHint);
    $('#scrambleInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkScramble();
    });
    
    // Init default game
    initGame('flashcards');
}

function initGame(gameType) {
    switch(gameType) {
        case 'flashcards': initFlashcards(); break;
        case 'matching': initMatchingGame(); break;
        case 'scramble': initScrambleGame(); break;
        case 'quiz': initQuizGame(); break;
    }
}

// --- Flashcards ---
function initFlashcards() {
    app.flashcardsData = [...vocabData[app.currentLevel]].sort(() => Math.random() - 0.5);
    app.flashcardIndex = 0;
    updateFlashcard();
}

function updateFlashcard() {
    const card = app.flashcardsData[app.flashcardIndex];
    if (!card) return;
    
    $('#flashcardWord').textContent = card.word;
    $('#flashcardTranslation').textContent = card.translation;
    $('#flashcardExample').textContent = `"${card.example}"`;
    $('#flashcardCounter').textContent = `${app.flashcardIndex + 1} / ${app.flashcardsData.length}`;
    $('#flashcard').classList.remove('flipped');
}

function nextFlashcard() {
    app.flashcardIndex = (app.flashcardIndex + 1) % app.flashcardsData.length;
    updateFlashcard();
}

function prevFlashcard() {
    app.flashcardIndex = (app.flashcardIndex - 1 + app.flashcardsData.length) % app.flashcardsData.length;
    updateFlashcard();
}

// --- Matching Game ---
function initMatchingGame() {
    const vocab = vocabData[app.currentLevel];
    const selected = vocab.slice(0, 8);
    app.matchingCards = [];
    
    selected.forEach((item, i) => {
        app.matchingCards.push({ id: i, text: item.word, type: 'word', pairId: i });
        app.matchingCards.push({ id: i + 100, text: item.translation, type: 'translation', pairId: i });
    });
    
    app.matchingCards.sort(() => Math.random() - 0.5);
    app.matchingFlipped = [];
    app.matchingMatched = [];
    app.matchingMoves = 0;
    app.matchingSeconds = 0;
    
    clearInterval(app.matchingTimer);
    app.matchingTimer = setInterval(() => {
        app.matchingSeconds++;
        const mins = Math.floor(app.matchingSeconds / 60);
        const secs = app.matchingSeconds % 60;
        $('#matchingTimer').textContent = `⏱️ ${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
    
    renderMatchingGrid();
}

function renderMatchingGrid() {
    const grid = $('#matchingGrid');
    grid.innerHTML = app.matchingCards.map((card, i) => {
        const isFlipped = app.matchingFlipped.includes(i) || app.matchingMatched.includes(i);
        const isMatched = app.matchingMatched.includes(i);
        return `
            <div class="matching-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" data-index="${i}">
                ${isFlipped ? card.text : '?'}
            </div>
        `;
    }).join('');
    
    $('#matchingMoves').textContent = `Movimientos: ${app.matchingMoves}`;
    
    grid.querySelectorAll('.matching-card').forEach(card => {
        card.addEventListener('click', () => flipMatchingCard(parseInt(card.dataset.index)));
    });
}

function flipMatchingCard(index) {
    if (app.matchingFlipped.includes(index) || app.matchingMatched.includes(index) || app.matchingFlipped.length >= 2) return;
    
    app.matchingFlipped.push(index);
    renderMatchingGrid();
    
    if (app.matchingFlipped.length === 2) {
        app.matchingMoves++;
        const [i1, i2] = app.matchingFlipped;
        const c1 = app.matchingCards[i1];
        const c2 = app.matchingCards[i2];
        
        if (c1.pairId === c2.pairId && c1.type !== c2.type) {
            app.matchingMatched.push(i1, i2);
            app.matchingFlipped = [];
            addPoints(15);
            
            if (app.matchingMatched.length === app.matchingCards.length) {
                clearInterval(app.matchingTimer);
                setTimeout(() => {
                    showToast(`🎉 ¡Completado en ${app.matchingMoves} movimientos!`, 'success');
                    createConfetti();
                }, 500);
            }
            
            setTimeout(renderMatchingGrid, 300);
        } else {
            setTimeout(() => {
                app.matchingFlipped = [];
                renderMatchingGrid();
            }, 1000);
        }
    }
}

// --- Word Scramble ---
function initScrambleGame() {
    app.scrambleData = [...vocabData[app.currentLevel]].sort(() => Math.random() - 0.5);
    app.scrambleIndex = 0;
    app.scrambleScore = 0;
    app.scrambleStreak = 0;
    updateScrambleUI();
    showScrambleWord();
}

function showScrambleWord() {
    const word = app.scrambleData[app.scrambleIndex];
    if (!word) {
        $('#scrambleDisplay').textContent = '🎉 ¡Completado!';
        return;
    }
    
    const scrambled = word.word.split('').sort(() => Math.random() - 0.5).join('');
    $('#scrambleDisplay').textContent = scrambled.toUpperCase();
    $('#scrambleHint').textContent = `💡 Pista: ${word.example}`;
    $('#scrambleInput').value = '';
    $('#scrambleFeedback').textContent = '';
    $('#scrambleFeedback').className = 'scramble-feedback';
}

function checkScramble() {
    const input = $('#scrambleInput').value.trim().toLowerCase();
    const word = app.scrambleData[app.scrambleIndex];
    const feedback = $('#scrambleFeedback');
    
    if (input === word.word.toLowerCase()) {
        feedback.textContent = '✓ ¡Correcto!';
        feedback.className = 'scramble-feedback correct';
        app.scrambleScore += 10 + (app.scrambleStreak * 2);
        app.scrambleStreak++;
        addPoints(10);
        
        setTimeout(() => {
            app.scrambleIndex++;
            updateScrambleUI();
            showScrambleWord();
        }, 1000);
    } else {
        feedback.textContent = `✗ Incorrecto. Era: ${word.word}`;
        feedback.className = 'scramble-feedback incorrect';
        app.scrambleStreak = 0;
        $('#scrambleInput').classList.add('shake');
        setTimeout(() => $('#scrambleInput').classList.remove('shake'), 400);
        
        setTimeout(() => {
            app.scrambleIndex++;
            updateScrambleUI();
            showScrambleWord();
        }, 1500);
    }
}

function nextScramble() {
    app.scrambleIndex++;
    app.scrambleStreak = 0;
    updateScrambleUI();
    showScrambleWord();
}

function showScrambleHint() {
    const word = app.scrambleData[app.scrambleIndex];
    $('#scrambleFeedback').textContent = `💡 Empieza con: ${word.word[0].toUpperCase()}`;
    $('#scrambleFeedback').className = 'scramble-feedback info';
    app.scrambleScore = Math.max(0, app.scrambleScore - 2);
    updateScrambleUI();
}

function updateScrambleUI() {
    $('#scrambleScore').textContent = app.scrambleScore;
    $('#scrambleStreak').textContent = app.scrambleStreak;
}

// --- Speed Quiz ---
function initQuizGame() {
    app.quizData = [...vocabData[app.currentLevel]].sort(() => Math.random() - 0.5).slice(0, 10);
    app.quizData = app.quizData.map(item => {
        const wrong = vocabData[app.currentLevel]
            .filter(v => v.word !== item.word)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(v => v.translation);
        const options = [item.translation, ...wrong].sort(() => Math.random() - 0.5);
        return {
            question: `What does "${item.word}" mean?`,
            options: options,
            correct: options.indexOf(item.translation),
        };
    });
    
    app.quizIndex = 0;
    app.quizScore = 0;
    $('#quizTotal').textContent = app.quizData.length;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (app.quizIndex >= app.quizData.length) {
        $('#quizQuestion').innerHTML = `<div style="text-align:center; padding: 40px;"><div style="font-size: 3rem;">🎉</div><h2>¡Quiz completado!</h2><p>Puntuación final: ${app.quizScore} / ${app.quizData.length * 10}</p></div>`;
        $('#quizOptions').innerHTML = `<button class="btn-primary btn-large" onclick="initQuizGame()">Jugar de nuevo</button>`;
        $('#quizTimerFill').style.width = '0%';
        clearInterval(app.quizTimer);
        createConfetti();
        return;
    }
    
    const q = app.quizData[app.quizIndex];
    $('#quizQuestion').textContent = q.question;
    $('#quizCurrent').textContent = app.quizIndex + 1;
    $('#quizPoints').textContent = app.quizScore;
    
    $('#quizOptions').innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option" data-index="${i}">${opt}</button>
    `).join('');
    
    $('#quizOptions').querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => selectQuizOption(parseInt(btn.dataset.index)));
    });
    
    // Timer
    app.quizTimeLeft = 15;
    clearInterval(app.quizTimer);
    app.quizTimer = setInterval(() => {
        app.quizTimeLeft -= 0.1;
        const pct = (app.quizTimeLeft / 15) * 100;
        $('#quizTimerFill').style.width = `${pct}%`;
        $('#quizTimerText').textContent = `${Math.ceil(app.quizTimeLeft)}s`;
        
        if (app.quizTimeLeft <= 0) {
            clearInterval(app.quizTimer);
            selectQuizOption(-1);
        }
    }, 100);
}

function selectQuizOption(selected) {
    clearInterval(app.quizTimer);
    const q = app.quizData[app.quizIndex];
    const btns = $('#quizOptions').querySelectorAll('.quiz-option');
    btns.forEach(b => b.classList.add('disabled'));
    
    if (selected === q.correct) {
        btns[selected].classList.add('correct');
        app.quizScore += 10;
        addPoints(10);
    } else {
        if (selected >= 0) btns[selected].classList.add('incorrect');
        btns[q.correct].classList.add('correct');
        app.streak = 0;
        updateStats();
        saveData();
    }
    
    setTimeout(() => {
        app.quizIndex++;
        showQuizQuestion();
    }, 1200);
}

//////------------------


//js_part3 = '''
// ============================================
// LEVEL TEST
// ============================================

function initLevelTest() {
    $('#startLevelTest').addEventListener('click', startLevelTest);
    $('#retakeTest').addEventListener('click', startLevelTest);
}

function startLevelTest() {
    app.testQuestions = [...levelTestData].sort(() => Math.random() - 0.5);
    app.testIndex = 0;
    app.testScore = 0;
    
    $('#levelTestIntro').style.display = 'none';
    $('#levelTestResult').style.display = 'none';
    $('#levelTestQuiz').style.display = 'block';
    
    showTestQuestion();
}

function showTestQuestion() {
    const q = app.testQuestions[app.testIndex];
    const progress = ((app.testIndex + 1) / app.testQuestions.length) * 100;
    
    $('#testProgressFill').style.width = `${progress}%`;
    $('#testProgressText').textContent = `Pregunta ${app.testIndex + 1} de ${app.testQuestions.length}`;
    $('#testQuestion').textContent = q.question;
    
    $('#testOptions').innerHTML = q.options.map((opt, i) => `
        <button class="test-option" data-index="${i}">${opt}</button>
    `).join('');
    
    $('#testOptions').querySelectorAll('.test-option').forEach(btn => {
        btn.addEventListener('click', () => selectTestOption(parseInt(btn.dataset.index)));
    });
}

function selectTestOption(selected) {
    const q = app.testQuestions[app.testIndex];
    const btns = $('#testOptions').querySelectorAll('.test-option');
    btns.forEach(b => b.classList.add('disabled'));
    
    if (selected === q.correct) {
        btns[selected].classList.add('correct');
        app.testScore++;
    } else {
        btns[selected].classList.add('incorrect');
        btns[q.correct].classList.add('correct');
    }
    
    // Show feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `exercise-feedback ${selected === q.correct ? 'correct' : 'incorrect'}`;
    feedbackDiv.textContent = selected === q.correct ? '✓ ' + q.feedback : '✗ ' + q.feedback;
    $('#testOptions').appendChild(feedbackDiv);
    
    setTimeout(() => {
        app.testIndex++;
        if (app.testIndex >= app.testQuestions.length) {
            showTestResults();
        } else {
            showTestQuestion();
        }
    }, 2000);
}

function showTestResults() {
    $('#levelTestQuiz').style.display = 'none';
    $('#levelTestResult').style.display = 'block';
    
    const percentage = (app.testScore / app.testQuestions.length) * 100;
    let level, title, description, color;
    
    if (percentage <= 20) {
        level = 'A1';
        title = 'Nivel A1 - Principiante';
        description = 'Estás comenzando tu viaje en el inglés. ¡No te preocupes! Con práctica constante mejorarás rápidamente.';
        color = '#22c55e';
    } else if (percentage <= 40) {
        level = 'A2';
        title = 'Nivel A2 - Básico';
        description = 'Tienes una base sólida. Sigue practicando para ampliar tu vocabulario y dominar estructuras más complejas.';
        color = '#3b82f6';
    } else if (percentage <= 60) {
        level = 'B1';
        title = 'Nivel B1 - Intermedio';
        description: '¡Buen trabajo! Puedes comunicarte en situaciones cotidianas. Es hora de perfeccionar tu gramática avanzada.';
        color = '#f59e0b';
    } else if (percentage <= 80) {
        level = 'B2';
        title = 'Nivel B2 - Intermedio Alto';
        description = 'Tienes un excelente dominio del inglés. Puedes entender textos complejos y expresarte con fluidez.';
        color = '#ef4444';
    } else {
        level = 'C1';
        title = 'Nivel C1 - Avanzado';
        description = '¡Impresionante! Tu nivel de inglés es avanzado. Puedes usar el idioma con flexibilidad en contextos sociales y profesionales.';
        color = '#8b5cf6';
    }
    
    $('#resultBadge').className = `result-badge ${level}`;
    $('#resultBadge').textContent = level;
    $('#resultTitle').textContent = title;
    $('#resultTitle').style.color = color;
    $('#resultDescription').textContent = description;
    
    $('#resultStats').innerHTML = `
        <div class="result-stat">
            <div class="result-stat-value">${app.testScore}</div>
            <div class="result-stat-label">Correctas</div>
        </div>
        <div class="result-stat">
            <div class="result-stat-value">${app.testQuestions.length - app.testScore}</div>
            <div class="result-stat-label">Incorrectas</div>
        </div>
        <div class="result-stat">
            <div class="result-stat-value">${Math.round(percentage)}%</div>
            <div class="result-stat-label">Aciertos</div>
        </div>
    `;
    
    // Recommendations
    const recs = {
        A1: ['Empieza con las lecciones de Grammar A1', 'Practica vocabulario básico con Flashcards', 'Haz el test de Use of English A1'],
        A2: ['Refuerza el Past Simple y Present Continuous', 'Amplía tu vocabulario con Vocabulary A2', 'Practica Listening con diálogos cotidianos'],
        B1: ['Domina el Present Perfect', 'Trabaja en Conditionals Type 1', 'Lee textos de Reading B1'],
        B2: ['Perfecciona Conditionals Type 2 & 3', 'Practica Relative Clauses', 'Escribe ensayos formales'],
        C1: ['Estudia Inversion y Mixed Conditionals', 'Amplía phrasal verbs e idioms', 'Lee literatura en inglés original'],
    };
    
    $('#resultRecommendations').innerHTML = `
        <h3>📋 Recomendaciones para ti:</h3>
        <ul>${recs[level].map(r => `<li>${r}</li>`).join('')}</ul>
    `;
    
    addPoints(100);
    createConfetti();
    
    if (!app.achievements.includes('level-tester')) {
        app.achievements.push('level-tester');
        saveData();
        updateStats();
    }
}

// ============================================
// SETTINGS
// ============================================

function initSettings() {
    $('#settingsBtn').addEventListener('click', () => {
        $('#settingsModal').classList.add('active');
    });
    
    $('#settingsClose').addEventListener('click', closeModal);
    
    $('#soundToggle').addEventListener('change', (e) => {
        app.soundEnabled = e.target.checked;
        saveData();
    });
    
    $('#animationToggle').addEventListener('change', (e) => {
        app.animationsEnabled = e.target.checked;
        saveData();
    });
    
    $('#darkModeToggle').addEventListener('change', (e) => {
        app.darkMode = e.target.checked;
        if (app.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        saveData();
    });
    
    $('#resetProgress').addEventListener('click', () => {
        if (confirm('¿Estás seguro? Se borrará TODO tu progreso, puntos y logros.')) {
            localStorage.removeItem('englishHubData');
            localStorage.clear();
            app.points = 0;
            app.streak = 0;
            app.lessonsCompleted = 0;
            app.achievements = [];
            app.progress = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
            updateStats();
            closeModal();
            showToast('Progreso reiniciado.', 'info');
            navigate('dashboard');
        }
    });
    
    // Close modals on overlay click
    $$('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateStats();
    initNavigation();
    initGames();
    initLevelTest();
    initSettings();
    
    // Check for game-player achievement
    const gamesPlayed = localStorage.getItem('gamesPlayed') ? JSON.parse(localStorage.getItem('gamesPlayed')) : [];
    if (gamesPlayed.length >= 4 && !app.achievements.includes('game-player')) {
        app.achievements.push('game-player');
        saveData();
        updateStats();
    }
    
    // Track games
    $$('.game-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const game = btn.dataset.game;
            let played = localStorage.getItem('gamesPlayed') ? JSON.parse(localStorage.getItem('gamesPlayed')) : [];
            if (!played.includes(game)) {
                played.push(game);
                localStorage.setItem('gamesPlayed', JSON.stringify(played));
            }
        });
    });
    
    // Streak check - reset if no activity for 2 days
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    if (lastVisit) {
        const daysSince = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
        if (daysSince > 2) {
            app.streak = 0;
            saveData();
            updateStats();
        }
    }
    localStorage.setItem('lastVisit', now.toString());
    
    // Welcome toast for first visit
    if (!localStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            showToast('👋 ¡Bienvenido a English Hub! Empieza con el Test de Nivel.', 'info');
            localStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        
        // Flashcard flip with space
        if (app.currentSection === 'games' && app.currentGame === 'flashcards' && e.code === 'Space') {
            e.preventDefault();
            $('#flashcard').classList.toggle('flipped');
        }
    });
});

// Responsive sidebar
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        $('#sidebar').classList.remove('open');
    }
});
