import React from 'react';
import {Card} from 'react-bootstrap';

interface ErrorCardProps {
  error: string | null;
}

export default function ErrorCard(props: ErrorCardProps) {
  const {error} = props;

  return (
    <Card bg="danger" text="white" style={{width: '18rem'}}>
      <Card.Body>
        <Card.Title>Error!</Card.Title>
        <Card.Text>{error}</Card.Text>
      </Card.Body>
    </Card>
  );
}
