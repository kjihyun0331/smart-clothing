// // import React, { useRef, useEffect, useState } from "react";
// // import Konva from "konva";
// // import { Transformer, Layer, Stage, Text, Group, Image } from "react-konva";
// // import { KonvaEventObject } from "konva/types/Node";
// // import useImage from "use-image";

// // interface ShapeProps {
// //   id: string;
// //   x: number;
// //   y: number;
// //   width: number;
// //   height: number;
// //   isDragging: boolean;
// // }

// // interface ImageItem {
// //   x: number;
// //   y: number;
// //   width: number;
// //   height: number;
// //   id: string;
// //   url: string | url;
// // }

// // const IMG: React.FC<{
// //   image: HTMLImageElement;
// //   shapeProps: ShapeProps;
// //   isSelected: boolean;
// //   onSelect: () => void;
// //   onChange: (newAttrs: ShapeProps) => void;
// //   onDelete: () => void;
// // }> = ({ image, shapeProps, isSelected, onSelect, onChange, onDelete }) => {
// //   const shapeRef = useRef<Konva.Image>(null);
// //   const trRef = useRef<Konva.Transformer>(null);

// //   useEffect(() => {
// //     if (isSelected) {
// //       if (trRef.current && shapeRef.current) {
// //         trRef.current.nodes([shapeRef.current]);
// //         trRef.current.getLayer()?.batchDraw();
// //       }
// //     }
// //   }, [isSelected]);

// //   return (
// //     <Group>
// //       <Image
// //         image={image}
// //         onClick={onSelect}
// //         onTap={onSelect}
// //         ref={shapeRef}
// //         {...shapeProps}
// //         draggable
// //         onDragEnd={(e) => {
// //           onChange({
// //             ...shapeProps,
// //             x: e.target.x(),
// //             y: e.target.y(),
// //           });
// //         }}
// //         onTransformEnd={() => {
// //           const node = shapeRef.current;
// //           if (node) {
// //             const scaleX = node.scaleX();
// //             const scaleY = node.scaleY();

// //             node.scaleX(1);
// //             node.scaleY(1);
// //             onChange({
// //               ...shapeProps,
// //               x: node.x(),
// //               y: node.y(),
// //               width: Math.max(5, node.width() * scaleX),
// //               height: Math.max(5, node.height() * scaleY),
// //             });
// //           }
// //         }}
// //       />
// //       {isSelected && (
// //         <Transformer
// //           ref={trRef}
// //           flipEnabled={false}
// //           boundBoxFunc={(oldBox, newBox) => {
// //             if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
// //               return oldBox;
// //             }
// //             return newBox;
// //           }}
// //         />
// //       )}
// //       {isSelected && (
// //         <Text
// //           text="X"
// //           x={shapeProps.x + shapeProps.width}
// //           y={shapeProps.y - 10}
// //           onClick={onDelete}
// //           draggable={false}
// //           fill="red"
// //           fontSize={20}
// //           padding={5}
// //           fontStyle="bold"
// //           cornerRadius={10}
// //           stroke={"black"}
// //           strokeWidth={1}
// //         />
// //       )}
// //     </Group>
// //   );
// // };

// // function MakeOutfit() {
// //   const [images, setImages] = useState<ImageItem[]>([
// //     {
// //       url: "https://cdn-icons-png.flaticon.com/512/4722/4722208.png",
// //       x: 10,
// //       y: 10,
// //       width: 100,
// //       height: 100,
// //       id: "rect1",
// //     },
// //     {
// //       url: "https://cdn-icons-png.flaticon.com/512/4722/4722208.png",
// //       x: 200,
// //       y: 10,
// //       width: 100,
// //       height: 100,
// //       id: "rect2",
// //     },
// //   ]);

// //   const [selectedId, setSelectedId] = useState<string | null>(null);

// //   const checkDeselect = (
// //     e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
// //   ) => {
// //     const clickedOnEmpty = e.target === e.target.getStage();
// //     if (clickedOnEmpty) {
// //       setSelectedId(null);
// //     }
// //   };

// //   const handleShapeChange = (index: number, newAttrs: ShapeProps) => {
// //     setImages((prevImages) => {
// //       const updatedImages = [...prevImages];
// //       updatedImages[index] = { ...updatedImages[index], ...newAttrs };
// //       return updatedImages;
// //     });
// //   };

// //   const handleDelete = (id: string) => {
// //     setImages((prevImages) => prevImages.filter((image) => image.id !== id));
// //     setSelectedId(null);
// //   };

// //   return (
// //     <div>
// //       <div style={{ backgroundColor: "green" }}>header</div>
// //       <Stage
// //         width={window.innerWidth}
// //         height={window.innerHeight * 0.5}
// //         onMouseDown={checkDeselect}
// //         onTouchStart={checkDeselect}
// //       >
// //         <Layer>
// //           {images.map((image, index) => (
// //               const [imgurl] = useImage(url);
// //             <IMG
// //                 key={i}
// //                 image = {imgurl}
// //                 shapeProps={{
// //                   ...image,
// //                   isDragging: false,
// //                 }}
// //                 isSelected={image.id === selectedId}
// //                 onSelect={() => {
// //                   selectShape(image.id);
// //                 }}
// //                 onChange={(newAttrs) => {
// //                   const rects = images.slice();
// //                   images[i] = newAttrs;
// //                   setRectangles(images);
// //                 }}
// //                 onDelete={() => {
// //                   const updatedRectangles = rectangles.filter(
// //                     (item) => item.id !== rect.id
// //                   );
// //                   setRectangles(updatedRectangles);
// //                   selectShape(null); // 선택 해제
// //             />
// //           ))}
// //         </Layer>
// //       </Stage>
// //       <div style={{ backgroundColor: "lightblue" }}>
// //         {images.map((item) => (
// //           <div key={item.id}>{item.id}</div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default MakeOutfit;

// import React, { useRef, useEffect } from "react";
// import Konva from "konva";
// import { Rect, Transformer, Layer, Stage, Text, Group } from "react-konva";
// import { useState } from "react";
// import { KonvaEventObject } from "konva/lib/Node";

// interface ShapeProps {
//   id: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   fill: string;
//   isDragging: boolean;
// }

// interface RectangleProps {
//   shapeProps: ShapeProps;
//   isSelected: boolean;
//   onSelect: () => void;
//   onChange: (newAttrs: ShapeProps) => void;
//   onDelete: () => void; // 새로 추가한 onDelete 프로퍼티
// }

// const Rectangle: React.FC<RectangleProps> = ({
//   shapeProps,
//   isSelected,
//   onSelect,
//   onChange,
//   onDelete, // 새로 추가한 onDelete 프로퍼티
// }) => {
//   const shapeRef = useRef<Konva.Rect>(null);
//   const trRef = useRef<Konva.Transformer>(null);

//   useEffect(() => {
//     if (isSelected) {
//       // we need to attach transformer manually
//       if (trRef.current && shapeRef.current) {
//         trRef.current.nodes([shapeRef.current]);
//         trRef.current.getLayer()?.batchDraw();
//       }
//     }
//   }, [isSelected]);

//   return (
//     <Group>
//       <Rect
//         onClick={onSelect}
//         onTap={onSelect}
//         ref={shapeRef}
//         {...shapeProps}
//         draggable
//         onDragEnd={(e) => {
//           onChange({
//             ...shapeProps,
//             x: e.target.x(),
//             y: e.target.y(),
//           });
//         }}
//         onTransformEnd={() => {
//           // transformer is changing scale of the node
//           // and NOT its width or height
//           // but in the store we have only width and height
//           // to match the data better we will reset scale on transform end
//           const node = shapeRef.current;
//           if (node) {
//             const scaleX = node.scaleX();
//             const scaleY = node.scaleY();

//             // we will reset it back
//             node.scaleX(1);
//             node.scaleY(1);
//             onChange({
//               ...shapeProps,
//               x: node.x(),
//               y: node.y(),
//               // set minimal value
//               width: Math.max(5, node.width() * scaleX),
//               height: Math.max(5, node.height() * scaleY),
//             });
//           }
//         }}
//       />
//       {isSelected && (
//         <Transformer
//           ref={trRef}
//           flipEnabled={false}
//           boundBoxFunc={(oldBox, newBox) => {
//             // limit resize
//             if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
//               return oldBox;
//             }
//             return newBox;
//           }}
//         />
//       )}
//       {isSelected && ( // 삭제 버튼 추가
//         <Text
//           text="X"
//           x={shapeProps.x + shapeProps.width}
//           y={shapeProps.y - 10}
//           onClick={onDelete}
//           draggable={false}
//           fill="red" // 글씨 색상
//           fontSize={20} // 글씨 크기
//           padding={5} // 내부 여백
//           fontStyle="bold" // 글씨 두껍게
//           cornerRadius={10} // border-radius 설정
//           stroke={"black"}
//           strokeWidth={1}
//         />
//       )}
//     </Group>
//   );
// };

// const initialRectangles = [
//   {
//     x: 10,
//     y: 10,
//     width: 100,
//     height: 100,
//     fill: "red",
//     id: "rect1",
//   },
//   {
//     x: 200,
//     y: 10,
//     width: 100,
//     height: 100,
//     fill: "blue",
//     id: "rect2",
//   },
// ];

// function MakeOutfit() {
//   const [rectangles, setRectangles] = useState(initialRectangles);
//   const [selectedId, selectShape] = useState<string | null>(null);

//   const checkDeselect = (
//     e: KonvaEventObject<globalThis.MouseEvent> | KonvaEventObject<TouchEvent>
//   ) => {
//     // deselect when clicked on empty area
//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       selectShape(null);
//     }
//   };

//   return (
//     <div>
//       <div style={{ backgroundColor: "green" }}>header</div>
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight * 0.5}
//         onMouseDown={checkDeselect}
//         onTouchStart={checkDeselect}
//       >
//         <Layer>
//           {rectangles.map((rect, i) => {
//             return (
//               <Rectangle
//                 key={i}
//                 shapeProps={{
//                   ...rect,
//                   isDragging: false,
//                 }}
//                 isSelected={rect.id === selectedId}
//                 onSelect={() => {
//                   selectShape(rect.id);
//                 }}
//                 onChange={(newAttrs) => {
//                   const rects = rectangles.slice();
//                   rects[i] = newAttrs;
//                   setRectangles(rects);
//                 }}
//                 onDelete={() => {
//                   const updatedRectangles = rectangles.filter(
//                     (item) => item.id !== rect.id
//                   );
//                   setRectangles(updatedRectangles);
//                   selectShape(null); // 선택 해제
//                 }}
//               />
//             );
//           })}
//         </Layer>
//       </Stage>
//       <div style={{ backgroundColor: "lightblue" }}>여기는 옷이 뜨는 영역</div>
//     </div>
//   );
// }
// export default MakeOutfit;
