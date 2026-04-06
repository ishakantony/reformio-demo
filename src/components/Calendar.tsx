import { DayPicker, getDefaultClassNames } from "react-day-picker";
import type { DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarProps = DayPickerProps & {
  className?: string;
};

function CalendarChevron({
  orientation,
  ...props
}: {
  orientation?: "up" | "down" | "left" | "right";
}) {
  const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
  return <Icon className="size-4 text-muted" {...props} />;
}

function Calendar({
  className,
  classNames: userClassNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const d = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      style={{ "--cell-size": "32px" } as React.CSSProperties}
      classNames={{
        root: `${d.root} relative text-[13px] font-sans ${className ?? ""}`,
        months: `${d.months} relative flex flex-col gap-4`,
        month: `${d.month} flex w-full flex-col gap-4`,
        month_caption: `${d.month_caption} flex h-8 w-full items-center justify-center font-semibold text-sm text-charcoal`,
        caption_label: `${d.caption_label} font-medium text-sm select-none`,
        nav: `${d.nav} absolute inset-x-0 top-0 flex w-full items-center justify-between`,
        button_previous: `${d.button_previous} inline-flex items-center justify-center size-8 rounded-lg text-muted hover:bg-cream-dark hover:text-charcoal transition-colors disabled:opacity-50 select-none`,
        button_next: `${d.button_next} inline-flex items-center justify-center size-8 rounded-lg text-muted hover:bg-cream-dark hover:text-charcoal transition-colors disabled:opacity-50 select-none`,
        month_grid: `${d.month_grid} w-full border-collapse`,
        weekdays: `${d.weekdays} flex`,
        weekday: `${d.weekday} flex-1 text-center text-[0.7rem] font-medium text-muted/70 pb-1 w-[var(--cell-size)] select-none`,
        week: `${d.week} mt-1 flex w-full`,
        day: `${d.day} relative aspect-square h-full w-full p-0 text-center select-none [&:first-child[data-selected=true]_.rdp-day_button]:rounded-l-lg [&:last-child[data-selected=true]_.rdp-day_button]:rounded-r-lg`,
        day_button: `${d.day_button} flex items-center justify-center w-[var(--cell-size)] h-[var(--cell-size)] rounded-lg text-charcoal hover:bg-warm-brown/10 transition-colors`,
        today: `${d.today} text-warm-brown font-semibold`,
        selected: `${d.selected} [font-size:inherit]`,
        range_start: `${d.range_start} rounded-l-lg bg-gradient-to-r from-transparent from-50% to-warm-brown/10 to-50%`,
        range_end: `${d.range_end} rounded-r-lg bg-gradient-to-l from-transparent from-50% to-warm-brown/10 to-50%`,
        range_middle: `${d.range_middle} bg-warm-brown/10 rounded-none`,
        outside: `${d.outside} opacity-40`,
        disabled: `${d.disabled} opacity-50`,
        hidden: `${d.hidden} invisible`,
        focused: d.focused,
        chevron: d.chevron,
        ...userClassNames,
      }}
      components={{
        Chevron: CalendarChevron,
      }}
      {...props}
    />
  );
}

export { Calendar };
export type { CalendarProps };
