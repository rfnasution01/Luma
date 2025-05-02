export function CardDashboard({
  icon,
  label,
  value,
}: {
  icon: string | JSX.Element
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex">
        <p className="flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-[#DCE2FB80] text-[2.8rem]">
          {icon}
        </p>
      </div>
      <div className="flex flex-col gap-12">
        <p className="text-portal-softPurple">{label}</p>
        <p className="text-portal-primary text-[3.2rem] font-bold">{value}</p>
      </div>
    </div>
  )
}
