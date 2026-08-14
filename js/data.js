// ============================================================
//  DATOS DE LA APP DE INGLÉS
//  Vocabulario, frases y banco de preguntas del test de nivel
// ============================================================

// ---------- VOCABULARIO ----------
// nivel: 1 = básico | 2 = intermedio | 3 = avanzado
// cada palabra: { id, en, es, ej (inglés), ex (español), niv, cat }
const VOCAB = [
  // ===== COTIDIANO · BÁSICO (nivel 1) =====
  { id:"c01", en:"water", es:"agua", ej:"Can I have some water, please?", ex:"¿Puedo tener un poco de agua, por favor?", niv:1, cat:"cotidiano" },
  { id:"c02", en:"bread", es:"pan", ej:"I eat bread with butter.", ex:"Como pan con mantequilla.", niv:1, cat:"cotidiano" },
  { id:"c03", en:"apple", es:"manzana", ej:"An apple a day keeps the doctor away.", ex:"Una manzana al día mantiene al médico lejos.", niv:1, cat:"cotidiano" },
  { id:"c04", en:"milk", es:"leche", ej:"I drink milk every morning.", ex:"Bebo leche todas las mañanas.", niv:1, cat:"cotidiano" },
  { id:"c05", en:"breakfast", es:"desayuno", ej:"Breakfast is my favorite meal.", ex:"El desayuno es mi comida favorita.", niv:1, cat:"cotidiano" },
  { id:"c06", en:"lunch", es:"almuerzo", ej:"What do you want for lunch?", ex:"¿Qué quieres para el almuerzo?", niv:1, cat:"cotidiano" },
  { id:"c07", en:"dinner", es:"cena", ej:"We have dinner at eight.", ex:"Cenamos a las ocho.", niv:1, cat:"cotidiano" },
  { id:"c08", en:"house", es:"casa", ej:"My house is near the park.", ex:"Mi casa está cerca del parque.", niv:1, cat:"cotidiano" },
  { id:"c09", en:"bed", es:"cama", ej:"I go to bed at ten.", ex:"Me voy a la cama a las diez.", niv:1, cat:"cotidiano" },
  { id:"c10", en:"door", es:"puerta", ej:"Please close the door.", ex:"Por favor, cierra la puerta.", niv:1, cat:"cotidiano" },
  { id:"c11", en:"window", es:"ventana", ej:"Open the window, please.", ex:"Abre la ventana, por favor.", niv:1, cat:"cotidiano" },
  { id:"c12", en:"table", es:"mesa", ej:"The keys are on the table.", ex:"Las llaves están sobre la mesa.", niv:1, cat:"cotidiano" },
  { id:"c13", en:"money", es:"dinero", ej:"I need money to pay the rent.", ex:"Necesito dinero para pagar el alquiler.", niv:1, cat:"cotidiano" },
  { id:"c14", en:"friend", es:"amigo / amiga", ej:"She is my best friend.", ex:"Ella es mi mejor amiga.", niv:1, cat:"cotidiano" },
  { id:"c15", en:"family", es:"familia", ej:"I love my family.", ex:"Amo a mi familia.", niv:1, cat:"cotidiano" },
  { id:"c16", en:"name", es:"nombre", ej:"My name is Carlos.", ex:"Mi nombre es Carlos.", niv:1, cat:"cotidiano" },
  { id:"c17", en:"morning", es:"mañana (temprano)", ej:"Good morning, how are you?", ex:"Buenos días, ¿cómo estás?", niv:1, cat:"cotidiano" },
  { id:"c18", en:"evening", es:"tarde / noche (temprano)", ej:"Good evening, welcome.", ex:"Buenas tardes, bienvenido.", niv:1, cat:"cotidiano" },
  { id:"c19", en:"happy", es:"feliz", ej:"I feel very happy today.", ex:"Me siento muy feliz hoy.", niv:1, cat:"cotidiano" },
  { id:"c20", en:"tired", es:"cansado", ej:"I am tired after work.", ex:"Estoy cansado después del trabajo.", niv:1, cat:"cotidiano" },
  { id:"c21", en:"hot", es:"caliente / caluroso", ej:"The coffee is very hot.", ex:"El café está muy caliente.", niv:1, cat:"cotidiano" },
  { id:"c22", en:"cold", es:"frío", ej:"It is cold today.", ex:"Hace frío hoy.", niv:1, cat:"cotidiano" },
  { id:"c23", en:"big", es:"grande", ej:"That is a big house.", ex:"Esa es una casa grande.", niv:1, cat:"cotidiano" },
  { id:"c24", en:"small", es:"pequeño", ej:"I have a small car.", ex:"Tengo un carro pequeño.", niv:1, cat:"cotidiano" },
  { id:"c25", en:"fast", es:"rápido", ej:"This train is very fast.", ex:"Este tren es muy rápido.", niv:1, cat:"cotidiano" },
  { id:"c26", en:"slow", es:"lento", ej:"The internet is slow today.", ex:"El internet está lento hoy.", niv:1, cat:"cotidiano" },
  { id:"c27", en:"beautiful", es:"hermoso / bonito", ej:"What a beautiful day!", ex:"¡Qué día tan hermoso!", niv:1, cat:"cotidiano" },
  { id:"c28", en:"buy", es:"comprar", ej:"I want to buy a new phone.", ex:"Quiero comprar un teléfono nuevo.", niv:1, cat:"cotidiano" },
  { id:"c29", en:"sell", es:"vender", ej:"They sell fresh fruit here.", ex:"Ellos venden fruta fresca aquí.", niv:1, cat:"cotidiano" },
  { id:"c30", en:"eat", es:"comer", ej:"Let's eat together.", ex:"Comamos juntos.", niv:1, cat:"cotidiano" },
  { id:"c31", en:"drink", es:"beber / tomar", ej:"Drink plenty of water.", ex:"Bebe mucha agua.", niv:1, cat:"cotidiano" },
  { id:"c32", en:"sleep", es:"dormir", ej:"I sleep eight hours a day.", ex:"Duermo ocho horas al día.", niv:1, cat:"cotidiano" },
  { id:"c33", en:"walk", es:"caminar", ej:"I walk to the store.", ex:"Camino hasta la tienda.", niv:1, cat:"cotidiano" },
  { id:"c34", en:"speak", es:"hablar", ej:"I speak Spanish and English.", ex:"Hablo español e inglés.", niv:1, cat:"cotidiano" },
  { id:"c35", en:"listen", es:"escuchar", ej:"I listen to music at night.", ex:"Escucho música en la noche.", niv:1, cat:"cotidiano" },
  { id:"c36", en:"see", es:"ver", ej:"I can see the mountains.", ex:"Puedo ver las montañas.", niv:1, cat:"cotidiano" },
  { id:"c37", en:"give", es:"dar", ej:"Give me the book, please.", ex:"Dame el libro, por favor.", niv:1, cat:"cotidiano" },
  { id:"c38", en:"take", es:"tomar / llevar", ej:"Take an umbrella with you.", ex:"Lleva un paraguas contigo.", niv:1, cat:"cotidiano" },
  { id:"c39", en:"today", es:"hoy", ej:"Today is a good day.", ex:"Hoy es un buen día.", niv:1, cat:"cotidiano" },
  { id:"c40", en:"tomorrow", es:"mañana (futuro)", ej:"See you tomorrow.", ex:"Nos vemos mañana.", niv:1, cat:"cotidiano" },
  { id:"c41", en:"yesterday", es:"ayer", ej:"Yesterday I worked all day.", ex:"Ayer trabajé todo el día.", niv:1, cat:"cotidiano" },
  { id:"c42", en:"week", es:"semana", ej:"See you next week.", ex:"Nos vemos la próxima semana.", niv:1, cat:"cotidiano" },
  { id:"c43", en:"month", es:"mes", ej:"I travel once a month.", ex:"Viajo una vez al mes.", niv:1, cat:"cotidiano" },
  { id:"c44", en:"doctor", es:"médico / doctor", ej:"You should see a doctor.", ex:"Deberías ver a un médico.", niv:1, cat:"cotidiano" },
  { id:"c45", en:"pharmacy", es:"farmacia", ej:"The pharmacy is on the corner.", ex:"La farmacia está en la esquina.", niv:1, cat:"cotidiano" },
  { id:"c46", en:"price", es:"precio", ej:"What is the price of this?", ex:"¿Cuál es el precio de esto?", niv:1, cat:"cotidiano" },
  { id:"c47", en:"cheap", es:"barato", ej:"This shirt is very cheap.", ex:"Esta camisa es muy barata.", niv:1, cat:"cotidiano" },
  { id:"c48", en:"expensive", es:"caro", ej:"That watch is too expensive.", ex:"Ese reloj es demasiado caro.", niv:1, cat:"cotidiano" },
  { id:"c49", en:"clean", es:"limpiar / limpio", ej:"I clean the kitchen every day.", ex:"Limpio la cocina todos los días.", niv:1, cat:"cotidiano" },
  { id:"c50", en:"ready", es:"listo", ej:"Are you ready?", ex:"¿Estás listo?", niv:1, cat:"cotidiano" },

  // ===== TRABAJO · BÁSICO (nivel 1) =====
  { id:"t01", en:"work", es:"trabajo / trabajar", ej:"I work from home.", ex:"Trabajo desde casa.", niv:1, cat:"trabajo" },
  { id:"t02", en:"job", es:"empleo / trabajo", ej:"She has a new job.", ex:"Ella tiene un empleo nuevo.", niv:1, cat:"trabajo" },
  { id:"t03", en:"office", es:"oficina", ej:"The office is on the fifth floor.", ex:"La oficina está en el quinto piso.", niv:1, cat:"trabajo" },
  { id:"t04", en:"boss", es:"jefe", ej:"My boss is very kind.", ex:"Mi jefe es muy amable.", niv:1, cat:"trabajo" },
  { id:"t05", en:"colleague", es:"compañero de trabajo", ej:"I work with a great colleague.", ex:"Trabajo con un gran compañero.", niv:1, cat:"trabajo" },
  { id:"t06", en:"meeting", es:"reunión", ej:"The meeting starts at ten.", ex:"La reunión empieza a las diez.", niv:1, cat:"trabajo" },
  { id:"t07", en:"email", es:"correo electrónico", ej:"Send me an email with the details.", ex:"Envíame un correo con los detalles.", niv:1, cat:"trabajo" },
  { id:"t08", en:"phone", es:"teléfono", ej:"I'll call you on the phone.", ex:"Te llamaré por teléfono.", niv:1, cat:"trabajo" },
  { id:"t09", en:"computer", es:"computadora", ej:"My computer is very slow.", ex:"Mi computadora es muy lenta.", niv:1, cat:"trabajo" },
  { id:"t10", en:"document", es:"documento", ej:"Please review this document.", ex:"Por favor, revisa este documento.", niv:1, cat:"trabajo" },
  { id:"t11", en:"report", es:"informe / reporte", ej:"I need the report by Friday.", ex:"Necesito el informe para el viernes.", niv:1, cat:"trabajo" },
  { id:"t12", en:"time", es:"tiempo / hora", ej:"Do you have time today?", ex:"¿Tienes tiempo hoy?", niv:1, cat:"trabajo" },
  { id:"t13", en:"day", es:"día", ej:"Have a good day at work.", ex:"Ten un buen día en el trabajo.", niv:1, cat:"trabajo" },
  { id:"t14", en:"help", es:"ayudar / ayuda", ej:"Can you help me, please?", ex:"¿Puedes ayudarme, por favor?", niv:1, cat:"trabajo" },
  { id:"t15", en:"ask", es:"preguntar", ej:"Feel free to ask questions.", ex:"Siéntete libre de hacer preguntas.", niv:1, cat:"trabajo" },
  { id:"t16", en:"answer", es:"responder / respuesta", ej:"Please answer the email.", ex:"Por favor, responde el correo.", niv:1, cat:"trabajo" },
  { id:"t17", en:"write", es:"escribir", ej:"I write reports every week.", ex:"Escribo informes cada semana.", niv:1, cat:"trabajo" },
  { id:"t18", en:"read", es:"leer", ej:"I read my messages in the morning.", ex:"Leo mis mensajes en la mañana.", niv:1, cat:"trabajo" },
  { id:"t19", en:"money", es:"dinero / salario", ej:"The work pays good money.", ex:"El trabajo paga buen dinero.", niv:1, cat:"trabajo" },
  { id:"t20", en:"early", es:"temprano", ej:"I arrive early every day.", ex:"Llego temprano todos los días.", niv:1, cat:"trabajo" },

  // ===== COTIDIANO · INTERMEDIO (nivel 2) =====
  { id:"c51", en:"appointment", es:"cita / hora concertada", ej:"I have a dentist appointment at three.", ex:"Tengo cita con el dentista a las tres.", niv:2, cat:"cotidiano" },
  { id:"c52", en:"bills", es:"cuentas / recibos", ej:"I pay the bills online.", ex:"Pago las cuentas en línea.", niv:2, cat:"cotidiano" },
  { id:"c53", en:"groceries", es:"mercado / compras de comida", ej:"I buy groceries every Saturday.", ex:"Hago las compras de comida cada sábado.", niv:2, cat:"cotidiano" },
  { id:"c54", en:"neighborhood", es:"vecindario / barrio", ej:"It's a quiet neighborhood.", ex:"Es un barrio tranquilo.", niv:2, cat:"cotidiano" },
  { id:"c55", en:"traffic", es:"tráfico", ej:"I hate the traffic in the morning.", ex:"Odio el tráfico de la mañana.", niv:2, cat:"cotidiano" },
  { id:"c56", en:"schedule", es:"horario / agenda", ej:"My schedule is full today.", ex:"Mi agenda está llena hoy.", niv:2, cat:"cotidiano" },
  { id:"c57", en:"habits", es:"hábitos", ej:"Good habits make life easier.", ex:"Los buenos hábitos hacen la vida más fácil.", niv:2, cat:"cotidiano" },
  { id:"c58", en:"comfortable", es:"cómodo", ej:"These shoes are very comfortable.", ex:"Estos zapatos son muy cómodos.", niv:2, cat:"cotidiano" },
  { id:"c59", en:"delicious", es:"delicioso", ej:"This soup is delicious!", ex:"¡Esta sopa está deliciosa!", niv:2, cat:"cotidiano" },
  { id:"c60", en:"expensive", es:"caro", ej:"Eating out is expensive.", ex:"Comer afuera es caro.", niv:2, cat:"cotidiano" },
  { id:"c61", en:"crowded", es:"lleno / concurrido", ej:"The mall is crowded on weekends.", ex:"El centro comercial está lleno los fines de semana.", niv:2, cat:"cotidiano" },
  { id:"c62", en:"quiet", es:"tranquilo / silencioso", ej:"I like quiet places.", ex:"Me gustan los lugares tranquilos.", niv:2, cat:"cotidiano" },
  { id:"c63", en:"nearby", es:"cerca / cercano", ej:"There's a good restaurant nearby.", ex:"Hay un buen restaurante cerca.", niv:2, cat:"cotidiano" },
  { id:"c64", en:"awful", es:"horrible / pésimo", ej:"The weather is awful today.", ex:"El clima está horrible hoy.", niv:2, cat:"cotidiano" },
  { id:"c65", en:"lovely", es:"encantador / precioso", ej:"What a lovely idea!", ex:"¡Qué idea tan encantadora!", niv:2, cat:"cotidiano" },
  { id:"c66", en:"improve", es:"mejorar", ej:"I want to improve my English.", ex:"Quiero mejorar mi inglés.", niv:2, cat:"cotidiano" },
  { id:"c67", en:"forget", es:"olvidar", ej:"Don't forget to call me.", ex:"No olvides llamarme.", niv:2, cat:"cotidiano" },
  { id:"c68", en:"remember", es:"recordar", ej:"I remember that day perfectly.", ex:"Recuerdo ese día perfectamente.", niv:2, cat:"cotidiano" },
  { id:"c69", en:"borrow", es:"pedir prestado", ej:"Can I borrow your charger?", ex:"¿Me prestas tu cargador?", niv:2, cat:"cotidiano" },
  { id:"c70", en:"lend", es:"prestar", ej:"I can lend you some money.", ex:"Puedo prestarte algo de dinero.", niv:2, cat:"cotidiano" },
  { id:"c71", en:"arrive", es:"llegar", ej:"We arrived late to the party.", ex:"Llegamos tarde a la fiesta.", niv:2, cat:"cotidiano" },
  { id:"c72", en:"leave", es:"salir / irse", ej:"What time do you leave?", ex:"¿A qué hora sales?", niv:2, cat:"cotidiano" },
  { id:"c73", en:"return", es:"regresar / devolver", ej:"I will return your book tomorrow.", ex:"Te devolveré tu libro mañana.", niv:2, cat:"cotidiano" },
  { id:"c74", en:"spend", es:"gastar / pasar (tiempo)", ej:"I spend a lot of money on coffee.", ex:"Gasto mucho dinero en café.", niv:2, cat:"cotidiano" },
  { id:"c75", en:"save", es:"ahorrar", ej:"I save money every month.", ex:"Ahorro dinero cada mes.", niv:2, cat:"cotidiano" },

  // ===== TRABAJO · INTERMEDIO (nivel 2) =====
  { id:"t21", en:"deadline", es:"fecha límite", ej:"The deadline is next Monday.", ex:"La fecha límite es el próximo lunes.", niv:2, cat:"trabajo" },
  { id:"t22", en:"task", es:"tarea / tarea asignada", ej:"Finish this task before noon.", ex:"Termina esta tarea antes del mediodía.", niv:2, cat:"trabajo" },
  { id:"t23", en:"project", es:"proyecto", ej:"We are working on a new project.", ex:"Estamos trabajando en un proyecto nuevo.", niv:2, cat:"trabajo" },
  { id:"t24", en:"team", es:"equipo", ej:"Our team works very well together.", ex:"Nuestro equipo trabaja muy bien junto.", niv:2, cat:"trabajo" },
  { id:"t25", en:"schedule", es:"programación / horario", ej:"The project schedule changed.", ex:"La programación del proyecto cambió.", niv:2, cat:"trabajo" },
  { id:"t26", en:"customer", es:"cliente", ej:"The customer is always right.", ex:"El cliente siempre tiene la razón.", niv:2, cat:"trabajo" },
  { id:"t27", en:"supplier", es:"proveedor", ej:"We have a new supplier.", ex:"Tenemos un proveedor nuevo.", niv:2, cat:"trabajo" },
  { id:"t28", en:"deliver", es:"entregar", ej:"We deliver orders every day.", ex:"Entregamos pedidos todos los días.", niv:2, cat:"trabajo" },
  { id:"t29", en:"invoice", es:"factura", ej:"Send the invoice to the client.", ex:"Envía la factura al cliente.", niv:2, cat:"trabajo" },
  { id:"t30", en:"salary", es:"salario", ej:"The salary is paid monthly.", ex:"El salario se paga mensualmente.", niv:2, cat:"trabajo" },
  { id:"t31", en:"raise", es:"aumento de sueldo", ej:"She asked for a raise.", ex:"Ella pidió un aumento.", niv:2, cat:"trabajo" },
  { id:"t32", en:"hire", es:"contratar", ej:"We plan to hire two people.", ex:"Planeamos contratar a dos personas.", niv:2, cat:"trabajo" },
  { id:"t33", en:"fire", es:"despedir", ej:"They fired the manager.", ex:"Despidieron al gerente.", niv:2, cat:"trabajo" },
  { id:"t34", en:"quit", es:"renunciar", ej:"He quit his job last month.", ex:"Él renunció a su empleo el mes pasado.", niv:2, cat:"trabajo" },
  { id:"t35", en:"schedule", es:"agenda / horario", ej:"Let's check the schedule together.", ex:"Revisemos el horario juntos.", niv:2, cat:"trabajo" },
  { id:"t36", en:"progress", es:"progreso / avance", ej:"Show me the progress of the project.", ex:"Muéstrame el avance del proyecto.", niv:2, cat:"trabajo" },
  { id:"t37", en:"issue", es:"problema / asunto", ej:"We have an issue with the server.", ex:"Tenemos un problema con el servidor.", niv:2, cat:"trabajo" },
  { id:"t38", en:"solution", es:"solución", ej:"We need a quick solution.", ex:"Necesitamos una solución rápida.", niv:2, cat:"trabajo" },
  { id:"t39", en:"discuss", es:"discutir / conversar sobre", ej:"Let's discuss the budget.", ex:"Conversemos sobre el presupuesto.", niv:2, cat:"trabajo" },
  { id:"t40", en:"decide", es:"decidir", ej:"We must decide today.", ex:"Debemos decidir hoy.", niv:2, cat:"trabajo" },
  { id:"t41", en:"attend", es:"asistir", ej:"I attend the meeting every Monday.", ex:"Asisto a la reunión cada lunes.", niv:2, cat:"trabajo" },
  { id:"t42", en:"cancel", es:"cancelar", ej:"We had to cancel the meeting.", ex:"Tuvimos que cancelar la reunión.", niv:2, cat:"trabajo" },
  { id:"t43", en:"update", es:"actualizar / actualización", ej:"I'll update you by email.", ex:"Te mantendré informado por correo.", niv:2, cat:"trabajo" },
  { id:"t44", en:"approve", es:"aprobar", ej:"The manager must approve this.", ex:"El gerente debe aprobar esto.", niv:2, cat:"trabajo" },
  { id:"t45", en:"important", es:"importante", ej:"This is an important meeting.", ex:"Esta es una reunión importante.", niv:2, cat:"trabajo" },

  // ===== COTIDIANO · AVANZADO (nivel 3) =====
  { id:"c76", en:"household chores", es:"quehaceres del hogar", ej:"I do household chores on Sundays.", ex:"Hago los quehaceres del hogar los domingos.", niv:3, cat:"cotidiano" },
  { id:"c77", en:"grocery shopping", es:"hacer las compras del supermercado", ej:"Grocery shopping takes an hour.", ex:"Hacer las compras toma una hora.", niv:3, cat:"cotidiano" },
  { id:"c78", en:"bargain", es:"ganga / oferta", ej:"This jacket was a real bargain.", ex:"Esta chaqueta fue una verdadera ganga.", niv:3, cat:"cotidiano" },
  { id:"c79", en:"overwhelmed", es:"abrumado", ej:"I feel overwhelmed with all this work.", ex:"Me siento abrumado con todo este trabajo.", niv:3, cat:"cotidiano" },
  { id:"c80", en:"exhausted", es:"agotado", ej:"After the trip, I was exhausted.", ex:"Después del viaje, estaba agotado.", niv:3, cat:"cotidiano" },
  { id:"c81", en:"to run errands", es:"hacer trámites / diligencias", ej:"I need to run some errands today.", ex:"Necesito hacer unos trámites hoy.", niv:3, cat:"cotidiano" },
  { id:"c82", en:"to figure out", es:"averiguar / resolver", ej:"I can't figure out this machine.", ex:"No puedo resolver esta máquina.", niv:3, cat:"cotidiano" },
  { id:"c83", en:"to get along with", es:"llevarse bien con", ej:"I get along with my neighbors.", ex:"Me llevo bien con mis vecinos.", niv:3, cat:"cotidiano" },
  { id:"c84", en:"to put off", es:"posponer / aplazar", ej:"Don't put off your homework.", ex:"No pospongas tu tarea.", niv:3, cat:"cotidiano" },
  { id:"c85", en:"to give up", es:"rendirse / dejar de hacer", ej:"Never give up on your dreams.", ex:"Nunca te rindas con tus sueños.", niv:3, cat:"cotidiano" },
  { id:"c86", en:"to look forward to", es:"esperar con ilusión", ej:"I look forward to seeing you.", ex:"Espero con ilusión verte.", niv:3, cat:"cotidiano" },
  { id:"c87", en:"to make up my mind", es:"decidirme", ej:"I can't make up my mind.", ex:"No puedo decidirme.", niv:3, cat:"cotidiano" },
  { id:"c88", en:"cozy", es:"acogedor", ej:"This café is warm and cozy.", ex:"Este café es cálido y acogedor.", niv:3, cat:"cotidiano" },
  { id:"c89", en:"messy", es:"desordenado", ej:"My room is really messy.", ex:"Mi cuarto está muy desordenado.", niv:3, cat:"cotidiano" },
  { id:"c90", en:"spacious", es:"espacioso", ej:"They have a spacious kitchen.", ex:"Ellos tienen una cocina espaciosa.", niv:3, cat:"cotidiano" },

  // ===== TRABAJO · AVANZADO (nivel 3) =====
  { id:"t46", en:"to follow up", es:"dar seguimiento", ej:"I'll follow up with you next week.", ex:"Te daré seguimiento la próxima semana.", niv:3, cat:"trabajo" },
  { id:"t47", en:"to bring up", es:"mencionar / sacar a la luz", ej:"She brought up a good point.", ex:"Ella mencionó un buen punto.", niv:3, cat:"trabajo" },
  { id:"t48", en:"to get back to", es:"responder / volver a contactar", ej:"I'll get back to you by email.", ex:"Te responderé por correo.", niv:3, cat:"trabajo" },
  { id:"t49", en:"to reach out", es:"contactar / comunicarse", ej:"Please reach out if you need help.", ex:"Por favor, comunícate si necesitas ayuda.", niv:3, cat:"trabajo" },
  { id:"t50", en:"to fill in", es:"completar / llenar", ej:"Please fill in the form.", ex:"Por favor, completa el formulario.", niv:3, cat:"trabajo" },
  { id:"t51", en:"to look into", es:"investigar / revisar", ej:"I'll look into the problem.", ex:"Investigaré el problema.", niv:3, cat:"trabajo" },
  { id:"t52", en:"to carry out", es:"llevar a cabo", ej:"We carried out the plan.", ex:"Llevamos a cabo el plan.", niv:3, cat:"trabajo" },
  { id:"t53", en:"to point out", es:"señalar / indicar", ej:"He pointed out a mistake.", ex:"Él señaló un error.", niv:3, cat:"trabajo" },
  { id:"t54", en:"to turn in", es:"entregar (un trabajo)", ej:"Turn in your report by Friday.", ex:"Entrega tu informe antes del viernes.", niv:3, cat:"trabajo" },
  { id:"t55", en:"to work on", es:"trabajar en / avanzar en", ej:"I'm working on the proposal.", ex:"Estoy trabajando en la propuesta.", niv:3, cat:"trabajo" },
  { id:"t56", en:"negotiate", es:"negociar", ej:"We negotiated a better price.", ex:"Negociamos un mejor precio.", niv:3, cat:"trabajo" },
  { id:"t57", en:"evaluate", es:"evaluar", ej:"Let's evaluate the results.", ex:"Evaluemos los resultados.", niv:3, cat:"trabajo" },
  { id:"t58", en:"implement", es:"implementar", ej:"We will implement the new system.", ex:"Implementaremos el nuevo sistema.", niv:3, cat:"trabajo" },
  { id:"t59", en:"achieve", es:"lograr / alcanzar", ej:"We achieved our goals.", ex:"Logramos nuestras metas.", niv:3, cat:"trabajo" },
  { id:"t60", en:"profit", es:"ganancia / beneficio", ej:"The company made a big profit.", ex:"La empresa obtuvo una gran ganancia.", niv:3, cat:"trabajo" },
  { id:"t61", en:"budget", es:"presupuesto", ej:"The budget is limited.", ex:"El presupuesto es limitado.", niv:3, cat:"trabajo" },
  { id:"t62", en:"efficient", es:"eficiente", ej:"This method is very efficient.", ex:"Este método es muy eficiente.", niv:3, cat:"trabajo" },
  { id:"t63", en:"reliable", es:"confiable", ej:"He is a reliable person.", ex:"Él es una persona confiable.", niv:3, cat:"trabajo" },
  { id:"t64", en:"crucial", es:"crucial / fundamental", ej:"This decision is crucial.", ex:"Esta decisión es crucial.", niv:3, cat:"trabajo" },
  { id:"t65", en:"to go the extra mile", es:"hacer un esfuerzo extra", ej:"She always goes the extra mile.", ex:"Ella siempre hace un esfuerzo extra.", niv:3, cat:"trabajo" },
];

// ---------- FRASES DE CONVERSACIÓN ----------
// Situaciones cotidianas y de trabajo, con audio y traducción.
const PHRASES = {
  "saludos": {
    titulo: "Saludos y pequeños momentos",
    icono: "👋",
    frases: [
      { en:"Hello! How are you doing?", es:"¡Hola! ¿Cómo estás?" },
      { en:"Nice to meet you.", es:"Mucho gusto." },
      { en:"Have a great day!", es:"¡Que tengas un gran día!" },
      { en:"See you later.", es:"Nos vemos luego." },
      { en:"Sorry, I didn't catch that.", es:"Perdón, no lo entendí." },
      { en:"Could you say that again, please?", es:"¿Podrías repetirlo, por favor?" },
      { en:"I'm just learning English.", es:"Apenas estoy aprendiendo inglés." },
      { en:"How do you say this in English?", es:"¿Cómo se dice esto en inglés?" },
    ]
  },
  "compras": {
    titulo: "Compras y tiendas",
    icono: "🛒",
    frases: [
      { en:"How much does this cost?", es:"¿Cuánto cuesta esto?" },
      { en:"Is there a discount?", es:"¿Hay algún descuento?" },
      { en:"Do you have this in another size?", es:"¿Tienes esto en otra talla?" },
      { en:"Can I pay by card?", es:"¿Puedo pagar con tarjeta?" },
      { en:"I'm just looking, thanks.", es:"Solo estoy mirando, gracias." },
      { en:"Could I get a receipt, please?", es:"¿Me podría dar un recibo, por favor?" },
      { en:"That's too expensive for me.", es:"Eso es demasiado caro para mí." },
    ]
  },
  "comida": {
    titulo: "Restaurante y comida",
    icono: "🍽️",
    frases: [
      { en:"I'd like to make a reservation.", es:"Me gustaría hacer una reservación." },
      { en:"Could I see the menu, please?", es:"¿Podría ver el menú, por favor?" },
      { en:"What do you recommend?", es:"¿Qué me recomiendas?" },
      { en:"I'm allergic to peanuts.", es:"Soy alérgico a los cacahuates." },
      { en:"Can I have the bill, please?", es:"¿Me trae la cuenta, por favor?" },
      { en:"It was delicious, thank you.", es:"Estuvo delicioso, gracias." },
    ]
  },
  "viaje": {
    titulo: "Viajes y transporte",
    icono: "✈️",
    frases: [
      { en:"Where is the nearest bus stop?", es:"¿Dónde está la parada de bus más cercana?" },
      { en:"How do I get to the airport?", es:"¿Cómo llego al aeropuerto?" },
      { en:"A ticket to the center, please.", es:"Un boleto al centro, por favor." },
      { en:"What time does the train leave?", es:"¿A qué hora sale el tren?" },
      { en:"Is this seat taken?", es:"¿Está ocupado este asiento?" },
      { en:"Could you take a photo of us?", es:"¿Podría tomarnos una foto?" },
    ]
  },
  "trabajo": {
    titulo: "En el trabajo",
    icono: "💼",
    frases: [
      { en:"I'll be in a meeting until two.", es:"Estaré en una reunión hasta las dos." },
      { en:"Could you send me the report?", es:"¿Podrías enviarme el informe?" },
      { en:"Let's schedule a call.", es:"Agendemos una llamada." },
      { en:"I'll follow up with you by email.", es:"Te daré seguimiento por correo." },
      { en:"Can we move the meeting to Friday?", es:"¿Podemos mover la reunión al viernes?" },
      { en:"Thanks for your hard work.", es:"Gracias por tu gran trabajo." },
      { en:"I need an extra day to finish.", es:"Necesito un día más para terminar." },
    ]
  },
  "reuniones": {
    titulo: "Reuniones y llamadas",
    icono: "📞",
    frases: [
      { en:"Can everyone hear me clearly?", es:"¿Todos me escuchan bien?" },
      { en:"Let's start with the agenda.", es:"Empecemos con la agenda." },
      { en:"Could you repeat that point?", es:"¿Podrías repetir ese punto?" },
      { en:"I agree with what you said.", es:"Estoy de acuerdo con lo que dijiste." },
      { en:"Let's summarize the next steps.", es:"Resumamos los siguientes pasos." },
      { en:"Do you have any questions?", es:"¿Tienen alguna pregunta?" },
    ]
  }
};

// ---------- TEST DE NIVEL ----------
// Banco de preguntas organizado por dificultad (básico/intermedio/avanzado).
// Algunas son de opción múltiple (opciones), otras de completar (blanco).
// La app va adaptando la dificultad según aciertos y errores.
const TEST_LEVELS = [
  {
    nombre: "Básico",
    clave: "basico",
    preguntas: [
      { p:"¿Qué significa «good morning»?", a:"Buenos días", opciones:["Buenas noches","Buenos días","Buenas tardes","Hola"] },
      { p:"¿Cómo se dice «gracias»?", a:"Thank you", opciones:["Sorry","Please","Thank you","Hello"] },
      { p:"¿Qué color es «red»?", a:"Rojo", opciones:["Azul","Verde","Rojo","Amarillo"] },
      { p:"El número «five» en español es…", a:"Cinco", opciones:["Cuatro","Seis","Cinco","Diez"] },
      { p:"«I am happy» significa…", a:"Estoy feliz", opciones:["Estoy triste","Estoy feliz","Tengo hambre","Estoy cansado"] },
      { p:"Completa: «She ___ a doctor.»", a:"is", opciones:["am","are","is","be"] },
      { p:"¿Qué significa «water»?", a:"Agua", opciones:["Pan","Agua","Leche","Café"] },
      { p:"Completa: «I ___ coffee every morning.»", a:"drink", opciones:["drinks","drink","drinking","to drink"] },
      { p:"«House» en español es…", a:"Casa", opciones:["Cama","Puerta","Casa","Calle"] },
      { p:"¿Cómo se dice «mañana (temprano)»?", a:"Morning", opciones:["Evening","Morning","Night","Week"] },
      { p:"Completa: «Today is ___ good day.»", a:"a", opciones:["an","a","the","one"] },
      { p:"¿Qué significa «I love you»?", a:"Te amo / Te quiero", opciones:["Te odio","Te amo","Te extraño","Hasta luego"] },
    ]
  },
  {
    nombre: "Intermedio",
    clave: "intermedio",
    preguntas: [
      { p:"«I have been working since Monday» significa…", a:"He estado trabajando desde el lunes", opciones:["Voy a trabajar el lunes","He estado trabajando desde el lunes","Trabajo los lunes","Dejé de trabajar el lunes"] },
      { p:"Completa: «I'm interested ___ music.»", a:"in", opciones:["on","at","in","for"] },
      { p:"¿Cuál es el pasado de «go»?", a:"went", opciones:["goed","gone","went","going"] },
      { p:"«Boss» en español es…", a:"Jefe", opciones:["Empleado","Jefe","Compañero","Cliente"] },
      { p:"Completa: «We arrived ___ 9 o'clock.»", a:"at", opciones:["in","on","at","to"] },
      { p:"«I look forward to seeing you» significa…", a:"Espero con ilusión verte", opciones:["No quiero verte","Espero con ilusión verte","Te veo luego","Me gustaría no verte"] },
      { p:"¿Qué significa «deadline»?", a:"Fecha límite", opciones:["Feriado","Fecha límite","Sueldo","Horario"] },
      { p:"Completa: «She ___ to the store yesterday.»", a:"went", opciones:["go","goes","went","gone"] },
      { p:"«Delicious» significa…", a:"Delicioso", opciones:["Aburrido","Delicioso","Salado","Raro"] },
      { p:"Completa: «I ___ seen that movie twice.»", a:"have", opciones:["has","am","have","did"] },
      { p:"«Invoice» en español es…", a:"Factura", opciones:["Contrato","Factura","Pedido","Almacén"] },
      { p:"Completa: «He suggested that we ___ early.»", a:"leave", opciones:["leave","leaves","left","to leave"] },
    ]
  },
  {
    nombre: "Avanzado",
    clave: "avanzado",
    preguntas: [
      { p:"«Although it was raining, we went out» significa…", a:"Aunque llovía, salimos", opciones:["Llovía y por eso salimos","Aunque llovía, salimos","No salimos porque llovía","Llovía después de salir"] },
      { p:"¿Qué significa el phrasal verb «give up»?", a:"Rendirse / dejar de hacer", opciones:["Levantar","Rendirse / dejar de hacer","Entregar","Subir"] },
      { p:"Completa: «He denied ___ the money.»", a:"taking", opciones:["to take","take","taking","took"] },
      { p:"«Break the ice» significa…", a:"Romper el hielo / iniciar la conversación", opciones:["Romper algo congelado","Romper el hielo / iniciar la conversación","Quedarse en silencio","Perder el tiempo"] },
      { p:"«Notwithstanding the delay, we finished» es equivalente a…", a:"No obstante la demora, terminamos", opciones:["Terminamos tarde por la demora","No obstante la demora, terminamos","La demora evitó que termináramos","Terminamos antes de la demora"] },
      { p:"Completa: «I wish I ___ more time.»", a:"had", opciones:["have","will have","had","would have"] },
      { p:"«To reach out to someone» significa…", a:"Contactar / comunicarse con alguien", opciones:["Alejarse de alguien","Contactar / comunicarse con alguien","Discutir con alguien","Ignorar a alguien"] },
      { p:"Completa: «She's the woman ___ car was stolen.»", a:"whose", opciones:["which","who","whose","that"] },
      { p:"«To put off» significa…", a:"Posponer / aplazar", opciones:["Encender","Posponer / aplazar","Quitarse","Cancelar definitivamente"] },
      { p:"Completa: «By this time next year, I ___ English.»", a:"will have learned", opciones:["learned","will have learned","am learning","have learned"] },
      { p:"«He's very efficient» significa que…", a:"Es muy eficiente", opciones:["Es muy despistado","Es muy eficiente","Es muy lento","Es muy hablador"] },
      { p:"Completa: «Hardly had we arrived ___ it started raining.»", a:"when", opciones:["than","that","when","and"] },
    ]
  }
];

// Categorías para los filtros del vocabulario
const CATEGORIAS = [
  { clave:"cotidiano", nombre:"Cotidiano" },
  { clave:"trabajo", nombre:"Trabajo" }
];
