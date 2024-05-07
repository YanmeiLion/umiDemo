import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

export default function content(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    // transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {/* ... */}
        wwwww
      </div>
    </div>
  );
}
