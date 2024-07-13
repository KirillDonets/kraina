import React from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Faq.css';

const Faq = () => {
  const faqs = [
    { question: "Чому виникають проблеми з доступом до сайту?", answer: "Очистіть історію браузера. Відключіть Adblock, якщо це розширення встановлено. Перевірте швидкість інтернет-з’єднання на krainahd.ua - вона має бути не нижче за 10 Мб/с" },
    
    { question: "Чому виникають проблеми зі входом у додаток?", answer: "Якщо пароль не надходить або не діє під час входу: Рекомендуємо перейти на використання нашого сайту через браузер Google Chrome. Перевірте браузер на наявність оновлень і встановіть їх. Для цього натисніть на “три крапки” у верхньому куті єкрана, та виберіть “Налаштування”. Якщо оновлення присутні, то вони почнуть завантажуватись. Після цього треба перезавантажити пристрій. Рекомендуємо відключити розширення, які працюють у вашому браузері. Рекомендуємо перевірити коректність введених даних під час входу."},

    { question: "Чому не завантажується фільм?", answer: "На сайті відсутня можливість завантажувати фільми для перегляду без інтернету. Але це можна зробити в мобільних застосунках для Android та IOS." },

    { question: "Як дізнатись швидкість свого інтернету?", answer: "Відкрийте браузер на пристрої, на якому виникають труднощі. Зайдіть на speedtest. Вимірювання швидкості почнеться автоматично впродовж 1-5 секунд. Через кілька секунд на екрані з’являться показники швидкості вашого інтернету-з’єднання. Для коректної роботи програми, показники мають бути такими: Вхідна швидкість - від 10 Мбіт/с.Вихідна швидкість - від 10 Мб/с. Ping - до 40" },

  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  return (
      <Container maxWidth="lg" id="faq">
        <h1><span>ПИТАНЯ</span> ТА ВІДПОВІДІ</h1>
        <div className="accordion-block">
          {faqs.map((faq, index) => (
              <Accordion key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
          ))}
        </div>
        <IconButton
                color="primary"
                onClick={scrollToTop}
                style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#FFFFFF' }}
            >
            <ArrowUpwardIcon />
            </IconButton>
      </Container>
  );
};

export default Faq;
