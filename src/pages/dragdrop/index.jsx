import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const dropStyle = {
  width: '80px',
  height: '80px',
  border: '1px red solid',
  fontSize: '16px',
  textAlign: 'center',
  fontWeight: 'boder',
  lineHeight: '80px',
  marginBottom: '20px',
};

const listMapOne = ['今天', '天气', '真的', '很冷'];
const listMapTwo = ['11', '22', '33', '44'];
const droppable = ['droppable-1', 'droppable-2'];

export default function index() {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log('拖拽开始的位置', source);

    console.log('--拖拽结束后---', destination);
    console.log('--当前拖动的值---', draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 右边拖动
    if (destination.droppableId === source.droppableId) {
      listMapTwo.splice(source.index, 1);
      listMapTwo.splice(destination.index, 0, draggableId);

      console.log('===listMapTwo===0', listMapTwo);
    }

    // 左边拖动到右边
    // else if (
    //   destination.droppableId !== source.droppableId &&
    //   destination.droppableId == droppable[1]
    // ) {
    //   listMapTwo.splice(destination.index, 0, draggableId);
    // }
  };

  return (
    <div style={{ display: 'flex' }}>
      <h3>拖拽demo</h3>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dropBox">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                border: '1px blue solid',
                height: '400px',
                width: '300px',
              }}
            >
              {listMapTwo.map((item, index) => {
                return (
                  <Draggable draggableId={item} index={index} key={item}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={item}
                      >
                        <div style={dropStyle}> {item} </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* {droppable.map((item) => {
          return (
            <Droppable
              droppableId={item}
              key={item}
              isDropDisabled={item == droppable[0] ? true : false}
              // mode='virtual'
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    border: '1px red solid',
                    height: '400px',
                    width: '300px',
                  }}
                >
                  {item == 'droppable-1' &&
                    listMapOne.map((dropItem, dropIndex) => {
                      return (
                        <Draggable
                          draggableId={dropItem}
                          index={dropIndex}
                          key={dropItem}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={dropItem}
                            >
                              <div style={dropStyle}> {dropItem} </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}

                  {item == 'droppable-2' &&
                    listMapTwo.map((dropItem, dropIndex) => {
                      return (
                        <Draggable
                          draggableId={dropItem}
                          index={dropIndex}
                          key={dropItem}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={dropItem}
                            >
                              <div style={dropStyle}> {dropItem} </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                </div>
              )}
            </Droppable>
          );
        })} */}
      </DragDropContext>
    </div>
  );
}
