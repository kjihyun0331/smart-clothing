// import React, { useRef, useEffect, useState } from "react";
// import Konva from "konva";
// import { Transformer, Layer, Stage, Text, Group, Image } from "react-konva";
// import { KonvaEventObject } from "konva/lib/Node";
// import styled from "styled-components";

// interface ShapeProps {
//   id: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   isDragging: boolean;
// }

// interface ImageItem {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   id: string;
//   url: string;
// }

// const IMG: React.FC<{
//   image: HTMLImageElement;
//   shapeProps: ShapeProps;
//   isSelected: boolean;
//   onSelect: () => void;
//   onChange: (newAttrs: ShapeProps) => void;
//   onDelete: () => void;
// }> = ({ image, shapeProps, isSelected, onSelect, onChange, onDelete }) => {
//   const shapeRef = useRef<Konva.Image>(null);
//   const trRef = useRef<Konva.Transformer>(null);

//   useEffect(() => {
//     if (isSelected) {
//       if (trRef.current && shapeRef.current) {
//         trRef.current.nodes([shapeRef.current]);
//         trRef.current.getLayer()?.batchDraw();
//       }
//     }
//   }, [isSelected]);

//   return (
//     <Group>
//       <Image
//         image={image}
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
//           const node = shapeRef.current;
//           if (node) {
//             const scaleX = node.scaleX();
//             const scaleY = node.scaleY();

//             node.scaleX(1);
//             node.scaleY(1);
//             onChange({
//               ...shapeProps,
//               x: node.x(),
//               y: node.y(),
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
//             if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
//               return oldBox;
//             }
//             return newBox;
//           }}
//         />
//       )}
//       {isSelected && (
//         <Text
//           text="X"
//           x={shapeProps.x + shapeProps.width}
//           y={shapeProps.y - 10}
//           onClick={onDelete}
//           draggable={false}
//           fill="red"
//           fontSize={20}
//           padding={5}
//           fontStyle="bold"
//           cornerRadius={10}
//           stroke={"black"}
//           strokeWidth={1}
//         />
//       )}
//     </Group>
//   );
// };

// function Canvas() {
//   const [images, setImages] = useState<ImageItem[]>([
//     {
//       url: "https://cdn-icons-png.flaticon.com/512/4722/4722208.png",
//       x: 10,
//       y: 10,
//       width: 100,
//       height: 100,
//       id: "rect1",
//     },
//     {
//       url: "https://cdn-icons-png.flaticon.com/512/4722/4722182.png",
//       x: 200,
//       y: 10,
//       width: 100,
//       height: 100,
//       id: "rect2",
//     },
//     {
//       url: "https://cdn-icons-png.flaticon.com/512/1031/1031377.png",
//       x: 200,
//       y: 10,
//       width: 100,
//       height: 100,
//       id: "rect3",
//     },
//     {
//       url: "https://cdn-icons-png.flaticon.com/512/1031/1031439.png",
//       x: 300,
//       y: 40,
//       width: 100,
//       height: 100,
//       id: "rect4",
//     },
//   ]);
//   const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const checkDeselect = (
//     e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
//   ) => {
//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       setSelectedId(null);
//     }
//   };

//   useEffect(() => {
//     const loadImages = async () => {
//       const loaded = await Promise.all(
//         images.map(async (image) => {
//           const img = new window.Image();
//           img.src = image.url;
//           await img.decode();
//           return img;
//         })
//       );
//       setLoadedImages(loaded);
//     };

//     loadImages();
//   }, [images]);

//   const handleShapeChange = (index: number, newAttrs: ShapeProps) => {
//     setImages((prevImages) => {
//       const updatedImages = [...prevImages];
//       updatedImages[index] = { ...updatedImages[index], ...newAttrs };
//       return updatedImages;
//     });
//   };

//   const handleDelete = (id: string) => {
//     setImages((prevImages) => prevImages.filter((image) => image.id !== id));
//     setSelectedId(null);
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
//           {images.map((image, index) => (
//             <IMG
//               key={image.id}
//               image={loadedImages[index]}
//               shapeProps={{ ...image, isDragging: false }}
//               isSelected={image.id === selectedId}
//               onSelect={() => setSelectedId(image.id)}
//               onChange={(newAttrs) =>
//                 handleShapeChange(
//                   images.findIndex((img) => img.id === image.id),
//                   newAttrs
//                 )
//               }
//               onDelete={() => handleDelete(image.id)}
//             />
//           ))}
//         </Layer>
//       </Stage>
//       <ClothesList style={{ backgroundColor: "lightblue" }}>
//         {images.map((item) => (
//           <div className="imgarea" key={item.id} style={{ width: "50px" }}>
//             <img src={item.url} alt="" />
//           </div>
//         ))}
//       </ClothesList>
//     </div>
//   );
// }

// export default Canvas;

// const ClothesList = styled.div`
//   width: 100%;

//   .imgarea {
//     width: 30px;
//     object-fit: contain;
//     height: 30px;
//   }

//   img {
//     width: 20px;
//     object-fit: contain;
//   }
// `;
