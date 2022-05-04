export function colorClasses(props): any {
  const { color, colorTheme, textColor, bgColor, borderColor, rippleColor, themeDark } = props;

  return {
    "theme-dark": themeDark,
    [`color-${color}`]: color,
    [`color-theme-${colorTheme}`]: colorTheme,
    [`text-color-${textColor}`]: textColor,
    [`bg-color-${bgColor}`]: bgColor,
    [`border-color-${borderColor}`]: borderColor,
    [`ripple-color-${rippleColor}`]: rippleColor
  };
}

export function classNames(...args): string {
  const classes = [];
  args.forEach((arg) => {
    if (typeof arg === "object" && arg.constructor === Object) {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    } else if (arg) {
      classes.push(arg);
    }
  });

  // 去重
  const uniqueClasses = [];
  classes.forEach((c) => {
    if (uniqueClasses.indexOf(c) < 0) {
      uniqueClasses.push(c);
    }
  });
  return uniqueClasses.join(" ");
}

export function emit(props, events, ...args): void {
  if (!events || !events.trim().length || typeof events !== "string") {
    return;
  }

  events
    .trim()
    .split(" ")
    .forEach((event) => {
      let eventName = (event || "").trim();
      if (!eventName) {
        return;
      }

      eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);

      const propName = `${eventName}`;
      if (props[propName]) {
        props[propName](...args);
      }
    });
}
