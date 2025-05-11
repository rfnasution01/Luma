export function generatePdfDefinition(data) {
  return {
    content: [
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        decoration: 'underline',
        alignment: 'center',
        margin: [0, 0, 0, 40],
      },

      {
        text: `${data.pengantar}`,
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Jenis Kelamin', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
            ['Kebangsaan', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
            ['No. KTP', `: ${data.ul_5.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
      },

      {
        text: `${data.memberitahukan_1}\n\n${data.memberitahukan_2}`,
        margin: [0, 0, 0, 40],
      },
      {
        columns: [
          {},
          {
            width: '*',
            alignment: 'center',
            text: `${data?.alamat_tanggal}\n${data?.menyatakan}\n\n\n\n\n\n${data?.nama}`,
          },
        ],
        columnGap: 100, // opsional: jarak antar kolom
        margin: [0, 0, 0, 20],
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      subheader: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
      },
      small: {
        fontSize: 12,
        alignment: 'center',
      },
    },
  }
}
