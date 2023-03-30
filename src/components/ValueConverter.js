import React from 'react';

function NumeroReal(props) {
  const { valor } = props;

  const valorFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return <span>{valorFormatado}</span>;
}

export default NumeroReal;