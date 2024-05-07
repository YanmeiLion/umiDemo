import React, { useState } from 'react';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import Content from './content.jsx';

import Draggable from './draggable.jsx';
import Droppable from './droppable.jsx';

export default function index() {
  const [items, setItems] = useState([1111, 2222, 3333]);
  const sensors = useSensors(
    useSensor(MouseSensor),
    // useSensor(KeyboardSensor),
  );

  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }

    // if (active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id);
    //     const newIndex = items.indexOf(over.id);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
  };

  return (
    <div style={{ border: '1px red solid', height: '200px' }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/*  strategy={verticalListSortingStrategy}  //  This strategy is optimi */}

        {!isDropped ? draggableMarkup : null}
        <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>

        {/* <SortableContext items={items}>
          {items.map((id) => (
            <div>{id}</div>

            // <Content key={id} id={id} />
          ))}
        </SortableContext> */}
      </DndContext>

      {/* <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        modifiers={[snapToGridModifier]}
      >

      </DndContext> */}
    </div>
  );
}
