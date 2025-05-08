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
        text: `${data.pengantar_1}`,
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Lengkap', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['Tempat, Tgl Lahir', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Jenis Kelamin', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
            ['Agama / Bangsa', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
            ['KTP', `: ${data.ul_5.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_6.replace(/^.*?:/, '').trim()}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
      },

      {
        text: `${data.pengantar_2}`,
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama Perusahaan', `: ${data.ul_7.replace(/^.*?:/, '').trim()}`],
            [
              'Jenis Usaha / Klasifikasi',
              `: ${data.ul_8.replace(/^.*?:/, '').trim()}`,
            ],
            ['Alamat Perusahaan', `: ${data.ul_9.replace(/^.*?:/, '').trim()}`],
            ['Status Bangunan', `: ${data.ul_10.replace(/^.*?:/, '').trim()}`],
            [
              'Peruntukan Bangunan',
              `: ${data.ul_11.replace(/^.*?:/, '').trim()}`,
            ],
            ['No & Tgl. IPB', `: ${data.ul_12.replace(/^.*?:/, '').trim()}`],
            [
              'Notaris Akta Pendirian Bangunan',
              `: ${data.ul_13.replace(/^.*?:/, '').trim()}`,
            ],
            [
              'Nomor Akta Pendirian Bangunan',
              `: ${data.ul_14.replace(/^.*?:/, '').trim()}`,
            ],
            ['Jumlah Karyawan', `: ${data.ul_15.replace(/^.*?:/, '').trim()}`],
            [
              'Penanggung Jawab / Pimpinan Perusahaan',
              `: ${data.ul_16.replace(/^.*?:/, '').trim()}`,
            ],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 20],
      },

      {
        text: `${data.penutup}`,
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: '*',
            alignment: 'center',
            text: `${data.ttd_ybs}\n\n\n\n\n\n`,
          },
          {
            width: '*',
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
