import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { Transformer, Layer, Stage, Text, Group, Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useSelectedItemsStore } from "@/store/ClothesStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isDragging: boolean;
}

const IMG: React.FC<{
  image: HTMLImageElement;
  shapeProps: ShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeProps) => void;
  onDelete: () => void;
}> = ({ image, shapeProps, isSelected, onSelect, onChange, onDelete }) => {
  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected) {
      if (trRef.current && shapeRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <Group>
      <Image
        image={image}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {isSelected && (
        <Text
          text="X"
          x={shapeProps.x + shapeProps.width}
          y={shapeProps.y - 10}
          onClick={onDelete}
          draggable={false}
          fill="red"
          fontSize={20}
          padding={5}
          fontStyle="bold"
          cornerRadius={10}
          stroke={"black"}
          strokeWidth={1}
        />
      )}
    </Group>
  );
};

function Canvas() {
  const navigate = useNavigate();
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearItems = useSelectedItemsStore((state) => state.clearItems);
  const stageRef = useRef<Konva.Stage>(null);
  const [loadedImages, setLoadedImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({});

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadImages = async () => {
    const imagesToLoad = selectedItems.map(async (item) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = item.url;
      await img.decode();
      return { id: item.id, image: img };
    });

    const loadedImagesArray = await Promise.all(imagesToLoad);
    const newLoadedImages = loadedImagesArray.reduce<{
      [key: string]: HTMLImageElement;
    }>((acc, { id, image }) => {
      acc[id] = image;
      return acc;
    }, {}); // 여기서 {}의 타입을 명시적으로 선언합니다.
    setLoadedImages(newLoadedImages);
  };

  loadImages();

  const exportAndSaveImage = () => {
    if (stageRef.current) {
      // 배경색을 설정하는 Rect 생성
      // const background = new Konva.Rect({
      //   x: 0,
      //   y: 0,
      //   width: window.innerWidth, // 또는 stageRef.current.width()
      //   height: window.innerHeight * 0.49, // 또는 stageRef.current.height()
      //   fill: "lightpink", // 앞서 계산한 어두운 색상
      // });

      // // 임시 레이어 생성 및 배경 추가
      // const tempLayer = new Konva.Layer();
      // tempLayer.add(background);
      // stageRef.current.add(tempLayer);

      // // 배경을 레이어의 맨 뒤로 보냄
      // background.moveToTop();

      const uri = stageRef.current.toDataURL();

      // 임시 레이어 제거
      // tempLayer.destroy();

      const date = new Date();
      const fileName = `CanvasImage_${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.png`;
      console.log(fileName);
      console.log(uri);
      clearItems();
      navigate("/home");
    }
  };

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleShapeChange = (index: number, newAttrs: ShapeProps) => {
    useSelectedItemsStore.setState((state) => {
      const updatedItems = [...state.selectedItems];
      updatedItems[index] = { ...updatedItems[index], ...newAttrs };
      return { selectedItems: updatedItems };
    });
  };

  const handleDelete = (id: string) => {
    useSelectedItemsStore.setState((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    }));
    setSelectedId(null);
  };

  return (
    <>
      <Button onClick={exportAndSaveImage}>저장</Button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight * 0.49}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
        style={{ backgroundColor: "white" }}
      >
        <Layer>
          {selectedItems.map((item) => (
            <IMG
              key={item.id}
              image={loadedImages[item.id]}
              shapeProps={{
                ...item,
                isDragging: false,
              }}
              isSelected={item.id === selectedId}
              onSelect={() => setSelectedId(item.id)}
              onChange={(newAttrs) =>
                handleShapeChange(
                  selectedItems.findIndex((img) => img.id === item.id),
                  newAttrs
                )
              }
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;

const Button = styled.button`
  position: absolute;
  top: 1.7dvh;
  right: 10px;
`;
