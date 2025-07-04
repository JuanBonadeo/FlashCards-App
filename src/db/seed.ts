import { PrismaClient, CardType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Limpiar datos existentes
  await prisma.card.deleteMany();
  await prisma.deck.deleteMany();
  console.log('🗑️  Cleaned existing data');

  // Crear decks
  const programmingDeck = await prisma.deck.create({
    data: {
      name: 'Programación Básica',
      description: 'Conceptos fundamentales de programación',
      color: '#10B981',
    },
  });

  const mathDeck = await prisma.deck.create({
    data: {
      name: 'Matemáticas',
      description: 'Álgebra y geometría básica',
      color: '#F59E0B',
    },
  });

  const englishDeck = await prisma.deck.create({
    data: {
      name: 'Inglés',
      description: 'Vocabulario y gramática en inglés',
      color: '#EF4444',
    },
  });

  const scienceDeck = await prisma.deck.create({
    data: {
      name: 'Ciencias',
      description: 'Biología, física y química básica',
      color: '#8B5CF6',
    },
  });

  console.log('✅ Created decks');

  // Crear cartas
  const programmingCards = [
    {
      type: CardType.DEFINITION,
      front: '¿Qué es una variable?',
      back: 'Una variable es un espacio de memoria que almacena un valor que puede cambiar durante la ejecución del programa.',
      deckId: programmingDeck.id,
    },
    {
      type: CardType.DEFINITION,
      front: '¿Qué es una función?',
      back: 'Una función es un bloque de código reutilizable que realiza una tarea específica y puede recibir parámetros y devolver un valor.',
      deckId: programmingDeck.id,
    },
    {
      type: CardType.DEFINITION,
      front: '¿Qué es un array?',
      back: 'Un array es una estructura de datos que almacena múltiples elementos del mismo tipo en posiciones consecutivas de memoria.',
      deckId: programmingDeck.id,
    },
    {
      type: CardType.MULTIPLE_CHOICE,
      front: '¿Cuál es la complejidad temporal del algoritmo de búsqueda binaria?',
      back: 'O(log n) - La búsqueda binaria divide el espacio de búsqueda a la mitad en cada iteración.',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correct: 1,
      deckId: programmingDeck.id,
    },
    {
      type: CardType.MULTIPLE_CHOICE,
      front: '¿Qué lenguajes de programación son orientados a objetos?',
      back: 'Java, C++ y Python son lenguajes que soportan programación orientada a objetos.',
      options: ['Java', 'C++', 'Python', 'Todas las anteriores'],
      correct: 3,
      deckId: programmingDeck.id,
    },
    {
      type: CardType.TRUE_FALSE,
      front: 'JavaScript es un lenguaje de programación compilado',
      back: 'Falso. JavaScript es un lenguaje interpretado, aunque los motores modernos usan compilación JIT.',
      correct: 0, // o null si lo tratás como booleano con otro campo
      deckId: programmingDeck.id,
    },
    {
      type: CardType.TRUE_FALSE,
      front: 'Git es un sistema de control de versiones distribuido',
      back: 'Verdadero. Git permite que cada desarrollador tenga una copia completa del historial del proyecto.',
      correct: 1,
      deckId: programmingDeck.id,
    },
  ];

  const mathCards = [
    {
      type: CardType.DEFINITION,
      front: '¿Qué es el teorema de Pitágoras?',
      back: 'En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c²',
      deckId: mathDeck.id,
    },
    {
      type: CardType.MULTIPLE_CHOICE,
      front: '¿Cuál es el resultado de 2³ + 3²?',
      back: '17 (8 + 9 = 17)',
      options: ['15', '17', '19', '21'],
      correct: 1,
      deckId: mathDeck.id,
    },
    {
      type: CardType.TRUE_FALSE,
      front: 'El número pi (π) es un número racional',
      back: 'Falso. Pi es un número irracional, su representación decimal es infinita y no periódica.',
      correct: 0,
      deckId: mathDeck.id,
    },
  ];

  const englishCards = [
    {
      type: CardType.DEFINITION,
      front: 'Apple',
      back: 'Manzana - Fruta roja o verde, dulce y crujiente',
      deckId: englishDeck.id,
    },
    {
      type: CardType.DEFINITION,
      front: 'Computer',
      back: 'Computadora/Ordenador - Máquina electrónica para procesar datos',
      deckId: englishDeck.id,
    },
    {
      type: CardType.MULTIPLE_CHOICE,
      front: 'What is the past tense of "go"?',
      back: 'Went - Es un verbo irregular',
      options: ['Goed', 'Went', 'Gone', 'Going'],
      correct: 1,
      deckId: englishDeck.id,
    },
    {
      type: CardType.TRUE_FALSE,
      front: '"I am going to the store" es presente continuo',
      back: 'Verdadero. Usa la estructura "am/is/are + going" que indica presente continuo.',
      correct: 1,
      deckId: englishDeck.id,
    },
  ];

  const scienceCards = [
    {
      type: CardType.DEFINITION,
      front: '¿Qué es la fotosíntesis?',
      back: 'Proceso por el cual las plantas convierten luz solar, CO₂ y agua en glucosa y oxígeno.',
      deckId: scienceDeck.id,
    },
    {
      type: CardType.MULTIPLE_CHOICE,
      front: '¿Cuál es la fórmula química del agua?',
      back: 'H₂O - Dos átomos de hidrógeno y uno de oxígeno',
      options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
      correct: 0,
      deckId: scienceDeck.id,
    },
    {
      type: CardType.TRUE_FALSE,
      front: 'La velocidad de la luz es constante en el vacío',
      back: 'Verdadero. La velocidad de la luz en el vacío es aproximadamente 299,792,458 m/s.',
      correct: 1,
      deckId: scienceDeck.id,
    },
  ];

  const allCards = [
    ...programmingCards,
    ...mathCards,
    ...englishCards,
    ...scienceCards,
  ];

  for (const cardData of allCards) {
    await prisma.card.create({ data: cardData });
  }

  console.log('✅ Created cards');

  // Actualizar algunas cartas con estadísticas aleatorias
  const cardsToUpdate = await prisma.card.findMany({ take: 10 });

  for (const card of cardsToUpdate) {
    await prisma.card.update({
      where: { id: card.id },
      data: {
        timesReviewed: Math.floor(Math.random() * 10) + 1,
        timesCorrect: Math.floor(Math.random() * 8),
        lastReviewed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        difficulty: Math.floor(Math.random() * 5) + 1,
      },
    });
  }

  console.log('✅ Updated card statistics');

  // Mostrar resumen
  const deckCount = await prisma.deck.count();
  const cardCount = await prisma.card.count();

  console.log('📊 Seed completed successfully!');
  console.log(`📚 Created ${deckCount} decks`);
  console.log(`🃏 Created ${cardCount} cards`);

  const cardTypes = await prisma.card.groupBy({
    by: ['type'],
    _count: {
      type: true,
    },
  });

  console.log('\n📈 Cards by type:');
  cardTypes.forEach(({ type, _count }) => {
    console.log(`   ${type}: ${_count.type} cards`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
