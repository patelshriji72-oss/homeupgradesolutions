// AI Chatbot System with Interactive Q&A
const chatbotData = {
  mainQuestions: [
    {
      id: 'q1',
      emoji: '🔆',
      question: 'What solar panel services do you offer?',
      subQuestions: [
        { id: 'q1s1', question: 'Do you provide rooftop solar installation?', answer: 'Yes, we provide complete rooftop solar installation including site inspection, mounting, wiring, inverter setup, and safety testing.' },
        { id: 'q1s2', question: 'What is included in solar maintenance?', answer: 'Solar maintenance includes panel cleaning, wiring inspection, inverter check, output testing, and fixing loose connections.' },
        { id: 'q1s3', question: 'How often should solar panels be cleaned?', answer: 'Solar panels should be cleaned every 3–6 months, or more frequently in dusty areas.' },
        { id: 'q1s4', question: 'Do you offer inverter check and wiring inspection?', answer: 'Yes, our team inspects the inverter, AC/DC wiring, junction boxes, and earthing for safety and performance.' }
      ]
    },
    {
      id: 'q2',
      emoji: '🔆',
      question: 'How long does solar panel cleaning take?',
      subQuestions: [
        { id: 'q2s1', question: 'Do I need to switch off the system before cleaning?', answer: 'No, our technicians will turn off the system safely before starting the cleaning process.' },
        { id: 'q2s2', question: 'Will your team bring all the required tools?', answer: 'Yes, we bring all tools, brushes, water, and safety equipment.' },
        { id: 'q2s3', question: 'Can I be at home during the cleaning?', answer: 'Absolutely. You can stay at home; the process is safe and hassle-free.' }
      ]
    },
    {
      id: 'q3',
      emoji: '❄️',
      question: 'What types of AC services are available?',
      subQuestions: [
        { id: 'q3s1', question: 'Do you offer deep AC cleaning?', answer: 'Yes, we offer full AC deep cleaning that includes coil cleaning, filter washing, blower cleaning, and drainage pipe clearing.' },
        { id: 'q3s2', question: 'Do you repair water leakage in AC?', answer: 'Yes, our technicians fix water leakage issues caused by clogged drainage or coil condensation.' },
        { id: 'q3s3', question: 'Do you provide AC gas refilling?', answer: 'Yes, we provide R32, R410A, and R22 gas refilling with proper pressure testing.' },
        { id: 'q3s4', question: 'Do you install and uninstall AC units?', answer: 'Yes, we provide professional AC installation and uninstallation for split and window units.' }
      ]
    },
    {
      id: 'q4',
      emoji: '❄️',
      question: 'How can I identify if my AC needs servicing?',
      subQuestions: [
        { id: 'q4s1', question: 'My AC is cooling slowly—what could be the issue?', answer: 'Slow cooling usually indicates dirty coils, low gas, or blocked filters. A service is recommended.' },
        { id: 'q4s2', question: 'There is noise coming from my AC—should I book a service?', answer: 'Yes. Unusual sounds may indicate blower or motor issues that need inspection.' },
        { id: 'q4s3', question: 'My AC is leaking water—will you fix it?', answer: 'Yes, we check and clean the drain line, which usually solves leakage issues.' }
      ]
    },
    {
      id: 'q5',
      emoji: '⚡',
      question: 'What electrical services do you provide?',
      subQuestions: [
        { id: 'q5s1', question: 'Do you fix wiring and short circuits?', answer: 'Yes, our electricians repair wiring faults, short circuits, and overheating issues safely.' },
        { id: 'q5s2', question: 'Do you install lights, fans, and MCB panels?', answer: 'Yes, we install ceiling fans, LED lights, tube lights, MCB panels, switches, and all electrical fittings.' },
        { id: 'q5s3', question: 'Do you repair power fluctuations?', answer: 'Yes, we inspect and fix overload, loose wiring, MCB issues, and faulty connections causing fluctuations.' },
        { id: 'q5s4', question: 'Do you provide switchboard repair or replacement?', answer: 'Yes, we repair and replace sockets, switches, regulators, and entire switchboards.' }
      ]
    },
    {
      id: 'q6',
      emoji: '⚡',
      question: 'Are your electricians certified and trained?',
      subQuestions: [
        { id: 'q6s1', question: 'Do they carry proper tools and testing equipment?', answer: 'Yes, all electricians carry multimeters, testers, safety gloves, and proper tools.' },
        { id: 'q6s2', question: 'Will the electrician check the safety of my home wiring?', answer: 'Yes, upon request, our electrician will inspect the household wiring for safety.' },
        { id: 'q6s3', question: 'Do you offer warranty on electrical work?', answer: 'Yes, we offer a warranty on most electrical repairs and installations.' }
      ]
    },
    {
      id: 'q7',
      emoji: '🚰',
      question: 'What plumbing issues can you fix?',
      subQuestions: [
        { id: 'q7s1', question: 'Do you repair leaking taps or pipes?', answer: 'Yes, we repair leaking taps, pipes, showers, and joints.' },
        { id: 'q7s2', question: 'Can you fix a blocked bathroom or kitchen drain?', answer: 'Yes, our plumbers clear blockages using tools and chemical cleaners.' },
        { id: 'q7s3', question: 'Do you repair flush tanks and shower fittings?', answer: 'Yes, we fix flush tanks, replace valves, and repair shower systems.' },
        { id: 'q7s4', question: 'Do you handle water pressure problems?', answer: 'Yes, we diagnose and fix low water pressure issues in bathrooms and kitchens.' }
      ]
    },
    {
      id: 'q8',
      emoji: '🚰',
      question: 'Do you provide plumbing installation services?',
      subQuestions: [
        { id: 'q8s1', question: 'Do you install water heaters (geyser)?', answer: 'Yes, we install instant and storage geysers safely.' },
        { id: 'q8s2', question: 'Do you install washbasins, taps, and shower sets?', answer: 'Yes, we handle complete bathroom and kitchen fitting installation.' },
        { id: 'q8s3', question: 'Do you install bathroom accessories?', answer: 'Yes, we install towel rods, shelves, soap stands, and more.' },
        { id: 'q8s4', question: 'Do you provide new pipeline installation?', answer: 'Yes, we install new pipelines for bathrooms, kitchens, and water tanks.' }
      ]
    },
    {
      id: 'q9',
      emoji: '🧼',
      question: 'What cleaning services are available?',
      subQuestions: [
        { id: 'q9s1', question: 'Do you provide full home deep cleaning?', answer: 'Yes, full deep cleaning includes rooms, windows, fans, floors, washrooms, and kitchen.' },
        { id: 'q9s2', question: 'Do you provide kitchen and bathroom cleaning?', answer: 'Yes, we provide intensive cleaning for both spaces using high-grade chemicals.' },
        { id: 'q9s3', question: 'Can you clean sofas, carpets, and mattresses?', answer: 'Yes, we offer fabric and foam cleaning services for all upholstery.' },
        { id: 'q9s4', question: 'Do you provide post-construction cleaning?', answer: 'Yes, we handle dust, paint marks, cement stains, and debris removal.' }
      ]
    },
    {
      id: 'q10',
      emoji: '🧼',
      question: 'What is included in deep home cleaning?',
      subQuestions: [
        { id: 'q10s1', question: 'Will you clean windows, fans, and doors?', answer: 'Yes, all windows, fans, and doors are cleaned thoroughly.' },
        { id: 'q10s2', question: 'Do you include floor scrubbing and disinfecting?', answer: 'Yes, our team performs machine scrubbing and floor disinfection.' },
        { id: 'q10s3', question: 'Do you clean kitchen cabinets and appliances from outside?', answer: 'Yes, cabinet interiors and exterior surfaces are cleaned.' },
        { id: 'q10s4', question: 'Will you bring your own cleaning materials?', answer: 'Yes, we bring all tools, machines, and chemicals.' }
      ]
    },
    {
      id: 'q11',
      emoji: '🔧',
      question: 'Which appliances do you repair?',
      subQuestions: [
        { id: 'q11s1', question: 'Washing machine repair', answer: 'We repair top-load and front-load machines, including motor and drain issues.' },
        { id: 'q11s2', question: 'Refrigerator not cooling', answer: 'We fix gas leaks, thermostat issues, compressor faults, and cooling failure.' },
        { id: 'q11s3', question: 'Microwave not heating', answer: 'We repair heating coils, fuses, and PCB-related issues.' },
        { id: 'q11s4', question: 'Water purifier servicing', answer: 'Yes, we service RO, UV, and UF purifiers including filter changes.' },
        { id: 'q11s5', question: 'TV installation & basic repair', answer: 'Yes, we mount TVs and handle minor circuit or display issues.' }
      ]
    },
    {
      id: 'q12',
      emoji: '🔧',
      question: 'What happens if an appliance part needs replacement?',
      subQuestions: [
        { id: 'q12s1', question: 'Will you inform me before replacing the part?', answer: 'Yes, we always consult and confirm charges before replacing any parts.' },
        { id: 'q12s2', question: 'Will the technician bring original spare parts?', answer: 'Yes, we provide genuine parts with manufacturer warranty.' },
        { id: 'q12s3', question: 'What is the warranty on replaced parts?', answer: 'Warranty varies from 30 days to 6 months, depending on the part.' }
      ]
    },
    {
      id: 'q13',
      emoji: '🧾',
      question: 'How can I book a service with HomeUpgrade?',
      subQuestions: [
        { id: 'q13s1', question: 'Can I book online?', answer: 'Yes, you can book directly through our website or app.' },
        { id: 'q13s2', question: 'Can I select my preferred date and time?', answer: 'Yes, you can choose your preferred time slot during booking.' },
        { id: 'q13s3', question: 'Will I receive a booking confirmation message?', answer: 'Yes, a confirmation notification/SMS is sent instantly.' }
      ]
    },
    {
      id: 'q14',
      emoji: '🧾',
      question: 'What payment options do you support?',
      subQuestions: [
        { id: 'q14s1', question: 'Do you accept UPI?', answer: 'Yes, UPI and QR code payments are accepted.' },
        { id: 'q14s2', question: 'Is cash payment available?', answer: 'Yes, you can pay in cash after service.' },
        { id: 'q14s3', question: 'Can I pay after the service is completed?', answer: 'Yes, payment can be made post-service.' }
      ]
    },
    {
      id: 'q15',
      emoji: '👨🔧',
      question: 'Are your technicians verified and experienced?',
      subQuestions: [
        { id: 'q15s1', question: 'Are background checks performed?', answer: 'Yes, all technicians go through ID and background verification.' },
        { id: 'q15s2', question: 'Do they carry ID cards?', answer: 'Yes, every technician carries an official HomeUpgrade ID.' },
        { id: 'q15s3', question: 'How many years of experience do they have?', answer: 'Our technicians typically have 2–10 years of experience.' }
      ]
    },
    {
      id: 'q16',
      emoji: '👨🔧',
      question: 'Do you provide service warranty?',
      subQuestions: [
        { id: 'q16s1', question: 'How long is the warranty valid?', answer: 'Warranty varies by service—usually 7 to 30 days.' },
        { id: 'q16s2', question: 'What issues are covered under warranty?', answer: 'Only the same problem that was fixed during service is covered.' },
        { id: 'q16s3', question: 'How do I claim warranty if needed?', answer: 'You can contact support with your booking ID for a free re-check.' }
      ]
    },
    {
      id: 'q17',
      emoji: '📍',
      question: 'In which areas do you provide service?',
      subQuestions: [
        { id: 'q17s1', question: 'Do you provide service across Ahmedabad?', answer: 'Yes, we provide service across all major areas of Ahmedabad.' },
        { id: 'q17s2', question: 'Do you cover nearby locations?', answer: 'Yes, we also cover selected nearby regions depending on availability.' },
        { id: 'q17s3', question: 'How do I check if my area is serviceable?', answer: 'You can enter your PIN code or location on our website to check availability.' }
      ]
    }
  ]
};

const quickQuestions = [
  "What solar panel services do you offer?",
  "What types of AC services are available?",
  "What electrical services do you provide?",
  "Which appliances do you repair?",
  "How can I book a service?",
  "Are your technicians verified?"
];

let chatHistory = [];

// Initialize chatbot
function initChatbot() {
  createChatbotHTML();
  addEventListeners();
}

// Create chatbot HTML structure
function createChatbotHTML() {
  const chatbotHTML = `
    <!-- AI Chatbot -->
    <div id="ai-chatbot-icon" class="chatbot-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span class="chatbot-text">AI Help</span>
    </div>

    <div id="ai-chatbot-container" class="chatbot-container">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">🤖</div>
          <div>
            <h3>HomeUpgrade AI</h3>
            <span class="status">Online</span>
          </div>
        </div>
        <button id="close-chatbot" class="close-btn">&times;</button>
      </div>
      
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="message bot-message">
          <div class="message-content">
            Hi! I'm your HomeUpgrade AI assistant. Click on any question below to get detailed information:
          </div>
        </div>
        <div class="main-questions">
          ${chatbotData.mainQuestions.map(q => `
            <button class="main-question-btn" onclick="showSubQuestions('${q.id}')">
              ${q.emoji} ${q.question}
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="chatbot-input">
        <input type="text" id="chatbot-input-field" placeholder="Type your question...">
        <button id="send-message" class="send-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Add event listeners
function addEventListeners() {
  const chatbotIcon = document.getElementById('ai-chatbot-icon');
  const chatbotContainer = document.getElementById('ai-chatbot-container');
  const closeChatbot = document.getElementById('close-chatbot');
  const sendButton = document.getElementById('send-message');
  const inputField = document.getElementById('chatbot-input-field');

  chatbotIcon.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    chatbotIcon.style.display = 'none';
  });

  closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
    chatbotIcon.style.display = 'flex';
  });

  sendButton.addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

// Send message function
function sendMessage() {
  const inputField = document.getElementById('chatbot-input-field');
  const message = inputField.value.trim();
  
  if (!message) return;
  
  addMessage(message, 'user');
  inputField.value = '';
  
  setTimeout(() => {
    const response = getAIResponse(message);
    if (response) {
      addMessage(response, 'bot');
    }
  }, 500);
}

// Show sub-questions when main question is clicked
function showSubQuestions(questionId) {
  const mainQuestion = chatbotData.mainQuestions.find(q => q.id === questionId);
  if (!mainQuestion) return;
  
  addMessage(mainQuestion.emoji + ' ' + mainQuestion.question, 'user');
  
  setTimeout(() => {
    const subQuestionsHTML = `
      <div class="sub-questions-container">
        <p>Please select a specific question:</p>
        ${mainQuestion.subQuestions.map(sq => `
          <button class="sub-question-btn" onclick="showAnswer('${questionId}', '${sq.id}')">
            ✔ ${sq.question}
          </button>
        `).join('')}
      </div>
    `;
    addBotMessage(subQuestionsHTML);
  }, 500);
}

// Show answer when sub-question is clicked
function showAnswer(mainQuestionId, subQuestionId) {
  const mainQuestion = chatbotData.mainQuestions.find(q => q.id === mainQuestionId);
  const subQuestion = mainQuestion.subQuestions.find(sq => sq.id === subQuestionId);
  
  if (!subQuestion) return;
  
  addMessage(subQuestion.question, 'user');
  
  setTimeout(() => {
    addMessage(subQuestion.answer, 'bot');
    
    // Show main questions again after a short delay
    setTimeout(() => {
      showMainQuestions();
    }, 1000);
  }, 500);
}

// Show main questions
function showMainQuestions() {
  const mainQuestionsHTML = `
    <div class="main-questions-container">
      <p>Choose another question or ask something else:</p>
      ${chatbotData.mainQuestions.map(q => `
        <button class="main-question-btn-small" onclick="showSubQuestions('${q.id}')">
          ${q.emoji} ${q.question}
        </button>
      `).join('')}
    </div>
  `;
  addBotMessage(mainQuestionsHTML);
}

// Add bot message with HTML content
function addBotMessage(htmlContent) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  
  messageDiv.innerHTML = `
    <div class="message-content">${htmlContent}</div>
    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add message to chat
function addMessage(message, sender) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-content">${message}</div>
    <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  chatHistory.push({message, sender, time: new Date()});
}

// Get AI response for typed messages
function getAIResponse(userMessage) {
  const normalizedMessage = userMessage.toLowerCase().replace(/[?.,!]/g, '');
  
  // Search through main questions
  for (const mainQ of chatbotData.mainQuestions) {
    if (normalizedMessage.includes(mainQ.question.toLowerCase()) || 
        mainQ.question.toLowerCase().includes(normalizedMessage)) {
      showSubQuestions(mainQ.id);
      return;
    }
    
    // Search through sub-questions
    for (const subQ of mainQ.subQuestions) {
      if (normalizedMessage.includes(subQ.question.toLowerCase()) || 
          subQ.question.toLowerCase().includes(normalizedMessage)) {
        setTimeout(() => {
          showMainQuestions();
        }, 1000);
        return subQ.answer;
      }
    }
  }
  
  // Keyword-based responses
  if (normalizedMessage.includes('solar')) {
    return "I can help with solar panel services! Please click on the solar panel questions above for detailed information.";
  } else if (normalizedMessage.includes('ac') || normalizedMessage.includes('air condition')) {
    return "We provide complete AC services! Please click on the AC service questions above for detailed information.";
  } else if (normalizedMessage.includes('electrical') || normalizedMessage.includes('wiring')) {
    return "Our certified electricians handle all electrical work! Please click on the electrical service questions above for detailed information.";
  } else if (normalizedMessage.includes('plumbing') || normalizedMessage.includes('pipe') || normalizedMessage.includes('tap')) {
    return "We offer comprehensive plumbing services! Please click on the plumbing questions above for detailed information.";
  } else if (normalizedMessage.includes('clean')) {
    return "We provide various cleaning services! Please click on the cleaning service questions above for detailed information.";
  } else if (normalizedMessage.includes('book') || normalizedMessage.includes('appointment')) {
    return "For booking information, please click on the booking & payment questions above for detailed steps.";
  } else if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return "Hello! Welcome to HomeUpgrade. Please click on any question above to get detailed information about our services.";
  } else if (normalizedMessage.includes('thank')) {
    return "You're welcome! Feel free to click on any other questions you might have.";
  }
  
  return "Please click on any of the questions above to get detailed information about our home services. You can also type specific keywords like 'solar', 'AC', 'electrical', 'plumbing', etc.";
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', initChatbot);