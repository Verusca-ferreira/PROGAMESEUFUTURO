document.addEventListener('DOMContentLoaded', () => {
    // Tenta selecionar os elementos do menu. Se não existirem na página, não faz nada.
    const menuHamburger = document.querySelector('.menu-hamburger');
    const menuClose = document.querySelector('.menu-close');
    const navMobile = document.querySelector('.nav-links-mobile');

    // Verifica se os elementos do menu existem antes de adicionar os 'ouvintes'
    if (menuHamburger && navMobile && menuClose) {
        const navLinks = navMobile.querySelectorAll('a');

        const openMenu = () => {
            navMobile.classList.add('nav-active');
        };

        const closeMenu = () => {
            navMobile.classList.remove('nav-active');
        };

        menuHamburger.addEventListener('click', openMenu);
        menuClose.addEventListener('click', closeMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Definir as respostas corretas para cada pergunta
    const correctAnswers = {
        'q1_options': 'A', // Resposta da  1
        'q2_options': 'C', // Resposta da  2
        'q3_options': 'D', // Resposta da  3
        'q4_options': 'C', // Resposta da  4
        'q5_options': 'C', // Resposta da  5  
        //simualdo 2//
        '2q1_options': 'C', // Resposta da  1 
        '2q2_options': 'C', // Resposta da  2 
        '2q3_options': 'B', // Resposta da  3 
        '2q4_options': 'C', // Resposta da  4 
        '2q5_options': 'D', // Resposta da  5 
        //simulado3//
        '3q1_options': 'A', // Resposta da  1
        '3q2_options': 'C', // Resposta da  2
        '3q3_options': 'B', // Resposta da  3
        '3q4_options': 'C', // Resposta da  4
        '3q5_options': 'D'  // Resposta da  5
    };

    const submitBtn = document.getElementById('submit-btn');
    const overallFeedbackMessage = document.getElementById('overall-feedback-message');
    const quizQuestionBlocks = document.querySelectorAll('.quiz-question-block'); // Seleciona todos os blocos de pergunta

    // Adiciona listener de mudança para cada grupo de opções (para destacar a seleção)
    quizQuestionBlocks.forEach(questionBlock => {
        const optionsContainer = questionBlock.querySelector('.options');
        if (optionsContainer) {
            optionsContainer.addEventListener('change', function(event) {
                if (event.target.type === 'radio') {
                    // Pega o nome do grupo de rádio para desmarcar apenas os daquela pergunta
                    const radioGroupName = event.target.name;
                    document.querySelectorAll(`input[name="${radioGroupName}"]`).forEach(radio => {
                        radio.closest('.option-label').classList.remove('selected');
                    });
                    // Adiciona a classe 'selected' à label da opção clicada
                    event.target.closest('.option-label').classList.add('selected');

                    // Opcional: Limpa a mensagem geral de feedback ao mudar uma seleção
                    overallFeedbackMessage.style.display = 'none';
                    overallFeedbackMessage.classList.remove('correct', 'incorrect');
                }
            });
        }
    });

    // Lógica para verificar todas as respostas ao clicar no botão
    submitBtn.addEventListener('click', function() {
        let allCorrect = true;
        let answeredCount = 0;

        quizQuestionBlocks.forEach(questionBlock => {
            const radioGroupName = questionBlock.querySelector('input[type="radio"]').name;
            const selectedOption = document.querySelector(`input[name="${radioGroupName}"]:checked`);
            const feedbackForQuestion = document.createElement('div'); // Criar feedback por pergunta se desejar

            // Resetar feedback visual de cada label antes de reavaliar
            questionBlock.querySelectorAll('.option-label').forEach(label => {
                label.classList.remove('correct-answer', 'incorrect-answer');
            });


            if (selectedOption) {
                answeredCount++;
                const userAnswer = selectedOption.value;
                const questionCorrectAnswer = correctAnswers[radioGroupName];

                if (userAnswer === questionCorrectAnswer) {
                    // Opcional: Adicionar classe para indicar que a resposta selecionada está correta
                    selectedOption.closest('.option-label').classList.add('correct-answer');
                } else {
                    allCorrect = false;
                    // Opcional: Adicionar classe para indicar que a resposta selecionada está incorreta
                    selectedOption.closest('.option-label').classList.add('incorrect-answer');
                    // Opcional: Mostrar qual era a resposta correta
                    const correctLabel = questionBlock.querySelector(`input[name="${radioGroupName}"][value="${questionCorrectAnswer}"]`).closest('.option-label');
                    if (correctLabel) {
                        correctLabel.classList.add('correct-answer'); // Destaca a correta
                    }
                }
            } else {
                allCorrect = false; // Se alguma pergunta não foi respondida, o quiz não está totalmente correto
                // Opcional: Adicionar feedback visual para perguntas não respondidas
                // console.log(`Pergunta ${radioGroupName} não foi respondida.`);
            }
        });

        // Exibir feedback geral
        overallFeedbackMessage.classList.remove('correct', 'incorrect');
        overallFeedbackMessage.style.display = 'block';

        if (answeredCount < quizQuestionBlocks.length) {
            overallFeedbackMessage.textContent = `Você respondeu ${answeredCount} de ${quizQuestionBlocks.length} perguntas. Por favor, responda a todas.`;
            overallFeedbackMessage.style.backgroundColor = '#fff3cd'; // Cor de aviso
            overallFeedbackMessage.style.color = '#856404';
            overallFeedbackMessage.style.borderColor = '#ffeeba';
        } else if (allCorrect) {
            overallFeedbackMessage.textContent = "Parabéns! Todas as respostas estão corretas!";
            overallFeedbackMessage.classList.add('correct');
        } else {
            overallFeedbackMessage.textContent = "Algumas respostas estão incorretas. Verifique as perguntas.";
            overallFeedbackMessage.classList.add('incorrect');
        }
    });
});