export function generatePdfDefinition(data) {
  return {
    content: [
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        decoration: 'underline',
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data.kepada_1}\n${data.kepada_2}\n${data.kepada_3}`,
        margin: [0, 0, 0, 20],
      },
      {
        text: data.dengan_hormat_1,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'Yang bertanda tangan di bawah ini:',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama', `: ${data.nama}`],
            ['Jabatan', `: ${data.jabatan}`],
            ['Departemen', `: ${data.departemen}`],
            ['Alamat', `: ${data.alamat}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 10],
      },
      {
        text: `${data.isi_pengunduran}`,
        margin: [0, 0, 0, 20],
      },
      {
        text: data.penutup,
        margin: [0, 0, 0, 30],
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
