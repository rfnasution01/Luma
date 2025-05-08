export function generatePdfDefinition(data) {
  return {
    content: [
      {
        columns: data.logo
          ? [
              {
                image: data.logo,
                width: 60,
                height: 60,
              },
              [
                { text: data.provinsi || '', style: 'header' },
                { text: data.kabupaten || '', style: 'subheader' },
                { text: data.desa || '', style: 'subheader' },
                { text: data.alamat_instansi || '', style: 'small' },
              ],
            ]
          : [
              {
                width: '*',
                alignment: 'center',
                stack: [
                  { text: data.provinsi || '', style: 'header' },
                  { text: data.kabupaten || '', style: 'subheader' },
                  { text: data.desa || '', style: 'subheader' },
                  { text: data.alamat_instansi || '', style: 'small' },
                ],
              },
            ],
        columnGap: 10,
        margin: [0, 0, 0, 5],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.1,
          },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        decoration: 'underline',
        alignment: 'center',
        margin: [0, 0, 0, 5],
      },
      {
        text: `${data.no_surat}`, // Tambahkan label "No:" agar lebih jelas
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
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Tempat/Tgl Lahir', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
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
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'center',
      },
      subheader: {
        fontSize: 12,
        alignment: 'center',
      },
      small: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
      },
    },
  }
}
