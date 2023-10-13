import { FormEvent, useState } from 'react';
import './App.css';

import logoImg from './assets/icon.png';

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault(); //serve pra página não atualizar quando submeter o form

    const calculo = alcoolInput / gasolinaInput;

    if (calculo > 0.7) {
      setInfo({
        title: 'Compensa usar GASOLINA',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: 'Compensa usar ÁLCOOL',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
  }

  function formatarMoeda(valor: number) {
    const valorFormatado = valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img src={logoImg} alt="gasLogo" />
        <h1 className="title">Qual é a melhor opção?</h1>
        <br />
        <form onSubmit={calcular}>
          <label>Álcool (PPL)</label> <br />
          <input
            className="input"
            type="number"
            min="1"
            step="0.01"
            placeholder="Preço do Álcool"
            required
            // value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />
          <br />
          <br />
          <label>Gasolina (PPL)</label>
          <br />
          <input
            className="input"
            type="number"
            min="1"
            step="0.01"
            placeholder="Preço da Gasolina"
            required
            // value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />
          <br />
          <br />
          <button type="submit">Calcular</button>
        </form>

        <br />
        {/* verificar se existe algo no objeto, e fazer a renderização condicional*/}
        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h3 className="result-title">{info?.title}</h3>

            <span>Preço do álcool: {info?.alcool}</span>
            <span>Preço da gasolina: {info?.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
