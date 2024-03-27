export type DetailClothesResponseDataType = {
  clothingId: 0;
  clothingName: string;
  category: string;
  styles: string[];
  seasons: number[];
  clothingImgPath: string;
  textures: string[];
  sharedUsers: [
    {
      userId: number;
      userName: string;
    }
  ];
  isMyClothing: true;
};
