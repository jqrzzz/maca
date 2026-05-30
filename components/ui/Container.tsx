import { cn } from "@/lib/cn";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  size?: "default" | "prose" | "wide";
  className?: string;
  children: React.ReactNode;
};

const sizes = {
  prose: "max-w-[46rem]",
  default: "max-w-[72rem]",
  wide: "max-w-[84rem]",
};

/** Horizontally-centered content column with responsive gutters. */
export function Container<T extends React.ElementType = "div">({
  as,
  size = "default",
  className,
  children,
  ...rest
}: ContainerProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Comp = as ?? "div";
  return (
    <Comp
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
