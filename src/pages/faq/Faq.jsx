import React from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Faq.css';

const Faq = () => {
  const faqs = [
    { question: "Question 1", answer: "Answer to question 1" },
    { question: "Question 2", answer: "Answer to question 2" },
    { question: "Question 3", answer: "Answer to question 3" },
    { question: "Question 4", answer: "Answer to question 4" },
    { question: "Question 1", answer: "Answer to question 1" },
    { question: "Question 2", answer: "Answer to question 2" },
    { question: "Question 3", answer: "Answer to question 3" },
    { question: "Question 4", answer: "Answer to question 4" },
    { question: "Question 4", answer: "Answer to question 4" },
  ];

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
      </Container>
  );
};

export default Faq;
