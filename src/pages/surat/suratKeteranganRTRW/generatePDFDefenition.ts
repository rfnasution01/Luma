export function generatePdfDefinition(data) {
  return {
    content: [
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        decoration: 'underline',
        alignment: 'center',
        margin: [0, 0, 0, 5], // Mengurangi margin bawah agar tidak terlalu jauh
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
        text: `${data.dengan_hormat_1}\n\n${data.dengan_hormat_2}`,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          widths: ['auto', '*'],
          body: [
            ['Nama', `: ${data.ul_1.replace(/^.*?:/, '').trim()}`],
            ['NIK', `: ${data.ul_2.replace(/^.*?:/, '').trim()}`],
            ['Tempat, Tgl Lahir', `: ${data.ul_3.replace(/^.*?:/, '').trim()}`],
            ['Jenis Kelamin', `: ${data.ul_4.replace(/^.*?:/, '').trim()}`],
            ['Agama', `: ${data.ul_5.replace(/^.*?:/, '').trim()}`],
            ['Pekerjaan', `: ${data.ul_6.replace(/^.*?:/, '').trim()}`],
            ['Status Perkawinan', `: ${data.ul_7.replace(/^.*?:/, '').trim()}`],
            ['Alamat', `: ${data.ul_8.replace(/^.*?:/, '').trim()}`],
            ['Keperluan', `: ${data.ul_9.replace(/^.*?:/, '').trim()}`],
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
