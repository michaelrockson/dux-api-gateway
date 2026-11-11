import type { ResultHeroProps } from "../interfaces/lookup.props";

export function ResultHero({ view }: ResultHeroProps) {
  return (
    <div className="flex flex-col gap-6 p-7">
      <div className="flex flex-col gap-1.5">
        {view.kicker && (
          <span className="text-[15px] text-muted-foreground">
            {view.kicker}
          </span>
        )}
        <span className="font-display text-[60px] font-medium leading-none tracking-[-0.03em]">
          {view.big}
        </span>
        {view.sub && <span className="text-[17px]">{view.sub}</span>}
      </div>
      {view.stats.length > 0 && (
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 border-t border-border pt-5">
          {view.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="m-0 font-display text-xl font-semibold">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
