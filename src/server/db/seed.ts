
import { db } from './index';
import { comments_table, proyects, proyect_changes } from './schema';

// Test user ID provided
const TEST_USER_ID = "eriBN5oM5xVripZhvknXwm0EY2g4M9vv";

// Helper function to create dates in the past
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Seed data for comments
const commentsData = [
  {
    title: "Excelente iniciativa de transparencia",
    content: "Me parece muy importante que los ciudadanos podamos dar seguimiento a los proyectos de infraestructura. Esto ayuda a prevenir la corrupción y asegurar que nuestros impuestos se usen correctamente.",
  },
  {
    title: "Solicitud de más información",
    content: "¿Podrían incluir más detalles sobre los procesos de licitación? Sería útil saber qué empresas participaron y por qué se eligió a la ganadora.",
  },
  {
    title: "Agradecimiento por la plataforma",
    content: "Felicito al gobierno por crear esta plataforma. Es un paso importante hacia una democracia más participativa y transparente.",
  },
  {
    title: "Sugerencia de mejora",
    content: "Sería útil tener notificaciones cuando hay actualizaciones en proyectos de mi cantón. Así podríamos estar más informados sobre lo que pasa en nuestra comunidad.",
  },
  {
    title: "Consulta sobre presupuestos",
    content: "¿Los presupuestos mostrados incluyen IVA? ¿Y hay algún mecanismo para reportar irregularidades que observemos?",
  },
  {
    title: "Participación ciudadana",
    content: "Como vecino de Heredia, me interesa mucho poder dar seguimiento a los proyectos locales. Esta herramienta es muy valiosa para la comunidad.",
  },
  {
    title: "Transparencia en acción",
    content: "Es reconfortante ver que el gobierno está tomando en serio la transparencia. Espero que más instituciones sigan este ejemplo.",
  },
  {
    title: "Pregunta sobre cronogramas",
    content: "¿Los cronogramas de los proyectos se actualizan en tiempo real? Me gustaría saber si hay retrasos justificados.",
  },
  {
    title: "Felicitaciones",
    content: "Excelente trabajo con esta plataforma. La información es clara y accesible para todos los ciudadanos.",
  },
  {
    title: "Solicitud de datos históricos",
    content: "¿Sería posible acceder a información de proyectos completados en años anteriores? Sería útil para análisis comparativos.",
  },
  {
    title: "Educación cívica",
    content: "Esta plataforma debería ser promovida en escuelas y colegios. Es una excelente herramienta educativa sobre cómo funciona el gobierno.",
  },
  {
    title: "Accesibilidad",
    content: "¿Hay planes de hacer la plataforma accesible para personas con discapacidades visuales? Sería importante para la inclusión.",
  },
];

// Seed data for projects
const projectsData = [
  {
    name: "Ampliación Carretera San José - Cartago",
    description: "Ampliación de 4 a 6 carriles del tramo entre San José y Cartago, incluyendo mejoras en señalización y sistemas de drenaje. El proyecto busca reducir los tiempos de viaje y mejorar la seguridad vial.",
    company: "Constructora MECO",
    location: "Ruta Nacional 2, San José - Cartago",
    status: "in progress",
    municipalidad: "San José",
    budget: 2500000000,
    startedAt: daysAgo(180),
  },
  {
    name: "Construcción Puente sobre Río Virilla",
    description: "Nuevo puente vehicular de 250 metros de longitud para conectar Heredia con San José, reduciendo el tráfico en rutas alternas. Incluye carriles para bicicletas y peatones.",
    company: "Grupo Orosi",
    location: "Río Virilla, Heredia - San José",
    status: "in progress",
    municipalidad: "Heredia",
    budget: 1800000000,
    startedAt: daysAgo(120),
  },
  {
    name: "Renovación Escuela República de México",
    description: "Renovación completa de infraestructura educativa incluyendo 12 aulas, laboratorios de ciencias, biblioteca digital y áreas recreativas. Mejoras en accesibilidad para estudiantes con discapacidad.",
    company: "Constructora Hernández Jiménez",
    location: "Alajuela Centro",
    status: "done",
    municipalidad: "Alajuela",
    budget: 450000000,
    startedAt: daysAgo(300),
  },
  {
    name: "Ampliación Hospital San Rafael",
    description: "Construcción de nueva ala con 50 camas adicionales, 4 quirófanos modernos y área de emergencias ampliada. Incluye equipamiento médico de última generación.",
    company: "H. Solís",
    location: "Alajuela, San Rafael",
    status: "in progress",
    municipalidad: "Alajuela",
    budget: 3200000000,
    startedAt: daysAgo(240),
  },
  {
    name: "Parque Metropolitano La Sabana - Fase 2",
    description: "Mejoras en senderos, instalación de gimnasio al aire libre, renovación de áreas verdes y construcción de centro cultural comunitario.",
    company: "Ingenieros Civiles Asociados",
    location: "Parque La Sabana, San José",
    status: "done",
    municipalidad: "San José",
    budget: 680000000,
    startedAt: daysAgo(400),
  },
  {
    name: "Sistema de Alcantarillado Pluvial Cartago",
    description: "Instalación de 15 km de tubería para alcantarillado pluvial, reduciendo inundaciones en época lluviosa. Incluye 8 estaciones de bombeo.",
    company: "CODOCSA",
    location: "Cartago Centro y alrededores",
    status: "in progress",
    municipalidad: "Cartago",
    budget: 1950000000,
    startedAt: daysAgo(150),
  },
  {
    name: "Centro de Salud Comunitario Desamparados",
    description: "Nuevo centro de salud con consultorios médicos, farmacia, laboratorio clínico y área de vacunación. Capacidad para 200 pacientes diarios.",
    company: "Constructora MECO",
    location: "Desamparados, San Antonio",
    status: "pending",
    municipalidad: "Desamparados",
    budget: 890000000,
    startedAt: daysAgo(30),
  },
  {
    name: "Rehabilitación Carretera Costanera Sur",
    description: "Repavimentación de 45 km de carretera costera, mejoras en curvas peligrosas y construcción de miradores turísticos.",
    company: "Grupo Orosi",
    location: "Puntarenas, Zona Sur",
    status: "in progress",
    municipalidad: "Puntarenas",
    budget: 2100000000,
    startedAt: daysAgo(200),
  },
  {
    name: "Acueducto Rural Guanacaste Norte",
    description: "Sistema de distribución de agua potable para 15 comunidades rurales. Incluye planta de tratamiento, tanques de almacenamiento y 80 km de tubería.",
    company: "H. Solís",
    location: "Guanacaste, Zona Norte",
    status: "in progress",
    municipalidad: "Liberia",
    budget: 1600000000,
    startedAt: daysAgo(160),
  },
  {
    name: "Polideportivo Municipal Escazú",
    description: "Complejo deportivo con cancha de fútbol, basketball, piscina olímpica y gimnasio. Incluye graderías para 2000 personas.",
    company: "Ingenieros Civiles Asociados",
    location: "Escazú Centro",
    status: "delayed",
    municipalidad: "Escazú",
    budget: 1250000000,
    startedAt: daysAgo(280),
  },
  {
    name: "Mercado Municipal Limón",
    description: "Renovación completa del mercado municipal con 120 puestos modernos, sistemas de refrigeración, parqueo y áreas de carga.",
    company: "CODOCSA",
    location: "Limón Centro",
    status: "pending",
    municipalidad: "Limón",
    budget: 750000000,
    startedAt: daysAgo(45),
  },
  {
    name: "Biblioteca Pública Digital Curridabat",
    description: "Nueva biblioteca con sala de lectura, área infantil, laboratorio de computación con 50 estaciones y auditorio para 150 personas.",
    company: "Constructora Hernández Jiménez",
    location: "Curridabat, Granadilla",
    status: "done",
    municipalidad: "Curridabat",
    budget: 420000000,
    startedAt: daysAgo(350),
  },
  {
    name: "Paso a Desnivel Rotonda La Bandera",
    description: "Construcción de paso elevado para descongestionar uno de los puntos más críticos de tráfico en San José. Incluye carriles exclusivos para buses.",
    company: "Constructora MECO",
    location: "San José, Sabana Norte",
    status: "in progress",
    municipalidad: "San José",
    budget: 4500000000,
    startedAt: daysAgo(220),
  },
  {
    name: "Planta de Tratamiento de Aguas Residuales",
    description: "Nueva planta con capacidad para tratar 15,000 m³ diarios de aguas residuales, beneficiando a 50,000 habitantes.",
    company: "Grupo Orosi",
    location: "Heredia, Mercedes Norte",
    status: "in progress",
    municipalidad: "Heredia",
    budget: 2800000000,
    startedAt: daysAgo(190),
  },
  {
    name: "Ciclovía Metropolitana - Tramo 1",
    description: "Construcción de 12 km de ciclovía segregada conectando San José con Escazú, incluyendo estaciones de bicicletas públicas.",
    company: "Ingenieros Civiles Asociados",
    location: "San José - Escazú",
    status: "pending",
    municipalidad: "San José",
    budget: 580000000,
    startedAt: daysAgo(20),
  },
  {
    name: "Colegio Técnico Profesional Cartago",
    description: "Nuevo colegio técnico con talleres especializados en mecánica, electricidad, programación y diseño. Capacidad para 800 estudiantes.",
    company: "H. Solís",
    location: "Cartago, Oriental",
    status: "in progress",
    municipalidad: "Cartago",
    budget: 1900000000,
    startedAt: daysAgo(210),
  },
  {
    name: "Parque Lineal Río Torres",
    description: "Recuperación de 5 km de ribera del Río Torres con senderos, áreas verdes, zonas de ejercicio y espacios culturales.",
    company: "CODOCSA",
    location: "San José, múltiples distritos",
    status: "delayed",
    municipalidad: "San José",
    budget: 920000000,
    startedAt: daysAgo(320),
  },
  {
    name: "Terminal de Autobuses Alajuela",
    description: "Nueva terminal moderna con 40 andenes, área comercial, parqueo de 300 espacios y conexión con tren interurbano.",
    company: "Constructora MECO",
    location: "Alajuela Centro",
    status: "in progress",
    municipalidad: "Alajuela",
    budget: 2200000000,
    startedAt: daysAgo(170),
  },
];

// Function to generate project changes
const generateProjectChanges = (projectId: number, projectName: string, projectStatus: string, projectBudget: number) => {
  const changes = [];
  
  // All projects get initial planning change
  changes.push({
    proyectId: projectId,
    changeTitle: "Inicio de fase de planificación",
    changeState: "completado",
    userId: TEST_USER_ID,
    details: `Se ha completado la fase de planificación del proyecto ${projectName}. Se realizaron estudios de factibilidad, análisis de impacto ambiental y consultas con la comunidad. El proyecto fue aprobado por el consejo municipal.`,
    budgetSpent: Math.floor(projectBudget * 0.05),
    createdAt: daysAgo(Math.floor(Math.random() * 100) + 200),
  });

  if (projectStatus === "in progress" || projectStatus === "done" || projectStatus === "delayed") {
    changes.push({
      proyectId: projectId,
      changeTitle: "Adjudicación de contrato",
      changeState: "completado",
      userId: TEST_USER_ID,
      details: `Se completó el proceso de licitación pública. Se recibieron ${Math.floor(Math.random() * 5) + 3} ofertas de diferentes empresas constructoras. El contrato fue adjudicado siguiendo los lineamientos de la Contraloría General de la República.`,
      budgetSpent: Math.floor(projectBudget * 0.08),
      createdAt: daysAgo(Math.floor(Math.random() * 80) + 120),
    });

    changes.push({
      proyectId: projectId,
      changeTitle: "Inicio de obras de construcción",
      changeState: "completado",
      userId: TEST_USER_ID,
      details: `Se dio inicio formal a las obras de construcción. Se instaló el campamento temporal, se realizó el cerramiento del área de trabajo y se movilizó la maquinaria necesaria. Se estima una duración de ${Math.floor(Math.random() * 12) + 6} meses.`,
      budgetSpent: Math.floor(projectBudget * 0.15),
      createdAt: daysAgo(Math.floor(Math.random() * 60) + 80),
    });
  }

  if (projectStatus === "in progress") {
    const progressPercentage = Math.floor(Math.random() * 40) + 30;
    changes.push({
      proyectId: projectId,
      changeTitle: `Avance del ${progressPercentage}% en construcción`,
      changeState: "en_progreso",
      userId: TEST_USER_ID,
      details: `El proyecto presenta un avance del ${progressPercentage}% según el cronograma establecido. Se han completado las obras de cimentación y se está trabajando en la estructura principal. Los trabajos se realizan en horario diurno para minimizar molestias a la comunidad.`,
      budgetSpent: Math.floor(projectBudget * (progressPercentage / 100)),
      createdAt: daysAgo(Math.floor(Math.random() * 40) + 20),
    });
  }

  if (projectStatus === "done") {
    changes.push({
      proyectId: projectId,
      changeTitle: "Finalización de obras",
      changeState: "completado",
      userId: TEST_USER_ID,
      details: `Se completaron todas las obras de construcción según lo planificado. Se realizaron las pruebas de calidad y se obtuvo el visto bueno de los ingenieros supervisores. El proyecto está listo para su inauguración.`,
      budgetSpent: Math.floor(projectBudget * 0.92),
      createdAt: daysAgo(Math.floor(Math.random() * 30) + 30),
    });

    changes.push({
      proyectId: projectId,
      changeTitle: "Inauguración y entrega oficial",
      changeState: "completado",
      userId: TEST_USER_ID,
      details: `El proyecto fue inaugurado oficialmente y entregado a la comunidad. Se realizó una ceremonia con autoridades locales y vecinos. La obra está ahora en operación y cumpliendo su función para beneficio de la población.`,
      budgetSpent: Math.floor(projectBudget * 0.98),
      createdAt: daysAgo(Math.floor(Math.random() * 20) + 5),
    });
  }

  if (projectStatus === "delayed") {
    changes.push({
      proyectId: projectId,
      changeTitle: "Retraso por condiciones climáticas",
      changeState: "revision",
      userId: TEST_USER_ID,
      details: `El proyecto ha experimentado retrasos debido a condiciones climáticas adversas durante la época lluviosa. Se está revisando el cronograma y se estima una extensión de 2-3 meses. No se prevén sobrecostos significativos.`,
      budgetSpent: Math.floor(projectBudget * 0.35),
      createdAt: daysAgo(Math.floor(Math.random() * 30) + 15),
    });
  }

  if (projectStatus === "pending") {
    changes.push({
      proyectId: projectId,
      changeTitle: "Proceso de licitación en curso",
      changeState: "preparacion",
      userId: TEST_USER_ID,
      details: `Se publicó el cartel de licitación en el Sistema de Compras Gubernamentales (SICOP). Las empresas interesadas tienen plazo hasta fin de mes para presentar sus ofertas. Se espera adjudicar el contrato en las próximas 6 semanas.`,
      budgetSpent: Math.floor(projectBudget * 0.03),
      createdAt: daysAgo(Math.floor(Math.random() * 20) + 5),
    });
  }

  return changes;
};

async function seed() {
  try {
    console.log("🌱 Starting database seeding...");

    // Insert comments
    console.log("📝 Inserting comments...");
    const insertedComments = await db.insert(comments_table).values(commentsData).returning();
    console.log(`✅ Inserted ${insertedComments.length} comments`);

    // Insert projects
    console.log("🏗️  Inserting projects...");
    const insertedProjects = await db.insert(proyects).values(projectsData).returning();
    console.log(`✅ Inserted ${insertedProjects.length} projects`);

    // Generate and insert project changes
    console.log("📊 Inserting project changes...");
    const allChanges = [];
    for (const project of insertedProjects) {
      const changes = generateProjectChanges(
        project.id,
        project.name,
        project.status,
        project.budget
      );
      allChanges.push(...changes);
    }
    
    const insertedChanges = await db.insert(proyect_changes).values(allChanges).returning();
    console.log(`✅ Inserted ${insertedChanges.length} project changes`);

    console.log("\n🎉 Database seeding done successfully!");
    console.log("\n📈 Summary:");
    console.log(`   - Comments: ${insertedComments.length}`);
    console.log(`   - Projects: ${insertedProjects.length}`);
    console.log(`   - Project Changes: ${insertedChanges.length}`);
    console.log(`   - Test User ID: ${TEST_USER_ID}`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    console.log("\n👋 Seeding process finished");
    process.exit(0);
  }
}

// Run the seed function
seed();

// Made with Bob
