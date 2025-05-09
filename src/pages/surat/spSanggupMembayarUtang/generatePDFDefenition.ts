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
      },

      {
        text: `${data.dengan_hormat_1}`,
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Lengkap', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['NIK', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data.dengan_hormat_2}`,
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Lengkap', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
            ['NIK', `: ${data.ul_5.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_6.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data.memberitahukan_1}\n\n${data.memberitahukan_2}\n\n${data.memberitahukan_3}`,
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {},
          {
            width: 'auto',
            alignment: 'center',
            text: `${data.hormat_saya_1}\n${data.hormat_saya_2}\n\n\n\n\n${data.hormat_saya_3}`,
          },
        ],
      },
    ],
  }
}
