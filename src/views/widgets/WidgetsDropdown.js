import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  CWidgetDropdown,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple';


const WidgetsDropdown = () => {

  const data = [
    {
      id: 1,
      title: "",
      textColor1: "white",
    },
    {
      id: 2,
      title: "Members Online",
      textColor1: "white"
    },
    {
      id: 3,
      title: "Members Online",
      textColor1: "white",
    },
    {
      id: 4,
      title: "Members Online",
      textColor1: "white",
    },
  
  ];


  const [list, setList] = useState(data);
  const [hex, setHex] = useState("#F47267");

  const randomizedHex = () =>{
    const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
    setHex(randomColor);
  }


  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }


  const onEnd = (result) => {
    if (!result.destination) return;
    setList(reorder(list, result.source.index, result.destination.index));
  }




  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="droppable-1" direction="horizontal">
        {(provided, snapShot) => (

          <div className="row"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {
              list.map((item, index) => (
                  <Draggable key={item.id} draggableId={"draggable-"+item.id} index={index}>
                    {(provided, snapShot) => (

                      <div className="col-sm-12 col-md-6 col-lg-3" sm="6" lg="3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                        
                        <CWidgetDropdown
                          style={{ background: `${hex}`, overflow:'hidden', color: item.textColor1 }}
                          header="9.823"
                          text={item.title}
                          footerSlot={
                            <ChartLineSimple
                              pointed
                              className="c-chart-wrapper mt-3 mx-3"
                              style={{ height: '70px' }}
                              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                              pointHoverBackgroundColor="primary"
                              label="Members"
                              labels="months"
                            />
                          }
                        >
                          <CDropdown>
                            <CDropdownToggle color="transparent">
                              <CIcon name="cil-settings" />
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                              <CDropdownItem onClick={randomizedHex}>Card Color Changer</CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </CWidgetDropdown>
                      </div>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default WidgetsDropdown;


