import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
// import ChartBarSimple from '../charts/ChartBarSimple'






const WidgetsDropdown = () => {
  // {
  //   data.map(({color1})=>{

  //   })
  // }
  const data = [
    {
      id: 1,
      title: "",
      // color1:"#484777",
      textColor1: "white",
      // setColor1:"black"
    },
    {
      id: 2,
      title: "Members Online",
      // color1:"lightBlue",
      textColor1: "white",
      // setColor1:"orange"
    },
    {
      id: 3,
      title: "Members Online",
      // color1:"orange",
      textColor1: "white",
      // setColor1:"green"
  
    },
    {
      id: 4,
      title: "Members Online",
      // color1:"red",
      textColor1: "white",
      // setColor1:"#F2B7C7"
    },
  
  ];


  const [list, setList] = useState(data);
  const [color, setColor] = useState("#541743");

 //  const [color2, setColor2] = useState("lightBlue");
  // const [textColor2, setTextColor2] = useState('white');

  // const [color3, setColor3] = useState("orange");
  // const [textColor3, setTextColor3] = useState("white");

  // const [color4, setColor4] = useState("red");
  // const [textColor4, setTextColor4] = useState("white");

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
                          style={{ background: color, color: item.textColor1 }}
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
                              <CDropdownItem onClick={() => { setColor("#541743") }}>Default theme</CDropdownItem>
                              <CDropdownItem onClick={() => { setColor("black") }}>Dark theme</CDropdownItem>
                              <CDropdownItem onClick={() => { setColor("#F2B7C7") }}>Light Pink Theme</CDropdownItem>
                              <CDropdownItem onClick={() => { setColor("#A7CAAA") }}>Light Green Theme</CDropdownItem>
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


