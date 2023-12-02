import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/housiegen.css';

const HousieGame = () => {

    const generateEmptyGrid = () => {
        const emptyGrid = [];
        for (let i = 1; i <= 100; i++) {
          emptyGrid.push({ number: i, generated: false });
        }
        return emptyGrid;
      };
  const [numbersGenerated, setNumbersGenerated] = useState([]);
  const [grid, setGrid] = useState(generateEmptyGrid());
  const [reset,setreset]=useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumbersGenerated([]);
    }, 5000);
    

    return () => clearTimeout(timer);
  }, [numbersGenerated]);

  const generateRandomNumber = () => {
    let randomNumber;
    if(reset===true){
        window.location.reload();
    }
    do {
      randomNumber = Math.floor(Math.random() * 100) + 1;
    } while (numbersGenerated.includes(randomNumber));

    setNumbersGenerated((prevNumbers) => [...prevNumbers, randomNumber]);
    updateGrid(randomNumber);
    
  };
  

  

  const updateGrid = (number) => {
    setGrid((prevGrid) =>
      prevGrid.map((item) =>
        item.number === number ? { ...item, generated: true } : item
      )
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <div className="housie-box">
            {grid.map((item) => (
              <div
                key={item.number}
                className={`housie-grid ${item.generated ? 'generated' : ''}`}
              >
                {item.number}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button onClick={generateRandomNumber} variant="primary">
            Generate
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>{
            if(numbersGenerated.length===0){
                setreset(false)
            }
            else{
                setreset(true)
                window.location.reload()
                console.log("hello")
            }
            
            }} variant="primary">
            Reset
          </Button>
        </Col>
        
      </Row>
    </Container>
  );
};

export default HousieGame;
