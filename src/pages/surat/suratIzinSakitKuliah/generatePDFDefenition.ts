export default function generatePdfDefinition(data) {
  return {
    content: [
      {
        columns: [
          {},
          {
            width: 'auto',
            alignment: 'right',
            text: `${data.tempat_tanggal}`,
          },
        ],
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
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Lengkap', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['NIM', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Program Studi', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
            ['Fakuktas', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 10],
      },
      {
        text: `${data.memberitahukan_1}\n\n${data.memberitahukan_2}`,
        margin: [0, 0, 0, 20],
      },
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
