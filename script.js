document.addEventListener('DOMContentLoaded', function() {
    // Defini as respostas corretas para cada pergunta
    const correctAnswers = {
        'q1_options': 'A', // Resposta da Pergunta 1
        'q2_options': 'C', // Resposta da Pergunta 2
        'q3_options': 'D', // Resposta da Pergunta 3
        'q4_options': 'C', // Resposta da Pergunta 4
        'q5_options': 'C', // Resposta da Pergunta 5  
        '2_q1_options': 'C', // Resposta da Pergunta 1 do simulado do módulo 2
        '2_q2_options': 'C', // Resposta da Pergunta 2 do simulado do módulo 2
        '2_q3_options': 'B', // Resposta da Pergunta 3 do simulado do módulo 2
        '2_q4_options': 'C', // Resposta da Pergunta 4 do simulado do módulo 2
        '2_q5_options': 'D'  // Resposta da Pergunta 5 do simulado do módulo 2
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

                    overallFeedbackMessage.style.display = 'none';
                    overallFeedbackMessage.classList.remove('correct', 'incorrect');
                }
            });
        }
    });

    //Verifica todas as repostas ao clicar no botão
    submitBtn.addEventListener('click', function() {
        let allCorrect = true;
        let answeredCount = 0;

        quizQuestionBlocks.forEach(questionBlock => {
            const radioGroupName = questionBlock.querySelector('input[type="radio"]').name;
            const selectedOption = document.querySelector(`input[name="${radioGroupName}"]:checked`);
            const feedbackForQuestion = document.createElement('div'); // Cria feedback por pergunta 

            // Resetar feedback visual de cada label antes de reavaliar
            questionBlock.querySelectorAll('.option-label').forEach(label => {
                label.classList.remove('correct-answer', 'incorrect-answer');
            });


            if (selectedOption) {
                answeredCount++;
                const userAnswer = selectedOption.value;
                const questionCorrectAnswer = correctAnswers[radioGroupName];

                if (userAnswer === questionCorrectAnswer) {
                    // Indica que a resposta selecionada está correta
                    selectedOption.closest('.option-label').classList.add('correct-answer');
                } else {
                    allCorrect = false;
                    // Indica que a resposta selecionada está incorreta
                    selectedOption.closest('.option-label').classList.add('incorrect-answer');
                    // Opcional: Mostrar qual era a resposta correta
                    const correctLabel = questionBlock.querySelector(`input[name="${radioGroupName}"][value="${questionCorrectAnswer}"]`).closest('.option-label');
                    if (correctLabel) {
                        correctLabel.classList.add('correct-answer'); // Destaca a correta
                    }
                }
            } else {
                allCorrect = false; // Notifica se o quiz não foi totalmente respondido
                console.log(`Pergunta ${radioGroupName} não foi respondida.`);
            }
        });

        // Exibi feedback geral
        overallFeedbackMessage.classList.remove('correct', 'incorrect');
        overallFeedbackMessage.style.display = 'block';

        if (answeredCount < quizQuestionBlocks.length) {
            overallFeedbackMessage.textContent = `Você respondeu ${answeredCount} de ${quizQuestionBlocks.length} perguntas. Por favor, responda a todas.`;
            overallFeedbackMessage.style.backgroundColor = '#fff3cd';
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