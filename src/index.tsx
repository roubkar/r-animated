import * as React from "react";

export interface IAnimatedProps {
  from: React.CSSProperties;
  to: React.CSSProperties;
  reset?: boolean;
  delay?: number;
  duration?: number;
  inverse?: boolean;
  transitionProperty?: string
  timingFunction?: string;
  children: (style: React.CSSProperties) => React.ReactElement;
}


export const Animated: React.FunctionComponent<IAnimatedProps> = (props: IAnimatedProps): React.ReactElement =>
{
  let [animatedProps, setAnimatedProps] = React.useState<React.CSSProperties>(props.from);

  React.useEffect(() =>
  {
    if (props.reset)
    {
      setAnimatedProps(props.from);
    }
    const timer = setTimeout(() =>
    {
      requestAnimationFrame(() =>
        setAnimatedProps({
          ...(props.inverse ? props.from : props.to),
          transition: `${props.transitionProperty || "all"} ${(props.duration || 700) / 1000}s  ${props.timingFunction || "cubic-bezier(0.1, 0.99, 0.1, 0.99)"}`
        })
      );
    }, props.delay || 0);

    return () => clearTimeout(timer);
  }, [props.reset, props.inverse]);

  return props.children(animatedProps);
};
