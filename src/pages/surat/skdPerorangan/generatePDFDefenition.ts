export function generatePdfDefinition(data) {
  return {
    content: [
      {
        columns: data.logo
          ? [
              {
                image: data.logo,
                width: 80,
                height: 80,
              },
              [
                { text: (data.header1 || '').toUpperCase(), style: 'header' },
                {
                  text: (data.header2 || '').toUpperCase(),
                  style: 'subheader',
                },
                {
                  text: (data.header3 || '').toUpperCase(),
                  style: 'subheader',
                },
                { text: (data.header4 || '').toUpperCase(), style: 'small' },
              ],
            ]
          : [
              {
                width: '*',
                alignment: 'center',
                stack: [
                  { text: (data.header1 || '').toUpperCase(), style: 'header' },
                  {
                    text: (data.header2 || '').toUpperCase(),
                    style: 'subheader',
                  },
                  {
                    text: (data.header3 || '').toUpperCase(),
                    style: 'subheader',
                  },
                  { text: (data.header4 || '').toUpperCase(), style: 'small' },
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
            lineWidth: 1.5,
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
        text: `${data.pengantar}`,
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Lengkap', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['Tempat, Tgl Lahir', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Jenis Kelamin', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
            ['Pekerjaan', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
            ['Agama', `: ${data.ul_5.replace(/^.*?:/, '').trim()}`],
            ['Status Perkawinan', `: ${data.ul_6.replace(/^.*?:/, '').trim()}`],
            ['Warga Negara', `: ${data.ul_7.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
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
            text: `${data.alamat_tanggal}\n${data?.jabatan_penandatangan}\n\n\n\n\n${data.nama_penandatangan}`,
          },
        ],
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
