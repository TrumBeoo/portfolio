import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as React from "react";

// Simple className joiner – replaces @/lib/utils cn
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DockContext = React.createContext(null);

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = 60,
      maxScale = 1.5,
      iconSize = 48,
      distance = 140,
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider
        value={{ mouseX, magnification, maxScale, iconSize, distance }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "dock mx-auto flex h-16 items-end gap-2 rounded-2xl border px-3 pb-2 backdrop-blur-md",
            "shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  },
);
Dock.displayName = "Dock";

const DockItem = React.forwardRef(({ className, children, onClick }, _ref) => {
  const context = React.useContext(DockContext);
  const itemRef = React.useRef(null);

  if (!context) {
    throw new Error("DockItem must be used within a Dock");
  }

  const { mouseX, maxScale, iconSize, distance } = context;

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [iconSize, iconSize * maxScale, iconSize],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={itemRef}
      style={{ width, height: width }}
      onClick={onClick}
      className={cn(
        "dock-item group relative flex aspect-square cursor-pointer items-center justify-center rounded-xl transition-colors",
        className,
      )}
    >
      {children}
    </motion.div>
  );
});
DockItem.displayName = "DockItem";

const DockIcon = React.forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "dock-icon flex h-full w-full items-center justify-center",
        "[&>svg]:h-1/2 [&>svg]:w-1/2",
        className,
      )}
    >
      {children}
    </div>
  );
});
DockIcon.displayName = "DockIcon";

const DockLabel = React.forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "dock-label pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100",
        className,
      )}
    >
      {children}
      {/* Tooltip arrow */}
      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" style={{ background: 'inherit' }} />
    </div>
  );
});
DockLabel.displayName = "DockLabel";

const DockSeparator = React.forwardRef(({ className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("dock-separator mx-1 h-10 w-px self-center", className)}
    />
  );
});
DockSeparator.displayName = "DockSeparator";

export { Dock, DockIcon, DockItem, DockLabel, DockSeparator };
