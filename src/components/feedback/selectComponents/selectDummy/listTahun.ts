export const ListTahun: { value: string; label: string }[] = Array.from(
  { length: 20 },
  (_, i) => {
    const tahun = new Date().getFullYear() - i
    return { value: tahun.toString(), label: tahun.toString() }
  },
)
