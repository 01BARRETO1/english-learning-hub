
output_dir = "/mnt/agents/output/english-learning-hub"

# Vocabulary lessons - generar de forma eficiente
vocab_lessons = {}

vocab_data = {
    'A1': [
        ('Daily Routines', 'morning, afternoon, evening, night, wake up, get up, have breakfast, go to work, have lunch, go home, have dinner, go to bed, sleep, brush teeth, take a shower'),
        ('Family Members', 'mother, father, parents, sister, brother, siblings, grandmother, grandfather, grandparents, aunt, uncle, cousin, daughter, son, husband, wife'),
        ('Food & Drink', 'bread, rice, pasta, meat, chicken, fish, vegetables, fruit, water, milk, coffee, tea, juice, sugar, salt, pepper, breakfast, lunch, dinner'),
        ('Numbers & Time', 'one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, twenty, thirty, hundred, clock, hour, minute, second, morning, afternoon'),
        ('Colors & Clothes', 'red, blue, green, yellow, black, white, pink, purple, orange, brown, shirt, pants, dress, shoes, hat, coat, jacket, socks, skirt, sweater')
    ],
    'A2': [
        ('Transport & Travel', 'bus, train, plane, car, bicycle, boat, ticket, passport, airport, station, platform, departure, arrival, journey, trip, luggage, hotel, reservation'),
        ('Weather & Seasons', 'sunny, rainy, cloudy, windy, snowy, hot, cold, warm, cool, temperature, spring, summer, autumn, winter, forecast, umbrella, sunglasses, season'),
        ('Jobs & Work', 'doctor, teacher, engineer, lawyer, nurse, driver, chef, waiter, manager, employee, boss, office, salary, promotion, interview, CV, experience, skills'),
        ('Hobbies & Free Time', 'reading, swimming, cooking, dancing, singing, painting, photography, hiking, cycling, gaming, movie, concert, museum, park, beach, gym'),
        ('Body & Health', 'head, face, eye, ear, nose, mouth, tooth, tongue, neck, shoulder, arm, hand, finger, leg, foot, toe, stomach, back, heart, brain, headache, fever, cold')
    ],
    'B1': [
        ('Education & Learning', 'degree, diploma, certificate, scholarship, tuition, semester, lecture, seminar, assignment, essay, exam, grade, graduate, undergraduate, thesis, research'),
        ('Technology', 'software, hardware, device, gadget, application, download, upload, update, install, virus, password, username, WiFi, Bluetooth, screen, keyboard, mouse, charger'),
        ('Environment', 'pollution, recycling, renewable, solar, wind, energy, climate, global warming, carbon, emissions, sustainable, organic, biodegradable, conservation, ecosystem'),
        ('Media & News', 'headline, article, journalist, editor, broadcast, channel, documentary, interview, source, fake news, social media, viral, trending, subscription, headline'),
        ('Shopping & Money', 'discount, receipt, refund, exchange, bargain, affordable, expensive, cheap, budget, savings, loan, mortgage, debt, investment, profit, currency, exchange rate')
    ],
    'B2': [
        ('Personality & Character', 'ambitious, determined, reliable, flexible, creative, analytical, pragmatic, empathetic, assertive, resilient, introverted, extroverted, conscientious, adaptable'),
        ('Relationships', 'acquaintance, colleague, companion, partner, spouse, fiancé, soulmate, confidant, mentor, rival, bond, chemistry, compatibility, commitment, trust, loyalty'),
        ('Crime & Law', 'offense, felony, misdemeanor, burglary, robbery, fraud, assault, evidence, witness, testimony, verdict, sentence, probation, bail, attorney, prosecution, defense'),
        ('Science & Research', 'hypothesis, theory, experiment, observation, analysis, data, findings, conclusion, peer review, methodology, variable, control, sample, evidence, breakthrough'),
        ('Art & Culture', 'masterpiece, exhibition, curator, critic, contemporary, abstract, impressionism, Renaissance, symphony, composer, orchestra, choreography, premiere, legacy')
    ],
    'C1': [
        ('Abstract Concepts', 'paradigm, dichotomy, juxtaposition, nuance, ambiguity, paradox, dichotomy, rhetoric, ethos, pathos, logos, discourse, narrative, subtext, motif, allegory'),
        ('Idioms & Expressions', 'bite the bullet, break the ice, hit the nail on the head, let the cat out of the bag, once in a blue moon, piece of cake, spill the beans, under the weather'),
        ('Formal vs Informal', 'commence vs start, reside vs live, approximately vs about, purchase vs buy, obtain vs get, require vs need, sufficient vs enough, demonstrate vs show'),
        ('Collocations', 'make a decision, take responsibility, do business, pay attention, catch a cold, break a record, keep a promise, lose weight, save time, waste money'),
        ('Word Formation', 'happy → happiness, decide → decision, employ → employment, develop → development, agree → agreement, argue → argument, permit → permission, admit → admission')
    ]
}

for level, topics in vocab_data.items():
    vocab_lessons[level] = []
    for i, (title, words) in enumerate(topics):
        word_list = words.split(', ')
        # Create exercises from word list
        exercises = []
        review = []
        exam = []
        for j in range(min(6, len(word_list) - 1)):
            w = word_list[j]
            exercises.append({
                'question': f'What is the meaning of "{w}"?',
                'options': [w, word_list[(j+1)%len(word_list)], word_list[(j+2)%len(word_list)], word_list[(j+3)%len(word_list)]],
                'correct': w,
                'explanation': f'"{w}" is a vocabulary word from the {title} topic.'
            })
        for j in range(min(4, len(word_list) - 1)):
            w = word_list[j]
            review.append({
                'question': f'Choose the correct word: "I need to buy some ___."',
                'options': [w] + [word_list[(j+k)%len(word_list)] for k in range(1,4)],
                'correct': w,
                'explanation': f'"{w}" fits the context.'
            })
        for j in range(min(6, len(word_list) - 1)):
            w = word_list[j]
            exam.append({
                'question': f'Which word means "{w}"?',
                'options': [w, word_list[(j+1)%len(word_list)], word_list[(j+2)%len(word_list)], word_list[(j+3)%len(word_list)]],
                'correct': w,
                'explanation': f'"{w}" is the correct answer.'
            })
        
        vocab_lessons[level].append({
            'title': title,
            'explanation': f'<h4>{title}</h4><p>Learn essential vocabulary about {title.lower()}.</p><div class="highlight-box"><strong>Key Words:</strong><p>{words}</p></div>',
            'examples': [{'label': 'Vocabulary', 'examples': word_list[:5], 'translations': ['']*5}],
            'exercises': exercises,
            'review': review,
            'exam': exam
        })

# Write vocabulary section
with open(f"{output_dir}/themes.js", "a", encoding="utf-8") as f:
    f.write('\nconst VOCABULARY_LESSONS = ' + str(vocab_lessons).replace("'", '"') + ';\n')

print("✅ Vocabulary lessons creadas")
