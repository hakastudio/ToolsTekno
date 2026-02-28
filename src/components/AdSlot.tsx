import React from "react";

interface AdSlotProps {
  id: string;
  className?: string;
  label?: string;
}

export default function AdSlot({ id, className = "", label = "Advertisement" }: AdSlotProps) {
  return (
    <div className={`ad-slot-container ${className}`}>
      <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-1 text-center">
        {label}
      </div>
      <div 
        id={id} 
        className="bg-muted/30 border border-dashed border-border rounded-lg min-h-[100px] flex items-center justify-center text-xs text-muted-foreground italic"
      >
        AdSense Slot: {id}
      </div>
    </div>
  );
}
