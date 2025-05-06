export default function generatePdfDefinition(data) {
  return {
    content: [
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data.kepada_1}\n${data.kepada_2}\n${data.kepada_3}`,
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data.dengan_hormat_1}\n\n${data.dengan_hormat_2}`,
        margin: [0, 0, 0, 10],
      },
      { ul: [data.ul_1, data.ul_2, data.ul_3], margin: [0, 0, 0, 10] },
      {
        text: `${data.memberitahukan_1}\n\n${data.memberitahukan_2}`,
        margin: [0, 0, 0, 20],
      },
      { text: data.demikian, margin: [0, 0, 0, 30] },
      {
        columns: [
          {},
          {
            width: 'auto',
            alignment: 'right',
            text: `${data.hormat_saya_1}\n\n\n\n\n${data.hormat_saya_2}`,
          },
        ],
      },
    ],
  }
}
