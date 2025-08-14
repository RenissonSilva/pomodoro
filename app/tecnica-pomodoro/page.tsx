export const metadata = {
  title: 'Técnica Pomodoro: Guia Completo',
  description: 'Aprenda a Técnica Pomodoro para estudar e trabalhar melhor.',
  alternates: { canonical: '/tecnica-pomodoro' },
  openGraph: {
    title: 'Técnica Pomodoro: Guia Completo',
    description: 'Como usar Pomodoro para foco.',
    type: 'article',
  },
};

export default function Page() {
  return (
    <article className='prose-zen'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Como aplicar a Técnica Pomodoro',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Defina a tarefa',
                text: 'Escolha uma tarefa objetiva.',
              },
              {
                '@type': 'HowToStep',
                name: 'Foco 25 minutos',
                text: 'Trabalhe sem interrupções.',
              },
              {
                '@type': 'HowToStep',
                name: 'Pausa 5 minutos',
                text: 'Levante, alongue, água.',
              },
              {
                '@type': 'HowToStep',
                name: 'Repita',
                text: 'Após 4 ciclos, pausa longa.',
              },
            ],
          }),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'O que é a Técnica Pomodoro?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Método de foco com pausas.',
                },
              },
              {
                '@type': 'Question',
                name: 'Qual o tempo ideal?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Comece com 25/5 e ajuste.',
                },
              },
            ],
          }),
        }}
      />
      <h1>Técnica Pomodoro: Guia Completo</h1>
      <p>
        A Técnica Pomodoro ajuda a manter foco alternando ciclos de trabalho e
        pausas.
      </p>
      <h2>Passo a passo</h2>
      <ol>
        <li>Escolha a tarefa</li>
        <li>Foco 25 minutos</li>
        <li>Pausa 5 minutos</li>
        <li>Repita; pausa longa após 4 ciclos</li>
      </ol>
      <h2>Variações</h2>
      <table>
        <thead>
          <tr>
            <th>Formato</th>
            <th>Foco</th>
            <th>Pausa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clássico</td>
            <td>25</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Profundo</td>
            <td>50</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
      <p>
        Pronto? <a href='/'>Abra o Pomodoro</a> e comece.
      </p>
    </article>
  );
}
