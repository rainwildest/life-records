import React, {
  useRef,
  useImperativeHandle,
  useEffect,
  useLayoutEffect
} from "react";
import { classNames, colorClasses, emit } from "components/api/uitls";

interface ToggleProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  init?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  value?: string | number | Array<any>;
  color?: string;
  change?: (event?: any) => void;
}

function useIsomorphicLayoutEffect(callback, deps) {
  // eslint-disable-next-line
  if (typeof window === 'undefined') return useEffect(callback, deps);
  return useLayoutEffect(callback, deps);
}

const watchProp = (value, callback) => {
  const valueRef = useRef(value);

  useIsomorphicLayoutEffect(() => {
    if (value !== valueRef.current && callback) {
      callback(value, valueRef.current);
    }
    valueRef.current = value;
  }, [value]);
};

const Toggle = React.forwardRef((props: ToggleProps, ref) => {
  const f7Toggle = useRef(null);
  const elRef = useRef(null);
  const isTouched = useRef(false);

  const {
    className,
    id,
    style,
    init = true,
    checked,
    defaultChecked,
    disabled,
    readonly,
    name,
    value
  } = props;

  // useImperativeHandle 可以让父、子组件分别有自己的 ref，
  // 通过 React.forwardRef 将父组件的 ref 透传过来，
  // 通过 useImperativeHandle 方法来自定义开放给父组件的 current
  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Toggle: () => f7Toggle.current
  }));

  // 事件改变时执行
  const onChange = (event) => {
    emit(props, "change", event);
  };

  // 添加class
  const labelClasses = classNames(
    "toggle",
    className,
    {
      disabled
    },
    colorClasses(props)
  );

  watchProp(checked, (newValue) => {
    if (!f7Toggle.current) {
      return;
    }
    f7Toggle.current.checked = newValue;
  });

  const handleTouchStart = () => {
    if (isTouched.current || disabled) {
      return;
    }
    isTouched.current = true;
    elRef.current.classList.add("toggle-active-state");
  };
  const handleTouchEnd = () => {
    if (!isTouched.current || disabled) {
      return;
    }
    elRef.current.classList.remove("toggle-active-state");
    isTouched.current = false;
  };

  const onMount = () => {
    if (!init || !elRef.current) {
      return;
    }

    elRef.current.addEventListener("mousedown", handleTouchStart);
    elRef.current.addEventListener("mouseup", handleTouchEnd);
    f7Toggle.current = {};
  };

  const onDestroy = () => {
    f7Toggle.current = null;
    elRef.current.removeEventListener("mousedown", handleTouchStart);
    elRef.current.removeEventListener("mouseup", handleTouchEnd);
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const inputEl = (
    <input
      type="checkbox"
      name={name}
      disabled={disabled}
      readOnly={readonly}
      checked={checked}
      defaultChecked={defaultChecked}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <div>
      <label id={id} style={style} className={labelClasses} ref={elRef}>
        {inputEl}
        <span className="toggle-icon" />
      </label>
    </div>
  );
});

export default Toggle;
