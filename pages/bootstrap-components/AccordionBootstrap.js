import {Accordion} from 'react-bootstrap';
import '../index.css';

export default function AccordionBoostrap({eventKey,Title,Text}) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{Title}</Accordion.Header>
      <Accordion.Body>{Text}</Accordion.Body>
    </Accordion.Item>
  )
}