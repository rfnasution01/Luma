export function generatePdfDefinition(data) {
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
        text: `${data.dengan_hormat_1}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Saya yang bertanda tangan di bawah ini:`,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama', `: ${data.ul_1}`],
            ['Pendidikan Terakhir', `: ${data.ul_4 || '-'}`],
            ['Nomor Telepon', `: ${data.ul_5 || '-'}`],
            ['Alamat', `: ${data.ul_2}`],
            ['Tempat/Tgl Lahir', `: ${data.ul_3}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 10],
      },
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
            alignment: 'center',
            text: `${data.hormat_saya_1}\n\n\n\n\n${data.hormat_saya_2}`,
          },
        ],
      },
    ],
  }
}
